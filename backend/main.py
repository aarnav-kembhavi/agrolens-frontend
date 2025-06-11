from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers import plant_health

app = FastAPI()

# CORS configuration to allow frontend to communicate with backend
origins = [
    "http://localhost",
    "http://localhost:3000",  # Your Next.js frontend origin
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(plant_health.router, prefix="/api")

@app.get("/")
async def read_root():
    return {"message": "Welcome to AgroLens Backend!"} 