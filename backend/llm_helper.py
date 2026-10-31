from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv
import sys

load_dotenv()

# Read API key from .env (see README.md)
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    sys.exit("Missing GROQ_API_KEY in .env. Create a .env with GROQ_API_KEY=<your_api_key> as per README.md")

llm = ChatGroq(groq_api_key=GROQ_API_KEY, model_name="openai/gpt-oss-120b")


if __name__ == "__main__":
    response = llm.invoke("Two most important ingredient in samosa are ")
    print(response.content)





