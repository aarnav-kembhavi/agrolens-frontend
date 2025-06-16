from fastapi import APIRouter, HTTPException
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()


SUPABASE_URL="https://zxykxuzgkuvljtblymue.supabase.co"
SUPABSE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eWt4dXpna3V2bGp0Ymx5bXVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDA1MTc5MywiZXhwIjoyMDY1NjI3NzkzfQ.rCRLhp8SvknZ_h_u-F8BXgL9irKPXcnV7qjr8K2a5TY"

# Supabase setup
# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")

url = SUPABASE_URL
key = SUPABSE_KEY

# Check if the environment variables are loaded correctly
if not url or not key:
    raise RuntimeError("Supabase URL and Key must be set in the .env file")

supabase: Client = create_client(url, key)

@router.get("/sensor-data")
def get_sensor_data():
    """Fetches the latest 10 sensor data readings."""
    try:
        response = supabase.table('sensor_data').select("*").order('created_at', desc=True).limit(10).execute()
        print(response.data)
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
