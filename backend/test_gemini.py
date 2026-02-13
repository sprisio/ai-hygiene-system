#!/usr/bin/env python3
"""
Test script to verify Gemini API connection and available models
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 60)
print("GEMINI API CONNECTION TEST")
print("=" * 60)

# Check API key
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("❌ ERROR: GEMINI_API_KEY not found in .env file")
    print("\nPlease:")
    print("1. Create a .env file in the backend directory")
    print("2. Add your API key: GEMINI_API_KEY=your_key_here")
    print("3. Get a free key from: https://makersuite.google.com/app/apikey")
    sys.exit(1)

print(f"✅ API Key found: {api_key[:10]}...{api_key[-4:]}")
print()

# Try to import and configure
try:
    import google.generativeai as genai
    print("✅ google.generativeai package imported successfully")
except ImportError as e:
    print("❌ ERROR: Could not import google.generativeai")
    print(f"   {e}")
    print("\nPlease run: pip install google-generativeai==0.8.0")
    sys.exit(1)

# Configure API
try:
    genai.configure(api_key=api_key)
    print("✅ Gemini API configured successfully")
except Exception as e:
    print(f"❌ ERROR configuring API: {e}")
    sys.exit(1)

print()
print("-" * 60)
print("AVAILABLE MODELS")
print("-" * 60)

# List available models
try:
    models = list(genai.list_models())
    if not models:
        print("⚠️  No models found. Check your API key permissions.")
    else:
        print(f"\nFound {len(models)} models:\n")
        for model in models:
            supports_vision = 'generateContent' in model.supported_generation_methods
            vision_mark = "📸" if supports_vision else "💬"
            print(f"{vision_mark} {model.name}")
            if hasattr(model, 'display_name'):
                print(f"   Display: {model.display_name}")
            print(f"   Methods: {', '.join(model.supported_generation_methods)}")
            print()
except Exception as e:
    print(f"❌ ERROR listing models: {e}")
    print("\nThis might mean:")
    print("- Your API key is invalid")
    print("- You don't have access to the Gemini API")
    print("- There's a network issue")
    sys.exit(1)

print("-" * 60)
print("TESTING MODEL")
print("-" * 60)

# Test models in priority order (updated for 2025)
test_models = [
    'gemini-2.5-flash',      # Latest fast model
    'gemini-2.5-pro',        # Latest pro model
    'gemini-2.0-flash',      # Stable 2.0 flash
    'gemini-flash-latest',   # Always points to latest
    'gemini-pro-latest',     # Always points to latest pro
    'gemini-1.5-pro',        # Legacy (may not be available)
    'gemini-1.5-flash',      # Legacy (may not be available)
]

working_model = None

for model_name in test_models:
    try:
        print(f"\nTrying {model_name}...")
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Say 'Hello, this is a test!'")
        print(f"✅ {model_name} works!")
        print(f"   Response: {response.text[:50]}...")
        working_model = model_name
        break
    except Exception as e:
        print(f"❌ {model_name} failed: {str(e)[:100]}")

print()
print("=" * 60)
print("RESULTS")
print("=" * 60)

if working_model:
    print(f"\n✅ SUCCESS! Working model: {working_model}")
    print(f"\nRecommended configuration:")
    print(f"   Edit backend/services/gemini_client.py")
    print(f"   Change line 12 to:")
    print(f"   self.model = genai.GenerativeModel('{working_model}')")
    
    # Test with image capability
    print(f"\n🔍 Testing vision capability...")
    try:
        from PIL import Image
        import io
        
        # Create a simple test image
        img = Image.new('RGB', (100, 100), color='red')
        
        model = genai.GenerativeModel(working_model)
        response = model.generate_content(["What color is this?", img])
        print(f"✅ Vision works! Response: {response.text[:50]}")
    except Exception as e:
        print(f"⚠️  Vision test failed: {str(e)[:100]}")
        print(f"   You may need a vision-capable model like gemini-1.5-pro")
else:
    print("\n❌ No working model found!")
    print("\nTroubleshooting steps:")
    print("1. Verify your API key is correct")
    print("2. Check if you have API access at: https://makersuite.google.com/")
    print("3. Try creating a new API key")
    print("4. Check Google AI Studio for any service issues")

print("\n" + "=" * 60)
print("For more help, see GEMINI_TROUBLESHOOTING.md")
print("=" * 60)
