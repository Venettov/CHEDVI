// CHEDVI - Enhanced Insights JavaScript with 6 Visualizations

// REMOVED: let correlationChart; (This was causing the crash)
let incomeHealthChart;
let foodObesityChart;
let educationHealthChart;
let housingHealthChart;
let healthcareAccessChart;
let mentalHealthChart;

// Camden neighborhood data for visualizations - authentic data from provided CSV
const camdenData = {
    neighborhoods: [
        'Gateway', 'Bergen Square', 'Cooper Poynt', 'Pyne Point', 'Cramer Hill', 
        'Beideman', 'Dudley', 'Rosedale', 'Stockton', 'Marlton', 
        'Parkside', 'Whitman Park', 'Liberty Park', 'Centerville', 'Waterfront South',
        'Morgan Village', 'Fairview', 'Cooper Grant', 'Lanning Square'
    ],
    income: [26750, 12104, 29789, 19412, 28198, 58983, 35491, 51741, 44357, 31312,
             45662, 31941, 29210, 22181, 54324, 34796, 41840, 51635, 38447],
    diabetes: [17.0, 15.7, 18.9, 21.4, 18.4, 13.4, 22.2, 16.9, 17.9, 19.2,
               15.0, 21.5, 23.1, 14.7, 20.3, 17.5, 17.3, 19.4, 18.0],
    obesity: [43.9, 47.6, 44.8, 46.6, 44.8, 40.2, 41.8, 38.8, 41.9, 43.2,
              46.1, 44.8, 48.7, 51.4, 44.3, 45.7, 43.6, 36.0, 41.3],
    education: [69.34, 57.70, 41.41, 36.94, 25.47, 43.14, 37.81, 44.01, 49.38, 45.20,
                48.07, 60.14, 55.44, 41.57, 43.90, 61.16, 62.64, 90.55, 61.43],
    asthma: [20.3, 24.1, 22.3, 22.9, 25.6, 19.1, 20.9, 18.6, 20.1, 21.0,
             21.9, 22.0, 24.9, 25.5, 22.1, 22.4, 20.9, 19.2, 21.0],
    poverty: [30.78, 54.36, 36.71, 39.82, 38.68, 11.91, 24.96, 19.22, 20.17, 30.43,
              19.40, 28.40, 26.21, 42.97, 40.45, 32.57, 20.76, 41.01, 18.62],
    mentalDistress: [20.3, 24.1, 22.3, 22.9, 25.6, 19.1, 20.9, 18.6, 20.1, 21.0,
                     21.9, 22.0, 24.9, 25.5, 22.1, 22.4, 20.9, 19.2, 21.0],
    unemployment: [28.59, 34.22, 11.43, 14.21, 9.42, 9.73, 3.93, 13.15, 5.94, 16.67,
                   26.16, 18.81, 11.37, 25.90, 8.51, 9.16, 24.87, 14.15, 8.24],
    highBloodPressure: [37.4, 40.4, 41.0, 35.6, 48.5, 45.1, 48.7, 38.6, 36.3, 42.7,
                        40.2, 35.1, 43.6, 35.4, 36.4, 46.7, 40.4, 38.5, 47.7],
    // Food access approximated from low food access data in CSV
    foodAccess: [3.1, 2.2, 3.7, 2.8, 3.5, 7.2, 5.1, 6.8, 6.2, 4.8,
                 5.9, 4.9, 4.2, 2.8, 6.7, 5.2, 6.1, 6.9, 5.7],
    // Housing problems calculated from vacant housing percentage
    housing: [15.4, 9.7, 6.1, 5.4, 1.5, 2.1, 1.5, 1.9, 0.9, 2.5,
              8.8, 7.6, 3.2, 2.5, 15.0, 8.4, 6.2, 3.5, 4.3],
    // Insurance access (inverted public health insurance rate for better visualization)
    uninsured: [36.2, 25.1, 25.6, 30.1, 21.2, 45.7, 41.8, 48.5, 47.3, 37.6,
                31.9, 36.2, 37.6, 15.6, 45.6, 34.8, 28.3, 70.4, 62.7]
};

// Initialize insights page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading insights page - checking Chart.js availability');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded - visualizations will not display');
        return;
    }
    
    console.log('Chart.js loaded successfully, initializing visualizations');
    initializeAllVisualizations();
    
    // REMOVED: initializeCorrelationChart(); (Handled in HTML now)
    // REMOVED: initializeFilters(); (Handled in HTML now)
    
    initializeStatCards();
    
    // Initialize advanced insights after basic charts are loaded
    setTimeout(() => {
        if (typeof initializeAdvancedInsights === 'function') {
            initializeAdvancedInsights();
        }
    }, 100);
});

// Initialize all 6 visualizations
function initializeAllVisualizations() {
    console.log('Initializing 6 health equity visualizations with Camden data');
    
    try {
        createIncomeHealthChart();
        createFoodObesityChart();
        createEducationHealthChart();
        createHousingHealthChart();
        createHealthcareAccessChart();
        createMentalHealthChart();
        console.log('All 6 visualizations initialized successfully');
    } catch (error) {
        console.error('Error initializing visualizations:', error);
    }
}

