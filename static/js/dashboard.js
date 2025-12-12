// CHEDVI - Dashboard JavaScript - Dual Map with Overlay

let leftMap;
let rightMap;
let overlayMap;
let leftPolygons = [];
let rightPolygons = [];
let overlayPolygons = [];
let neighborhoodChart;
let trendChart;
let demographicsChart;
let sdohChart;

// Real Camden neighborhood data from official health equity database
const camdenNeighborhoods = [
    {
        name: 'Gateway',
        coords: generateNeighborhoodBounds(39.9367867, -75.1066438),
        center: [39.9367867, -75.1066438],
        data: {
            diabetes: 17.0, obesity: 43.9, asthma: 12.1, mental_distress: 20.3, high_blood_pressure: 37.4,
            income: 26750, education: 69.34, food_access: 34.04, poverty_rate: 30.78, unemployment: 28.59,
            population: 1693, healthcare_access: 77.1, lack_health_insurance: 22.7
        }
    },
    {
        name: 'Bergen Square',
        coords: generateNeighborhoodBounds(39.9329218, -75.118088),
        center: [39.9329218, -75.118088],
        data: {
            diabetes: 15.7, obesity: 47.6, asthma: 11.7, mental_distress: 24.1, high_blood_pressure: 40.4,
            income: 12104, education: 57.70, food_access: 77.61, poverty_rate: 54.36, unemployment: 34.22,
            population: 2766, healthcare_access: 76.1, lack_health_insurance: 29.8
        }
    },
    {
        name: 'Cooper Poynt',
        coords: generateNeighborhoodBounds(39.9560192, -75.1255342),
        center: [39.9560192, -75.1255342],
        data: {
            diabetes: 18.9, obesity: 44.8, asthma: 14.3, mental_distress: 22.3, high_blood_pressure: 41.0,
            income: 29789, education: 41.41, food_access: 8.97, poverty_rate: 36.71, unemployment: 11.43,
            population: 1338, healthcare_access: 75.1, lack_health_insurance: 32.2
        }
    },
    {
        name: 'Pyne Point',
        coords: generateNeighborhoodBounds(39.9513992, -75.1138308),
        center: [39.9513992, -75.1138308],
        data: {
            diabetes: 21.4, obesity: 46.6, asthma: 12.9, mental_distress: 22.9, high_blood_pressure: 35.6,
            income: 19412, education: 36.94, food_access: 0.31, poverty_rate: 39.82, unemployment: 14.21,
            population: 5211, healthcare_access: 75.7, lack_health_insurance: 36.1
        }
    },
    {
        name: 'Cramer Hill',
        coords: generateNeighborhoodBounds(39.953326, -75.1015696),
        center: [39.953326, -75.1015696],
        data: {
            diabetes: 18.4, obesity: 44.8, asthma: 14.1, mental_distress: 25.6, high_blood_pressure: 48.5,
            income: 28198, education: 25.47, food_access: 1.16, poverty_rate: 38.68, unemployment: 9.42,
            population: 3804, healthcare_access: 71.5, lack_health_insurance: 39.9
        }
    },
    {
        name: 'Beideman',
        coords: generateNeighborhoodBounds(39.9612414, -75.0901841),
        center: [39.9612414, -75.0901841],
        data: {
            diabetes: 13.4, obesity: 40.2, asthma: 13.0, mental_distress: 19.1, high_blood_pressure: 45.1,
            income: 58983, education: 43.14, food_access: 44.54, poverty_rate: 11.91, unemployment: 9.73,
            population: 5645, healthcare_access: 73.4, lack_health_insurance: 29.7
        }
    },
    {
        name: 'Dudley',
        coords: generateNeighborhoodBounds(39.9486791, -75.0868346),
        center: [39.9486791, -75.0868346],
        data: {
            diabetes: 22.2, obesity: 41.8, asthma: 12.4, mental_distress: 20.9, high_blood_pressure: 48.7,
            income: 35491, education: 37.81, food_access: 1.64, poverty_rate: 24.96, unemployment: 3.93,
            population: 3295, healthcare_access: 73.5, lack_health_insurance: 34.2
        }
    },
    {
        name: 'Rosedale',
        coords: generateNeighborhoodBounds(39.953376, -75.0787951),
        center: [39.953376, -75.0787951],
        data: {
            diabetes: 16.9, obesity: 38.8, asthma: 13.1, mental_distress: 18.6, high_blood_pressure: 38.6,
            income: 51741, education: 44.01, food_access: 28.39, poverty_rate: 19.22, unemployment: 13.15,
            population: 5044, healthcare_access: 75.3, lack_health_insurance: 28.7
        }
    },
    {
        name: 'Stockton',
        coords: generateNeighborhoodBounds(39.944511, -75.0778698),
        center: [39.944511, -75.0778698],
        data: {
            diabetes: 17.9, obesity: 41.9, asthma: 11.2, mental_distress: 20.1, high_blood_pressure: 36.3,
            income: 44357, education: 49.38, food_access: 1.64, poverty_rate: 20.17, unemployment: 5.94,
            population: 6529, healthcare_access: 74.9, lack_health_insurance: 27.4
        }
    },
    {
        name: 'Marlton',
        coords: generateNeighborhoodBounds(39.9418771, -75.0939846),
        center: [39.9418771, -75.0939846],
        data: {
            diabetes: 19.2, obesity: 43.2, asthma: 11.5, mental_distress: 21.0, high_blood_pressure: 42.7,
            income: 31312, education: 45.20, food_access: 0.06, poverty_rate: 30.43, unemployment: 16.67,
            population: 4726, healthcare_access: 74.9, lack_health_insurance: 28.6
        }
    },
    {
        name: 'Parkside',
        coords: generateNeighborhoodBounds(39.9315865, -75.0944043),
        center: [39.9315865, -75.0944043],
        data: {
            diabetes: 15.0, obesity: 46.1, asthma: 10.6, mental_distress: 21.9, high_blood_pressure: 40.2,
            income: 45662, education: 48.07, food_access: 6.07, poverty_rate: 19.40, unemployment: 26.16,
            population: 4181, healthcare_access: 80.0, lack_health_insurance: 19.4
        }
    },
    {
        name: 'Whitman Park',
        coords: generateNeighborhoodBounds(39.9243304, -75.099164),
        center: [39.9243304, -75.099164],
        data: {
            diabetes: 21.5, obesity: 44.8, asthma: 10.6, mental_distress: 22.0, high_blood_pressure: 35.1,
            income: 31941, education: 60.14, food_access: 5.25, poverty_rate: 28.40, unemployment: 18.81,
            population: 5394, healthcare_access: 77.8, lack_health_insurance: 21.8
        }
    },
    {
        name: 'Liberty Park',
        coords: generateNeighborhoodBounds(39.9260337, -75.1108546),
        center: [39.9260337, -75.1108546],
        data: {
            diabetes: 23.1, obesity: 48.7, asthma: 11.0, mental_distress: 24.9, high_blood_pressure: 43.6,
            income: 29210, education: 55.44, food_access: 45.53, poverty_rate: 26.21, unemployment: 11.37,
            population: 2401, healthcare_access: 78.3, lack_health_insurance: 25.4
        }
    },
    {
        name: 'Centerville',
        coords: generateNeighborhoodBounds(39.9199937, -75.1097457),
        center: [39.9199937, -75.1097457],
        data: {
            diabetes: 14.7, obesity: 51.4, asthma: 13.4, mental_distress: 25.5, high_blood_pressure: 35.4,
            income: 22181, education: 41.57, food_access: 77.96, poverty_rate: 42.97, unemployment: 25.90,
            population: 2805, healthcare_access: 79.6, lack_health_insurance: 26.9
        }
    },
    {
        name: 'Waterfront South',
        coords: generateNeighborhoodBounds(39.9179505, -75.1242548),
        center: [39.9179505, -75.1242548],
        data: {
            diabetes: 20.3, obesity: 44.3, asthma: 10.4, mental_distress: 22.1, high_blood_pressure: 36.4,
            income: 54324, education: 43.90, food_access: 81.58, poverty_rate: 40.45, unemployment: 8.51,
            population: 918, healthcare_access: 76.9, lack_health_insurance: 24.6
        }
    },
    {
        name: 'Morgan Village',
        coords: generateNeighborhoodBounds(39.9133727, -75.1090977),
        center: [39.9133727, -75.1090977],
        data: {
            diabetes: 17.5, obesity: 45.7, asthma: 11.3, mental_distress: 22.4, high_blood_pressure: 46.7,
            income: 34796, education: 61.16, food_access: 42.91, poverty_rate: 32.57, unemployment: 9.16,
            population: 2701, healthcare_access: 78.1, lack_health_insurance: 21.9
        }
    },
    {
        name: 'Fairview',
        coords: generateNeighborhoodBounds(39.9046814, -75.105114),
        center: [39.9046814, -75.105114],
        data: {
            diabetes: 17.3, obesity: 43.6, asthma: 12.7, mental_distress: 20.9, high_blood_pressure: 40.4,
            income: 41840, education: 62.64, food_access: 27.51, poverty_rate: 20.76, unemployment: 24.87,
            population: 6221, healthcare_access: 77.5, lack_health_insurance: 19.3
        }
    },
    {
        name: 'Cooper Grant',
        coords: generateNeighborhoodBounds(39.9405574, -75.130422),
        center: [39.9405574, -75.130422],
        data: {
            diabetes: 19.4, obesity: 36.0, asthma: 12.3, mental_distress: 19.2, high_blood_pressure: 38.5,
            income: 51635, education: 90.55, food_access: 29.17, poverty_rate: 41.01, unemployment: 14.15,
            population: 2274, healthcare_access: 76.5, lack_health_insurance: 14.7
        }
    },
    {
        name: 'Lanning Square',
        coords: generateNeighborhoodBounds(39.9412705, -75.1190591),
        center: [39.9412705, -75.1190591],
        data: {
            diabetes: 18.0, obesity: 41.3, asthma: 13.4, mental_distress: 21.0, high_blood_pressure: 47.7,
            income: 38447, education: 61.43, food_access: 67.15, poverty_rate: 18.62, unemployment: 8.24,
            population: 4853, healthcare_access: 74.7, lack_health_insurance: 22.2
        }
    }
];

