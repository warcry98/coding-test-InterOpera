from typing import Optional

from env_load import DUMMY_DATA
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/v1/data")
async def get(id: Optional[int] = None):
    if id is not None:
        data_sales = [data for data in DUMMY_DATA["salesReps"] if data["id"] == int(id)]
        if data_sales:
            return data_sales[0]
        raise HTTPException(status_code=404, detail="ID not found")
    return DUMMY_DATA
