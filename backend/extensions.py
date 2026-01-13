from flask_sqlalchemy import SQLAlchemy

# Initialize db WITHOUT app
# This avoids circular imports
db = SQLAlchemy()
