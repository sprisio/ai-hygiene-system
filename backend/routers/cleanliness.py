from fastapi import APIRouter, UploadFile, File, HTTPException
from services.cleanliness_service import cleanliness_analysis_service

router = APIRouter(
    prefix="/api/cleanliness",
    tags=["cleanliness"]
)

@router.post("/analyze")
async def analyze_cleanliness(
    before_image: UploadFile = File(...),
    after_image: UploadFile = File(...)
):
    """
    Analyze cleanliness by comparing before and after images
    
    Args:
        before_image: Image before cleaning
        after_image: Image after cleaning
        
    Returns:
        JSON with cleanliness analysis results
    """
    try:
        # Validate file types
        if not before_image.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="Before image must be an image file"
            )
        
        if not after_image.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="After image must be an image file"
            )
        
        # Read image bytes
        before_bytes = await before_image.read()
        after_bytes = await after_image.read()
        
        if len(before_bytes) == 0:
            raise HTTPException(
                status_code=400,
                detail="Before image file is empty"
            )
        
        if len(after_bytes) == 0:
            raise HTTPException(
                status_code=400,
                detail="After image file is empty"
            )
        
        # Perform analysis
        result = cleanliness_analysis_service.analyze_cleanliness(
            before_bytes,
            after_bytes
        )
        
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
