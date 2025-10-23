import json
import os
from enum import Enum
from typing import Optional

import google.generativeai as genai
import uvicorn
from env_load import DUMMY_DATA
from fastapi import APIRouter, FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from utils.summary import BuildSummary

app = FastAPI()
api_v1 = APIRouter(prefix="/v1")

origins = ["https://frontend-liard-seven-59.vercel.app"]
# origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"
    ASC = "ASC"
    DESC = "DESC"


class SortBy(str, Enum):
    name = "name"
    deal_value = "deal_value"
    client_count = "client_count"


@api_v1.post("/data")
async def post_data(
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


@api_v1.get("/data")
async def get_data(id: Optional[int] = None):
    if id is not None:
        data_sales = [data for data in DUMMY_DATA["salesReps"] if data["id"] == int(id)]
        if data_sales:
            return data_sales[0]
        raise HTTPException(status_code=404, detail="ID not found")
    return DUMMY_DATA


@api_v1.post("/ai")
async def post_ai(question: str = Form(...)):
    build_summary = BuildSummary(DUMMY_DATA)
    summary = build_summary.summary()

    history = [
        {"role": "user", "parts": ["Here is the sales data of our team:"]},
        {"role": "user", "parts": [summary]},
        {
            "role": "model",
            "parts": [
                """Thanks for sharing the team data.
                    How can I help you analyze it?"""
            ],
        },
    ]

    user_question = question
    API_KEY = os.getenv("API_KEY")
    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash-lite")
    chat = model.start_chat(history=history)
    answer = None
    try:
        answer = chat.send_message(user_question)
    except Exception:
        raise HTTPException(status_code=404, detail="Gemini API Key Not Found")
    if answer and answer.text:
        return {"answer": answer.text}
    else:
        return {"answer": "You reached limit to access Gemini AI"}


@app.get("/health")
def health():
    return {"ok": True}


app.include_router(api_v1)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