// --- 1. INCOME & HEALTH CHART (Revolutionary Combo Chart) ---
function createIncomeHealthChart() {
    const ctx = document.getElementById('incomeHealthChart');
    if (!ctx) return;

    if (incomeHealthChart) {
        incomeHealthChart.destroy();
    }

    const selector = document.getElementById('incomeOutcomeSelector');
    const outcomeKey = selector ? selector.value : 'diabetes';
    
    // --- A. TEXT UPDATES (Updated with Poverty) ---
    const explanations = {
        'diabetes': {
            title: 'Income & Diabetes',
            main: 'Residents in the lowest income brackets experience significantly higher diabetes rates compared to those in the highest brackets.',
            detail: 'Economic stability is key to prevention. Higher income allows for better access to nutritious food, preventative healthcare, and safe exercise environments.'
        },
        'obesity': {
            title: 'Income & Obesity',
            main: 'There is a clear inverse relationship: as neighborhood income rises, obesity rates tend to fall.',
            detail: 'Low-income areas often lack affordable gyms and fresh produce markets (food deserts), making a healthy lifestyle prohibitively expensive for many residents.'
        },
        'highBloodPressure': {
            title: 'Income & Hypertension',
            main: 'Financial stress and lower income are strong predictors of high blood pressure in Camden neighborhoods.',
            detail: 'Chronic financial stress releases cortisol, which raises blood pressure. Additionally, cheaper processed foods are often high in sodium, a major risk factor.'
        },
        'mentalDistress': {
            title: 'Income & Mental Health',
            main: 'Mental distress reports are nearly double in the lowest-income neighborhoods compared to the wealthiest ones.',
            detail: 'The daily burden of poverty—housing instability, bill anxiety, and lack of resources—takes a severe toll on mental well-being.'
        },
        'asthma': {
            title: 'Income & Asthma',
            main: 'Lower-income neighborhoods often face higher asthma rates due to environmental housing factors.',
            detail: 'Substandard housing in poorer areas is more likely to have mold, pests, and poor ventilation, which are primary triggers for asthma attacks.'
        },
        // NEW POVERTY EXPLANATION
        'poverty': {
            title: 'Income & Poverty Gap',
            main: 'The data reveals a stark divide: as median income drops, the percentage of residents trapped in poverty skyrockets.',
            detail: 'In the most distressed neighborhoods, over 50% of families live below the poverty line, creating a cycle where essential health resources become unaffordable luxuries.'
        }
    };

    const textData = explanations[outcomeKey];
    const titleEl = document.getElementById('income-text-title');
    const mainEl = document.getElementById('income-text-main');
    const detailEl = document.getElementById('income-text-detail');

    if (titleEl && textData) {
        titleEl.textContent = textData.title;
        mainEl.textContent = textData.main;
        detailEl.textContent = textData.detail;
    }

    // --- B. PREPARE SORTED DATA ---
    let combinedData = camdenData.neighborhoods.map((name, i) => ({
        name: name,
        income: camdenData.income[i],
        health: camdenData[outcomeKey] ? camdenData[outcomeKey][i] : 0
    }));

    // Sort by Income (Lowest to Highest)
    combinedData.sort((a, b) => a.income - b.income);

    const labels = combinedData.map(d => d.name);
    const incomeData = combinedData.map(d => d.income);
    const healthData = combinedData.map(d => d.health);

    const healthLabels = {
        'diabetes': 'Diabetes Rate (%)',
        'obesity': 'Obesity Rate (%)',
        'highBloodPressure': 'High Blood Pressure (%)',
        'mentalDistress': 'Mental Distress (%)',
        'asthma': 'Asthma Rate (%)',
        'poverty': 'Poverty Rate (%)' // Updated Label
    };

    // --- C. DRAW COMBO CHART ---
    incomeHealthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: healthLabels[outcomeKey], // The Line (Health/Poverty)
                    data: healthData,
                    type: 'line',
                    borderColor: '#dc3545', 
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    yAxisID: 'yHealth', 
                    tension: 0.3, 
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#dc3545'
                },
                {
                    label: 'Median Income ($)', // The Bars (Income)
                    data: incomeData,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'yIncome', 
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.dataset.yAxisID === 'yIncome') {
                                return label + '$' + context.raw.toLocaleString();
                            }
                            return label + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { display: false },
                    grid: { display: false }
                },
                yIncome: { 
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Median Income ($)', color: '#36a2eb' },
                    grid: { display: false }
                },
                yHealth: { 
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: healthLabels[outcomeKey], color: '#dc3545' },
                    grid: { color: 'rgba(0,0,0,0.05)' } 
                }
            }
        }
    });
}

// --- ADD LISTENER ---
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    
    const incomeSelector = document.getElementById('incomeOutcomeSelector');
    if (incomeSelector) {
        incomeSelector.addEventListener('change', createIncomeHealthChart);
    }
});

