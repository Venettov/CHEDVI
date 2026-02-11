import os
import socket 
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# --- CRITICAL FIX: FORCE IPv4 ---
# Keeps the connection compatible with SendGrid and Render
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

# --- EMAIL CONFIGURATION (SENDGRID) ---
# We use the Environment Variables from Render to set this up.
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.sendgrid.net')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 2525)) # Uses Port 2525 to bypass firewall
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'apikey')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')
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