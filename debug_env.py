from dotenv import load_dotenv
import os

load_dotenv()

key = os.getenv("GROQ_API_KEY")

if key:
    print(f"Key found: Yes")
    print(f"Length: {len(key)}")
    print(f"Starts with: {key[:4]}")
    print(f"Ends with: {key[-4:]}")
    print(f"Contains spaces: {' ' in key}")
    print(f"Contains quotes: {'\"' in key or '\'' in key}")
    print(f"Raw repr: {repr(key)}")
else:
    print("Key found: No")
