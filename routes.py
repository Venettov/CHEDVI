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
    all_neighborhoods = NeighborhoodHealth.query.all()
    
    if not all_neighborhoods:
        return render_template('dashboard.html', 
                               total_population="0", neighborhood_count=0,
                               min_diabetes=0, max_diabetes=0, diabetes_gap=0,
                               min_income=0, max_income=0, income_ratio=0,
                               min_poverty=0, max_poverty=0, poverty_gap=0)

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

@app.route('/insights')
def insights():
    # 1. Fetch data
    all_n = NeighborhoodHealth.query.all()
    
    # Safety Check
    if not all_n:
        return render_template('insights.html', total_population="0")

    # 2. Calculate "At a Glance" Statistics
    total_population = sum(n.total_population for n in all_n)
    
    # Diabetes Stats
    diabetes_rates = [n.diabetes_rate for n in all_n]
    avg_diabetes = sum(diabetes_rates) / len(diabetes_rates)
    min_diabetes = min(diabetes_rates)
    max_diabetes = max(diabetes_rates)

    # Income Stats
    incomes = [n.median_income for n in all_n]
    avg_income = sum(incomes) / len(incomes)
    min_income = min(incomes)
    max_income = max(incomes)

    # Poverty Stats
    poverty_rates = [n.poverty_rate for n in all_n]
    avg_poverty = sum(poverty_rates) / len(poverty_rates)
    min_poverty = min(poverty_rates)
    max_poverty = max(poverty_rates)

    # 3. Identify Specific Neighborhoods for "Stories"
    # Find neighborhood with Highest Income
    highest_income_n = max(all_n, key=lambda x: x.median_income)
    
    # Find neighborhood with Highest Poverty
    highest_poverty_n = max(all_n, key=lambda x: x.poverty_rate)

    return render_template('insights.html',
                           total_population=f"{total_population:,}",
                           neighborhood_count=len(all_n),
                           # Diabetes
                           avg_diabetes=f"{avg_diabetes:.1f}",
                           min_diabetes=min_diabetes,
                           max_diabetes=max_diabetes,
                           # Income
                           avg_income=f"{avg_income:,.0f}",
                           min_income=f"{min_income:,.0f}",
                           max_income=f"{max_income:,.0f}",
                           # Poverty
                           avg_poverty=f"{avg_poverty:.1f}",
                           min_poverty=min_poverty,
                           max_poverty=max_poverty,
                           # Dynamic Stories
                           highest_income_n=highest_income_n,
                           highest_poverty_n=highest_poverty_n)

@app.route('/neighborhoods')
def neighborhoods():
    return render_template('neighborhoods.html')

@app.route('/rankings')
def rankings():
    return render_template('rankings.html')

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
    return jsonify({'error': 'No data available yet', 'message': 'Placeholder'})

@app.route('/api/health-metrics')
def api_health_metrics():
    return jsonify({'error': 'No data available yet', 'message': 'Placeholder'})

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500