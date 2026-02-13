import json
import io
from PIL import Image
from services.gemini_client import gemini_client

class CleanlinessAnalysisService:
    
    PROMPT_TEMPLATE = """Compare these two images carefully.

The FIRST image is BEFORE cleaning.
The SECOND image is AFTER cleaning.

Analyze the cleanliness level and improvement:

1. Rate the cleanliness of the AFTER image on a scale from 0 to 100
   - 0-20: Very dirty
   - 21-40: Dirty
   - 41-60: Moderately clean
   - 61-80: Clean
   - 81-100: Very clean

2. Calculate the improvement percentage by comparing BEFORE and AFTER images

3. Provide detailed analysis of what changed

You MUST return ONLY valid JSON in exactly this format (no markdown, no code blocks, no additional text):

{
  "score": 85,
  "improvement": 45,
  "analysis": "detailed analysis of the cleanliness improvements observed, comparing before and after states",
  "summary": "brief summary of the overall cleanliness assessment and improvement"
}

Return ONLY the JSON object, nothing else."""

    @staticmethod
    def analyze_cleanliness(before_image_bytes: bytes, after_image_bytes: bytes) -> dict:
        """
        Analyze cleanliness by comparing before and after images
        
        Args:
            before_image_bytes: Before cleaning image bytes
            after_image_bytes: After cleaning image bytes
            
        Returns:
            Dictionary with cleanliness analysis results
        """
        try:
            # Convert bytes to PIL Images
            before_image = Image.open(io.BytesIO(before_image_bytes))
            after_image = Image.open(io.BytesIO(after_image_bytes))
            
            # Generate analysis using Gemini with both images
            response_text = gemini_client.generate_content(
                CleanlinessAnalysisService.PROMPT_TEMPLATE,
                images=[before_image, after_image]
            )
            
            # Clean response text
            response_text = response_text.strip()
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # Parse JSON response
            try:
                result = json.loads(response_text)
            except json.JSONDecodeError as e:
                # If parsing fails, try to extract JSON from response
                import re
                json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    raise ValueError(f"Invalid JSON response from Gemini: {response_text[:200]}")
            
            # Validate required fields
            required_fields = ["score", "improvement", "analysis", "summary"]
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing required field: {field}")
            
            # Ensure numeric fields are numbers
            result["score"] = float(result["score"])
            result["improvement"] = float(result["improvement"])
            
            # Ensure score is within valid range
            result["score"] = max(0, min(100, result["score"]))
            
            return result
            
        except Exception as e:
            raise Exception(f"Cleanliness analysis error: {str(e)}")

cleanliness_analysis_service = CleanlinessAnalysisService()
