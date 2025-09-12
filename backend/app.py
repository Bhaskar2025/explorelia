from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Allow all origins for dev; tighten in production
CORS(app)

# --- Mock data (Jaipur-focused) ---
RECOMMENDATIONS = [
    {
        "id": "amber-fort",
        "title": "Amber Fort",
        "image": "/static/amber.jpg",
        "description": "Hilltop fort with stunning architecture and panoramic views.",
        "rating": 4.7
    },
    {
        "id": "hawa-mahal",
        "title": "Hawa Mahal",
        "image": "/static/hawa.jpg",
        "description": "Iconic ‘Palace of Winds’ with intricate façade.",
        "rating": 4.6
    },
    {
        "id": "city-palace",
        "title": "City Palace",
        "image": "/static/citypalace.jpg",
        "description": "Royal residence showcasing Jaipur’s heritage.",
        "rating": 4.5
    },
    {
        "id": "jal-mahal",
        "title": "Jal Mahal",
        "image": "/static/jalmahal.jpg",
        "description": "Picturesque palace amid Man Sagar Lake.",
        "rating": 4.4
    },
    {
        "id": "nahargarh",
        "title": "Nahargarh Fort",
        "image": "/static/nahargarh.jpg",
        "description": "Sunset point overlooking the Pink City.",
        "rating": 4.5
    },
    {
        "id": "jantar-mantar",
        "title": "Jantar Mantar",
        "image": "/static/jantar.jpg",
        "description": "Astronomical instruments and UNESCO site.",
        "rating": 4.3
    }
]

@app.get("/api/recommendations")
def get_recommendations():
    user_id = request.args.get("userId", "guest")
    return jsonify({
        "userId": user_id,
        "items": RECOMMENDATIONS
    })

@app.get("/api/environmental")
def get_environmental():
    # Mock values; replace with IMD + Jaipur Smart City sensor integrations
    return jsonify({
        "location": "jaipur",
        "aqi": 92,
        "tempC": 33,
        "weather": "Sunny"
    })

@app.get("/api/user/<user_id>/milestones")
def get_user_milestones(user_id):
    return jsonify({
        "userId": user_id,
        "current": {
            "title": "Low‑Emission Explorer",
            "description": "Visited 5 attractions via low‑emission routes.",
            "progressPercent": 62
        }
    })

if __name__ == "__main__":
    # Run Flask for local dev
    app.run(host="127.0.0.1", port=5000, debug=True)
