"""Machine status for the system monitor in the Quick Setting sidebar.

CPU and RAM come from psutil (a WebUI requirement). GPU load, VRAM and
temperature come from NVIDIA's NVML through nvidia-ml-py when it is there
(install.py adds it); without it, VRAM still comes from torch, and load and
temperature are left out. Nothing here raises: a missing sensor is None.
"""

import os
import threading
import time

try:
    import psutil
except Exception:  # pragma: no cover - psutil is a WebUI requirement
    psutil = None

_nvml = None
_nvml_lock = threading.Lock()
_nvml_failed = False
_last = {"time": 0.0, "data": None}
_CACHE_SECONDS = 0.8     # several open tabs share one reading


def _nvml_module():
    global _nvml, _nvml_failed
    if _nvml is not None or _nvml_failed:
        return _nvml
    with _nvml_lock:
        if _nvml is None and not _nvml_failed:
            try:
                import pynvml
                pynvml.nvmlInit()
                _nvml = pynvml
            except Exception:
                _nvml_failed = True
    return _nvml


def _gpus_nvml(nv):
    out = []
    for i in range(nv.nvmlDeviceGetCount()):
        h = nv.nvmlDeviceGetHandleByIndex(i)
        name = nv.nvmlDeviceGetName(h)
        if isinstance(name, bytes):
            name = name.decode(errors="ignore")
        mem = nv.nvmlDeviceGetMemoryInfo(h)
        gpu = {"name": name, "vram_used": int(mem.used), "vram_total": int(mem.total), "util": None, "temp": None,
               "power": None, "power_limit": None}
        try:
            gpu["util"] = int(nv.nvmlDeviceGetUtilizationRates(h).gpu)
        except Exception:
            pass
        try:
            gpu["temp"] = int(nv.nvmlDeviceGetTemperature(h, nv.NVML_TEMPERATURE_GPU))
        except Exception:
            pass
        try:
            gpu["power"] = round(nv.nvmlDeviceGetPowerUsage(h) / 1000.0, 1)
            gpu["power_limit"] = round(nv.nvmlDeviceGetEnforcedPowerLimit(h) / 1000.0, 1)
        except Exception:
            pass
        out.append(gpu)
    return out


def _gpus_torch():
    try:
        import torch
    except Exception:
        return []
    out = []
    try:
        if torch.cuda.is_available():
            for i in range(torch.cuda.device_count()):
                free, total = torch.cuda.mem_get_info(i)
                out.append({"name": torch.cuda.get_device_name(i), "vram_used": int(total - free),
                            "vram_total": int(total), "util": None, "temp": None, "power": None,
                            "power_limit": None})
    except Exception:
        pass
    return out


def _disk():
    try:
        from modules import paths
        where = paths.models_path
    except Exception:
        where = os.getcwd()
    try:
        d = psutil.disk_usage(where)
        return {"used": int(d.used), "total": int(d.total)}
    except Exception:
        return None


def stats():
    now = time.time()
    if _last["data"] is not None and now - _last["time"] < _CACHE_SECONDS:
        return _last["data"]
    data = {"cpu": None, "ram": None, "swap": None, "gpus": [], "disk": None, "nvml": False}
    if psutil is not None:
        try:
            data["cpu"] = psutil.cpu_percent(interval=None)
            vm = psutil.virtual_memory()
            data["ram"] = {"used": int(vm.total - vm.available), "total": int(vm.total)}
            sw = psutil.swap_memory()
            if sw.total:
                data["swap"] = {"used": int(sw.used), "total": int(sw.total)}
        except Exception:
            pass
        data["disk"] = _disk()
    nv = _nvml_module()
    if nv is not None:
        try:
            data["gpus"] = _gpus_nvml(nv)
            data["nvml"] = True
        except Exception:
            data["gpus"] = []
    if not data["gpus"]:
        data["gpus"] = _gpus_torch()
    _last.update(time=now, data=data)
    return data
