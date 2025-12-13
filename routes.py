from flask import render_template, request, redirect, url_for, flash, jsonify
from app import app, db
from models import Contact, ResourceRequest, Newsletter
from forms import ContactForm, ResourceRequestForm, NewsletterForm

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/neighborhoods')
def neighborhoods():
    return render_template('neighborhoods.html')

@app.route('/rankings')
def rankings():
    return render_template('rankings.html')

@app.route('/policy')
def policy():
    return render_template('policy.html')

@app.route('/insights')
def insights():
    return render_template('insights.html')

@app.route('/resources', methods=['GET', 'POST'])
def resources():
    contact_form = ContactForm()
    resource_form = ResourceRequestForm()
    newsletter_form = NewsletterForm()
    
    if request.method == 'POST':
        print(f"🚀 POST RECEIVED! Form Data Keys: {list(request.form.keys())}")
        
        # SMART CHECK 1: It is the CONTACT FORM if it has an 'organization' field
        if 'contact_submit' in request.form or 'organization' in request.form:
            print("👀 Detected Contact Form Data")
            if contact_form.validate_on_submit():
                print("✅ Contact Form Valid! Saving...")
                contact = Contact(
                    name=contact_form.name.data,
                    email=contact_form.email.data,
                    organization=contact_form.organization.data,
                    message=contact_form.message.data
                )
                db.session.add(contact)
                db.session.commit()
                flash('Your message has been sent successfully!', 'success')
                return redirect(url_for('resources'))
            else:
                print(f"❌ CONTACT FORM FAILED ERRORS: {contact_form.errors}")
        
        # SMART CHECK 2: It is the RESOURCE FORM if it has a 'zip_code' field
        elif 'resource_submit' in request.form or 'zip_code' in request.form:
            print("👀 Detected Resource Form Data")
            if resource_form.validate_on_submit():
                resource_request = ResourceRequest(
                    name=resource_form.name.data,
                    email=resource_form.email.data,
                    zip_code=resource_form.zip_code.data,
                    resource_type=resource_form.resource_type.data,
                    needs_description=resource_form.needs_description.data
                )
                db.session.add(resource_request)
                db.session.commit()
                flash('Your resource request has been submitted successfully!', 'success')
                return redirect(url_for('resources'))
            else:
                print(f"❌ RESOURCE FORM FAILED: {resource_form.errors}")
        
        # SMART CHECK 3: Newsletter (Fallback)
        elif 'newsletter_submit' in request.form:
            if newsletter_form.validate_on_submit():
                existing_subscriber = Newsletter.query.filter_by(email=newsletter_form.email.data).first()
                if not existing_subscriber:
                    newsletter = Newsletter(email=newsletter_form.email.data)
                    db.session.add(newsletter)
                    db.session.commit()
                    flash('Successfully subscribed to our newsletter!', 'success')
                else:
                    flash('You are already subscribed to our newsletter.', 'info')
                return redirect(url_for('resources'))
            else:
                print(f"❌ NEWSLETTER FAILED: {newsletter_form.errors}")
        
        else:
            print("⚠️ Still could not identify form type.")

    return render_template('resources.html', 
                         contact_form=contact_form,
                         resource_form=resource_form,
                         newsletter_form=newsletter_form)

@app.route('/api/neighborhoods')
def api_neighborhoods():
    return jsonify({'error': 'No data', 'message': 'Placeholder'})

@app.route('/api/health-metrics')
def api_health_metrics():
    return jsonify({'error': 'No data', 'message': 'Placeholder'})

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500