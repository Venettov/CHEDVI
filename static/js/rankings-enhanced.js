// Enhanced Rankings JavaScript with Comprehensive Real Camden Health Data
// CHEDVI - Authentic 2022 Census & CDC PLACES Data for Camden, NJ

// Complete dataset with all variables from authentic CSV
const COMPREHENSIVE_HEALTH_DATA = {
    // Health Outcomes
    'diabetes': {
        name: 'Diabetes Rate',
        category: 'Health Outcomes',
        description: 'Percentage of adults diagnosed with diabetes',
        format: 'percentage',
        reverse: true
    },
    'high_blood_pressure': {
        name: 'High Blood Pressure',
        category: 'Health Outcomes',
        description: 'Percentage of adults with high blood pressure',
        format: 'percentage',
        reverse: true
    },
    'obesity': {
        name: 'Obesity Rate',
        category: 'Health Outcomes',
        description: 'Percentage of adults with BMI ≥30',
        format: 'percentage',
        reverse: true
    },
    'mental_distress': {
        name: 'Mental Distress',
        category: 'Health Outcomes',
        description: 'Percentage reporting frequent mental distress',
        format: 'percentage',
        reverse: true
    },
    'depression': {
        name: 'Depression Rate',
        category: 'Health Outcomes',
        description: 'Percentage reporting depression',
        format: 'percentage',
        reverse: true
    },
    'asthma': {
        name: 'Asthma Rate',
        category: 'Health Outcomes',
        description: 'Percentage reporting asthma',
        format: 'percentage',
        reverse: true
    },
    'current_smoking': {
        name: 'Current Smoking',
        category: 'Health Behaviors',
        description: 'Percentage of current smokers',
        format: 'percentage',
        reverse: true
    },
    'no_physical_leisure': {
        name: 'No Physical Activity',
        category: 'Health Behaviors',
        description: 'Percentage reporting no physical leisure activity',
        format: 'percentage',
        reverse: true
    },
    
    // Healthcare Access
    'visited_dentist': {
        name: 'Dental Care Access',
        category: 'Healthcare Access',
        description: 'Percentage who visited dentist in past year',
        format: 'percentage',
        reverse: false
    },
    'healthcare_access': {
        name: 'Primary Care Access',
        category: 'Healthcare Access',
        description: 'Percentage who visited doctor for check-up',
        format: 'percentage',
        reverse: false
    },
    'lack_health_insurance': {
        name: 'Uninsured Rate',
        category: 'Healthcare Access',
        description: 'Percentage lacking health insurance',
        format: 'percentage',
        reverse: true
    },
    
    // Economic Factors
    'income': {
        name: 'Median Income',
        category: 'Economic Factors',
        description: 'Median annual household income',
        format: 'currency',
        reverse: false
    },
    'poverty_rate': {
        name: 'Poverty Rate',
        category: 'Economic Factors',
        description: 'Percentage below federal poverty line',
        format: 'percentage',
        reverse: true
    },
    'unemployment': {
        name: 'Unemployment Rate',
        category: 'Economic Factors',
        description: 'Percentage unemployed',
        format: 'percentage',
        reverse: true
    },
    
    // Education
    'education': {
        name: 'High School Graduation',
        category: 'Education',
        description: 'Percentage with high school or higher education',
        format: 'percentage',
        reverse: false
    },
    
    // Housing
    'housing_units': {
        name: 'Total Housing Units',
        category: 'Housing',
        description: 'Total number of housing units',
        format: 'number',
        reverse: false
    },
    
    // Food Security
    'food_access': {
        name: 'Low Food Access Score',
        category: 'Food Security',
        description: 'Score indicating low food access (higher = worse access)',
        format: 'decimal',
        reverse: true
    },
    
    // Demographics
    'population': {
        name: 'Total Population',
        category: 'Demographics',
        description: 'Total population count',
        format: 'number',
        reverse: false
    }
};

