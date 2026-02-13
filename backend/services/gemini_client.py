import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiClient:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        # Using gemini-2.5-flash - latest fast model with vision capabilities
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def generate_content(self, prompt, images=None):
        """
        Generate content using Gemini API
        
        Args:
            prompt: Text prompt
            images: List of PIL Image objects or single PIL Image
            
        Returns:
            Generated text response
        """
        try:
            if images:
                if not isinstance(images, list):
                    images = [images]
                content = [prompt] + images
                response = self.model.generate_content(content)
            else:
                response = self.model.generate_content(prompt)
            
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")

gemini_client = GeminiClient()
