from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import plant_health, sensor_data

app = FastAPI()

# CORS middleware allows your frontend to communicate with this backend
origins = [
    "http://localhost",
    "http://localhost:3000",  # Common port for React frontends
    "http://localhost:8080",  # Common port for Vue frontends
    "http://localhost:4200",  # Common port for Angular frontends
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routers
app.include_router(plant_health.router, prefix="/api")
app.include_router(sensor_data.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Agrolens API"}