import os
import logging
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
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

# Configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///chedvi.db")
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

# --- DATABASE MODEL FOR CONTACT MESSAGES ---
# This creates the table to store your "Contact Us" submissions
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

with app.app_context():
    # Import models to ensure tables are created
    import models
    db.create_all()

# Import existing routes
from routes import *

# --- FIXED RESOURCES ROUTE ---
# Renamed function to 'resources_custom' to avoid collision with routes.py
@app.route('/resources', methods=['GET', 'POST'])
def resources_custom():
    from forms import ContactForm, NewsletterForm 
    contact_form = ContactForm()
    newsletter_form = NewsletterForm()

    if request.method == 'POST':
        # 1. Handle Contact Form Submission
        if 'contact_submit' in request.form:
            if contact_form.validate_on_submit():
                msg = ContactMessage(
                    name=contact_form.name.data,
                    email=contact_form.email.data,
                    subject=contact_form.subject.data,
                    message=contact_form.message.data
                )
                db.session.add(msg)
                db.session.commit()
                flash('Message sent successfully! Our team will reach out soon.', 'success')
                # Redirect back to this custom function
                return redirect(url_for('resources_custom'))
            else:
                flash('Please fix the errors in the contact form.', 'danger')

        # 2. Handle Newsletter Submission
        elif 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                # Note: Add your newsletter subscription logic here if needed
                flash('Thank you for subscribing to our newsletter!', 'success')
                return redirect(url_for('resources_custom'))

    return render_template('resources.html', 
                           contact_form=contact_form, 
                           newsletter_form=newsletter_form)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)