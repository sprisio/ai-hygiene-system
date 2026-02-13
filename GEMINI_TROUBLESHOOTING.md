# 🔧 GEMINI API TROUBLESHOOTING

## Common Model Issues & Solutions

### Issue 1: Model Not Found (404 Error)

**Error Message:**
```
404 models/gemini-1.5-flash is not found for API version v1beta
```

**Solution:**
The model name has been updated to use `gemini-2.5-flash` which is the current latest fast model with vision capabilities (as of 2025).

**Available Models (2025):**

1. **gemini-2.5-flash** (Recommended - Latest fast model) ✅
2. **gemini-2.5-pro** (Latest pro model - slower but more capable)
3. **gemini-2.0-flash** (Stable 2.0 version)
4. **gemini-flash-latest** (Always points to newest flash model)
5. **gemini-pro-latest** (Always points to newest pro model)

**Legacy models (deprecated):**
- ❌ gemini-1.5-pro (no longer available)
- ❌ gemini-1.5-flash (no longer available)
- ❌ gemini-pro-vision (no longer available)

**How to change the model:**

Edit `backend/services/gemini_client.py`:

```python
# Line 15, change this:
self.model = genai.GenerativeModel('gemini-2.5-flash')

# To one of these alternatives:
self.model = genai.GenerativeModel('gemini-2.5-pro')      # More capable
self.model = genai.GenerativeModel('gemini-2.0-flash')    # Stable 2.0
self.model = genai.GenerativeModel('gemini-flash-latest') # Always latest
```

### Issue 2: API Key Invalid

**Error Message:**
```
API key not valid
```

**Solutions:**
1. Verify your API key at: https://makersuite.google.com/app/apikey
2. Create a new API key if needed
3. Ensure no extra spaces in `.env` file:
   ```
   GEMINI_API_KEY=your_key_here
   # NOT: GEMINI_API_KEY = your_key_here (spaces are bad)
   ```
4. Restart the backend server after changing `.env`

### Issue 3: Rate Limit Exceeded

**Error Message:**
```
429 Resource has been exhausted
```

**Solutions:**
1. Wait a few minutes before trying again
2. Free tier has limits - check your quota
3. Consider upgrading if you need higher limits

### Issue 4: Package Version Conflicts

**Error Message:**
```
ImportError or AttributeError
```

**Solution:**
Update to the latest package version:

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install --upgrade google-generativeai
pip install google-generativeai==0.8.0  # Or latest version
```

### Issue 5: Vision Features Not Working

**Error:**
```
Model does not support images
```

**Solution:**
Ensure you're using a vision-capable model:
- ✅ gemini-1.5-pro (supports vision)
- ✅ gemini-1.5-flash (supports vision)
- ✅ gemini-pro-vision (older, supports vision)
- ❌ gemini-pro (does NOT support vision)

## Quick Fix Commands

### Reinstall Dependencies
```bash
cd backend
pip uninstall google-generativeai -y
pip install google-generativeai==0.8.0
```

### Test Gemini Connection
Create `test_gemini.py` in backend folder:

```python
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"API Key loaded: {api_key[:10]}..." if api_key else "No API key!")

genai.configure(api_key=api_key)

# List available models
print("\nAvailable models:")
for model in genai.list_models():
    print(f"- {model.name}")
    
# Test the model
try:
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content("Say hello!")
    print(f"\nTest successful! Response: {response.text}")
except Exception as e:
    print(f"\nError: {e}")
```

Run it:
```bash
cd backend
source venv/bin/activate
python test_gemini.py
```

## Model Comparison (2025)

| Model | Vision Support | Speed | Best For |
|-------|---------------|-------|----------|
| gemini-2.5-flash | ✅ Yes | Very Fast | Production (Recommended) |
| gemini-2.5-pro | ✅ Yes | Medium | Complex analysis |
| gemini-2.0-flash | ✅ Yes | Fast | Stable alternative |
| gemini-flash-latest | ✅ Yes | Fast | Auto-updated to newest |
| gemini-pro-latest | ✅ Yes | Medium | Auto-updated pro version |

**Legacy models no longer available:**
- gemini-1.5-pro ❌
- gemini-1.5-flash ❌
- gemini-pro-vision ❌

## Current Configuration

The project is now configured to use:
- **Model:** `gemini-2.5-flash` (Latest 2025 model)
- **Package:** `google-generativeai==0.8.0`

This is the recommended configuration for 2025 and should work with current Gemini API.

## If Nothing Works

1. **Check API Status:** Visit Google AI Studio to see if there are any service issues
2. **Verify API Key:** Make sure it's a valid, active key
3. **List Models:** Run the test script above to see what models you have access to
4. **Check Region:** Some features may not be available in all regions
5. **Update Package:** Try the absolute latest version:
   ```bash
   pip install --upgrade google-generativeai
   ```

## Alternative: Use Environment Variable for Model

You can make the model configurable in `.env`:

**backend/.env:**
```
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-1.5-pro
```

**backend/services/gemini_client.py:**
```python
def __init__(self):
    api_key = os.getenv("GEMINI_API_KEY")
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")  # Default fallback
    
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key)
    self.model = genai.GenerativeModel(model_name)
```

This way you can easily switch models without changing code!

## Need More Help?

1. Check Google's official docs: https://ai.google.dev/docs
2. Visit the API reference: https://ai.google.dev/api/python/google/generativeai
3. Check your API dashboard: https://makersuite.google.com/

---

**Quick Summary:**
- Use `gemini-1.5-pro` model (already configured)
- Update package to version 0.8.0 (already in requirements.txt)
- Restart backend after any changes
- Run the test script to verify connection
