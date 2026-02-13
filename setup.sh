#!/bin/bash

echo "🚀 AI Hygiene & Health Intelligence System Setup"
echo "=================================================="
echo ""

# Check Python version
echo "Checking Python version..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11 or higher."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python $PYTHON_VERSION found"
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION found"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd backend

echo "Creating Python virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  IMPORTANT: Please edit backend/.env and add your Gemini API key!"
    echo "   Get your free API key from: https://makersuite.google.com/app/apikey"
else
    echo "✅ .env file already exists"
fi

cd ..
echo "✅ Backend setup complete!"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd frontend

echo "Installing Node.js dependencies..."
npm install

cd ..
echo "✅ Frontend setup complete!"
echo ""

# Final instructions
echo "🎉 Setup Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Get your FREE Gemini API key:"
echo "   👉 https://makersuite.google.com/app/apikey"
echo ""
echo "2. Edit backend/.env and add your API key:"
echo "   GEMINI_API_KEY=your_api_key_here"
echo ""
echo "3. Start the backend (in one terminal):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   uvicorn main:app --reload"
echo ""
echo "4. Start the frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "5. Open your browser:"
echo "   👉 http://localhost:3000"
echo ""
echo "=================================================="
