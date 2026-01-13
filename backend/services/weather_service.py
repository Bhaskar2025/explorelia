import requests
from config import OPEN_METEO_BASE_URL

def fetch_weather(lat, lon) -> dict:
    """
    Calls the Open-Meteo API and returns a dict with at least:
        {"tempC": <float>, "weather": <string>}
    Raises RuntimeError on any failure.
    """
    url = f"{OPEN_METEO_BASE_URL}?latitude={lat}&longitude={lon}&current_weather=true"
    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
        cw = data.get("current_weather")
        if not cw:
            raise RuntimeError("Open-Meteo returned no current_weather data")

        weather_code = cw.get("weathercode")
        weather_map = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            61: "Light rain",
            80: "Rain showers",
        }
        weather_desc = weather_map.get(weather_code, f"Code {weather_code}")
        return {
            "tempC": cw.get("temperature"),
            "weather": weather_desc
        }
    except Exception as e:
        raise RuntimeError(f"Failed to fetch weather for {lat} {lon}: {e}")
