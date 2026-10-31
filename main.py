import streamlit as st
import sys
import os

# Ensure backend directory is in path for imports
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from few_shot import FewShotPosts
from post_generator import generate_post, generate_hashtags

# Page configuration
st.set_page_config(page_title="Creator’s Buddy – AI-Powered Content Platform", page_icon="✨", layout="centered")

# Custom CSS for dark navy theme and glassmorphism
st.markdown("""
<style>
    .stApp {
        background: radial-gradient(circle at 50% 10%, #1e1b4b 0%, #0b0f19 80%);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        color: #f1f5f9;
    }

    /* Glassmorphism Card Style */
    .glass-card {
        background: rgba(15, 23, 42, 0.75);
        box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 24px;
        margin-bottom: 24px;
        color: white;
    }

    /* Title Style */
    h1 {
        color: #ffffff !important;
        font-weight: 800;
        text-align: center;
        margin-bottom: 0px !important;
    }
    
    .tagline {
        text-align: center;
        color: #94a3b8;
        font-size: 1rem;
        margin-bottom: 24px;
        font-weight: 500;
    }

    /* Selectbox Labels */
    .stSelectbox label {
        color: #cbd5e1 !important;
        font-weight: 600;
        font-size: 0.95rem;
    }

    /* Buttons */
    .stButton > button {
        background: linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #9333ea 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 12px;
        font-weight: 700;
        width: 100%;
        transition: all 0.2s ease;
        box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.39);
    }

    .stButton > button:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px 0 rgba(99, 102, 241, 0.5);
    }
    
    /* Result Area */
    .result-area {
        background: #0f172a;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 14px;
        border: 1px solid #1e293b;
        border-left: 4px solid #6366f1;
        font-size: 1.05rem;
        line-height: 1.7;
        white-space: pre-wrap;
    }

    /* Hashtag Chip */
    .hashtag-chip {
        display: inline-block;
        background: rgba(147, 51, 234, 0.15);
        color: #d8b4fe;
        border: 1px solid rgba(147, 51, 234, 0.3);
        border-radius: 8px;
        padding: 4px 10px;
        margin: 4px 4px 4px 0;
        font-size: 0.85rem;
        font-weight: 500;
    }
</style>
""", unsafe_allow_html=True)

platform_options = ["LinkedIn", "Instagram", "Twitter (X)"]
length_options = ["Short", "Medium", "Long"]
language_options = ["English", "Hinglish"]

def main():
    st.markdown("<h1>✨ Creator’s Buddy</h1>", unsafe_allow_html=True)
    st.markdown('<p class="tagline">“Your AI-Powered Social Media Content Partner”</p>', unsafe_allow_html=True)

    if 'generated_post' not in st.session_state:
        st.session_state['generated_post'] = None
    if 'current_platform' not in st.session_state:
        st.session_state['current_platform'] = "LinkedIn"
    if 'current_topic' not in st.session_state:
        st.session_state['current_topic'] = ""
    if 'generated_hashtags' not in st.session_state:
        st.session_state['generated_hashtags'] = None

    # Form in Glass Card
    st.markdown('<div class="glass-card">', unsafe_allow_html=True)
    
    fs = FewShotPosts(file_path=os.path.join(backend_dir, "data", "processed_posts.json"))
    tags = fs.get_tags()

    # 1. Topic / Tone
    selected_tag = st.selectbox("Topic / Tone", options=tags)

    # 2. Platform
    selected_platform = st.selectbox("Platform", options=platform_options)

    # 3. Length & Language
    col1, col2 = st.columns(2)
    with col1:
        selected_length = st.selectbox("Length", options=length_options)
    with col2:
        selected_language = st.selectbox("Language", options=language_options)
        
    st.markdown('</div>', unsafe_allow_html=True)

    # Generate Button
    if st.button("✨ Generate Post"):
        with st.spinner(f"Crafting your {selected_platform} post..."):
            try:
                post = generate_post(selected_length, selected_language, selected_tag, platform=selected_platform)
                st.session_state['generated_post'] = post
                st.session_state['current_platform'] = selected_platform
                st.session_state['current_topic'] = selected_tag
                st.session_state['generated_hashtags'] = None  # Reset hashtags for new post
            except Exception as e:
                st.error(f"An error occurred: {e}")

    # Result Section
    if st.session_state['generated_post']:
        st.markdown(f"### 📱 {st.session_state['current_platform']} Post Preview")
        st.markdown(f'<div class="result-area">{st.session_state["generated_post"]}</div>', unsafe_allow_html=True)

        st.markdown("---")

        # Hashtag Generator Section
        st.markdown(f"### #️⃣ AI Hashtag Generator ({st.session_state['current_platform']})")
        st.write("Generate high-reach, platform-tailored hashtags for this post.")

        col_h1, col_h2 = st.columns([1, 1])
        with col_h1:
            if st.button("Generate Hashtags ✨"):
                with st.spinner("Analyzing post & extracting hashtags..."):
                    try:
                        tags_res = generate_hashtags(
                            st.session_state['generated_post'],
                            platform=st.session_state['current_platform'],
                            topic=st.session_state['current_topic']
                        )
                        st.session_state['generated_hashtags'] = tags_res
                    except Exception as e:
                        st.error(f"Error generating hashtags: {e}")

        if st.session_state['generated_hashtags']:
            tags_html = "".join([f'<span class="hashtag-chip">{tag}</span>' for tag in st.session_state['generated_hashtags']])
            st.markdown(f'<div style="margin: 12px 0;">{tags_html}</div>', unsafe_allow_html=True)
            
            # Copy all helper
            all_tags_str = " ".join(st.session_state['generated_hashtags'])
            st.code(all_tags_str, language="")

if __name__ == "__main__":
    main()
