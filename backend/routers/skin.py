from fastapi import APIRouter, UploadFile, File, HTTPException
from services.skin_service import skin_analysis_service

router = APIRouter(
    prefix="/api/skin",
    tags=["skin"]
)

@router.post("/analyze")
async def analyze_skin(image: UploadFile = File(...)):
    """
    Analyze skin condition from uploaded image
    
    Args:
        image: Uploaded image file
        
    Returns:
        JSON with skin analysis results
    """
    try:
        # Validate file type
        if not image.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="File must be an image"
            )
        
        # Read image bytes
        image_bytes = await image.read()
        
        if len(image_bytes) == 0:
            raise HTTPException(
                status_code=400,
                detail="Empty image file"
            )
        
        # Perform analysis
        result = skin_analysis_service.analyze_skin(image_bytes)
        
        return {
            "success": True,
            "data": result
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )
