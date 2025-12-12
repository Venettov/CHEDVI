# Camden Health Equity Data Visualization Initiative (CHEDVI)

## Overview

CHEDVI is a comprehensive web application designed to visualize and analyze health equity data across Camden, New Jersey neighborhoods. The platform combines interactive data visualization with community engagement tools to address health disparities and promote equity through data-driven insights. It aims to provide a data-driven resource for understanding and addressing health disparities in Camden.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Bootstrap 5 with custom CSS for responsive design.
- **Interactive Elements**: Leaflet.js for mapping, Chart.js for data visualization.
- **Styling**: Health-equity inspired color palette (blues, greens, soft grays), with a primary color of deep blue (#003d7a).
- **Mobile-First**: Fully responsive design with accessible UI components, including increased base font size (16px) on mobile, improved touch targets, and optimized layouts.
- **UI/UX Enhancements**:
    - Enhanced accessibility (screen reader support, keyboard navigation, ARIA labels, high contrast mode).
    - Interactive tooltips, global search, dark mode, theme system, text size controls.
    - Export tools (CSV, PDF, Image) for data visualization, comparison tools, breadcrumb navigation.
    - Loading states, skeleton screens, microanimations, guided tour system, keyboard shortcuts.
    - Grouped dropdown menus for navigation (Data: Dashboard/Rankings/Insights/Policy, Community: Neighborhoods/Resources).
    - Dynamic breadcrumb navigation and comprehensive user onboarding system.

### Backend Architecture
- **Framework**: Flask (Python) with SQLAlchemy ORM.
- **Database**: SQLite (default) with PostgreSQL compatibility.
- **Forms**: Flask-WTF for form handling and validation.
- **Session Management**: Flask sessions with configurable secret key.

### Database Schema
The application uses three main models:
- **Contact**: Stores contact form submissions.
- **ResourceRequest**: Tracks resource requests.
- **Newsletter**: Manages email subscriptions.

### Key Features and Data Visualization
- **Interactive Dashboard**: Features dual interactive maps for comparing health outcomes vs. social determinants, with an overlay mode and color-coded neighborhoods. Includes real 2022 Camden health equity data for 19 neighborhoods.
- **Disparity Analysis**: Real-time calculation of disparity index, correlation coefficients, and equity gaps.
- **Neighborhood Profiles**: Detailed health and demographic profiles with development recommendations.
- **Rankings**: Comprehensive health rankings across 30+ variables in 6 categories (Health Outcomes, Healthcare Access, Economic Factors, Education, Housing, Food Security, Demographics).
- **Insights**: Health equity findings with 6 comprehensive physical visualizations (e.g., Income vs. Health Outcomes, Food Access vs. Obesity Rates) and 10 advanced analytics (e.g., Temporal Trends, Spatial Analysis, Intersectional Health Equity Analysis, Predictive Analytics).
- **Resources**: Community engagement and resource finder, including a comprehensive Camden Community Resource Directory and integration of "MyResourcePal" as a strategic hub.
- **Forms**: Contact, resource request, and newsletter subscription forms with input validation.

## External Dependencies

### Frontend Libraries
- Bootstrap 5.3.0 (UI framework)
- Font Awesome 6.0.0 (icons)
- Leaflet.js 1.9.4 (mapping)
- Chart.js (data visualization)

### Backend Dependencies
- Flask and Flask-SQLAlchemy (web framework and ORM)
- Flask-WTF (form handling)
- WTForms (form validation)
- Werkzeug (WSGI utilities)