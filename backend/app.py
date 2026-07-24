import uvicorn
import os

if __name__ == "__main__":
    # Hugging Face Spaces expects the app to run on port 7860 by default.
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
