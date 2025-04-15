import json
import os

from dotenv import load_dotenv

load_dotenv()
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
API_KEY = os.getenv("API_KEY")
with open(f"{ROOT_DIR}/dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)
