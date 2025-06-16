from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

router = APIRouter()

# Define the response model to match frontend expectations for documentation
class PlantHealthResponse(BaseModel):
    prediction_class: str
    confidence: float
    remedy: str

@router.post("/predict-disease", response_model=PlantHealthResponse)
async def predict_disease(file: UploadFile = File(...)):
    """
    Accepts a plant image file and returns a mock disease prediction.
    The response structure is tailored to the frontend's requirements.
    """
    # In a real application, you would process the file with a ML model.
    # For now, we return mock data with the keys expected by the frontend.
    print(f"Received file: {file.filename}")

    # Mock logic: you could add more dynamic responses based on filename etc.
    # For example:
    # if "healthy" in file.filename.lower():
    #     return {
    #         "prediction_class": "Healthy",
    #         "confidence": 0.99,
    #         "remedy": "No treatment necessary. Keep up the good work!"
    #     }

    return {
        "prediction_class": "Tomato Late Blight",
        "confidence": 0.95,
        "remedy": "Apply a fungicide containing mancozeb or chlorothalonil. Ensure good air circulation and avoid overhead watering."
    } 