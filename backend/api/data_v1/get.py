from env_load import DUMMY_DATA
from fastapi import APIRouter

router = APIRouter()


@router.get("/v1/data")
async def get():
    return DUMMY_DATA