// Generate neighborhood boundary coordinates based on center point
function generateNeighborhoodBounds(lat, lng) {
    const offset = 0.004; // Reduced neighborhood size by half
    return [
        [lat + offset, lng - offset],  // northeast
        [lat + offset, lng + offset],  // northwest
        [lat - offset, lng + offset],  // southwest
        [lat - offset, lng - offset]   // southeast
    ];
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized - Ready for dual map disparity analysis');
    initializeDualMaps();
    initializeCharts();
    initializeFilters();
    loadDashboardData();
});

// Initialize dual maps
function initializeDualMaps() {
    console.log('Initializing dual maps...');
    
    // Check if map containers exist
    const leftMapContainer = document.getElementById('leftMap');
    const rightMapContainer = document.getElementById('rightMap');
    
    if (!leftMapContainer || !rightMapContainer) {
        console.error('Map containers not found');
        return;
    }
    
    try {
        // Initialize left map (Health Outcomes)
        leftMap = L.map('leftMap', {
            center: [39.9259, -75.1196],
            zoom: 13,
            scrollWheelZoom: false
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(leftMap);
        
        // Initialize right map (Social Determinants)
        rightMap = L.map('rightMap', {
            center: [39.9259, -75.1196],
            zoom: 13,
            scrollWheelZoom: false
        });
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(rightMap);
        
        console.log('Maps initialized successfully');
        
        // Load initial data
        updateLeftMap('diabetes');
        updateRightMap('income');
        calculateDisparityMetrics();
        
        // Add event listeners for metric selectors
        const leftSelector = document.getElementById('leftMapSelector');
        const rightSelector = document.getElementById('rightMapSelector');
        const overlayToggle = document.getElementById('overlayToggle');
        
        if (leftSelector) {
            leftSelector.addEventListener('change', function() {
                updateLeftMap(this.value);
            });
        }
        
        if (rightSelector) {
            rightSelector.addEventListener('change', function() {
                updateRightMap(this.value);
            });
        }
        
        if (overlayToggle) {
            overlayToggle.addEventListener('change', function() {
                toggleOverlayMode(this.checked);
            });
        }
        
        // Initialize additional features
        initializeCharts();
        addDashboardAccessibilityFeatures();
        addDashboardInteractiveTooltips();
        addDashboardKeyboardSupport();
        addLoadingStates();
        initializeExportFunctions();
        
        console.log('Dashboard initialization complete');
        
    } catch (error) {
        console.error('Error initializing maps:', error);
    }
}

// Update left map with health outcome data
function updateLeftMap(metric) {
    if (!leftMap) return;
    
    // Clear existing polygons
    leftPolygons.forEach(polygon => leftMap.removeLayer(polygon));
    leftPolygons = [];
    
    // Get color scale for metric
    const colorScale = getHealthOutcomeColorScale(metric);
    
    // Add neighborhood polygons
    camdenNeighborhoods.forEach(neighborhood => {
        const value = neighborhood.data[metric];
        if (value === undefined || value === null) return;
        
        const color = colorScale(value);
        
        const polygon = L.polygon(neighborhood.coords, {
            color: '#ffffff',
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: 0.7
        }).addTo(leftMap);
        
        polygon.bindPopup(`
            <div class="neighborhood-popup">
                <h6 class="fw-bold">${neighborhood.name}</h6>
                <p class="mb-1"><strong>${getMetricLabel(metric)}:</strong> ${formatMetricValue(metric, value)}</p>
                <small class="text-muted">Click for detailed analysis</small>
            </div>
        `);
        
        polygon.on('click', function() {
            showNeighborhoodDetails(neighborhood);
        });
        
        leftPolygons.push(polygon);
    });
    
    // Update legend
    updateLegend('leftLegend', metric, colorScale);
    
    console.log(`Left map updated with ${metric} data, ${leftPolygons.length} polygons added`);
}

// Update right map with social determinant data
function updateRightMap(metric) {
    if (!rightMap) return;
    
    // Clear existing polygons
    rightPolygons.forEach(polygon => rightMap.removeLayer(polygon));
    rightPolygons = [];
    
    // Get color scale for metric
    const colorScale = getSocialDeterminantColorScale(metric);
    
    // Add neighborhood polygons
    camdenNeighborhoods.forEach(neighborhood => {
        const value = neighborhood.data[metric];
        if (value === undefined || value === null) return;
        
        const color = colorScale(value);
        
        const polygon = L.polygon(neighborhood.coords, {
            color: '#ffffff',
            weight: 2,
            opacity: 0.8,
            fillColor: color,
            fillOpacity: 0.7
        }).addTo(rightMap);
        
        polygon.bindPopup(`
            <div class="neighborhood-popup">
                <h6 class="fw-bold">${neighborhood.name}</h6>
                <p class="mb-1"><strong>${getMetricLabel(metric)}:</strong> ${formatMetricValue(metric, value)}</p>
                <small class="text-muted">Click for detailed analysis</small>
            </div>
        `);
        
        polygon.on('click', function() {
            showNeighborhoodDetails(neighborhood);
        });
        
        rightPolygons.push(polygon);
    });
    
    // Update legend
    updateLegend('rightLegend', metric, colorScale);
    
    console.log(`Right map updated with ${metric} data, ${rightPolygons.length} polygons added`);
}

// Get color scale for health outcomes (red = worse outcomes)
function getHealthOutcomeColorScale(metric) {
    const values = camdenNeighborhoods.map(n => n.data[metric]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return function(value) {
        const normalized = (value - min) / (max - min);
        // For all health outcome metrics, higher percentages are worse (red)
        // This includes diabetes, obesity, asthma, mental distress, high BP, lack insurance
        return `hsl(${120 * (1 - normalized)}, 70%, 50%)`;
    };
}

// Get color scale for social determinants (green = better conditions)
function getSocialDeterminantColorScale(metric) {
    const values = camdenNeighborhoods.map(n => n.data[metric]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return function(value) {
        const normalized = (value - min) / (max - min);
        
        // For negative indicators (poverty, unemployment), lower is better
        if (['poverty_rate', 'unemployment'].includes(metric)) {
            return `hsl(${120 * (1 - normalized)}, 70%, 50%)`;
        } else {
            // For positive indicators (income, education, healthcare access, food access), higher is better
            return `hsl(${120 * normalized}, 70%, 50%)`;
        }
    };
}

// Get metric label
function getMetricLabel(metric) {
    const labels = {
        diabetes: 'Diabetes Rate',
        obesity: 'Obesity Rate',
        asthma: 'Asthma Rate',
        mental_distress: 'Mental Distress',
        high_blood_pressure: 'High Blood Pressure',
        lack_health_insurance: 'Lack Health Insurance',
        income: 'Median Income',
        education: 'Education Level',
        food_access: 'Food Access Score',
        poverty_rate: 'Poverty Rate',
        unemployment: 'Unemployment Rate',
        healthcare_access: 'Healthcare Access',
        population: 'Population'
    };
    return labels[metric] || metric;
}

// Format metric value
function formatMetricValue(metric, value) {
    if (metric === 'income') {
        return `$${value.toLocaleString()}`;
    } else if (metric === 'population') {
        return value.toLocaleString();
    } else if (['diabetes', 'obesity', 'asthma', 'mental_distress', 'high_blood_pressure', 'lack_health_insurance', 'education', 'poverty_rate', 'unemployment', 'healthcare_access'].includes(metric)) {
        return `${value.toFixed(1)}%`;
    } else {
        return value.toFixed(1);
    }
}

// Update legend
function updateLegend(legendId, metric, colorScale) {
    const legend = document.getElementById(legendId);
    if (!legend) return;
    
    const values = camdenNeighborhoods.map(n => n.data[metric]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    legend.innerHTML = `
        <div class="legend-gradient">
            <div class="legend-bar" style="background: linear-gradient(to right, ${colorScale(min)}, ${colorScale(max)});"></div>
            <div class="legend-labels">
                <span>${formatMetricValue(metric, min)}</span>
                <span>${formatMetricValue(metric, max)}</span>
            </div>
        </div>
    `;
}

// Calculate disparity metrics
function calculateDisparityMetrics() {
    const leftSelector = document.getElementById('leftMapSelector');
    const rightSelector = document.getElementById('rightMapSelector');
    
    if (!leftSelector || !rightSelector) return;
    
    const leftMetric = leftSelector.value;
    const rightMetric = rightSelector.value;
    
    const leftValues = camdenNeighborhoods.map(n => n.data[leftMetric]).filter(v => v !== undefined && v !== null);
    const rightValues = camdenNeighborhoods.map(n => n.data[rightMetric]).filter(v => v !== undefined && v !== null);
    
    if (leftValues.length === 0 || rightValues.length === 0) return;
    
    // Calculate disparity index (coefficient of variation)
    const leftMean = leftValues.reduce((a, b) => a + b, 0) / leftValues.length;
    const leftStd = Math.sqrt(leftValues.reduce((a, b) => a + Math.pow(b - leftMean, 2), 0) / leftValues.length);
    const disparityIndex = leftMean === 0 ? 0 : (leftStd / leftMean * 100);
    
    // Calculate correlation
    const correlation = calculateCorrelation(leftValues, rightValues);
    
    // Calculate equity gap (difference between best and worst neighborhoods)
    const leftMin = Math.min(...leftValues);
    const leftMax = Math.max(...leftValues);
    const equityGap = leftMean === 0 ? 0 : ((leftMax - leftMin) / leftMean * 100);
    
    // Update display - try multiple ID variations
    const disparityEl = document.getElementById('disparityScore') || document.getElementById('disparityIndex');
    const correlationEl = document.getElementById('correlationScore') || document.getElementById('correlationValue');
    const equityEl = document.getElementById('equityScore') || document.getElementById('equityGap');
    
    if (disparityEl) disparityEl.textContent = disparityIndex.toFixed(1);
    if (correlationEl) correlationEl.textContent = correlation.toFixed(2);
    if (equityEl) equityEl.textContent = equityGap.toFixed(1);
    
    console.log(`Disparity metrics: ${disparityIndex.toFixed(1)}, correlation: ${correlation.toFixed(2)}, gap: ${equityGap.toFixed(1)}`);
}

// Calculate correlation coefficient
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

// Show neighborhood details
function showNeighborhoodDetails(neighborhood) {
    // Populate modal with neighborhood data
    document.getElementById('modalNeighborhoodName').textContent = neighborhood.name;
    document.getElementById('modalPopulation').textContent = neighborhood.data.population.toLocaleString();
    document.getElementById('modalArea').textContent = "Camden area";
    document.getElementById('modalDensity').textContent = Math.round(neighborhood.data.population / 0.5) + " per sq mi";
    
    // Health metrics
    document.getElementById('modalDiabetes').textContent = neighborhood.data.diabetes.toFixed(1);
    document.getElementById('modalObesity').textContent = neighborhood.data.obesity.toFixed(1);
    document.getElementById('modalAsthma').textContent = neighborhood.data.asthma.toFixed(1);
    document.getElementById('modalMentalDistress').textContent = neighborhood.data.mental_distress.toFixed(1);
    
    // Economic indicators
    document.getElementById('modalIncome').textContent = neighborhood.data.income.toLocaleString();
    document.getElementById('modalPoverty').textContent = neighborhood.data.poverty_rate.toFixed(1);
    document.getElementById('modalUnemployment').textContent = neighborhood.data.unemployment.toFixed(1);
    document.getElementById('modalEducation').textContent = neighborhood.data.education.toFixed(1);
    
    // Access & Environment
    document.getElementById('modalHealthcareAccess').textContent = neighborhood.data.healthcare_access.toFixed(1);
    document.getElementById('modalFoodAccess').textContent = neighborhood.data.food_access.toFixed(1);
    document.getElementById('modalHealthInsurance').textContent = (100 - neighborhood.data.lack_health_insurance).toFixed(1);
    document.getElementById('modalHighBP').textContent = neighborhood.data.high_blood_pressure.toFixed(1);
    
    // Generate equity summary
    const equitySummary = generateEquitySummary(neighborhood);
    document.getElementById('modalEquitySummary').innerHTML = equitySummary;
    
    // Store selected neighborhood for profile view
    window.selectedNeighborhood = neighborhood.name;
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('neighborhoodModal'));
    modal.show();
}

// Generate equity summary for neighborhood
function generateEquitySummary(neighborhood) {
    const data = neighborhood.data;
    let summary = `<strong>${neighborhood.name}</strong> analysis:<br><br>`;
    
    // Income analysis
    if (data.income < 20000) {
        summary += `• <span class="text-danger">Critical economic need</span> - Income significantly below Camden average<br>`;
    } else if (data.income > 40000) {
        summary += `• <span class="text-success">Economic advantage</span> - Income above Camden average<br>`;
    } else {
        summary += `• <span class="text-warning">Moderate economic status</span> - Income near Camden average<br>`;
    }
    
    // Health outcomes
    if (data.diabetes > 20) {
        summary += `• <span class="text-danger">High diabetes burden</span> - Requires targeted intervention<br>`;
    } else if (data.diabetes < 15) {
        summary += `• <span class="text-success">Lower diabetes rates</span> - Positive health outcome<br>`;
    }
    
    // Poverty analysis
    if (data.poverty_rate > 40) {
        summary += `• <span class="text-danger">High poverty concentration</span> - Priority for social services<br>`;
    } else if (data.poverty_rate < 20) {
        summary += `• <span class="text-success">Lower poverty rates</span> - Better social conditions<br>`;
    }
    
    return summary;
}

// Navigate to neighborhood profile page
function viewNeighborhoodProfile() {
    if (window.selectedNeighborhood) {
        window.location.href = `/neighborhoods?selected=${encodeURIComponent(window.selectedNeighborhood)}`;
    }
}

// Initialize filters
function initializeFilters() {
    // Left map selector
    document.getElementById('leftMapSelector').addEventListener('change', function() {
        updateLeftMap(this.value);
        calculateDisparityMetrics();
    });
    
    // Right map selector
    document.getElementById('rightMapSelector').addEventListener('change', function() {
        updateRightMap(this.value);
        calculateDisparityMetrics();
    });
    
    // Overlay toggle
    document.getElementById('overlayToggle').addEventListener('change', function() {
        toggleOverlayMode(this.checked);
    });
}

// Toggle overlay mode
function toggleOverlayMode(enabled) {
    if (enabled) {
        // Hide individual maps and show overlay
        document.getElementById('leftMap').style.display = 'none';
        document.getElementById('rightMap').style.display = 'none';
        
        // Create overlay map if it doesn't exist
        if (!overlayMap) {
            const overlayDiv = document.createElement('div');
            overlayDiv.id = 'overlayMap';
            overlayDiv.style.cssText = 'height: 225px; width: 100%;';
            document.querySelector('#leftMap').parentNode.appendChild(overlayDiv);
            
            overlayMap = L.map('overlayMap').setView([39.9259, -75.1196], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(overlayMap);
        }
        
        updateOverlayMap();
    } else {
        // Show individual maps and hide overlay
        document.getElementById('leftMap').style.display = 'block';
        document.getElementById('rightMap').style.display = 'block';
        
        if (document.getElementById('overlayMap')) {
            document.getElementById('overlayMap').style.display = 'none';
        }
    }
}

// Update overlay map
function updateOverlayMap() {
    if (!overlayMap) return;
    
    // Clear existing polygons
    overlayPolygons.forEach(polygon => overlayMap.removeLayer(polygon));
    overlayPolygons = [];
    
    const leftMetric = document.getElementById('leftMapSelector').value;
    const rightMetric = document.getElementById('rightMapSelector').value;
    
    // Add neighborhood polygons with combined visualization
    camdenNeighborhoods.forEach(neighborhood => {
        const leftValue = neighborhood.data[leftMetric];
        const rightValue = neighborhood.data[rightMetric];
        
        // Create pattern or gradient based on both metrics
        const polygon = L.polygon(neighborhood.coords, {
            color: '#ffffff',
            weight: 3,
            opacity: 0.8,
            fillColor: getCombinedColor(leftValue, rightValue, leftMetric, rightMetric),
            fillOpacity: 0.6
        }).addTo(overlayMap);
        
        polygon.bindPopup(`
            <div class="neighborhood-popup">
                <h6 class="fw-bold">${neighborhood.name}</h6>
                <p class="mb-1"><strong>${getMetricLabel(leftMetric)}:</strong> ${formatMetricValue(leftMetric, leftValue)}</p>
                <p class="mb-1"><strong>${getMetricLabel(rightMetric)}:</strong> ${formatMetricValue(rightMetric, rightValue)}</p>
                <small class="text-muted">Overlay view shows relationship between metrics</small>
            </div>
        `);
        
        overlayPolygons.push(polygon);
    });
}

// Get combined color for overlay
function getCombinedColor(leftValue, rightValue, leftMetric, rightMetric) {
    // Normalize values
    const leftValues = camdenNeighborhoods.map(n => n.data[leftMetric]);
    const rightValues = camdenNeighborhoods.map(n => n.data[rightMetric]);
    
    const leftNorm = (leftValue - Math.min(...leftValues)) / (Math.max(...leftValues) - Math.min(...leftValues));
    const rightNorm = (rightValue - Math.min(...rightValues)) / (Math.max(...rightValues) - Math.min(...rightValues));
    
    // Combine colors (red for health problems, green for good social conditions)
    const red = leftMetric === 'life_expectancy' ? 1 - leftNorm : leftNorm;
    const green = rightNorm;
    
    return `rgb(${Math.floor(red * 255)}, ${Math.floor(green * 255)}, 100)`;
}

// Initialize charts (existing functionality)
function initializeCharts() {
    try {
        initializeNeighborhoodChart();
        initializeTrendChart();
        initializeDemographicsChart();
        initializeSDOHChart();
        console.log('All charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

// Initialize neighborhood chart
function initializeNeighborhoodChart() {
    const ctx = document.getElementById('neighborhoodChart');
    if (!ctx) return;
    
    // Sort neighborhoods by diabetes rate to show disparity clearly
    const sortedData = [...camdenNeighborhoods].sort((a, b) => b.data.diabetes - a.data.diabetes);
    
    neighborhoodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedData.map(n => n.name),
            datasets: [{
                label: 'Diabetes Rate (%)',
                data: sortedData.map(n => n.data.diabetes),
                backgroundColor: sortedData.map(n => {
                    // Color code based on severity - red for higher rates
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
                    text: 'Diabetes Rates by Camden Neighborhood (Real Data)'
                },
                subtitle: {
                    display: true,
                    text: 'Disparity Range: 13.4% (Beideman) to 23.1% (Liberty Park)'
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

// Initialize trend chart
function initializeTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    // Show disparities between best and worst performing neighborhoods
    const bestNeighborhood = camdenNeighborhoods.reduce((prev, curr) => prev.data.diabetes < curr.data.diabetes ? prev : curr);
    const worstNeighborhood = camdenNeighborhoods.reduce((prev, curr) => prev.data.diabetes > curr.data.diabetes ? prev : curr);
    const camdenAverage = camdenNeighborhoods.reduce((sum, n) => sum + n.data.diabetes, 0) / camdenNeighborhoods.length;
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Income', 'Education', 'Food Access', 'Healthcare Access', 'Poverty Rate'],
            datasets: [{
                label: `${bestNeighborhood.name} (Best Health)`,
                data: [
                    bestNeighborhood.data.income / 1000,
                    bestNeighborhood.data.education,
                    bestNeighborhood.data.food_access,
                    bestNeighborhood.data.healthcare_access,
                    100 - bestNeighborhood.data.poverty_rate
                ],
                borderColor: 'rgba(25, 135, 84, 1)',
                backgroundColor: 'rgba(25, 135, 84, 0.1)',
                tension: 0.1
            }, {
                label: `${worstNeighborhood.name} (Worst Health)`,
                data: [
                    worstNeighborhood.data.income / 1000,
                    worstNeighborhood.data.education,
                    worstNeighborhood.data.food_access,
                    worstNeighborhood.data.healthcare_access,
                    100 - worstNeighborhood.data.poverty_rate
                ],
                borderColor: 'rgba(220, 53, 69, 1)',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Social Determinants Comparison: Best vs Worst Health Outcomes'
                },
                subtitle: {
                    display: true,
                    text: `${bestNeighborhood.name} (${bestNeighborhood.data.diabetes}% diabetes) vs ${worstNeighborhood.name} (${worstNeighborhood.data.diabetes}% diabetes)`
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Relative Score'
                    }
                }
            }
        }
    });
}

// Initialize demographics chart
function initializeDemographicsChart() {
    const ctx = document.getElementById('demographicsChart');
    if (!ctx) return;
    
    // Calculate weighted averages across all neighborhoods
    const totalPop = camdenNeighborhoods.reduce((sum, n) => sum + n.data.population, 0);
    const avgIncome = camdenNeighborhoods.reduce((sum, n) => sum + (n.data.income * n.data.population), 0) / totalPop;
    const avgEducation = camdenNeighborhoods.reduce((sum, n) => sum + (n.data.education * n.data.population), 0) / totalPop;
    const avgPoverty = camdenNeighborhoods.reduce((sum, n) => sum + (n.data.poverty_rate * n.data.population), 0) / totalPop;
    const avgUnemployment = camdenNeighborhoods.reduce((sum, n) => sum + (n.data.unemployment * n.data.population), 0) / totalPop;
    
    demographicsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                `Below Poverty (${avgPoverty.toFixed(1)}%)`,
                `Unemployed (${avgUnemployment.toFixed(1)}%)`,
                `High School+ (${avgEducation.toFixed(1)}%)`,
                `Other Economic Status`
            ],
            datasets: [{
                data: [avgPoverty, avgUnemployment, avgEducation, 100 - avgPoverty - avgUnemployment],
                backgroundColor: [
                    'rgba(220, 53, 69, 0.8)',    // Poverty - red
                    'rgba(255, 193, 7, 0.8)',    // Unemployment - yellow
                    'rgba(25, 135, 84, 0.8)',    // Education - green
                    'rgba(108, 117, 125, 0.8)'   // Other - gray
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Camden Economic & Education Overview (Real Data)'
                },
                subtitle: {
                    display: true,
                    text: `Average Income: $${Math.round(avgIncome).toLocaleString()} | Population: ${totalPop.toLocaleString()}`
                }
            }
        }
    });
}

// Initialize SDOH chart
function initializeSDOHChart() {
    const ctx = document.getElementById('sdohChart');
    if (!ctx) return;
    
    // Find the neighborhoods with highest and lowest health equity
    const bestNeighborhood = camdenNeighborhoods.reduce((prev, curr) => {
        const prevScore = prev.data.income/10000 + prev.data.education + prev.data.healthcare_access - prev.data.poverty_rate;
        const currScore = curr.data.income/10000 + curr.data.education + curr.data.healthcare_access - curr.data.poverty_rate;
        return currScore > prevScore ? curr : prev;
    });
    
    const worstNeighborhood = camdenNeighborhoods.reduce((prev, curr) => {
        const prevScore = prev.data.income/10000 + prev.data.education + prev.data.healthcare_access - prev.data.poverty_rate;
        const currScore = curr.data.income/10000 + curr.data.education + curr.data.healthcare_access - curr.data.poverty_rate;
        return currScore < prevScore ? curr : prev;
    });
    
    sdohChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Income (×$10k)', 'Education (%)', 'Healthcare Access', 'Food Access', 'Employment Rate', 'Low Poverty'],
            datasets: [{
                label: `${bestNeighborhood.name} (Best Equity)`,
                data: [
                    bestNeighborhood.data.income / 10000,
                    bestNeighborhood.data.education,
                    bestNeighborhood.data.healthcare_access,
                    Math.min(bestNeighborhood.data.food_access, 80), // Cap at 80 for scale
                    100 - bestNeighborhood.data.unemployment,
                    100 - bestNeighborhood.data.poverty_rate
                ],
                borderColor: 'rgba(25, 135, 84, 1)',
                backgroundColor: 'rgba(25, 135, 84, 0.2)',
                pointBackgroundColor: 'rgba(25, 135, 84, 1)'
            }, {
                label: `${worstNeighborhood.name} (Worst Equity)`,
                data: [
                    worstNeighborhood.data.income / 10000,
                    worstNeighborhood.data.education,
                    worstNeighborhood.data.healthcare_access,
                    Math.min(worstNeighborhood.data.food_access, 80), // Cap at 80 for scale
                    100 - worstNeighborhood.data.unemployment,
                    100 - worstNeighborhood.data.poverty_rate
                ],
                borderColor: 'rgba(220, 53, 69, 1)',
                backgroundColor: 'rgba(220, 53, 69, 0.2)',
                pointBackgroundColor: 'rgba(220, 53, 69, 1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Social Determinants of Health: Equity Comparison (Real Data)'
                },
                subtitle: {
                    display: true,
                    text: 'Larger areas indicate better social conditions and health equity'
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

// Load dashboard data
function loadDashboardData() {
    // Data is already loaded in the neighborhood definitions
    console.log('Dashboard data loaded - showing health disparity comparisons');
}

// Update dashboard when metric changes
function updateDashboard(metric) {
    if (neighborhoodChart) {
        const data = camdenNeighborhoods.map(n => n.data[metric]);
        neighborhoodChart.data.datasets[0].data = data;
        neighborhoodChart.data.datasets[0].label = getMetricLabel(metric);
        neighborhoodChart.options.plugins.title.text = `${getMetricLabel(metric)} by Neighborhood`;
        neighborhoodChart.update();
    }
}

// View detailed report
function viewDetailedReport(metricName) {
    CHEDVI.showMessage(`Detailed report for ${metricName} is available in the Insights page.`, 'info');
}

// Enhanced initialization with UX improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add accessibility features
    addDashboardAccessibilityFeatures();
    
    // Add interactive tooltips
    addDashboardInteractiveTooltips();
    
    // Add keyboard support
    addDashboardKeyboardSupport();
    
    // Add loading states to form submissions
    addLoadingStates();
    initializeExportFunctions();
}

// Export functionality
function exportData(format) {
    CHEDVI.showLoadingState('Preparing export...');
    
    setTimeout(() => {
        const currentMetric = document.getElementById('metricSelector').value || 'diabetes';
        const filename = `camden-health-${currentMetric}-${new Date().toISOString().split('T')[0]}`;
        
        if (format === 'csv') {
            exportToCSV(filename);
        } else if (format === 'pdf') {
            exportToPDF(filename);
        } else if (format === 'image') {
            exportToImage(filename);
        }
        
        CHEDVI.hideLoadingState();
    }, 1000);
}

function exportToCSV(filename) {
    const headers = ['Neighborhood', 'Diabetes', 'Obesity', 'Asthma', 'Mental Distress', 'Income', 'Education', 'Poverty Rate'];
    const rows = [headers.join(',')];
    
    camdenNeighborhoods.forEach(neighborhood => {
        const row = [
            neighborhood.name,
            neighborhood.data.diabetes,
            neighborhood.data.obesity,
            neighborhood.data.asthma,
            neighborhood.data.mental_distress,
            neighborhood.data.income,
            neighborhood.data.education,
            neighborhood.data.poverty_rate
        ];
        rows.push(row.join(','));
    });
    
    const csvContent = rows.join('\n');
    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
}

function exportToPDF(filename) {
    // Create a printable version of the dashboard
    const printContent = `
        <h1>Camden Health Equity Dashboard</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <h2>Neighborhood Health Metrics</h2>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>
                    <th>Neighborhood</th>
                    <th>Diabetes (%)</th>
                    <th>Obesity (%)</th>
                    <th>Income ($)</th>
                    <th>Education (%)</th>
                </tr>
            </thead>
            <tbody>
                ${camdenNeighborhoods.map(n => `
                    <tr>
                        <td>${n.name}</td>
                        <td>${n.data.diabetes}</td>
                        <td>${n.data.obesity}</td>
                        <td>${n.data.income.toLocaleString()}</td>
                        <td>${n.data.education}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Camden Health Equity Dashboard</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 8px; text-align: left; border: 1px solid #ddd; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>${printContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function exportToImage(filename) {
    // Capture the map container as an image
    const mapContainer = document.getElementById('leftMap');
    if (mapContainer) {
        // Create a canvas to capture the map
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = mapContainer.offsetWidth;
        canvas.height = mapContainer.offsetHeight;
        
        // Draw a placeholder image representation
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#003d7a';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Camden Health Equity Map', canvas.width / 2, canvas.height / 2);
        ctx.fillText('Generated on: ' + new Date().toLocaleDateString(), canvas.width / 2, canvas.height / 2 + 30);
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function initializeExportFunctions() {
    // Export functions are now available globally
    window.exportData = exportData;
}

// Add accessibility features to dashboard
function addDashboardAccessibilityFeatures() {
    // Add ARIA labels and descriptions
    const leftMapSelector = document.getElementById('leftMapSelector');
    const rightMapSelector = document.getElementById('rightMapSelector');
    
    if (leftMapSelector) {
        leftMapSelector.setAttribute('aria-label', 'Select health outcome metric for left map');
        leftMapSelector.setAttribute('aria-describedby', 'left-map-description');
    }
    
    if (rightMapSelector) {
        rightMapSelector.setAttribute('aria-label', 'Select social determinant metric for right map');
        rightMapSelector.setAttribute('aria-describedby', 'right-map-description');
    }
    
    // Add map descriptions for screen readers
    const leftMapContainer = document.getElementById('leftMap');
    const rightMapContainer = document.getElementById('rightMap');
    
    if (leftMapContainer && !document.getElementById('left-map-description')) {
        const leftDesc = document.createElement('div');
        leftDesc.id = 'left-map-description';
        leftDesc.className = 'sr-only';
        leftDesc.textContent = 'Interactive map showing health outcomes across Camden neighborhoods. Click on neighborhoods for detailed information.';
        leftMapContainer.after(leftDesc);
    }
    
    if (rightMapContainer && !document.getElementById('right-map-description')) {
        const rightDesc = document.createElement('div');
        rightDesc.id = 'right-map-description';
        rightDesc.className = 'sr-only';
        rightDesc.textContent = 'Interactive map showing social determinants across Camden neighborhoods. Click on neighborhoods for detailed information.';
        rightMapContainer.after(rightDesc);
    }
}

// Add interactive tooltips to dashboard elements
function addDashboardInteractiveTooltips() {
    // Add tooltips to disparity metrics
    const disparityCards = document.querySelectorAll('.disparity-stats .col-4 > div');
    disparityCards.forEach((card, index) => {
        if (!card.querySelector('.tooltip-content')) {
            card.classList.add('tooltip-enhanced');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-content';
            tooltip.textContent = getDashboardTooltipText(index);
            card.appendChild(tooltip);
        }
    });
    
    // Add tooltips to metric labels
    const metricLabels = document.querySelectorAll('[data-metric]');
    metricLabels.forEach(label => {
        if (!label.classList.contains('tooltip-enhanced')) {
            label.classList.add('tooltip-enhanced');
            if (!label.querySelector('.tooltip-content')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-content';
                tooltip.textContent = getMetricTooltipText(label.dataset.metric);
                label.appendChild(tooltip);
            }
        }
    });
}

// Get tooltip text for disparity metrics
function getDashboardTooltipText(index) {
    const tooltips = [
        'Disparity Index: Measures variation in health outcomes across neighborhoods (lower is more equitable)',
        'Correlation: Shows relationship between selected health outcome and social determinant (-1 to 1)',
        'Equity Gap: Difference between best and worst performing neighborhoods as percentage'
    ];
    return tooltips[index] || 'Health equity metric';
}

// Get tooltip text for metrics
function getMetricTooltipText(metric) {
    const tooltips = {
        'diabetes': 'Percentage of adults diagnosed with diabetes',
        'obesity': 'Percentage of adults with BMI ≥30',
        'high_blood_pressure': 'Percentage of adults with high blood pressure',
        'mental_distress': 'Percentage reporting frequent mental distress',
        'income': 'Median household income in dollars',
        'poverty_rate': 'Percentage of population below federal poverty line',
        'education': 'Percentage with high school education or higher',
        'healthcare_access': 'Percentage with access to healthcare services'
    };
    return tooltips[metric] || 'Health equity metric';
}

// Add keyboard support for dashboard interactions
function addDashboardKeyboardSupport() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + 1-9 for quick metric selection
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            quickSelectDashboardMetric(index);
        }
        
        // Ctrl + T for toggle overlay
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            const overlayToggle = document.getElementById('overlayToggle');
            if (overlayToggle) {
                overlayToggle.click();
            }
        }
    });
}

// Quick metric selection via keyboard
function quickSelectDashboardMetric(index) {
    const leftSelector = document.getElementById('leftMapSelector');
    const rightSelector = document.getElementById('rightMapSelector');
    
    const metrics = [
        'diabetes', 'obesity', 'high_blood_pressure', 'mental_distress',
        'income', 'poverty_rate', 'education', 'healthcare_access'
    ];
    
    if (index < metrics.length) {
        if (leftSelector && index % 2 === 0) {
            leftSelector.value = metrics[index];
            leftSelector.dispatchEvent(new Event('change'));
        } else if (rightSelector) {
            rightSelector.value = metrics[index];
            rightSelector.dispatchEvent(new Event('change'));
        }
        
        // Announce the change
        if (window.CHEDVI && CHEDVI.announceToScreenReader) {
            CHEDVI.announceToScreenReader(`Selected ${metrics[index]} metric`);
        }
    }
}

// Add loading states
function addLoadingStates() {
    // Add loading overlay to map containers
    const mapContainers = document.querySelectorAll('#leftMap, #rightMap');
    mapContainers.forEach(container => {
        if (!container.querySelector('.chart-loading')) {
            const loading = document.createElement('div');
            loading.className = 'chart-loading';
            loading.style.display = 'none';
            loading.innerHTML = '<div class="loading-spinner"></div><div>Loading map data...</div>';
            container.appendChild(loading);
        }
    });
    
    // Add loading states to selectors
    const selectors = document.querySelectorAll('#leftMapSelector, #rightMapSelector');
    selectors.forEach(selector => {
        selector.addEventListener('change', () => {
            showMapLoading(selector.id.includes('left') ? 'leftMap' : 'rightMap');
            setTimeout(() => {
                hideMapLoading(selector.id.includes('left') ? 'leftMap' : 'rightMap');
            }, 800);
        });
    });
}

// Show map loading state
function showMapLoading(mapId) {
    const container = document.getElementById(mapId);
    const loading = container?.querySelector('.chart-loading');
    if (loading) {
        loading.style.display = 'flex';
    }
}

// Hide map loading state
function hideMapLoading(mapId) {
    const container = document.getElementById(mapId);
    const loading = container?.querySelector('.chart-loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

console.log('Dashboard initialized - Ready for data integration');
console.log('Dashboard initialized - Ready for dual map disparity analysis');

// Missing functions referenced in template
function startTour() {
    console.log('Starting guided tour...');
    // Basic tour implementation
    alert('Welcome to the Camden Health Equity Dashboard! This interactive tool helps you explore health disparities across Camden neighborhoods.');
}

function exportData(format) {
    console.log('Exporting data as:', format);
    // Basic export implementation
    if (format === 'csv') {
        exportToCSV('camden_health_data.csv');
    } else if (format === 'pdf') {
        exportToPDF('camden_health_data.pdf');
    } else if (format === 'image') {
        exportToImage('camden_health_data.png');
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Leaflet to load
    if (typeof L !== 'undefined') {
        console.log('Leaflet loaded, initializing dual maps...');
        initializeDualMaps();
    } else {
        console.error('Leaflet not loaded');
    }
});