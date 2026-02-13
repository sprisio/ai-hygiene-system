from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import skin, cleanliness

app = FastAPI(
    title="AI Hygiene & Health Intelligence System",
    description="AI-powered skin analysis and cleanliness detection system",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(skin.router)
app.include_router(cleanliness.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI Hygiene & Health Intelligence System API",
        "version": "1.0.0",
        "endpoints": {
            "skin_analysis": "/api/skin/analyze",
            "cleanliness_analysis": "/api/cleanliness/analyze"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