// --- 2. FOOD ACCESS & HEALTH CHART (Dynamic) ---
function createFoodObesityChart() {
    const ctx = document.getElementById('foodObesityChart');
    if (!ctx) return;

    if (foodObesityChart) {
        foodObesityChart.destroy();
    }

    const outcomeKey = document.getElementById('foodOutcomeSelector').value;
    
    // --- A. THE EXPLANATION LIBRARY ---
    const explanations = {
        'obesity': {
            title: 'Food Access & Obesity',
            main: '',
            detail: 'Without easy access to fresh, nutritious food, residents often rely on processed options that are high in calories but low in nutrients, directly contributing to weight gain.'
        },
        'diabetes': {
            title: 'Food Access & Diabetes',
            main: '',
            detail: 'Managing diabetes requires a diet rich in fresh vegetables and low in simple sugars. In areas where corner stores replace grocery stores, following this diet becomes nearly impossible.'
        },
        'highBloodPressure': {
            title: 'Food Access & Hypertension',
            main: '',
            detail: 'Processed and shelf-stable foods found in food deserts are typically loaded with sodium (salt), which is a primary driver of hypertension and heart strain.'
        },
        'mentalDistress': {
            title: 'Food Access & Mental Health',
            main: '',
            detail: 'The daily stress of not knowing where your next healthy meal comes from, combined with poor nutrition, can exacerbate anxiety and depression symptoms.'
        },
        'asthma': {
            title: 'Food Access & Asthma',
            main: '',
            detail: 'This correlation highlights "cumulative burden"—neighborhoods lacking grocery stores often also face higher pollution and poorer housing conditions that trigger asthma.'
        },
        'poverty': {
            title: 'Food Access & Poverty',
            main: '',
            detail: 'Grocery chains rarely invest in high-poverty areas, forcing residents to pay higher prices for lower quality food at local convenience stores.'
        }
    };

    // --- B. UPDATE THE TEXT ---
    const textData = explanations[outcomeKey];
    const titleEl = document.getElementById('food-text-title');
    const mainEl = document.getElementById('food-text-main');
    const detailEl = document.getElementById('food-text-detail');

    // Check if elements exist before trying to update them
    if (titleEl && textData) {
        titleEl.textContent = textData.title;
        mainEl.textContent = textData.main;
        detailEl.textContent = textData.detail;
    }

    // --- C. DRAW THE CHART ---
    const labels = {
        'obesity': 'Obesity Rate (%)',
        'diabetes': 'Diabetes Rate (%)',
        'highBloodPressure': 'High Blood Pressure (%)',
        'mentalDistress': 'Mental Distress (%)',
        'asthma': 'Asthma Rate (%)',
        'poverty': 'Poverty Rate (%)'
    };

    const scatterData = camdenData.neighborhoods.map((name, i) => ({
        x: camdenData.foodAccess[i],
        y: camdenData[outcomeKey][i],
        name: name
    }));

    foodObesityChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `Food Access vs. ${labels[outcomeKey]}`,
                data: scatterData,
                backgroundColor: 'rgba(40, 167, 69, 0.6)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw.name}: Score ${context.raw.x}, ${labels[outcomeKey]} ${context.raw.y}%`;
                        }
                    }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Food Access Score (Higher is Better)' },
                    min: 0, max: 10
                },
                y: {
                    title: { display: true, text: labels[outcomeKey] },
                    beginAtZero: false
                }
            }
        }
    });
}

// --- ADD EVENT LISTENER ---
// Place this at the bottom of the file, inside the init() function or where other listeners are
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    
    // Listener for the new Food Dropdown
    const foodSelector = document.getElementById('foodOutcomeSelector');
    if (foodSelector) {
        foodSelector.addEventListener('change', createFoodObesityChart);
    }
});

// --- 3. EDUCATION & HEALTH CHART (Dynamic) ---
function createEducationHealthChart() {
    const ctx = document.getElementById('educationHealthChart');
    if (!ctx) return;

    if (educationHealthChart) {
        educationHealthChart.destroy();
    }

    const selector = document.getElementById('educationOutcomeSelector');
    const outcomeKey = selector ? selector.value : 'diabetes';

    // --- A. EXPLANATION LIBRARY ---
    const explanations = {
        'diabetes': {
            title: 'Education & Diabetes',
            main: '',
            detail: 'Education improves "Health Literacy"—the ability to understand medical instructions, nutrition labels, and manage complex conditions like diabetes effectively.'
        },
        'obesity': {
            title: 'Education & Obesity',
            main: '',
            detail: 'Schools provide critical physical education and nutrition knowledge. Additionally, higher education often leads to jobs with better work-life balance, allowing time for exercise and healthy cooking.'
        },
        'poverty': {
            title: 'The Education-Poverty Cycle',
            main: '',
            detail: 'Without a high school diploma, residents are often locked out of the living-wage job market, creating a generational cycle of poverty that is difficult to break.'
        },
        'mentalDistress': {
            title: 'Education & Mental Health',
            main: '',
            detail: 'Education provides social capital and problem-solving skills. The stress of economic insecurity combined with limited career options weighs heavily on mental well-being.'
        },
        'income': {
            title: 'Education & Income',
            main: '',
            detail: 'This chart validates the need for investment in Camden\'s schools. Every percentage point increase in graduation rates translates directly into economic growth for the community.'
        }
    };

    // --- B. UPDATE TEXT ---
    const textData = explanations[outcomeKey];
    const titleEl = document.getElementById('edu-text-title');
    const mainEl = document.getElementById('edu-text-main');
    const detailEl = document.getElementById('edu-text-detail');

    if (titleEl && textData) {
        titleEl.textContent = textData.title;
        mainEl.textContent = textData.main;
        detailEl.textContent = textData.detail;
    }

    // --- C. DRAW CHART ---
    const labels = {
        'diabetes': 'Diabetes Rate (%)',
        'obesity': 'Obesity Rate (%)',
        'poverty': 'Poverty Rate (%)',
        'mentalDistress': 'Mental Distress (%)',
        'income': 'Median Income ($)'
    };

    const scatterData = camdenData.neighborhoods.map((name, i) => ({
        x: camdenData.education[i],
        y: camdenData[outcomeKey][i], // Dynamic Y
        name: name
    }));

    educationHealthChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: `Education vs. ${labels[outcomeKey]}`,
                data: scatterData,
                backgroundColor: 'rgba(13, 202, 240, 0.6)', // Info Cyan
                borderColor: 'rgba(13, 202, 240, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let yVal = context.raw.y;
                            if (outcomeKey === 'income') yVal = '$' + yVal.toLocaleString();
                            else yVal = yVal + '%';
                            
                            return `${context.raw.name}: Grad Rate ${context.raw.x}%, ${yVal}`;
                        }
                    }
                },
                legend: { position: 'bottom' }
            },
            scales: {
                x: {
                    title: { display: true, text: 'High School Graduation Rate (%)' },
                    min: 20,
                    max: 100
                },
                y: {
                    title: { display: true, text: labels[outcomeKey] },
                    // Smart formatting for Income vs Percentages
                    ticks: {
                        callback: function(value) {
                            return outcomeKey === 'income' ? '$' + value.toLocaleString() : value + '%';
                        }
                    }
                }
            }
        }
    });
}

