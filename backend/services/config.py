import os
from dotenv import load_dotenv

# Load environment variables from .env in the backend directory
load_dotenv()

WAQI_TOKEN = os.getenv("WAQI_TOKEN")
if not WAQI_TOKEN:
    raise RuntimeError("WAQI_TOKEN not set in .env")

WAQI_BASE_URL = os.getenv("WAQI_BASE_URL")

OPEN_METEO_BASE_URL = os.getenv("OPEN_METEO_BASE_URL")

# Database Configuration
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "exploria")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD")

# Database connection string
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
