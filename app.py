import os
import socket 
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# --- CRITICAL FIX: FORCE IPv4 ---
allowed_gai_family = socket.AF_INET

def _getaddrinfo_ipv4(host, port, family=0, type=0, proto=0, flags=0):
    return socket.getaddrinfo_original(host, port, allowed_gai_family, type, proto, flags)

socket.getaddrinfo_original = socket.getaddrinfo
socket.getaddrinfo = _getaddrinfo_ipv4
# --------------------------------

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)

# --- UNIFIED SECRET KEY ---
app.secret_key = os.environ.get("SECRET_KEY", "fallback-secret-key-987654321")

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

# --- EMAIL CONFIGURATION (SSL) ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465         # CHANGED: Switch to SSL Port
app.config['MAIL_USE_TLS'] = False    # CHANGED: TLS Off
app.config['MAIL_USE_SSL'] = True     # CHANGED: SSL On
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')

# Remove spaces from password if present
mail_password = os.environ.get('MAIL_PASSWORD')
if mail_password:
    app.config['MAIL_PASSWORD'] = mail_password.replace(' ', '')

app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_ASCII_ATTACHMENTS'] = False 

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