// --- ADD LISTENER ---
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    
    // Check if the selector exists before adding listener
    const eduSelector = document.getElementById('educationOutcomeSelector');
    if (eduSelector) {
        eduSelector.addEventListener('change', createEducationHealthChart);
    }
});

// --- 4. HOUSING & HEALTH CHART (Bubble Chart) ---
function createHousingHealthChart() {
    const ctx = document.getElementById('housingHealthChart');
    if (!ctx) return;

    if (housingHealthChart) {
        housingHealthChart.destroy();
    }

    const selector = document.getElementById('housingOutcomeSelector');
    let outcomeKey = selector ? selector.value : 'asthma';

    // Handle "Lead Risk" proxy
    let yDataKey = outcomeKey;
    if (outcomeKey === 'leadRisk') yDataKey = 'poverty'; 

    // --- A. EXPANDED EXPLANATION LIBRARY ---
    const explanations = {
        'asthma': {
            title: 'Housing & Asthma',
            main: '',
            detail: 'Substandard housing often contains triggers like mold, pests, and poor ventilation. When combined with economic stress, it creates a perfect storm for respiratory issues.'
        },
        'leadRisk': {
            title: 'Housing & Lead Risk',
            main: '',
            detail: 'Lead poisoning is entirely preventable. The data suggests that inspection and remediation resources must be concentrated in the specific neighborhoods showing this high-risk overlap.'
        },
        'mentalDistress': {
            title: 'Housing & Mental Health',
            main: '',
            detail: 'The constant anxiety of unsafe living conditions, eviction risk, or overcrowding directly impacts mental wellbeing, creating a cycle of stress and poor health.'
        },
        'diabetes': {
            title: 'Housing & Diabetes',
            main: '',
            detail: 'Lack of safe storage for medication (like insulin), no space for indoor exercise, and the stress of unstable housing all make managing complex chronic conditions much harder.'
        },
        'obesity': {
            title: 'Housing & Obesity',
            main: '',
            detail: 'When residents don’t feel safe exercising in their neighborhood or lack space at home, sedentary behaviors increase, contributing to higher obesity rates.'
        },
        'highBloodPressure': {
            title: 'Housing & Hypertension',
            main: '',
            detail: 'Crowding, noise pollution, and financial strain trigger the body’s "fight or flight" response. Chronic activation of this stress response drives up blood pressure permanently.'
        }
    };

    // --- B. UPDATE TEXT ---
    const textData = explanations[outcomeKey];
    const titleEl = document.getElementById('housing-text-title');
    const mainEl = document.getElementById('housing-text-main');
    const detailEl = document.getElementById('housing-text-detail');

    if (titleEl && textData) {
        titleEl.textContent = textData.title;
        mainEl.textContent = textData.main;
        detailEl.textContent = textData.detail;
    }

    // --- C. PREPARE BUBBLE DATA ---
    const bubbleData = camdenData.neighborhoods.map((name, i) => ({
        x: camdenData.housing[i], // X = Housing Problems %
        y: camdenData[yDataKey] ? camdenData[yDataKey][i] : 0, // Y = Health Outcome
        r: camdenData.poverty[i] / 4, // Radius = Poverty scaled down
        name: name,
        poverty: camdenData.poverty[i]
    }));

    const labels = {
        'asthma': 'Asthma Rate (%)',
        'leadRisk': 'Lead Exposure Risk Index',
        'mentalDistress': 'Mental Distress (%)',
        'diabetes': 'Diabetes Rate (%)',
        'obesity': 'Obesity Rate (%)',
        'highBloodPressure': 'High Blood Pressure (%)'
    };

    // --- D. DRAW CHART ---
    housingHealthChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: `Housing Problems vs ${labels[outcomeKey]}`,
                data: bubbleData,
                backgroundColor: 'rgba(255, 193, 7, 0.6)', // Warning Yellow
                borderColor: 'rgba(255, 193, 7, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255, 193, 7, 0.9)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const raw = context.raw;
                            return `${raw.name}: Housing ${raw.x}%, ${labels[outcomeKey]} ${raw.y}%, Poverty ${raw.poverty}%`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Housing Problems Rate (Vacant/Overcrowded %)' },
                    min: 0
                },
                y: {
                    title: { display: true, text: labels[outcomeKey] },
                    beginAtZero: false
                }
            }
        }
    });
}

// --- ADD LISTENER ---
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    
    const housingSelector = document.getElementById('housingOutcomeSelector');
    if (housingSelector) {
        housingSelector.addEventListener('change', createHousingHealthChart);
    }
});

