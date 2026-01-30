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
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

with app.app_context():
    # Import existing models and create tables
    import models
    db.create_all()

# Import other routes (this ensures other pages keep working)
from routes import *

# --- FIXED RESOURCES ROUTE ---
# This overrides the version in routes.py to handle both forms correctly
@app.route('/resources', methods=['GET', 'POST'])
def resources():
    # Assuming you are using Flask-WTF forms as seen in your HTML
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
                return redirect(url_for('resources'))
            else:
                flash('Please fix the errors in the contact form.', 'danger')

        # 2. Handle Newsletter Submission
        elif 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                # Logic for newsletter (e.g., adding to a Subscriber table)
                flash('Thank you for subscribing to our newsletter!', 'success')
                return redirect(url_for('resources'))

    return render_template('resources.html', 
                           contact_form=contact_form, 
                           newsletter_form=newsletter_form)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)