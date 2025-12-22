// Camden Health Equity Dashboard - Fixed Version
// Variables for maps and data
let leftMap, rightMap;
let leftPolygons = [];
let rightPolygons = [];

// Camden neighborhoods with authentic 2022 Census data
const camdenNeighborhoods = [
    {
        name: 'Gateway',
        bounds: [[39.9467867, -75.1066438], [39.9467867, -75.0966438], [39.9267867, -75.0966438], [39.9267867, -75.1066438]],
        data: {
            diabetes: 17.0,
            obesity: 43.9,
            asthma: 12.1,
            mental_distress: 20.3,
            high_blood_pressure: 37.4,
            income: 26750,
            education: 69.34,
            food_access: 22.7,
            poverty_rate: 30.78,
            unemployment: 28.59,
            population: 1693,
            healthcare_access: 77.1,
            lack_health_insurance: 17.0,
            visited_dentist: 43.7
        }
    },
    {
        name: 'Bergen Square',
        bounds: [[39.9429218, -75.128088], [39.9429218, -75.108088], [39.9229218, -75.108088], [39.9229218, -75.128088]],
        data: {
            diabetes: 15.7,
            obesity: 47.6,
            asthma: 11.7,
            mental_distress: 24.1,
            high_blood_pressure: 40.4,
            income: 12104,
            education: 57.70,
            food_access: 29.8,
            poverty_rate: 54.36,
            unemployment: 34.22,
            population: 2766,
            healthcare_access: 76.1,
            lack_health_insurance: 20.1,
            visited_dentist: 32.3
        }
    },
    {
        name: 'Cooper Poynt',
        bounds: [[39.9660192, -75.1355342], [39.9660192, -75.1155342], [39.9460192, -75.1155342], [39.9460192, -75.1355342]],
        data: {
            diabetes: 18.9,
            obesity: 44.8,
            asthma: 14.3,
            mental_distress: 22.3,
            high_blood_pressure: 41.0,
            income: 29789,
            education: 41.41,
            food_access: 32.2,
            poverty_rate: 36.71,
            unemployment: 11.43,
            population: 1338,
            healthcare_access: 75.1,
            lack_health_insurance: 19.5,
            visited_dentist: 37.0
        }
    },
    {
        name: 'Pyne Point',
        bounds: [[39.9613992, -75.1238308], [39.9613992, -75.1038308], [39.9413992, -75.1038308], [39.9413992, -75.1238308]],
        data: {
            diabetes: 21.4,
            obesity: 46.6,
            asthma: 12.9,
            mental_distress: 22.9,
            high_blood_pressure: 35.6,
            income: 19412,
            education: 36.94,
            food_access: 36.1,
            poverty_rate: 39.82,
            unemployment: 14.21,
            population: 5211,
            healthcare_access: 75.7,
            lack_health_insurance: 19.3,
            visited_dentist: 31.4
        }
    },
    {
        name: 'Cramer Hill',
        bounds: [[39.963326, -75.1115696], [39.963326, -75.0915696], [39.943326, -75.0915696], [39.943326, -75.1115696]],
        data: {
            diabetes: 18.4,
            obesity: 44.8,
            asthma: 14.1,
            mental_distress: 25.6,
            high_blood_pressure: 48.5,
            income: 28198,
            education: 25.47,
            food_access: 39.9,
            poverty_rate: 38.68,
            unemployment: 9.42,
            population: 3804,
            healthcare_access: 71.5,
            lack_health_insurance: 21.8,
            visited_dentist: 30.2
        }
    },
    {
        name: 'Beideman',
        bounds: [[39.9712414, -75.1001841], [39.9712414, -75.0801841], [39.9512414, -75.0801841], [39.9512414, -75.1001841]],
        data: {
            diabetes: 13.4,
            obesity: 40.2,
            asthma: 13.0,
            mental_distress: 19.1,
            high_blood_pressure: 45.1,
            income: 58983,
            education: 43.14,
            food_access: 29.7,
            poverty_rate: 11.91,
            unemployment: 9.73,
            population: 5645,
            healthcare_access: 73.4,
            lack_health_insurance: 17.5,
            visited_dentist: 46.7
        }
    },
    {
        name: 'Dudley',
        bounds: [[39.9586791, -75.0968346], [39.9586791, -75.0768346], [39.9386791, -75.0768346], [39.9386791, -75.0968346]],
        data: {
            diabetes: 22.2,
            obesity: 41.8,
            asthma: 12.4,
            mental_distress: 20.9,
            high_blood_pressure: 48.7,
            income: 35491,
            education: 37.81,
            food_access: 34.2,
            poverty_rate: 24.96,
            unemployment: 3.93,
            population: 3295,
            healthcare_access: 73.5,
            lack_health_insurance: 18.4,
            visited_dentist: 39.0
        }
    },
    {
        name: 'Rosedale',
        bounds: [[39.963376, -75.0887951], [39.963376, -75.0687951], [39.943376, -75.0687951], [39.943376, -75.0887951]],
        data: {
            diabetes: 16.9,
            obesity: 38.8,
            asthma: 13.1,
            mental_distress: 18.6,
            high_blood_pressure: 38.6,
            income: 51741,
            education: 44.01,
            food_access: 28.7,
            poverty_rate: 19.22,
            unemployment: 13.15,
            population: 5044,
            healthcare_access: 75.3,
            lack_health_insurance: 16.9,
            visited_dentist: 45.0
        }
    },
    {
        name: 'Stockton',
        bounds: [[39.954511, -75.0878698], [39.954511, -75.0678698], [39.934511, -75.0678698], [39.934511, -75.0878698]],
        data: {
            diabetes: 17.9,
            obesity: 41.9,
            asthma: 11.2,
            mental_distress: 20.1,
            high_blood_pressure: 36.3,
            income: 44357,
            education: 49.38,
            food_access: 27.4,
            poverty_rate: 20.17,
            unemployment: 5.94,
            population: 6529,
            healthcare_access: 74.9,
            lack_health_insurance: 17.8,
            visited_dentist: 43.0
        }
    },
    {
        name: 'Marlton',
        bounds: [[39.9518771, -75.1039846], [39.9518771, -75.0839846], [39.9318771, -75.0839846], [39.9318771, -75.1039846]],
        data: {
            diabetes: 19.2,
            obesity: 43.2,
            asthma: 11.5,
            mental_distress: 21.0,
            high_blood_pressure: 42.7,
            income: 31312,
            education: 45.20,
            food_access: 28.6,
            poverty_rate: 30.43,
            unemployment: 16.67,
            population: 4726,
            healthcare_access: 74.9,
            lack_health_insurance: 18.2,
            visited_dentist: 41.3
        }
    },
    {
        name: 'Parkside',
        bounds: [[39.9415865, -75.1044043], [39.9415865, -75.0844043], [39.9215865, -75.0844043], [39.9215865, -75.1044043]],
        data: {
            diabetes: 15.0,
            obesity: 46.1,
            asthma: 10.6,
            mental_distress: 21.9,
            high_blood_pressure: 40.2,
            income: 45662,
            education: 48.07,
            food_access: 19.4,
            poverty_rate: 19.40,
            unemployment: 26.16,
            population: 4181,
            healthcare_access: 80.0,
            lack_health_insurance: 17.7,
            visited_dentist: 40.7
        }
    },
    {
        name: 'Whitman Park',
        bounds: [[39.9343304, -75.109164], [39.9343304, -75.089164], [39.9143304, -75.089164], [39.9143304, -75.109164]],
        data: {
            diabetes: 21.5,
            obesity: 44.8,
            asthma: 10.6,
            mental_distress: 22.0,
            high_blood_pressure: 35.1,
            income: 31941,
            education: 60.14,
            food_access: 21.8,
            poverty_rate: 28.40,
            unemployment: 18.81,
            population: 5394,
            healthcare_access: 77.8,
            lack_health_insurance: 18.2,
            visited_dentist: 40.2
        }
    },
    {
        name: 'Liberty Park',
        bounds: [[39.9360337, -75.1208546], [39.9360337, -75.1008546], [39.9160337, -75.1008546], [39.9160337, -75.1208546]],
        data: {
            diabetes: 23.1,
            obesity: 48.7,
            asthma: 11.0,
            mental_distress: 24.9,
            high_blood_pressure: 43.6,
            income: 29210,
            education: 55.44,
            food_access: 25.4,
            poverty_rate: 26.21,
            unemployment: 11.37,
            population: 2401,
            healthcare_access: 78.3,
            lack_health_insurance: 19.6,
            visited_dentist: 31.8
        }
    },
    {
        name: 'Centerville',
        bounds: [[39.9299937, -75.1197457], [39.9299937, -75.0997457], [39.9099937, -75.0997457], [39.9099937, -75.1197457]],
        data: {
            diabetes: 14.7,
            obesity: 51.4,
            asthma: 13.4,
            mental_distress: 25.5,
            high_blood_pressure: 35.4,
            income: 22181,
            education: 41.57,
            food_access: 26.9,
            poverty_rate: 42.97,
            unemployment: 25.90,
            population: 2805,
            healthcare_access: 79.6,
            lack_health_insurance: 20.4,
            visited_dentist: 30.4
        }
    },
    {
        name: 'Waterfront South',
        bounds: [[39.9279505, -75.1342548], [39.9279505, -75.1142548], [39.9079505, -75.1142548], [39.9079505, -75.1342548]],
        data: {
            diabetes: 20.3,
            obesity: 44.3,
            asthma: 10.4,
            mental_distress: 22.1,
            high_blood_pressure: 36.4,
            income: 54324,
            education: 43.90,
            food_access: 24.6,
            poverty_rate: 40.45,
            unemployment: 8.51,
            population: 918,
            healthcare_access: 76.9,
            lack_health_insurance: 18.8,
            visited_dentist: 38.7
        }
    },
    {
        name: 'Morgan Village',
        bounds: [[39.9233727, -75.1190977], [39.9233727, -75.0990977], [39.9033727, -75.0990977], [39.9033727, -75.1190977]],
        data: {
            diabetes: 17.5,
            obesity: 45.7,
            asthma: 11.3,
            mental_distress: 22.4,
            high_blood_pressure: 46.7,
            income: 34796,
            education: 61.16,
            food_access: 21.9,
            poverty_rate: 32.57,
            unemployment: 9.16,
            population: 2701,
            healthcare_access: 78.1,
            lack_health_insurance: 18.7,
            visited_dentist: 40.4
        }
    },
    {
        name: 'Fairview',
        bounds: [[39.9146814, -75.115114], [39.9146814, -75.095114], [39.8946814, -75.095114], [39.8946814, -75.115114]],
        data: {
            diabetes: 17.3,
            obesity: 43.6,
            asthma: 12.7,
            mental_distress: 20.9,
            high_blood_pressure: 40.4,
            income: 41840,
            education: 62.64,
            food_access: 19.3,
            poverty_rate: 20.76,
            unemployment: 24.87,
            population: 6221,
            healthcare_access: 77.5,
            lack_health_insurance: 18.4,
            visited_dentist: 46.5
        }
    },
    {
        name: 'Cooper Grant',
        bounds: [[39.9505574, -75.140422], [39.9505574, -75.120422], [39.9305574, -75.120422], [39.9305574, -75.140422]],
        data: {
            diabetes: 19.4,
            obesity: 36.0,
            asthma: 12.3,
            mental_distress: 19.2,
            high_blood_pressure: 38.5,
            income: 51635,
            education: 90.55,
            food_access: 14.7,
            poverty_rate: 41.01,
            unemployment: 14.15,
            population: 2274,
            healthcare_access: 76.5,
            lack_health_insurance: 17.8,
            visited_dentist: 51.9
        }
    },
    {
        name: 'Lanning Square',
        bounds: [[39.9512705, -75.1290591], [39.9512705, -75.1090591], [39.9312705, -75.1090591], [39.9312705, -75.1290591]],
        data: {
            diabetes: 18.0,
            obesity: 41.3,
            asthma: 13.4,
            mental_distress: 21.0,
            high_blood_pressure: 47.7,
            income: 38447,
            education: 61.43,
            food_access: 22.2,
            poverty_rate: 18.62,
            unemployment: 8.24,
            population: 4853,
            healthcare_access: 74.7,
            lack_health_insurance: 17.4,
            visited_dentist: 42.7
        }
    }
];

