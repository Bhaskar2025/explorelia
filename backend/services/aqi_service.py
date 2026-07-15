import requests
from config import WAQI_TOKEN, WAQI_BASE_URL

def fetch_aqi(city: str) -> dict:
    """
    Calls the WAQI API and returns the AQI as an integer.
    Raises RuntimeError on any failure.
    """
    url = f"{WAQI_BASE_URL}/{city}/?token={WAQI_TOKEN}"
    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        if data.get("status") != "ok":
            raise RuntimeError(f"WAQI returned error: {data}")
        return (data)
    except Exception as e:
        raise RuntimeError(f"Failed to fetch AQI for {city}: {e}")