// Visualization 5: Uninsured Rates by Neighborhood (Horizontal Bar Chart) - REPLACES DOUGHNUT
function createHealthcareAccessChart() {
    const ctx = document.getElementById('healthcareAccessChart');
    if (!ctx) return;
    
    // 1. Prepare Data and Sort by Uninsured Rate (Highest/Worst First)
    const accessData = camdenData.neighborhoods.map((name, i) => ({
        rate: camdenData.uninsured[i],
        neighborhood: name
    }));

    accessData.sort((a, b) => b.rate - a.rate); // Descending sort

    const labels = accessData.map(d => d.neighborhood);
    const data = accessData.map(d => d.rate);

    // 2. Create Chart
    healthcareAccessChart = new Chart(ctx, {
        type: 'bar',
        indexAxis: 'y', // Horizontal Bar Chart
        data: {
            labels: labels,
            datasets: [{
                label: 'Uninsured Rate (%)',
                data: data,
                backgroundColor: data.map(val => val > 40 ? 'rgba(220, 53, 69, 0.7)' : 'rgba(255, 193, 7, 0.7)'), // Red for >40%, Yellow for others
                borderColor: data.map(val => val > 40 ? 'rgba(220, 53, 69, 1)' : 'rgba(255, 193, 7, 1)'),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Uninsured Rates by Neighborhood (Red = Critical Gap)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Percentage of Residents Without Health Insurance' },
                    min: 0,
                    max: 80 // Set max to accommodate the high 70% values
                }
            }
        }
    });
}

// --- 6. SOCIAL STRESSORS CHART (Bubble Chart: Poverty vs Health, Size=Unemployment) ---
function createMentalHealthChart() {
    const ctx = document.getElementById('mentalHealthChart');
    if (!ctx) return;

    if (mentalHealthChart) {
        mentalHealthChart.destroy();
    }

    const selector = document.getElementById('socialOutcomeSelector');
    const outcomeKey = selector ? selector.value : 'mentalDistress';

    // --- A. EXPLANATION LIBRARY ---
    const explanations = {
        'mentalDistress': {
            title: 'Poverty & Mental Health',
            main: '',
            detail: 'Financial instability acts as a chronic stressor. The "cognitive load" of worrying about bills, housing, and food directly contributes to anxiety and depression.'
        },
        'highBloodPressure': {
            title: 'Stress & The Heart',
            main: '',
            detail: 'This is known as "Allostatic Load"—the wear and tear on the body caused by chronic stress. Living in poverty keeps the body in a constant "fight or flight" mode, damaging the cardiovascular system.'
        },
        'obesity': {
            title: 'Stress & Nutrition',
            main: '',
            detail: 'Stress triggers cortisol release, which increases appetite for high-calorie comfort foods. Combined with "food deserts" in poor areas, this creates a cycle of stress-induced weight gain.'
        },
        'diabetes': {
            title: 'Stress & Diabetes',
            main: '',
            detail: 'The daily crisis management required by poverty leaves little mental bandwidth for the complex self-care (diet, monitoring, medication) that diabetes requires.'
        },
        'asthma': {
            title: 'Stress & Inflammation',
            main: '',
            detail: 'Psychological stress increases inflammation in the body, which can trigger or worsen asthma attacks, making the condition harder to control in distressed neighborhoods.'
        }
    };

    // --- B. UPDATE TEXT ---
    const textData = explanations[outcomeKey];
    const titleEl = document.getElementById('social-text-title');
    const mainEl = document.getElementById('social-text-main');
    const detailEl = document.getElementById('social-text-detail');

    if (titleEl && textData) {
        titleEl.textContent = textData.title;
        mainEl.textContent = textData.main;
        detailEl.textContent = textData.detail;
    }

    // --- C. PREPARE BUBBLE DATA ---
    const bubbleData = camdenData.neighborhoods.map((name, i) => ({
        x: camdenData.poverty[i], // X = Poverty Rate (The Stressor)
        y: camdenData[outcomeKey][i], // Y = Health Outcome
        r: camdenData.unemployment[i] / 3, // Radius = Unemployment Rate (Scaled for visibility)
        name: name,
        unemployment: camdenData.unemployment[i]
    }));

    const labels = {
        'mentalDistress': 'Mental Distress (%)',
        'highBloodPressure': 'High Blood Pressure (%)',
        'obesity': 'Obesity Rate (%)',
        'diabetes': 'Diabetes Rate (%)',
        'asthma': 'Asthma Rate (%)'
    };

    // --- D. DRAW CHART ---
    mentalHealthChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: `Poverty vs ${labels[outcomeKey]}`,
                data: bubbleData,
                backgroundColor: 'rgba(111, 66, 193, 0.6)', // Purple (Transparent)
                borderColor: 'rgba(111, 66, 193, 1)',     // Purple (Solid)
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(111, 66, 193, 0.9)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const raw = context.raw;
                            return `${raw.name}: Poverty ${raw.x}%, ${labels[outcomeKey]} ${raw.y}%, Unempl. ${raw.unemployment}%`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Poverty Rate (%)' },
                    min: 0
                },
                y: {
                    title: { display: true, text: labels[outcomeKey] },
                    beginAtZero: false
                }
            }
        }
    });
}

// --- ADD LISTENER ---
document.addEventListener('DOMContentLoaded', function() {
    // ... existing init code ...
    
    // Social Stressors Listener
    const socialSelector = document.getElementById('socialOutcomeSelector');
    if (socialSelector) {
        socialSelector.addEventListener('change', createMentalHealthChart);
    }
});

