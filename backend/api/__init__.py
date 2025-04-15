import importlib

from fastapi import APIRouter

router = APIRouter()

module_list = [
    "api.data_v1",
    "api.ai_v1",
]

for module_path in module_list:
    module = importlib.import_module(module_path)
    if hasattr(module, "router"):
        router.include_router(module.router)
