from fastapi import APIRouter, UploadFile, File, HTTPException, status
from pydantic import BaseModel
import shutil
import os

router = APIRouter()

# Define response model
class PlantHealthPrediction(BaseModel):
    disease: str
    confidence: float
    treatment: str

# Create a directory to save uploaded images (optional, for demonstration)
UPLOAD_DIRECTORY = "./uploaded_images"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@router.post("/plant-health", response_model=PlantHealthPrediction)
async def analyze_plant_health(file: UploadFile = File(...)):
    """
    Accepts an image file of a plant leaf and returns a mock disease prediction.
    In a real scenario, this would integrate with a CNN/TensorFlow model.
    """
    # Save the uploaded file (optional, for verification)
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    try:
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Could not upload file: {e}")

    # --- Mock Prediction Logic (Replace with actual ML model inference) ---
    # In a real application, you would load your CNN model here,
    # preprocess the image, and run inference.
    
    # Simulate different outcomes based on filename or a random choice
    if "healthy" in file.filename.lower():
        predicted_disease = "Healthy Plant"
        confidence_score = 0.98
        recommended_treatment = "Continue good care practices."
    elif "blight" in file.filename.lower():
        predicted_disease = "Early Blight"
        confidence_score = 0.85
        recommended_treatment = "Apply copper-based fungicide; improve air circulation."
    elif "rust" in file.filename.lower():
        predicted_disease = "Rust Fungus"
        confidence_score = 0.75
        recommended_treatment = "Remove infected leaves; use fungicidal spray."
    else:
        # Default mock response for other images
        predicted_disease = "Undetermined Disease"
        confidence_score = 0.60
        recommended_treatment = "Consult a local agronomist for further diagnosis."

    return PlantHealthPrediction(
        disease=predicted_disease,
        confidence=confidence_score,
        treatment=recommended_treatment
    ) 