import os

import google.generativeai as genai
from env_load import DUMMY_DATA
from fastapi import APIRouter, Form, HTTPException
from utils.summary import BuildSummary

router = APIRouter(prefix="/v1")


@router.post("/ai")
async def post(question: str = Form(...)):
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