// Real Camden neighborhood data from 2022 Census & CDC PLACES - AUTHENTIC DATA ONLY
const AUTHENTIC_CAMDEN_DATA = [
    {
        name: 'Gateway',
        diabetes: 17,
        obesity: 43.9,
        asthma: 12.1,
        mental_distress: 20.3,
        high_blood_pressure: 37.4,
        income: 26750,
        education: 69.34,
        food_access: 34.04,
        poverty_rate: 30.78,
        unemployment: 28.59,
        population: 1693,
        healthcare_access: 77.1,
        lack_health_insurance: 22.7,
        depression: 17,
        current_smoking: 20.3,
        visited_dentist: 43.7,
        no_physical_leisure: 39.1
    },
    {
        name: 'Bergen Square',
        diabetes: 15.7,
        obesity: 47.6,
        asthma: 11.7,
        mental_distress: 24.1,
        high_blood_pressure: 40.4,
        income: 12104,
        education: 57.70,
        food_access: 77.61,
        poverty_rate: 54.36,
        unemployment: 34.22,
        population: 2766,
        healthcare_access: 76.1,
        lack_health_insurance: 29.8,
        depression: 20.1,
        current_smoking: 27.6,
        visited_dentist: 32.3,
        no_physical_leisure: 48.6
    },
    {
        name: 'Cooper Poynt',
        diabetes: 18.9,
        obesity: 44.8,
        asthma: 14.3,
        mental_distress: 22.3,
        high_blood_pressure: 41,
        income: 29789,
        education: 41.41,
        food_access: 8.97,
        poverty_rate: 36.71,
        unemployment: 11.43,
        population: 1338,
        healthcare_access: 75.1,
        lack_health_insurance: 32.2,
        depression: 19.5,
        current_smoking: 22.1,
        visited_dentist: 37,
        no_physical_leisure: 45.2
    },
    {
        name: 'Pyne Point',
        diabetes: 21.4,
        obesity: 46.6,
        asthma: 12.9,
        mental_distress: 22.9,
        high_blood_pressure: 35.6,
        income: 19412,
        education: 36.94,
        food_access: 0.31,
        poverty_rate: 39.82,
        unemployment: 14.21,
        population: 5211,
        healthcare_access: 75.7,
        lack_health_insurance: 36.1,
        depression: 19.3,
        current_smoking: 25.1,
        visited_dentist: 31.4,
        no_physical_leisure: 52.3
    },
    {
        name: 'Cramer Hill',
        diabetes: 18.4,
        obesity: 44.8,
        asthma: 14.1,
        mental_distress: 25.6,
        high_blood_pressure: 48.5,
        income: 28198,
        education: 25.47,
        food_access: 1.16,
        poverty_rate: 38.68,
        unemployment: 9.42,
        population: 3804,
        healthcare_access: 71.5,
        lack_health_insurance: 39.9,
        depression: 21.8,
        current_smoking: 24.8,
        visited_dentist: 30.2,
        no_physical_leisure: 50.9
    },
    {
        name: 'Beideman',
        diabetes: 13.4,
        obesity: 40.2,
        asthma: 13,
        mental_distress: 19.1,
        high_blood_pressure: 45.1,
        income: 58983,
        education: 43.14,
        food_access: 44.54,
        poverty_rate: 11.91,
        unemployment: 9.73,
        population: 5645,
        healthcare_access: 73.4,
        lack_health_insurance: 29.7,
        depression: 17.5,
        current_smoking: 16,
        visited_dentist: 46.7,
        no_physical_leisure: 38
    },
    {
        name: 'Dudley',
        diabetes: 22.2,
        obesity: 41.8,
        asthma: 12.4,
        mental_distress: 20.9,
        high_blood_pressure: 48.7,
        income: 35491,
        education: 37.81,
        food_access: 1.64,
        poverty_rate: 24.96,
        unemployment: 3.93,
        population: 3295,
        healthcare_access: 73.5,
        lack_health_insurance: 34.2,
        depression: 18.4,
        current_smoking: 20.3,
        visited_dentist: 39,
        no_physical_leisure: 43.8
    },
    {
        name: 'Rosedale',
        diabetes: 16.9,
        obesity: 38.8,
        asthma: 13.1,
        mental_distress: 18.6,
        high_blood_pressure: 38.6,
        income: 51741,
        education: 44.01,
        food_access: 28.39,
        poverty_rate: 19.22,
        unemployment: 13.15,
        population: 5044,
        healthcare_access: 75.3,
        lack_health_insurance: 28.7,
        depression: 16.9,
        current_smoking: 17.7,
        visited_dentist: 45,
        no_physical_leisure: 40.2
    },
    {
        name: 'Stockton',
        diabetes: 17.9,
        obesity: 41.9,
        asthma: 11.2,
        mental_distress: 20.1,
        high_blood_pressure: 36.3,
        income: 44357,
        education: 49.38,
        food_access: 1.64,
        poverty_rate: 20.17,
        unemployment: 5.94,
        population: 6529,
        healthcare_access: 74.9,
        lack_health_insurance: 27.4,
        depression: 17.8,
        current_smoking: 18.6,
        visited_dentist: 43,
        no_physical_leisure: 40.8
    },
    {
        name: 'Marlton',
        diabetes: 19.2,
        obesity: 43.2,
        asthma: 11.5,
        mental_distress: 21,
        high_blood_pressure: 42.7,
        income: 31312,
        education: 45.20,
        food_access: 0.06,
        poverty_rate: 30.43,
        unemployment: 16.67,
        population: 4726,
        healthcare_access: 74.9,
        lack_health_insurance: 28.6,
        depression: 18.2,
        current_smoking: 19.9,
        visited_dentist: 41.3,
        no_physical_leisure: 41.5
    },
    {
        name: 'Parkside',
        diabetes: 15,
        obesity: 46.1,
        asthma: 10.6,
        mental_distress: 21.9,
        high_blood_pressure: 40.2,
        income: 45662,
        education: 48.07,
        food_access: 6.07,
        poverty_rate: 19.40,
        unemployment: 26.16,
        population: 4181,
        healthcare_access: 80,
        lack_health_insurance: 19.4,
        depression: 17.7,
        current_smoking: 22.9,
        visited_dentist: 40.7,
        no_physical_leisure: 42.4
    },
    {
        name: 'Whitman Park',
        diabetes: 21.5,
        obesity: 44.8,
        asthma: 10.6,
        mental_distress: 22,
        high_blood_pressure: 35.1,
        income: 31941,
        education: 60.14,
        food_access: 5.25,
        poverty_rate: 28.40,
        unemployment: 18.81,
        population: 5394,
        healthcare_access: 77.8,
        lack_health_insurance: 21.8,
        depression: 18.2,
        current_smoking: 22.3,
        visited_dentist: 40.2,
        no_physical_leisure: 42.3
    },
    {
        name: 'Liberty Park',
        diabetes: 23.1,
        obesity: 48.7,
        asthma: 11,
        mental_distress: 24.9,
        high_blood_pressure: 43.6,
        income: 29210,
        education: 55.44,
        food_access: 45.53,
        poverty_rate: 26.21,
        unemployment: 11.37,
        population: 2401,
        healthcare_access: 78.3,
        lack_health_insurance: 25.4,
        depression: 19.6,
        current_smoking: 27.7,
        visited_dentist: 31.8,
        no_physical_leisure: 48.9
    },
    {
        name: 'Centerville',
        diabetes: 14.7,
        obesity: 51.4,
        asthma: 13.4,
        mental_distress: 25.5,
        high_blood_pressure: 35.4,
        income: 22181,
        education: 41.57,
        food_access: 77.96,
        poverty_rate: 42.97,
        unemployment: 25.90,
        population: 2805,
        healthcare_access: 79.6,
        lack_health_insurance: 26.9,
        depression: 20.4,
        current_smoking: 27.8,
        visited_dentist: 30.4,
        no_physical_leisure: 51.6
    },
    {
        name: 'Waterfront South',
        diabetes: 20.3,
        obesity: 44.3,
        asthma: 10.4,
        mental_distress: 22.1,
        high_blood_pressure: 36.4,
        income: 54324,
        education: 43.90,
        food_access: 81.58,
        poverty_rate: 40.45,
        unemployment: 8.51,
        population: 918,
        healthcare_access: 76.9,
        lack_health_insurance: 24.6,
        depression: 18.8,
        current_smoking: 23.2,
        visited_dentist: 38.7,
        no_physical_leisure: 42.7
    },
    {
        name: 'Morgan Village',
        diabetes: 17.5,
        obesity: 45.7,
        asthma: 11.3,
        mental_distress: 22.4,
        high_blood_pressure: 46.7,
        income: 34796,
        education: 61.16,
        food_access: 42.91,
        poverty_rate: 32.57,
        unemployment: 9.16,
        population: 2701,
        healthcare_access: 78.1,
        lack_health_insurance: 21.9,
        depression: 18.7,
        current_smoking: 21.6,
        visited_dentist: 40.4,
        no_physical_leisure: 41.1
    },
    {
        name: 'Fairview',
        diabetes: 17.3,
        obesity: 43.6,
        asthma: 12.7,
        mental_distress: 20.9,
        high_blood_pressure: 40.4,
        income: 41840,
        education: 62.64,
        food_access: 27.51,
        poverty_rate: 20.76,
        unemployment: 24.87,
        population: 6221,
        healthcare_access: 77.5,
        lack_health_insurance: 19.3,
        depression: 18.4,
        current_smoking: 17.9,
        visited_dentist: 46.5,
        no_physical_leisure: 35.5
    },
    {
        name: 'Cooper Grant',
        diabetes: 19.4,
        obesity: 36,
        asthma: 12.3,
        mental_distress: 19.2,
        high_blood_pressure: 38.5,
        income: 51635,
        education: 90.55,
        food_access: 29.17,
        poverty_rate: 41.01,
        unemployment: 14.15,
        population: 2274,
        healthcare_access: 76.5,
        lack_health_insurance: 14.7,
        depression: 17.8,
        current_smoking: 13.3,
        visited_dentist: 51.9,
        no_physical_leisure: 29.2
    },
    {
        name: 'Lanning Square',
        diabetes: 18,
        obesity: 41.3,
        asthma: 13.4,
        mental_distress: 21,
        high_blood_pressure: 47.7,
        income: 38447,
        education: 61.43,
        food_access: 67.15,
        poverty_rate: 18.62,
        unemployment: 8.24,
        population: 4853,
        healthcare_access: 74.7,
        lack_health_insurance: 22.2,
        depression: 17.4,
        current_smoking: 19.4,
        visited_dentist: 42.7,
        no_physical_leisure: 37.6
    }
];

