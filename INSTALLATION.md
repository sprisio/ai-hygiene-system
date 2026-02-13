# 🎯 INSTALLATION INSTRUCTIONS

## Complete AI Hygiene & Health Intelligence System

### Package Contents
- ✅ Complete FastAPI Backend
- ✅ Complete Next.js 14 Frontend  
- ✅ All Components & Services
- ✅ Automated Setup Scripts
- ✅ Comprehensive Documentation

---

## 🚀 QUICK START (3 Steps)

### Step 1: Get Your FREE Gemini API Key
1. Visit: **https://makersuite.google.com/app/apikey**
2. Click **"Create API Key"**
3. Copy the API key

### Step 2: Run Automated Setup

**For Mac/Linux:**
```bash
cd ai-hygiene-system
chmod +x setup.sh
./setup.sh
```

**For Windows:**
```bash
cd ai-hygiene-system
setup.bat
```

### Step 3: Add API Key & Start
```bash
# Edit backend/.env and add your key:
GEMINI_API_KEY=your_actual_api_key_here

# Terminal 1 - Backend
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Open: **http://localhost:3000**

---

## 📋 MANUAL INSTALLATION

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_key

# Run server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend: **http://localhost:8000**

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend: **http://localhost:3000**

---

## 🧪 VERIFY INSTALLATION

### Test Backend
```bash
curl http://localhost:8000/health
# Should return: {"status":"healthy"}
```

### Test Frontend
1. Open browser: http://localhost:3000
2. Should see landing page with 2 cards

### Test Skin Analysis
1. Click "Skin Analysis"
2. Upload any skin image
3. Click "Analyze Skin"
4. View AI results

### Test Cleanliness Analysis
1. Click "Cleanliness Analysis"
2. Upload before image
3. Upload after image
4. Click "Analyze Cleanliness"
5. View comparison results

---

## 🔧 TROUBLESHOOTING

### "ModuleNotFoundError" (Backend)
```bash
cd backend
pip install -r requirements.txt --upgrade
```

### "Module not found" (Frontend)
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### "API Key Error"
```bash
# Check .env file:
cat backend/.env
# Should show: GEMINI_API_KEY=your_actual_key
# No spaces around =
```

### "Port already in use"
```bash
# Backend - use different port:
uvicorn main:app --reload --port 8001

# Frontend - use different port:
npm run dev -- -p 3001
```

### CORS Error
- Ensure backend is running on port 8000
- Check frontend is using correct API URL
- Verify CORS is enabled in backend/main.py

---

## 📁 PROJECT STRUCTURE

```
ai-hygiene-system/
├── backend/                # FastAPI Backend
│   ├── main.py            # Main application
│   ├── requirements.txt   # Dependencies
│   ├── .env.example       # Environment template
│   ├── routers/           # API endpoints
│   └── services/          # Business logic
│
├── frontend/              # Next.js Frontend
│   ├── app/              # Pages & layouts
│   ├── components/       # Reusable components
│   └── package.json      # Dependencies
│
├── README.md             # Full documentation
├── QUICKSTART.md         # Quick guide
├── setup.sh              # Auto setup (Unix)
└── setup.bat             # Auto setup (Windows)
```

---

## 🎯 WHAT'S INCLUDED

### Backend Features
- ✅ FastAPI REST API
- ✅ Google Gemini AI integration
- ✅ Image processing
- ✅ JSON validation
- ✅ Error handling
- ✅ CORS enabled

### Frontend Features
- ✅ Next.js 14 App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Image upload
- ✅ Loading states
- ✅ Result visualization
- ✅ Responsive design

### AI Capabilities
- ✅ Skin condition detection
- ✅ Cleanliness comparison
- ✅ Confidence scoring
- ✅ Detailed analysis
- ✅ Recommendations

---

## 🌟 USAGE

### Skin Analysis
1. Click "Skin Analysis"
2. Upload skin image (JPG, PNG)
3. Click "Analyze Skin"
4. Wait for AI processing
5. View results:
   - Detected condition
   - Confidence score
   - Severity level
   - Analysis & recommendations

### Cleanliness Analysis  
1. Click "Cleanliness Analysis"
2. Upload "before" image
3. Upload "after" image
4. Click "Analyze Cleanliness"
5. Wait for AI processing
6. View results:
   - Cleanliness score
   - Improvement percentage
   - Detailed analysis
   - Summary

---

## 🔐 SECURITY NOTES

- Never commit `.env` file
- Keep API key private
- Use environment variables
- Validate all inputs
- Handle errors properly

---

## 📞 SUPPORT

### Check Documentation
1. README.md - Full guide
2. QUICKSTART.md - Quick start
3. PROJECT_SUMMARY.md - Overview

### Common Issues
- API key issues → Check .env file format
- Port conflicts → Use different ports
- Module errors → Reinstall dependencies
- CORS errors → Verify backend running

---

## ✅ CHECKLIST

Before running:
- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] Gemini API key obtained
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file configured
- [ ] Both servers running

---

## 🎉 SUCCESS!

If everything is running:
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- API Docs: http://localhost:8000/docs

**You're all set!** Start analyzing! 🚀

---

**Built with ❤️ using Next.js, FastAPI, and Google Gemini AI**
