import json
import io
from PIL import Image
from services.gemini_client import gemini_client

class SkinAnalysisService:
    
    PROMPT_TEMPLATE = """Analyze this skin image carefully.

Classify the skin condition strictly into ONE of these categories:
- Acne
- Eczema
- Psoriasis
- Fungal Infection
- Normal

Provide a detailed analysis with confidence level and severity rating.

You MUST return ONLY valid JSON in exactly this format (no markdown, no code blocks, no additional text):

{
  "condition": "one of: Acne, Eczema, Psoriasis, Fungal Infection, Normal",
  "confidence": 85,
  "severity": "one of: Low, Moderate, High",
  "analysis": "detailed analysis of the skin condition observed",
  "recommendation": "recommendations including: This is an AI-based preliminary screening tool and not a medical diagnosis. Please consult a healthcare professional for proper diagnosis and treatment."
}

Return ONLY the JSON object, nothing else."""

    @staticmethod
    def analyze_skin(image_bytes: bytes) -> dict:
        """
        Analyze skin condition from image
        
        Args:
            image_bytes: Image file bytes
            
        Returns:
            Dictionary with analysis results
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Generate analysis using Gemini
            response_text = gemini_client.generate_content(
                SkinAnalysisService.PROMPT_TEMPLATE,
                images=image
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
            required_fields = ["condition", "confidence", "severity", "analysis", "recommendation"]
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing required field: {field}")
            
            # Ensure confidence is a number
            result["confidence"] = float(result["confidence"])
            
            return result
            
        except Exception as e:
            raise Exception(f"Skin analysis error: {str(e)}")

skin_analysis_service = SkinAnalysisService()