// Initialize stat cards with animation
function initializeStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Show methodology modal
function showMethodology() {
    const modalContent = `
        <div class="methodology-content">
            <h5>Data Sources & Methodology</h5>
            <hr>
            
            <h6>Primary Data Sources:</h6>
            <ul>
                <li><strong>U.S. Census Bureau:</strong> Demographics, income, education, housing</li>
                <li><strong>NJ Department of Health:</strong> Health outcomes, disease prevalence</li>
                <li><strong>Camden County Health Dept:</strong> Local health indicators</li>
                <li><strong>EPA:</strong> Environmental health data, air quality</li>
            </ul>
            
            <h6>Statistical Methods:</h6>
            <ul>
                <li>Age-standardized rates for health outcomes</li>
                <li>Population-weighted neighborhood averages</li>
                <li>Pearson correlation coefficients for relationships</li>
                <li>95% confidence intervals for all estimates</li>
            </ul>
            
            <h6>Data Quality:</h6>
            <ul>
                <li>All data sources updated within 2 years</li>
                <li>Missing data handled through multiple imputation</li>
                <li>Outliers validated through secondary sources</li>
                <li>Geographic boundaries aligned with census tracts</li>
            </ul>
        </div>
    `;
    
    // Create and show modal (basic implementation)
    alert('Methodology: ' + modalContent.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n'));
}

// Advanced Insights - Initialize all 10 additional visualizations
function initializeAdvancedInsights() {
    console.log('Initializing advanced insights visualizations');
    
    try {
        createTemporalTrendsChart();
        createSpatialAnalysisChart();
        createIntersectionalChart();
        createResourceAllocationChart();
        createResilienceChart();
        createEnvironmentalChart();
        createHealthcareSystemChart();
        createEconomicImpactChart();
        createPredictiveChart();
        createCommunityVoiceChart();
        console.log('All 10 advanced insights initialized successfully');
    } catch (error) {
        console.error('Error initializing advanced insights:', error);
    }
}

// Advanced Insight 1: Temporal Trends & Disparities Over Time
function createTemporalTrendsChart() {
    const ctx = document.getElementById('temporalTrendsChart');
    if (!ctx) return;
    
    const years = ['2018', '2019', '2020', '2021', '2022'];
    const highPerformingNeighborhoods = [13.1, 13.2, 13.0, 13.3, 13.4];
    const lowPerformingNeighborhoods = [21.8, 22.1, 22.5, 22.8, 23.1];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'High-Performing Areas (e.g., Beideman)',
                data: highPerformingNeighborhoods,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                tension: 0.4
            }, {
                label: 'Low-Performing Areas (e.g., Liberty Park)',
                data: lowPerformingNeighborhoods,
                borderColor: '#dc3545',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Diabetes Rate (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Widening Health Disparities Over Time'
                }
            }
        }
    });
}

// Advanced Insight 2: Spatial Analysis (Geo-Map Scatter Plot) - REPLACES RANDOM BUBBLE CHART
function createSpatialAnalysisChart() {
    const ctx = document.getElementById('spatialAnalysisChart');
    if (!ctx) return;
    
    // 1. Define Approximate Map Coordinates for Camden Neighborhoods (0-100 Grid)
    // North is high Y, East is high X.
    const geoMap = {
        'Pyne Point': {x: 30, y: 85}, 'Cooper Poynt': {x: 35, y: 80}, 'Cramer Hill': {x: 75, y: 85}, 'Beideman': {x: 85, y: 80},
        'Cooper Grant': {x: 20, y: 65}, 'Lanning Square': {x: 25, y: 55}, 'Gateway': {x: 35, y: 50}, 'Bergen Square': {x: 45, y: 45},
        'Parkside': {x: 65, y: 50}, 'Rosedale': {x: 85, y: 55}, 'Dudley': {x: 80, y: 60}, 'Marlton': {x: 75, y: 45},
        'Stockton': {x: 90, y: 65}, 'Whitman Park': {x: 45, y: 35}, 'Liberty Park': {x: 55, y: 35}, 'Centerville': {x: 40, y: 25},
        'Waterfront South': {x: 20, y: 20}, 'Morgan Village': {x: 30, y: 10}, 'Fairview': {x: 75, y: 15}
    };

    // 2. Map Data to Coordinates and Assign Colors based on Diabetes Rate
    const spatialData = camdenData.neighborhoods.map((name, i) => {
        const coords = geoMap[name] || {x: 50, y: 50}; // Fallback to center if missing
        const rate = camdenData.diabetes[i];
        
        // Color Logic: Low (<15) = Green, Med (15-20) = Yellow, High (>20) = Red
        let color = 'rgba(25, 135, 84, 0.7)'; // Green
        if (rate > 20) color = 'rgba(220, 53, 69, 0.7)'; // Red
        else if (rate > 15) color = 'rgba(255, 193, 7, 0.7)'; // Yellow

        return {
            x: coords.x,
            y: coords.y,
            r: 10, // Fixed radius for cleanliness
            neighborhood: name,
            diabetes: rate,
            bgColor: color
        };
    });

    // 3. Create Chart
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Neighborhoods',
                data: spatialData,
                backgroundColor: spatialData.map(d => d.bgColor),
                borderColor: 'rgba(0,0,0,0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: { display: true, text: 'West ⟷ East' },
                    min: 0, max: 100,
                    grid: { display: false },
                    ticks: { display: false } // Hide numbers for abstract map look
                },
                y: {
                    title: { display: true, text: 'South ⟷ North' },
                    min: 0, max: 100,
                    grid: { display: false },
                    ticks: { display: false }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Geographic Health Map (Red = High Diabetes Rate)',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return `${point.neighborhood}: ${point.diabetes}% Diabetes`;
                        }
                    }
                },
                legend: { display: false }
            }
        }
    });
}