// Initialize enhanced rankings
function initializeEnhancedRankings() {
    initializeRankingsTable();
    initializeRankingsFilters();
    initializeRankingsChart();
    initializeRankingsControls();
    initializeRankingsAccessibility();
    updateRankingsData();
    console.log('Enhanced rankings system loaded with comprehensive Camden health data');
}

// Initialize rankings table
function initializeRankingsTable() {
    const tableBody = document.getElementById('rankingsTableBody');
    if (!tableBody) return;
    
    // Show placeholder message
    tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4"><em>Select a metric to view neighborhood rankings</em></td></tr>';
}

// Initialize rankings filters
function initializeRankingsFilters() {
    const metricSelector = document.getElementById('rankingMetric');
    if (!metricSelector) return;
    
    metricSelector.addEventListener('change', function() {
        const selectedMetric = this.value;
        if (selectedMetric) {
            updateRankingsData(selectedMetric);
        } else {
            initializeRankingsTable(); // Reset to placeholder
        }
    });
}

// Initialize rankings chart
function initializeRankingsChart() {
    const ctx = document.getElementById('rankingsChart');
    if (!ctx) return;
    
    window.rankingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Metric Value',
                data: [],
                backgroundColor: 'rgba(0, 61, 122, 0.8)',
                borderColor: 'rgba(0, 61, 122, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Select a metric to view rankings'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Neighborhoods'
                    }
                }
            }
        }
    });
}

