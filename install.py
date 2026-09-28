"""Optional dependency: nvidia-ml-py, for GPU load and temperature in the
system monitor. Pure Python (it loads NVIDIA's own driver library), a few
hundred kilobytes; harmless on machines without an NVIDIA GPU."""

import launch

if not launch.is_installed("pynvml"):
    try:
        launch.run_pip("install nvidia-ml-py", "nvidia-ml-py for the Lobe Theme system monitor")
    except Exception as e:  # never block the WebUI over a monitor
        print(f"[Lobe Theme] could not install nvidia-ml-py ({e}); GPU load and temperature will be hidden.")
