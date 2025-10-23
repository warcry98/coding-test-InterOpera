import json
from enum import Enum
from typing import Optional

from env_load import DUMMY_DATA
from fastapi import APIRouter, Form, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/v1")


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"
    ASC = "ASC"
    DESC = "DESC"


class SortBy(str, Enum):
    name = "name"
    deal_value = "deal_value"
    client_count = "client_count"


@router.post("/data")
async def post(
    id: Optional[int] = None,
    search: Optional[str] = Form(""),
    filters: Optional[str] = Form("{}"),
    order_by: Optional[str] = Form("name"),
    order_type: Optional[str] = Form("asc"),
):
    if id is not None:
        data_sales = [data for data in DUMMY_DATA["salesReps"] if data["id"] == int(id)]
        if data_sales:
            return data_sales[0]
        return JSONResponse(status_code=404, detail="ID not found")

    data = DUMMY_DATA["salesReps"]
    result = data
    if search:
        search_query = search.lower()
        result = [
            rep
            for rep in result
            if search_query in rep["name"].lower()
            or search_query in rep["role"].lower()
            or search_query in rep["region"].lower()
            or any(search_query in skill.lower() for skill in rep.get("skills", []))
            or any(search_query in deal.get("client").lower() for deal in rep.get("deals", []))
            or any(search_query in client.get("name").lower() for client in rep.get("clients", []))
        ]

    filters_dict = dict()
    try:
        filters_dict = json.loads(filters)
    except json.JSONDecodeError:
        return JSONResponse(status_code=400, content={"error": "Invalid JSON format in 'filters' field."})

    if filters_dict.get("regions") and "all" not in filters_dict.get("regions"):
        result = [rep for rep in result if rep.get("region") in filters_dict.get("regions")]

    if filters_dict.get("roles") and "all" not in filters_dict.get("roles"):
        result = [rep for rep in result if rep.get("role") in filters_dict.get("roles")]

    if filters_dict.get("dealStatuses") and "all" not in filters_dict.get("dealStatuses"):
        result = [
            rep
            for rep in result
            if any(deal["status"] in filters_dict.get("dealStatuses") for deal in rep.get("deals", []))
        ]

    def sort_key(rep):
        if order_by == "name":
            return rep["name"].lower()
        elif order_by == "deal_value":
            return sum(deal["value"] for deal in rep.get("deals", []))
        elif order_by == "client_count":
            return len(rep.get("clients", []))
        return 0

    result.sort(key=sort_key, reverse=(str(order_type).lower() != "asc"))

    return {"data": result}


@router.get("/data")
async def get(id: Optional[int] = None):
    if id is not None:
        data_sales = [data for data in DUMMY_DATA["salesReps"] if data["id"] == int(id)]
        if data_sales:
            return data_sales[0]
        raise HTTPException(status_code=404, detail="ID not found")
    return DUMMY_DATA
