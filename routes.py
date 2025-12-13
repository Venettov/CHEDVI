from flask import render_template, request, redirect, url_for, flash, jsonify
from app import app, db
# ADDED NeighborhoodHealth to the imports below
from models import Contact, ResourceRequest, Newsletter, NeighborhoodHealth
from forms import ContactForm, ResourceRequestForm, NewsletterForm

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/dashboard')
def dashboard():
    # 1. Fetch all neighborhood data from the database
    all_neighborhoods = NeighborhoodHealth.query.all()
    
    # Safety check: If database is empty, return placeholder data to prevent crash
    if not all_neighborhoods:
        return render_template('dashboard.html', 
                               total_population="0",
                               neighborhood_count=0,
                               min_diabetes=0, max_diabetes=0, diabetes_gap=0,
                               min_income=0, max_income=0, income_ratio=0,
                               min_poverty=0, max_poverty=0, poverty_gap=0)

    # 2. Calculate "Total Population"
    total_population = sum(n.total_population for n in all_neighborhoods)
    
    # 3. Calculate "Diabetes Range"
    diabetes_rates = [n.diabetes_rate for n in all_neighborhoods]
    min_diabetes = min(diabetes_rates)
    max_diabetes = max(diabetes_rates)
    diabetes_gap = round(max_diabetes - min_diabetes, 1)

    # 4. Calculate "Income Range"
    incomes = [n.median_income for n in all_neighborhoods]
    min_income = min(incomes)
    max_income = max(incomes)
    # Calculate inequality ratio (Max divided by Min)
    income_ratio = round(max_income / min_income, 1) if min_income > 0 else 0

    # 5. Calculate "Poverty Range"
    poverty_rates = [n.poverty_rate for n in all_neighborhoods]
    min_poverty = min(poverty_rates)
    max_poverty = max(poverty_rates)
    poverty_gap = round(max_poverty - min_poverty, 1)

    # 6. Pass variables to the template
    # We format numbers here (e.g. 12000 -> 12k) to make HTML cleaner
    return render_template('dashboard.html', 
                           total_population=f"{total_population:,}", 
                           neighborhood_count=len(all_neighborhoods),
                           min_diabetes=min_diabetes,
                           max_diabetes=max_diabetes,
                           diabetes_gap=diabetes_gap,
                           min_income=f"{min_income/1000:.0f}k", 
                           max_income=f"{max_income/1000:.0f}k",
                           income_ratio=income_ratio,
                           min_poverty=min_poverty,
                           max_poverty=max_poverty,
                           poverty_gap=poverty_gap)

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
        # Smart detection: Check if it's the Contact Form (has 'organization' field)
        if 'contact_submit' in request.form or 'organization' in request.form:
            if contact_form.validate_on_submit():
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
                # Log errors silently to server logs just in case
                print(f"Contact Form Error: {contact_form.errors}")
        
        # Smart detection: Check if it's the Resource Request Form (has 'zip_code' field)
        elif 'resource_submit' in request.form or 'zip_code' in request.form:
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
                print(f"Resource Form Error: {resource_form.errors}")
        
        # Smart detection: Newsletter Subscription
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
    
    return render_template('resources.html', 
                         contact_form=contact_form,
                         resource_form=resource_form,
                         newsletter_form=newsletter_form)

@app.route('/api/neighborhoods')
def api_neighborhoods():
    """API endpoint for neighborhood data (placeholder)"""
    return jsonify({
        'error': 'No data available yet',
        'message': 'This endpoint will be populated with real neighborhood data'
    })

@app.route('/api/health-metrics')
def api_health_metrics():
    """API endpoint for health metrics data (placeholder)"""
    return jsonify({
        'error': 'No data available yet',
        'message': 'This endpoint will be populated with real health metrics data'
    })

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500