// Initialize maps when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Camden Health Dashboard...');
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    // Initialize maps
    initializeMaps();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
    
    // Initialize charts
    initializeAllCharts();
});

// Initialize both maps
function initializeMaps() {
    try {
        console.log('Creating left map...');
        leftMap = L.map('leftMap').setView([39.9259, -75.1196], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(leftMap);
        
        console.log('Creating right map...');
        rightMap = L.map('rightMap').setView([39.9259, -75.1196], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(rightMap);
        
        console.log('Maps initialized successfully');
    } catch (error) {
        console.error('Error initializing maps:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    const leftSelector = document.getElementById('leftMapSelector');
    const rightSelector = document.getElementById('rightMapSelector');
    
    if (leftSelector) {
        leftSelector.addEventListener('change', function() {
            updateLeftMap(this.value);
            updateMetrics();
        });
    }
    
    if (rightSelector) {
        rightSelector.addEventListener('change', function() {
            updateRightMap(this.value);
            updateMetrics();
        });
    }
}

// Load initial data
function loadInitialData() {
    console.log('Loading initial data...');
    updateLeftMap('diabetes');
    updateRightMap('income');
    updateMetrics();
}

// Update left map
function updateLeftMap(metric) {
    if (!leftMap) return;
    
    console.log('Updating left map with metric:', metric);
    
    // Clear existing polygons
    leftPolygons.forEach(polygon => leftMap.removeLayer(polygon));
    leftPolygons = [];
    
    // Add neighborhood polygons
    camdenNeighborhoods.forEach(neighborhood => {
        const value = neighborhood.data[metric];
        if (value === undefined) return;
        
        const color = getColorForValue(value, metric);
        
        const polygon = L.polygon(neighborhood.bounds, {
            color: '#ffffff',
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: 0.7
        }).addTo(leftMap);
        
        polygon.bindPopup(`
            <div>
                <h6>${neighborhood.name}</h6>
                <p><strong>${getMetricLabel(metric)}:</strong> ${formatValue(value, metric)}</p>
            </div>
        `);
        
        leftPolygons.push(polygon);
    });
    
    console.log(`Added ${leftPolygons.length} polygons to left map`);
}

// Update right map
function updateRightMap(metric) {
    if (!rightMap) return;
    
    console.log('Updating right map with metric:', metric);
    
    // Clear existing polygons
    rightPolygons.forEach(polygon => rightMap.removeLayer(polygon));
    rightPolygons = [];
    
    // Add neighborhood polygons
    camdenNeighborhoods.forEach(neighborhood => {
        const value = neighborhood.data[metric];
        if (value === undefined) return;
        
        const color = getColorForValue(value, metric);
        
        const polygon = L.polygon(neighborhood.bounds, {
            color: '#ffffff',
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: 0.7
        }).addTo(rightMap);
        
        polygon.bindPopup(`
            <div>
                <h6>${neighborhood.name}</h6>
                <p><strong>${getMetricLabel(metric)}:</strong> ${formatValue(value, metric)}</p>
            </div>
        `);
        
        rightPolygons.push(polygon);
    });
    
    console.log(`Added ${rightPolygons.length} polygons to right map`);
}

// Get color for value
function getColorForValue(value, metric) {
    const values = camdenNeighborhoods.map(n => n.data[metric]).filter(v => v !== undefined);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const normalized = (value - min) / (max - min);
    
    // Health metrics: red = bad, green = good
    if (['diabetes', 'obesity', 'asthma', 'mental_distress', 'high_blood_pressure', 'poverty_rate', 'unemployment', 'lack_health_insurance'].includes(metric)) {
        const red = Math.floor(255 * normalized);
        const green = Math.floor(255 * (1 - normalized));
        return `rgb(${red}, ${green}, 0)`;
    }
    
    // Good metrics: green = good, red = bad
    const green = Math.floor(255 * normalized);
    const red = Math.floor(255 * (1 - normalized));
    return `rgb(${red}, ${green}, 0)`;
}

// Get metric label
function getMetricLabel(metric) {
    const labels = {
        diabetes: 'Diabetes Rate',
        obesity: 'Obesity Rate',
        asthma: 'Asthma Rate',
        mental_distress: 'Mental Distress',
        high_blood_pressure: 'High Blood Pressure',
        income: 'Median Income',
        education: 'Education Level',
        food_access: 'Food Access Score',
        poverty_rate: 'Poverty Rate',
        unemployment: 'Unemployment Rate',
        healthcare_access: 'Healthcare Access',
        lack_health_insurance: 'Uninsured Rate',
        visited_dentist: 'Visited Dentist'
    };
    return labels[metric] || metric;
}

// Format value
function formatValue(value, metric) {
    if (metric === 'income') {
        return `$${value.toLocaleString()}`;
    }
    return `${value.toFixed(1)}%`;
}

// Update metrics
function updateMetrics() {
    const leftMetric = document.getElementById('leftMapSelector')?.value || 'diabetes';
    const rightMetric = document.getElementById('rightMapSelector')?.value || 'income';
    
    const leftValues = camdenNeighborhoods.map(n => n.data[leftMetric]).filter(v => v !== undefined);
    const rightValues = camdenNeighborhoods.map(n => n.data[rightMetric]).filter(v => v !== undefined);
    
    if (leftValues.length === 0 || rightValues.length === 0) return;
    
    // Calculate disparity index
    const leftMean = leftValues.reduce((a, b) => a + b) / leftValues.length;
    const leftStd = Math.sqrt(leftValues.reduce((sum, val) => sum + Math.pow(val - leftMean, 2), 0) / leftValues.length);
    const disparityIndex = leftMean === 0 ? 0 : (leftStd / leftMean * 100);
    
    // Calculate correlation
    const correlation = calculateCorrelation(leftValues, rightValues);
    
    // Calculate equity gap
    const equityGap = Math.max(...leftValues) - Math.min(...leftValues);
    
    // Update display
    updateElement('disparityScore', disparityIndex.toFixed(1));
    updateElement('correlationScore', correlation.toFixed(2));
    updateElement('equityScore', equityGap.toFixed(1));
    
    console.log('Metrics updated:', {disparityIndex, correlation, equityGap});
}

// Calculate correlation
function calculateCorrelation(x, y) {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
}

// Update element safely
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Initialize all charts
function initializeAllCharts() {
    console.log('Initializing charts...');
    
    // Neighborhood chart - Show top 10 neighborhoods by diabetes rate
    const neighborhoodCanvas = document.getElementById('neighborhoodChart');
    if (neighborhoodCanvas) {
        const ctx = neighborhoodCanvas.getContext('2d');
        const sortedNeighborhoods = [...camdenNeighborhoods]
            .sort((a, b) => b.data.diabetes - a.data.diabetes)
            .slice(0, 10);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedNeighborhoods.map(n => n.name),
                datasets: [{
                    label: 'Diabetes Rate (%)',
                    data: sortedNeighborhoods.map(n => n.data.diabetes),
                    backgroundColor: sortedNeighborhoods.map(n => {
                        const rate = n.data.diabetes;
                        if (rate > 20) return 'rgba(220, 53, 69, 0.8)';
                        if (rate > 17) return 'rgba(255, 193, 7, 0.8)';
                        return 'rgba(25, 135, 84, 0.8)';
                    }),
                    borderColor: 'rgba(108, 117, 125, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 10 Neighborhoods by Diabetes Rate (2022 Data)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Diabetes Rate (%)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }
    
    // Demographics chart - Income distribution
    const demographicsCanvas = document.getElementById('demographicsChart');
    if (demographicsCanvas) {
        const ctx = demographicsCanvas.getContext('2d');
        const incomeRanges = [
            { range: 'Under $25K', neighborhoods: camdenNeighborhoods.filter(n => n.data.income < 25000) },
            { range: '$25K - $35K', neighborhoods: camdenNeighborhoods.filter(n => n.data.income >= 25000 && n.data.income < 35000) },
            { range: '$35K - $45K', neighborhoods: camdenNeighborhoods.filter(n => n.data.income >= 35000 && n.data.income < 45000) },
            { range: '$45K - $55K', neighborhoods: camdenNeighborhoods.filter(n => n.data.income >= 45000 && n.data.income < 55000) },
            { range: '$55K+', neighborhoods: camdenNeighborhoods.filter(n => n.data.income >= 55000) }
        ];
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: incomeRanges.map(r => r.range),
                datasets: [{
                    data: incomeRanges.map(r => r.neighborhoods.length),
                    backgroundColor: [
                        'rgba(220, 53, 69, 0.8)',
                        'rgba(255, 193, 7, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(25, 135, 84, 0.8)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Camden Neighborhoods by Income Range (2022)'
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Trend chart - Health vs Income correlation
    const trendCanvas = document.getElementById('trendChart');
    if (trendCanvas) {
        const ctx = trendCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Diabetes vs Income',
                    data: camdenNeighborhoods.map(n => ({
                        x: n.data.income / 1000,
                        y: n.data.diabetes
                    })),
                    backgroundColor: 'rgba(220, 53, 69, 0.6)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Health vs Income Correlation (2022 Data)'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Median Income ($1000s)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Diabetes Rate (%)'
                        }
                    }
                }
            }
        });
    }
    
    // SDOH chart - Social determinants comparison
    const sdohCanvas = document.getElementById('sdohChart');
    if (sdohCanvas) {
        const ctx = sdohCanvas.getContext('2d');
        const avgData = {
            poverty: camdenNeighborhoods.reduce((sum, n) => sum + n.data.poverty_rate, 0) / camdenNeighborhoods.length,
            unemployment: camdenNeighborhoods.reduce((sum, n) => sum + n.data.unemployment, 0) / camdenNeighborhoods.length,
            education: camdenNeighborhoods.reduce((sum, n) => sum + n.data.education, 0) / camdenNeighborhoods.length,
            healthcare: camdenNeighborhoods.reduce((sum, n) => sum + n.data.healthcare_access, 0) / camdenNeighborhoods.length
        };
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Poverty Rate', 'Unemployment', 'Education Level', 'Healthcare Access'],
                datasets: [{
                    label: 'Camden Average',
                    data: [avgData.poverty, avgData.unemployment, avgData.education, avgData.healthcare],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Social Determinants of Health - Camden Average'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    console.log('All charts initialized with authentic Camden data');
}

// Export functions for template
window.startTour = function() {
    alert('Welcome to the Camden Health Equity Dashboard! Use the dropdown menus to explore different health metrics and social determinants across Camden neighborhoods.');
};

window.exportData = function(format) {
    console.log('Exporting data as:', format);
    alert(`Data export (${format}) functionality will be available soon.`);
};

console.log('Dashboard script loaded');