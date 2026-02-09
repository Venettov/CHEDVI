import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail  # <--- Ensure this is imported
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# --- DATABASE CONFIGURATION ---
database_url = os.environ.get("DATABASE_URL")

if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

if not database_url:
    logging.warning("⚠️ No DATABASE_URL found. Using local sqlite:///chedvi.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///chedvi.db"
else:
    logging.info("✅ Connected to Production Database (Neon).")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url

app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# --- EMAIL CONFIGURATION (FIXED) ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')

# FIX: Remove spaces from the App Password if they exist
mail_password = os.environ.get('MAIL_PASSWORD')
if mail_password:
    mail_password = mail_password.replace(' ', '') # Removes spaces: 'abcd efgh' -> 'abcdefgh'
app.config['MAIL_PASSWORD'] = mail_password

app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')

# Initialize Extensions
db.init_app(app)
mail = Mail(app) 

with app.app_context():
    import models
    db.create_all()

# Import routes
from routes import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)