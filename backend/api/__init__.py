import importlib

from fastapi import APIRouter

router = APIRouter()

module_list = [
    "api.v1.data",
    "api.v1.ai",
]

for module_path in module_list:
    module = importlib.import_module(module_path)
    if hasattr(module, "router"):
        router.include_router(module.router)
