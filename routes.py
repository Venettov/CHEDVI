from flask import render_template, request, redirect, url_for, flash, jsonify
from app import app, db
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
    # 1. Fetch all data from the database
    all_neighborhoods = NeighborhoodHealth.query.all()
    
    # Safety check: If database is empty, return placeholder data
    if not all_neighborhoods:
        return render_template('dashboard.html', 
                               total_population="0", neighborhood_count=0,
                               min_diabetes=0, max_diabetes=0, diabetes_gap=0,
                               min_income=0, max_income=0, income_ratio=0,
                               min_poverty=0, max_poverty=0, poverty_gap=0,
                               dashboard_data=[])

    # 2. Calculate "Key Metrics" Statistics
    total_population = sum(n.total_population for n in all_neighborhoods)
    
    diabetes_rates = [n.diabetes_rate for n in all_neighborhoods]
    min_diabetes = min(diabetes_rates)
    max_diabetes = max(diabetes_rates)
    diabetes_gap = round(max_diabetes - min_diabetes, 1)

    incomes = [n.median_income for n in all_neighborhoods]
    min_income = min(incomes)
    max_income = max(incomes)
    income_ratio = round(max_income / min_income, 1) if min_income > 0 else 0

    poverty_rates = [n.poverty_rate for n in all_neighborhoods]
    min_poverty = min(poverty_rates)
    max_poverty = max(poverty_rates)
    poverty_gap = round(max_poverty - min_poverty, 1)

    # 3. PREPARE DATA FOR EXPORT (New Addition)
    # We create a clean list of dictionaries that JS can easily convert to CSV/PDF
    dashboard_data = []
    for n in all_neighborhoods:
        dashboard_data.append({
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'diabetes': n.diabetes_rate,
            'poverty': n.poverty_rate,
            # Safely handle obesity if it exists in your model, otherwise default to 0
            'obesity': getattr(n, 'obesity_rate', 0) 
        })

    # 4. Pass variables to the template
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
                           poverty_gap=poverty_gap,
                           dashboard_data=dashboard_data) # <--- Passed here for export

@app.route('/insights')
def insights():
    all_n = NeighborhoodHealth.query.all()
    
    if not all_n:
        return render_template('insights.html', total_population="0")

    total_population = sum(n.total_population for n in all_n)
    
    diabetes_rates = [n.diabetes_rate for n in all_n]
    avg_diabetes = sum(diabetes_rates) / len(diabetes_rates)
    min_diabetes = min(diabetes_rates)
    max_diabetes = max(diabetes_rates)

    incomes = [n.median_income for n in all_n]
    avg_income = sum(incomes) / len(incomes)
    min_income = min(incomes)
    max_income = max(incomes)

    poverty_rates = [n.poverty_rate for n in all_n]
    avg_poverty = sum(poverty_rates) / len(poverty_rates)
    min_poverty = min(poverty_rates)
    max_poverty = max(poverty_rates)

    highest_income_n = max(all_n, key=lambda x: x.median_income)
    highest_poverty_n = max(all_n, key=lambda x: x.poverty_rate)

    return render_template('insights.html',
                           total_population=f"{total_population:,}",
                           neighborhood_count=len(all_n),
                           avg_diabetes=f"{avg_diabetes:.1f}",
                           min_diabetes=min_diabetes,
                           max_diabetes=max_diabetes,
                           avg_income=f"{avg_income:,.0f}",
                           min_income=f"{min_income:,.0f}",
                           max_income=f"{max_income:,.0f}",
                           avg_poverty=f"{avg_poverty:.1f}",
                           min_poverty=min_poverty,
                           max_poverty=max_poverty,
                           highest_income_n=highest_income_n,
                           highest_poverty_n=highest_poverty_n)

@app.route('/neighborhoods')
def neighborhoods():
    all_n = NeighborhoodHealth.query.all()
    
    neighborhood_data = []
    for n in all_n:
        neighborhood_data.append({
            'id': n.id,
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'poverty': n.poverty_rate,
            'diabetes': n.diabetes_rate,
            'equity_status': 'High Priority' if n.median_income < 30000 else 'Stable' if n.median_income > 50000 else 'Vulnerable'
        })
    
    return render_template('neighborhoods.html', neighborhood_data=neighborhood_data)

@app.route('/rankings')
def rankings():
    all_n = NeighborhoodHealth.query.all()
    
    rankings_data = []
    for n in all_n:
        rankings_data.append({
            'name': n.name,
            'population': n.total_population,
            'income': n.median_income,
            'poverty': n.poverty_rate,
            'diabetes': n.diabetes_rate
        })
        
    return render_template('rankings.html', rankings_data=rankings_data)

@app.route('/policy')
def policy():
    return render_template('policy.html')

@app.route('/resources', methods=['GET', 'POST'])
def resources():
    contact_form = ContactForm()
    resource_form = ResourceRequestForm()
    newsletter_form = NewsletterForm()
    
    if request.method == 'POST':
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