import requests
import os

# DigitalOcean Gradient AI configuration
GRADIENT_ACCESS_TOKEN = os.getenv("GRADIENT_ACCESS_TOKEN")
GRADIENT_WORKSPACE_ID = os.getenv("GRADIENT_WORKSPACE_ID")
GRADIENT_MODEL_ID = os.getenv("GRADIENT_MODEL_ID", "your-model-id")  # Replace with your actual model ID

def ask_ai(prompt: str):
    if not GRADIENT_ACCESS_TOKEN or not GRADIENT_WORKSPACE_ID:
        return {"error": "Gradient AI credentials not set. Please set GRADIENT_ACCESS_TOKEN and GRADIENT_WORKSPACE_ID environment variables."}

    url = f"https://api.gradient.ai/api/workspaces/{GRADIENT_WORKSPACE_ID}/models/{GRADIENT_MODEL_ID}/complete"

    headers = {
        "Authorization": f"Bearer {GRADIENT_ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    payload = {
        "query": prompt,
        "maxGeneratedTokenCount": 500
    }

    try:
        response = requests.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            result = response.json()
            return result.get("generatedOutput", "No response generated")
        else:
            return {"error": f"API request failed: {response.status_code}", "details": response.text}
    except Exception as e:
        return {"error": f"Request failed: {str(e)}"}