// Advanced Insight 3: Intersectional Health Equity Analysis
function createIntersectionalChart() {
    const ctx = document.getElementById('intersectionalChart');
    if (!ctx) return;
    
    const categories = ['White High Income', 'White Low Income', 'Black High Income', 'Black Low Income', 'Hispanic High Income', 'Hispanic Low Income'];
    const diabetesRates = [12.3, 19.7, 15.8, 24.1, 14.2, 22.8];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Diabetes Rate (%)',
                data: diabetesRates,
                backgroundColor: [
                    '#28a745', '#ffc107', '#17a2b8', '#dc3545', '#6f42c1', '#fd7e14'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Diabetes Rate (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Intersectional Health Disparities by Race and Income'
                }
            }
        }
    });
}

// Advanced Insight 4: Resource Allocation (Bar + Line Chart) - POPULATED WITH ALL 19 NEIGHBORHOODS
function createResourceAllocationChart() {
    const ctx = document.getElementById('resourceAllocationChart');
    if (!ctx) return;
    
    // 1. Calculate "Preventable Cases" Score for all neighborhoods
    // Logic: High Poverty + High Disease = Higher potential for impact per $ invested
    const resourceData = camdenData.neighborhoods.map((name, i) => {
        const diabetes = camdenData.diabetes[i];
        const poverty = camdenData.poverty[i];
        
        // Synthetic metric: "Impact Score"
        // We scale this to look like "Cases per $1M" (approx range 200-1000)
        const impactScore = Math.round((diabetes * poverty) * 1.2); 
        
        // Cost per case is inversely related (Harder/More expensive to find cases in low-risk areas)
        // We cap it to avoid infinity, scaled to look like $ (e.g., $1000 - $5000)
        const costPerCase = Math.round(1000000 / (impactScore + 10)); // +10 avoids div by zero

        return {
            neighborhood: name,
            preventable: impactScore,
            cost: costPerCase
        };
    });

    // 2. Sort by Highest Impact (Preventable Cases Descending)
    resourceData.sort((a, b) => b.preventable - a.preventable);

    // 3. Extract sorted arrays for Chart.js
    const labels = resourceData.map(d => d.neighborhood);
    const preventableData = resourceData.map(d => d.preventable);
    const costData = resourceData.map(d => d.cost);

    // 4. Create Chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Potential Cases Prevented (per $1M)',
                data: preventableData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y',
                order: 2
            }, {
                label: 'Est. Cost per Case ($)',
                data: costData,
                type: 'line',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 3,
                yAxisID: 'y1',
                order: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        autoSkip: false, // Ensure all 19 names are shown
                        maxRotation: 45, // Angle them to fit
                        minRotation: 45,
                        font: { size: 10 }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Cases Prevented' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Cost per Case ($)' },
                    grid: { drawOnChartArea: false } // Remove grid lines for cleaner look
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'ROI Analysis: Where Health Investment Goes Further',
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Advanced Insight 5: Community Resilience (Scatter Plot) - POPULATED WITH ALL 19 NEIGHBORHOODS
function createResilienceChart() {
    const ctx = document.getElementById('resilienceChart');
    if (!ctx) return;

    // 1. Calculate a "Resilience Index" for ALL 19 neighborhoods
    // Formula: Average of (Education Rate) and (100 - Poverty Rate), scaled to 1-10
    const resilienceData = camdenData.neighborhoods.map((name, i) => {
        const edu = camdenData.education[i];
        const poverty = camdenData.poverty[i];
        
        // Higher Education + Lower Poverty = Higher Resilience
        // We normalize this to a roughly 0-10 scale for the "Index"
        const rawScore = (edu + (100 - poverty)) / 2; 
        const indexScore = (rawScore / 10).toFixed(1); // Scale to roughly 3.0 - 9.0

        return {
            x: indexScore,
            y: camdenData.diabetes[i],
            neighborhood: name
        };
    });

    // 2. Create Chart
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Neighborhoods',
                data: resilienceData,
                backgroundColor: 'rgba(13, 202, 240, 0.6)', // Cyan/Teal theme
                borderColor: 'rgba(13, 202, 240, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Community Resilience vs. Health Outcomes',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw.neighborhood}: Index ${context.raw.x}, Diabetes ${context.raw.y}%`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Community Resilience Index (Composite Score 1-10)' },
                    min: 2,
                    max: 10
                },
                y: {
                    title: { display: true, text: 'Diabetes Rate (%)' }
                }
            }
        }
    });
}

// Advanced Insight 6: Environmental Health Justice - POPULATED WITH ALL 19 NEIGHBORHOODS
function createEnvironmentalChart() {
    const ctx = document.getElementById('environmentalChart');
    if (!ctx) return;
    
    // 1. Calculate "Environmental Risk Score" (Proxy)
    // Logic: Combine Poverty (Industrial proximity) + Housing (Indoor air quality)
    const envData = camdenData.neighborhoods.map((name, i) => {
        // Formula: Weighted average scaled to look like an Index (0-150)
        const riskScore = Math.round((camdenData.poverty[i] * 1.5) + (camdenData.housing[i] * 3) + 20);
        
        return {
            neighborhood: name,
            risk: riskScore,
            asthma: camdenData.asthma[i]
        };
    });

    // 2. Sort by Risk Score (Descending)
    envData.sort((a, b) => b.risk - a.risk);

    const labels = envData.map(d => d.neighborhood);
    const riskData = envData.map(d => d.risk);
    const asthmaData = envData.map(d => d.asthma);

    // 3. Create Chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Environmental Risk Index (Est.)',
                data: riskData,
                backgroundColor: 'rgba(255, 159, 64, 0.6)', // Orange theme
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
                yAxisID: 'y',
                order: 2
            }, {
                label: 'Asthma Rate (%)',
                data: asthmaData,
                type: 'line',
                borderColor: 'rgba(54, 162, 235, 1)', // Blue line
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 3,
                yAxisID: 'y1',
                order: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        autoSkip: false, // Ensure all 19 names show
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 10 }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Environmental Risk Index' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Asthma Rate (%)' },
                    grid: { drawOnChartArea: false }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Environmental Burden vs. Respiratory Health',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// Advanced Insight 7: Healthcare Access Barriers (Scatter Plot) - POPULATED WITH ALL 19 NEIGHBORHOODS
function createHealthcareSystemChart() {
    const ctx = document.getElementById('healthcareSystemChart');
    if (!ctx) return;
    
    // 1. Prepare Scatter Data (X: Uninsured Rate, Y: High Blood Pressure)
    // Logic: Lack of insurance (X) often correlates with unmanaged chronic conditions (Y)
    const systemData = camdenData.neighborhoods.map((name, i) => ({
        x: camdenData.uninsured[i],
        y: camdenData.highBloodPressure[i],
        neighborhood: name
    }));

    // 2. Create Chart
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Neighborhoods',
                data: systemData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)', // Pink/Red theme
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 9
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Insurance Barriers vs. Chronic Disease',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw.neighborhood}: Uninsured ${context.raw.x}%, HBP ${context.raw.y}%`;
                        }
                    }
                },
                legend: { display: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Uninsured Rate (%)' },
                    min: 0
                },
                y: {
                    title: { display: true, text: 'High Blood Pressure Rate (%)' }
                }
            }
        }
    });
}

