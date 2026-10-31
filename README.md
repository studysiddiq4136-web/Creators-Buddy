# Creator’s Buddy – AI-Powered Content Generation Platform

> **“Your AI-Powered Social Media Content Partner”**

Creator’s Buddy helps creators, founders, and professionals generate high-engagement social media posts and targeted hashtags tailored for **LinkedIn**, **Instagram**, and **Twitter (X)**.

---

## ✨ Features

- **Multi-Platform Adaptation**:
  - **LinkedIn**: Professional, thought-provoking insights with structured paragraphs and takeaways.
  - **Instagram**: Engaging captions, storytelling, emojis, and call-to-actions.
  - **Twitter (X)**: Concise, punchy, high-signal tweets and thread-style hooks.
- **Tone & Length Customization**: Flexible tone/topic selection, length (Short, Medium, Long), and language (English, Hinglish).
- **AI Hashtag Generator**: Generates 10–15 platform-optimized, non-repetitive hashtags directly based on your generated post.
- **One-Click Copy & Regenerate**: Copy individual hashtag chips, copy all hashtags, or regenerate posts and hashtags instantly.
- **Modern Dark UI**: Deep navy background with animated constellation backdrop, glassmorphism cards, and platform-specific preview cards.

---

## 🛠️ Tech Stack & Architecture

- **Backend**: Python, FastAPI, Uvicorn, LangChain, Groq API (LLM integration), Pydantic.
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Alternative Standalone UI**: Streamlit (`main.py`).

---

## 🚀 How to Run the Project

### 1. Set Up Environment Variables
Create a `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Run Backend (FastAPI)
```bash
cd backend
python server.py
# Server runs on http://localhost:8000
```

### 3. Run Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### (Optional) Run Standalone Streamlit App
```bash
streamlit run main.py
```
