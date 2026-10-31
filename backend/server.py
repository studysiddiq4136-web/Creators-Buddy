from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from post_generator import generate_post, generate_hashtags
from few_shot import FewShotPosts

app = FastAPI(title="Creator's Buddy API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PostRequest(BaseModel):
    topic: str
    length: str
    language: str
    platform: Optional[str] = "LinkedIn"

class HashtagRequest(BaseModel):
    post: str
    platform: Optional[str] = "LinkedIn"
    topic: Optional[str] = ""

@app.get("/tags")
async def get_tags():
    try:
        fs = FewShotPosts()
        tags = fs.get_tags()
        return {"tags": tags}
    except Exception as e:
        print(f"[Error in /tags]: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate")
async def generate(request: PostRequest):
    try:
        if not request.topic or not request.topic.strip():
            raise HTTPException(status_code=400, detail="Topic is required")
        platform = request.platform or "LinkedIn"
        post = generate_post(request.length, request.language, request.topic, platform=platform)
        return {
            "post": post,
            "platform": platform,
            "topic": request.topic,
            "length": request.length,
            "language": request.language
        }
    except Exception as e:
        print(f"[Error in /generate]: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-hashtags")
async def generate_hashtags_endpoint(request: HashtagRequest):
    try:
        if not request.post or not request.post.strip():
            raise HTTPException(status_code=400, detail="Post content is required to generate hashtags")
        platform = request.platform or "LinkedIn"
        hashtags = generate_hashtags(request.post, platform=platform, topic=request.topic or "")
        return {
            "hashtags": hashtags,
            "platform": platform
        }
    except Exception as e:
        print(f"[Error in /generate-hashtags]: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