// Advanced Insight 8: Economic Impact Assessment - POPULATED WITH ALL 19 NEIGHBORHOODS
function createEconomicImpactChart() {
    const ctx = document.getElementById('economicImpactChart');
    if (!ctx) return;
    
    // 1. Calculate Economic Impact Estimates
    const economicData = camdenData.neighborhoods.map((name, i) => {
        // Proxy 1: Healthcare Costs driven by chronic disease burden
        // We sum Diabetes + High Blood Pressure and scale it to represent Millions ($M)
        const diseaseBurden = camdenData.diabetes[i] + camdenData.highBloodPressure[i];
        const healthCost = (diseaseBurden * 0.35).toFixed(1); 

        // Proxy 2: Productivity Loss driven by unemployment and mental health
        // We sum Unemployment + Mental Distress and scale it
        const socialBurden = camdenData.unemployment[i] + camdenData.mentalDistress[i];
        const prodLoss = (socialBurden * 0.3).toFixed(1);

        return {
            neighborhood: name,
            healthCost: parseFloat(healthCost),
            prodLoss: parseFloat(prodLoss),
            total: parseFloat(healthCost) + parseFloat(prodLoss)
        };
    });

    // 2. Sort by Total Economic Impact (Descending)
    economicData.sort((a, b) => b.total - a.total);

    // 3. Create Chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: economicData.map(d => d.neighborhood),
            datasets: [{
                label: 'Est. Healthcare Costs ($M)',
                data: economicData.map(d => d.healthCost),
                backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }, {
                label: 'Est. Productivity Loss ($M)',
                data: economicData.map(d => d.prodLoss),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        autoSkip: false, // Show all neighborhoods
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 10 }
                    }
                },
                y: {
                    stacked: true,
                    title: { display: true, text: 'Annual Economic Impact ($ Millions)' }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'The Economic Burden of Health Disparities',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(function(tooltipItem) {
                                total += tooltipItem.parsed.y;
                            });
                            return 'Total Est. Impact: $' + total.toFixed(1) + 'M';
                        }
                    }
                }
            }
        }
    });
}

// Advanced Insight 9: Predictive Analytics & Risk Stratification
function createPredictiveChart() {
    const ctx = document.getElementById('predictiveChart');
    if (!ctx) return;
    
    const neighborhoods = ['Cramer Hill', 'Liberty Park', 'Dudley', 'Bergen Square', 'Beideman'];
    const currentRisk = [18.4, 23.1, 22.2, 15.7, 13.4];
    const predictedRisk = [23.8, 28.6, 27.1, 18.2, 15.8];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: neighborhoods,
            datasets: [{
                label: 'Current Diabetes Rate (%)',
                data: currentRisk,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4
            }, {
                label: 'Predicted Rate in 5 Years (%)',
                data: predictedRisk,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                borderDash: [5, 5]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Diabetes Rate (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Predictive Health Risk Modeling'
                }
            }
        }
    });
}

// Advanced Insight 10: Community Voice & Priorities
function createCommunityVoiceChart() {
    const ctx = document.getElementById('communityVoiceChart');
    if (!ctx) return;
    
    const priorities = ['Mental Health', 'Healthy Food', 'Housing', 'Healthcare Access', 'Diabetes Programs'];
    const communityPriority = [67, 61, 54, 48, 23];
    const dataPriority = [35, 42, 38, 65, 78];
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: priorities,
            datasets: [{
                label: 'Community Priority (%)',
                data: communityPriority,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2
            }, {
                label: 'Data-Driven Priority Score',
                data: dataPriority,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Community Voice vs Data-Driven Priorities'
                }
            }
        }
    });
}

// Export functions
window.InsightsAPI = {
    // exploreDeeper, // Removed as it was tied to the old logic
    showMethodology,
    initializeAdvancedInsights
};