// Initialize rankings controls
function initializeRankingsControls() {
    // Sort controls
    const sortAscBtn = document.getElementById('sortAsc');
    const sortDescBtn = document.getElementById('sortDesc');
    
    if (sortAscBtn) {
        sortAscBtn.addEventListener('click', function() {
            this.classList.add('active');
            if (sortDescBtn) sortDescBtn.classList.remove('active');
            const currentMetric = document.getElementById('rankingMetric')?.value;
            if (currentMetric) updateRankingsData(currentMetric, 'asc');
        });
    }
    
    if (sortDescBtn) {
        sortDescBtn.addEventListener('click', function() {
            this.classList.add('active');
            if (sortAscBtn) sortAscBtn.classList.remove('active');
            const currentMetric = document.getElementById('rankingMetric')?.value;
            if (currentMetric) updateRankingsData(currentMetric, 'desc');
        });
    }
}

// Initialize accessibility features
function initializeRankingsAccessibility() {
    // Keyboard navigation for table rows
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('#rankingsTableBody')) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                navigateTableRows(e.key === 'ArrowDown' ? 1 : -1);
                e.preventDefault();
            }
        }
    });
}

// Navigate table rows with keyboard
function navigateTableRows(direction) {
    const table = document.getElementById('rankingsTableBody');
    if (!table) return;
    
    const rows = table.querySelectorAll('tr');
    const currentRow = table.querySelector('tr.table-active') || rows[0];
    const currentIndex = Array.from(rows).indexOf(currentRow);
    const newIndex = Math.max(0, Math.min(rows.length - 1, currentIndex + direction));
    
    // Remove current active state
    rows.forEach(row => row.classList.remove('table-active'));
    
    // Add active state to new row
    if (rows[newIndex]) {
        rows[newIndex].classList.add('table-active');
        rows[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Update rankings data
function updateRankingsData(metric = null, sortOrder = 'desc') {
    if (!metric) {
        const selector = document.getElementById('rankingMetric');
        metric = selector ? selector.value : null;
    }
    
    if (!metric || !COMPREHENSIVE_HEALTH_DATA[metric]) {
        initializeRankingsTable();
        return;
    }
    
    const metricInfo = COMPREHENSIVE_HEALTH_DATA[metric];
    const data = [...AUTHENTIC_CAMDEN_DATA];
    
    // Sort data based on metric
    data.sort((a, b) => {
        const aVal = a[metric] || 0;
        const bVal = b[metric] || 0;
        
        if (sortOrder === 'asc') {
            return aVal - bVal;
        } else {
            return bVal - aVal;
        }
    });
    
    updateRankingsTable(data, metricInfo);
    updateRankingsChart(data, metricInfo);
}

// Update rankings table
function updateRankingsTable(data, metricInfo) {
    const tableBody = document.getElementById('rankingsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach((neighborhood, index) => {
        const row = document.createElement('tr');
        const value = neighborhood[Object.keys(COMPREHENSIVE_HEALTH_DATA).find(key => 
            COMPREHENSIVE_HEALTH_DATA[key] === metricInfo)];
        const formattedValue = formatMetricValue(Object.keys(COMPREHENSIVE_HEALTH_DATA).find(key => 
            COMPREHENSIVE_HEALTH_DATA[key] === metricInfo), value, metricInfo);
        
        // Health status based on ranking position
        let status = 'Needs Improvement';
        let statusClass = 'danger';
        
        if (index < data.length * 0.25) {
            status = 'Excellent';
            statusClass = 'success';
        } else if (index < data.length * 0.5) {
            status = 'Good';
            statusClass = 'primary';
        } else if (index < data.length * 0.75) {
            status = 'Fair';
            statusClass = 'warning';
        }
        
        row.innerHTML = `
            <td>
                <div class="rank-badge rank-${index + 1}">${index + 1}</div>
            </td>
            <td>
                <strong>${neighborhood.name}</strong>
                <br>
                <small class="text-muted">Camden, NJ</small>
            </td>
            <td>
                <span class="fw-bold">${formattedValue}</span>
            </td>
            <td>
                <span class="fw-bold">${neighborhood.population.toLocaleString()}</span>
            </td>
            <td>
                <span class="badge bg-${statusClass}">${status}</span>
            </td>
            <td>
                <button class="btn btn-outline-primary btn-sm" onclick="viewNeighborhoodDetails('${neighborhood.name}')">
                    <i class="fas fa-eye me-1"></i>View
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Update rankings chart
function updateRankingsChart(data, metricInfo) {
    if (!window.rankingsChart) return;
    
    const metric = Object.keys(COMPREHENSIVE_HEALTH_DATA).find(key => 
        COMPREHENSIVE_HEALTH_DATA[key] === metricInfo);
    
    const top10 = data.slice(0, 10);
    const labels = top10.map(n => n.name);
    const values = top10.map(n => n[metric] || 0);
    
    window.rankingsChart.data.labels = labels;
    window.rankingsChart.data.datasets[0].data = values;
    window.rankingsChart.options.plugins.title.text = `${metricInfo.name} - Top 10 Neighborhoods`;
    window.rankingsChart.options.scales.x.title.text = metricInfo.name;
    
    window.rankingsChart.update();
}

// Format metric value for display
function formatMetricValue(metric, value, metricInfo) {
    if (!value && value !== 0) return 'N/A';
    
    switch (metricInfo.format) {
        case 'percentage':
            return value.toFixed(1) + '%';
        case 'currency':
            return '$' + value.toLocaleString();
        case 'number':
            return value.toLocaleString();
        case 'decimal':
            return value.toFixed(1);
        default:
            return value.toString();
    }
}

// Get health status based on rank
function getHealthStatus(rank, total) {
    const percentage = rank / total;
    if (percentage <= 0.25) return { text: 'Excellent', class: 'success' };
    if (percentage <= 0.5) return { text: 'Good', class: 'primary' };
    if (percentage <= 0.75) return { text: 'Fair', class: 'warning' };
    return { text: 'Needs Improvement', class: 'danger' };
}

// Add sorting listeners
function addRankingsSortingListeners() {
    // Already handled in initializeRankingsControls
}

// Update sort icons
function updateSortIcons() {
    // Visual feedback handled by button states
}

// Load rankings data
function loadRankingsData() {
    console.log('Loading authentic Camden health rankings data...');
    updateRankingsData();
}

// View neighborhood details
function viewNeighborhoodDetails(neighborhoodName) {
    alert(`Viewing detailed information for ${neighborhoodName} - Camden health data from 2022 Census & CDC PLACES`);
}

// Compare neighborhood
function compareNeighborhood(neighborhoodName) {
    alert(`Comparison feature for ${neighborhoodName} will be available in future updates`);
}

// Export rankings data
function exportRankingsData(format = 'csv') {
    const currentMetric = document.getElementById('rankingMetric')?.value;
    if (!currentMetric) {
        alert('Please select a metric first');
        return;
    }
    alert(`Export feature for ${format.toUpperCase()} format will be available in future updates`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedRankings();
});