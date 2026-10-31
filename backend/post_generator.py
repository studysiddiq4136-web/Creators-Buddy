from llm_helper import llm
from few_shot import FewShotPosts
import json
import re

few_shot = FewShotPosts()


def get_length_str(length, platform="LinkedIn"):
    if platform in ["Twitter (X)", "Twitter"]:
        if length == "Short":
            return "Single punchy tweet (strictly under 240 characters)"
        if length == "Medium":
            return "2 to 3 concise tweets or a short mini-thread (under 400 characters total)"
        if length == "Long":
            return "A structured thread of 4 to 5 concise, high-signal tweets"
    elif platform == "Instagram":
        if length == "Short":
            return "1 to 4 punchy lines with a call to action"
        if length == "Medium":
            return "5 to 9 engaging lines with emojis and spaced paragraphs"
        if length == "Long":
            return "10 to 15 rich storytelling lines with hook, value points, and engagement CTA"
    else:  # LinkedIn
        if length == "Short":
            return "1 to 5 lines"
        if length == "Medium":
            return "6 to 10 lines"
        if length == "Long":
            return "11 to 15 lines"
    return "6 to 10 lines"


def generate_post(length, language, tag, platform="LinkedIn"):
    prompt = get_prompt(length, language, tag, platform)
    response = llm.invoke(prompt)
    return response.content.strip()


def get_prompt(length, language, tag, platform="LinkedIn"):
    length_str = get_length_str(length, platform)

    platform_guidelines = {
        "LinkedIn": (
            "Platform: LinkedIn\n"
            "- Professional, insightful, and thought-provoking tone.\n"
            "- Focus on industry insights, professional lessons, and career growth.\n"
            "- Use clean formatting with line breaks, bold hooks, and a professional takeaway."
        ),
        "Instagram": (
            "Platform: Instagram\n"
            "- Engaging, creative, and scroll-stopping caption tone.\n"
            "- Use short, punchy paragraphs with tasteful emojis.\n"
            "- Include a clear audience call-to-action (e.g., 'Save this post', 'Drop your thoughts below')."
        ),
        "Twitter (X)": (
            "Platform: Twitter (X)\n"
            "- Concise, impactful, and conversational tone.\n"
            "- Strong opening hook, short sentences, and zero filler words.\n"
            "- Keep within character constraints and make every word count."
        )
    }

    guidelines = platform_guidelines.get(platform, platform_guidelines["LinkedIn"])

    prompt = f'''
Generate a high-performing {platform} post using the below information. No preamble, no introductory text, no quotes. Output ONLY the post content.

1) Platform: {platform}
2) Topic: {tag}
3) Length: {length_str}
4) Language: {language}
If Language is Hinglish, write in an engaging mix of Hindi and English using the English alphabet.

Platform Guidelines:
{guidelines}
'''

    # For LinkedIn, guide the style with few-shot influencer examples
    if platform == "LinkedIn":
        examples = few_shot.get_filtered_posts(length, language, tag)
        if len(examples) > 0:
            prompt += "\n5) Use the writing style as per the following reference examples:"
            for i, post in enumerate(examples):
                post_text = post['text']
                prompt += f'\n\n Example {i+1}: \n\n {post_text}'
                if i == 1:  # Use max two samples
                    break

    return prompt


def generate_hashtags(post_content, platform="LinkedIn", topic=""):
    platform_notes = {
        "LinkedIn": "Generate professional, career-oriented, and industry-relevant hashtags (e.g., #CareerGrowth #Technology #Leadership).",
        "Instagram": "Generate creative, trending, and community-focused hashtags (e.g., #TechCommunity #DigitalCreator #InspirationDaily).",
        "Twitter (X)": "Generate concise, high-visibility, and trending hashtags (e.g., #AI #Tech #Innovation)."
    }

    instructions = platform_notes.get(platform, platform_notes["LinkedIn"])

    prompt = f'''
You are an expert social media strategist for {platform}.
Analyze the post content and topic below to generate 10 to 15 highly relevant, non-repetitive hashtags.

Platform: {platform}
Topic: {topic}
Post Content:
\"\"\"
{post_content}
\"\"\"

Guidelines:
- {instructions}
- Generate approximately 10 to 15 relevant hashtags.
- Each tag must start with '#'.
- Avoid irrelevant, spammy, or repetitive hashtags.
- Return ONLY a JSON array of strings, for example: [\"#Tag1\", \"#Tag2\", \"#Tag3\"].
- Do NOT output any markdown, code blocks, or extra text.
'''

    response = llm.invoke(prompt)
    raw = response.content.strip()

    # Attempt to extract JSON array
    try:
        match = re.search(r'\[\s*".*?"\s*\]', raw, re.DOTALL)
        if match:
            tags = json.loads(match.group(0))
            if isinstance(tags, list):
                cleaned = [f"#{t.lstrip('#').strip()}" for t in tags if isinstance(t, str) and t.strip()]
                if cleaned:
                    return cleaned[:15]
    except Exception:
        pass

    # Fallback to regex finding #word
    tags = re.findall(r'#\w+', raw)
    if tags:
        seen = set()
        deduped = []
        for t in tags:
            lower = t.lower()
            if lower not in seen:
                seen.add(lower)
                deduped.append(t)
        return deduped[:15]

    # Default fallback
    base = [topic, platform, "CreatorsBuddy", "SocialMedia", "Growth"]
    return [f"#{b.replace(' ', '')}" for b in base if b]


if __name__ == "__main__":
    print(generate_post("Medium", "English", "Mental Health", platform="Instagram"))
    print("\nHashtags:\n", generate_hashtags("Take a break and recharge.", platform="Instagram", topic="Mental Health"))