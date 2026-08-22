import json
import os
from google import genai

MAX_INPUT_CHARS = 30000

LENGTH_INSTRUCTIONS = {
    "short": "Write a concise summary in about 3 sentences.",
    "medium": "Write a summary in about 2 short paragraphs.",
    "long": "Write a detailed, thorough summary covering all major points.",
}


def summarize(text: str, length: str) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not set. Check your .env file.")

    client = genai.Client(api_key=api_key)

    if length not in LENGTH_INSTRUCTIONS:
        length = "medium"

    truncated = text[:MAX_INPUT_CHARS]

    prompt = f"""You are summarizing a document for someone who hasn't read it.

{LENGTH_INSTRUCTIONS[length]}
Also list 3-6 key points as short, standalone phrases.

Respond ONLY with valid JSON in exactly this shape, no markdown, no extra text:
{{"summary": "...", "key_points": ["...", "..."]}}

Document text:
\"\"\"
{truncated}
\"\"\"
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )
    raw = response.text.strip()

    cleaned = raw.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(cleaned)
        return {
            "summary": parsed.get("summary", "").strip(),
            "key_points": parsed.get("key_points", []),
        }
    except json.JSONDecodeError:
        return {"summary": cleaned, "key_points": []}