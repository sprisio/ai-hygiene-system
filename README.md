# AI Hygiene & Health Intelligence System

A production-ready full-stack application that uses Google Gemini AI for skin condition analysis and cleanliness detection.

## 🚀 Features

### Skin Analysis Module
- Upload skin images for AI-powered condition detection
- Detects: Acne, Eczema, Psoriasis, Fungal Infection, or Normal skin
- Provides confidence score, severity rating, and detailed recommendations
- Medical disclaimer included for user safety

### Cleanliness Analysis Module
- Compare before/after images to measure cleanliness improvement
- Provides cleanliness score (0-100)
- Calculates improvement percentage
- Detailed analysis and summary

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- Fully responsive design
- Modern UI with loading states and error handling

### Backend
- **FastAPI** (Python 3.11+)
- **Uvicorn** ASGI server
- **Google Gemini AI** (Vision model)
- Modular router architecture
- Service-layer pattern
- CORS enabled

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Google Gemini API Key** (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🔧 Installation & Setup

### 1. Clone or Extract the Project

```bash
cd ai-hygiene-system
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
```

**Get your Gemini API key:**
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key and paste it in the `.env` file

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start the Backend Server

```bash
cd backend

# Make sure virtual environment is activated
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

### Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend

# Run the development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

## 📱 Usage

1. Open your browser and navigate to **http://localhost:3000**
2. Choose between:
   - **Skin Analysis**: Upload a single skin image
   - **Cleanliness Analysis**: Upload before and after images
3. Click "Analyze" and wait for AI results
4. View detailed analysis with recommendations

## 📁 Project Structure

```
ai-hygiene-system/
│
├── backend/
│   ├── main.py                    # FastAPI application
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example              # Environment variables template
│   ├── routers/
│   │   ├── skin.py               # Skin analysis endpoints
│   │   └── cleanliness.py        # Cleanliness analysis endpoints
│   └── services/
│       ├── gemini_client.py      # Gemini AI client
│       ├── skin_service.py       # Skin analysis logic
│       └── cleanliness_service.py # Cleanliness analysis logic
│
└── frontend/
    ├── package.json              # Node dependencies
    ├── tailwind.config.js        # Tailwind configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── next.config.js            # Next.js configuration
    ├── tsconfig.json             # TypeScript configuration
    ├── app/
    │   ├── layout.tsx            # Root layout
    │   ├── page.tsx              # Landing page
    │   ├── globals.css           # Global styles
    │   ├── skin/
    │   │   └── page.tsx          # Skin analysis page
    │   └── cleanliness/
    │       └── page.tsx          # Cleanliness analysis page
    └── components/
        ├── Card.tsx              # Feature card component
        ├── Loader.tsx            # Loading spinner
        └── ResultCard.tsx        # Result display components
```

## 🔑 API Endpoints

### Backend API (http://localhost:8000)

- `GET /` - API information
- `GET /health` - Health check
- `POST /api/skin/analyze` - Analyze skin image
  - Form data: `image` (file)
- `POST /api/cleanliness/analyze` - Analyze cleanliness
  - Form data: `before_image` (file), `after_image` (file)

## 🎨 Features

### Frontend
- Modern, responsive UI with Tailwind CSS
- Real-time image preview
- Loading states with spinners
- Error handling and user feedback
- Gradient backgrounds and smooth animations
- Mobile-friendly design

### Backend
- Modular architecture with routers and services
- Environment-based configuration
- Comprehensive error handling
- CORS enabled for frontend communication
- JSON response validation
- Image processing with PIL

## ⚠️ Important Notes

1. **API Key Security**: Never commit your `.env` file to version control
2. **Medical Disclaimer**: This tool is for screening purposes only, not medical diagnosis
3. **Image Size**: Recommended max image size is 10MB
4. **Supported Formats**: JPG, JPEG, PNG, WEBP

## 🐛 Troubleshooting

### Gemini API Model Issues

**Error: "404 models/gemini-1.5-flash is not found"**

The project has been updated to use `gemini-1.5-pro` which is the current stable model. If you still encounter issues:

1. **Upgrade the package:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install --upgrade google-generativeai
```

2. **Run the test script:**
```bash
cd backend
python test_gemini.py
```

This will show you which models are available with your API key and test them automatically.

3. **Check the troubleshooting guide:**
See `GEMINI_TROUBLESHOOTING.md` for detailed solutions.

### Backend Issues

**ModuleNotFoundError**
```bash
pip install -r requirements.txt
```

**API Key Error**
- Verify your `.env` file contains `GEMINI_API_KEY=your_key`
- Ensure no extra spaces around the equals sign
- Check the API key is valid at Google AI Studio

**Port Already in Use**
```bash
# Use a different port
uvicorn main:app --reload --port 8001
```

### Frontend Issues

**Module Not Found**
```bash
npm install
```

**API Connection Error**
- Ensure backend is running on port 8000
- Check CORS settings in `main.py`
- Verify fetch URLs in frontend match backend port

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

## 📝 License

This project is provided as-is for educational and development purposes.

## 🤝 Contributing

This is a complete, production-ready template. Feel free to:
- Add more skin conditions
- Enhance UI/UX
- Add user authentication
- Implement result history
- Add export functionality

## 📞 Support

For issues:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure API key is correctly configured
4. Check both frontend and backend logs

---

Built with ❤️ using Next.js, FastAPI, and Google Gemini AI
