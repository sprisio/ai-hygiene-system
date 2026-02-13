# 🚀 QUICK START GUIDE

## Get Your Google Gemini API Key (FREE)

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your API key

## Backend Setup (5 minutes)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=paste_your_key_here" > .env

# Run server
uvicorn main:app --reload
```

✅ Backend running at http://localhost:8000

## Frontend Setup (2 minutes)

Open a NEW terminal:

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

✅ Frontend running at http://localhost:3000

## Test the Application

1. Open browser: http://localhost:3000
2. Click "Skin Analysis"
3. Upload any skin image
4. Click "Analyze Skin"
5. View AI results!

## Need Help?

**Backend not starting?**
- Check if Python 3.11+ is installed: `python --version`
- Verify API key is in `.env` file
- Try: `pip install -r requirements.txt --upgrade`

**Frontend not starting?**
- Check if Node.js 18+ is installed: `node --version`
- Try: `rm -rf node_modules && npm install`

**API errors?**
- Ensure backend is running on port 8000
- Check `.env` file has correct API key
- Verify no spaces in GEMINI_API_KEY=your_key

---

That's it! Your AI Hygiene & Health Intelligence System is ready! 🎉
