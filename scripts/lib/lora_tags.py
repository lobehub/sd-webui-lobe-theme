import os
import json
import struct
import time
from pathlib import Path
from typing import Dict, List, Optional, Any

try:
    from modules import shared
except ImportError:
    shared = None

try:
    from scripts.lib.lobe_log import LobeLog
except ImportError:
    class LobeLog:
        @staticmethod
        def debug(msg): pass
        @staticmethod
        def info(msg): pass

class LoraTagManager:
    _instance = None

    def __init__(self):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self._last_scan_time: float = 0
        self._cache_ttl: float = 5.0  # seconds

    @classmethod
    def instance(cls) -> "LoraTagManager":
        if cls._instance is None:
            cls._instance = LoraTagManager()
        return cls._instance

    def get_search_directories(self) -> List[str]:
        dirs = []
        if shared is not None and hasattr(shared, "cmd_opts"):
            lora_dir = getattr(shared.cmd_opts, "lora_dir", None)
            if lora_dir and os.path.isdir(lora_dir):
                dirs.append(lora_dir)
            lyco_dir = getattr(shared.cmd_opts, "lyco_dir", None)
            if lyco_dir and os.path.isdir(lyco_dir):
                dirs.append(lyco_dir)

        base_dir = Path(__file__).resolve().parent.parent.parent.parent.parent
        std_lora = base_dir / "models" / "Lora"
        if std_lora.is_dir() and str(std_lora) not in dirs:
            dirs.append(str(std_lora))

        std_lyco = base_dir / "models" / "LyCORIS"
        if std_lyco.is_dir() and str(std_lyco) not in dirs:
            dirs.append(str(std_lyco))

        return dirs

    def _read_safetensors_metadata(self, path: str) -> Dict[str, Any]:
        try:
            with open(path, "rb") as f:
                header_size = struct.unpack("<Q", f.read(8))[0]
                if header_size < 2 or header_size > 50 * 1024 * 1024:
                    return {}
                header_bytes = f.read(header_size)
                header = json.loads(header_bytes.decode("utf-8", errors="ignore"))
                return header.get("__metadata__", {})
        except Exception:
            return {}

    def _extract_tags_from_file(self, full_file_path: str, base_path_no_ext: str) -> List[str]:
        tags: List[str] = []

        # 1. Check <name>.cm-info.json (Civitai Model Manager)
        cm_info_path = base_path_no_ext + ".cm-info.json"
        if os.path.isfile(cm_info_path):
            try:
                with open(cm_info_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    tw = data.get("TrainedWords", [])
                    if isinstance(tw, list):
                        for word in tw:
                            if isinstance(word, str) and word.strip():
                                tags.extend([w.strip() for w in word.split(",") if w.strip()])
                    elif isinstance(tw, str) and tw.strip():
                        tags.extend([w.strip() for w in tw.split(",") if w.strip()])
            except Exception as e:
                LobeLog.debug(f"Error reading {cm_info_path}: {e}")

        if tags:
            return list(dict.fromkeys(tags))

        # 2. Check <name>.civitai.info (Civitai Helper)
        civitai_info_path = base_path_no_ext + ".civitai.info"
        if os.path.isfile(civitai_info_path):
            try:
                with open(civitai_info_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    tw = data.get("trainedWords", [])
                    if isinstance(tw, list):
                        for word in tw:
                            if isinstance(word, str) and word.strip():
                                tags.extend([w.strip() for w in word.split(",") if w.strip()])
                    elif isinstance(tw, str) and tw.strip():
                        tags.extend([w.strip() for w in tw.split(",") if w.strip()])
            except Exception as e:
                LobeLog.debug(f"Error reading {civitai_info_path}: {e}")

        if tags:
            return list(dict.fromkeys(tags))

        # 3. Check <name>.json (WebUI user metadata / custom json)
        json_path = base_path_no_ext + ".json"
        if os.path.isfile(json_path):
            try:
                with open(json_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    act = data.get("activation text", "")
                    if isinstance(act, str) and act.strip():
                        tags.extend([w.strip() for w in act.split(",") if w.strip()])
                    tw = data.get("trainedWords", [])
                    if isinstance(tw, list):
                        for word in tw:
                            if isinstance(word, str) and word.strip():
                                tags.extend([w.strip() for w in word.split(",") if w.strip()])
            except Exception as e:
                LobeLog.debug(f"Error reading {json_path}: {e}")

        if tags:
            return list(dict.fromkeys(tags))

        # 4. Check safetensors metadata
        if full_file_path.lower().endswith(".safetensors") and os.path.isfile(full_file_path):
            meta = self._read_safetensors_metadata(full_file_path)
            phrase = meta.get("modelspec.trigger_phrase")
            if phrase and isinstance(phrase, str) and phrase.strip():
                tags.extend([w.strip() for w in phrase.split(",") if w.strip()])

            if not tags and "ss_tag_frequency" in meta:
                try:
                    tf = meta["ss_tag_frequency"]
                    if isinstance(tf, str):
                        tf = json.loads(tf)
                    if isinstance(tf, dict):
                        merged_counts = {}
                        for _, tag_dict in tf.items():
                            if isinstance(tag_dict, dict):
                                for tag, count in tag_dict.items():
                                    merged_counts[tag] = merged_counts.get(tag, 0) + int(count)
                        if merged_counts:
                            sorted_tags = sorted(merged_counts.items(), key=lambda x: x[1], reverse=True)
                            if sorted_tags:
                                top_tag = sorted_tags[0][0]
                                if len(top_tag) > 2 and not top_tag.isdigit():
                                    tags.append(top_tag)
                except Exception:
                    pass

        return list(dict.fromkeys(tags))

    def scan_all(self, force: bool = False) -> Dict[str, Dict[str, Any]]:
        now = time.time()
        if not force and self._cache and (now - self._last_scan_time < self._cache_ttl):
            return self._cache

        result: Dict[str, Dict[str, Any]] = {}
        dirs = self.get_search_directories()

        for search_dir in dirs:
            if not os.path.isdir(search_dir):
                continue
            for root, _, files in os.walk(search_dir):
                for file in files:
                    ext = os.path.splitext(file)[1].lower()
                    if ext in [".safetensors", ".pt", ".ckpt"]:
                        name_without_ext = os.path.splitext(file)[0]
                        full_file_path = os.path.join(root, file)
                        full_path_without_ext = os.path.join(root, name_without_ext)
                        rel_path_without_ext = os.path.relpath(full_path_without_ext, search_dir).replace("\\", "/")

                        tags = self._extract_tags_from_file(full_file_path, full_path_without_ext)
                        
                        entry = {
                            "name": name_without_ext,
                            "rel_name": rel_path_without_ext,
                            "tags": tags,
                        }

                        result[name_without_ext] = entry
                        result[rel_path_without_ext] = entry
                        result[name_without_ext.lower()] = entry
                        result[rel_path_without_ext.lower()] = entry

        self._cache = result
        self._last_scan_time = now
        return result

    def get_tags_for_lora(self, name: str) -> List[str]:
        all_tags = self.scan_all()
        clean_name = name.strip().replace("\\", "/")
        if clean_name in all_tags:
            return all_tags[clean_name]["tags"]
        if clean_name.lower() in all_tags:
            return all_tags[clean_name.lower()]["tags"]

        base_name = os.path.basename(clean_name)
        if base_name in all_tags:
            return all_tags[base_name]["tags"]
        if base_name.lower() in all_tags:
            return all_tags[base_name.lower()]["tags"]

        return []
