@echo off
echo ========================================
echo AI Hygiene System Setup (Windows)
echo ========================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed
    echo Please install Python 3.11+ from python.org
    pause
    exit /b 1
)
echo Python found!
echo.

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js 18+ from nodejs.org
    pause
    exit /b 1
)
echo Node.js found!
echo.

REM Backend setup
echo Setting up Backend...
cd backend

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo.
    echo IMPORTANT: Edit backend\.env and add your Gemini API key!
    echo Get your free key from: https://makersuite.google.com/app/apikey
    echo.
) else (
    echo .env file already exists
)

cd ..
echo Backend setup complete!
echo.

REM Frontend setup
echo Setting up Frontend...
cd frontend

echo Installing Node.js dependencies...
call npm install

cd ..
echo Frontend setup complete!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Get your FREE Gemini API key:
echo    https://makersuite.google.com/app/apikey
echo.
echo 2. Edit backend\.env and add your API key:
echo    GEMINI_API_KEY=your_api_key_here
echo.
echo 3. Start the backend (in one terminal):
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn main:app --reload
echo.
echo 4. Start the frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 5. Open your browser:
echo    http://localhost:3000
echo.
echo ========================================
pause
