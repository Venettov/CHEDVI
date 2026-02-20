// Camden Health Equity Dashboard - Fixed Version
// Variables for maps and data
let leftMap, rightMap;
let leftPolygons = [];
let rightPolygons = [];

// Camden neighborhoods with authentic 2022 Census data
const camdenNeighborhoods = [
    // ... [KEEP YOUR ENTIRE EXISTING camdenNeighborhoods ARRAY HERE] ...
    // ... [DO NOT CHANGE THE DATA ARRAY] ...
];

// --- COLOR SCALES ---
// Blue Scale for Health Metrics (Diabetes, Asthma, etc.)
const COLORS_BLUE = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']; 

// Green Scale for "Positive" Social Determinants (Income, Education)
const COLORS_GREEN = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

// Metrics where "Higher is Better" (Uses Green Scale)
const POSITIVE_METRICS = ['income', 'education', 'healthcare_access', 'food_access', 'visited_dentist'];

function getColor(value, min, max, scheme) {
    if (value === undefined || value === null) return '#ccc';
    if (max === min) return scheme[2]; // Flat data
    
    // Normalize value to 0-1 range
    const pct = (value - min) / (max - min);
    
    // Map percentage to color index (0 to 4)
    let index = Math.floor(pct * (scheme.length));
    if (index >= scheme.length) index = scheme.length - 1;
    
    return scheme[index];
}

// ==========================================
// HYBRID DATA ARCHITECTURE (DB + FALLBACK)
// ==========================================

// 1. Define the Hardcoded "Safety Net" (Your original data)
const fallbackData = {
    neighborhoods: [
        'Gateway', 'Bergen Square', 'Cooper Poynt', 'Pyne Point', 'Cramer Hill', 
        'Beideman', 'Dudley', 'Rosedale', 'Stockton', 'Marlton', 
        'Parkside', 'Whitman Park', 'Liberty Park', 'Centerville', 'Waterfront South',
        'Morgan Village', 'Fairview', 'Cooper Grant', 'Lanning Square'
    ],
    income: [26750, 12104, 29789, 19412, 28198, 58983, 35491, 51741, 44357, 31312, 45662, 31941, 29210, 22181, 54324, 34796, 41840, 51635, 38447],
    poverty: [30.78, 54.36, 36.71, 39.82, 38.68, 11.91, 24.96, 19.22, 20.17, 30.43, 19.40, 28.40, 26.21, 42.97, 40.45, 32.57, 20.76, 41.01, 18.62],
    unemployment: [28.59, 34.22, 11.43, 14.21, 9.42, 9.73, 3.93, 13.15, 5.94, 16.67, 26.16, 18.81, 11.37, 25.90, 8.51, 9.16, 24.87, 14.15, 8.24],
    education: [69.34, 57.70, 41.41, 36.94, 25.47, 43.14, 37.81, 44.01, 49.38, 45.20, 48.07, 60.14, 55.44, 41.57, 43.90, 61.16, 62.64, 90.55, 61.43],
    foodAccess: [3.1, 2.2, 3.7, 2.8, 3.5, 7.2, 5.1, 6.8, 6.2, 4.8, 5.9, 4.9, 4.2, 2.8, 6.7, 5.2, 6.1, 6.9, 5.7],
    insurance: [36.2, 25.1, 25.6, 30.1, 21.2, 45.7, 41.8, 48.5, 47.3, 37.6, 31.9, 36.2, 37.6, 15.6, 45.6, 34.8, 28.3, 70.4, 62.7],
    diabetes: [17.0, 15.7, 18.9, 21.4, 18.4, 13.4, 22.2, 16.9, 17.9, 19.2, 15.0, 21.5, 23.1, 14.7, 20.3, 17.5, 17.3, 19.4, 18.0],
    obesity: [43.9, 47.6, 44.8, 46.6, 44.8, 40.2, 41.8, 38.8, 41.9, 43.2, 46.1, 44.8, 48.7, 51.4, 44.3, 45.7, 43.6, 36.0, 41.3],
    asthma: [20.3, 24.1, 22.3, 22.9, 25.6, 19.1, 20.9, 18.6, 20.1, 21.0, 21.9, 22.0, 24.9, 25.5, 22.1, 22.4, 20.9, 19.2, 21.0],
    mentalDistress: [20.3, 24.1, 22.3, 22.9, 25.6, 19.1, 20.9, 18.6, 20.1, 21.0, 21.9, 22.0, 24.9, 25.5, 22.1, 22.4, 20.9, 19.2, 21.0],
    highBloodPressure: [37.4, 40.4, 41.0, 35.6, 48.5, 45.1, 48.7, 38.6, 36.3, 42.7, 40.2, 35.1, 43.6, 35.4, 36.4, 46.7, 40.4, 38.5, 47.7]
};

// 2. Initialize Data with Intelligent Merge
let dashboardData;

if (typeof dbPayload !== 'undefined' && dbPayload !== null) {
    console.log("✅ Using Live Database Data");
    dashboardData = { ...fallbackData, ...dbPayload };
} else {
    console.warn("⚠️ Database unavailable. Using Fallback Data.");
    dashboardData = fallbackData;
}

// --- GLOBAL STATE ---
let currentLeftMetric = 'diabetes';  
let currentRightMetric = 'income';

// ==========================================
// SINGLE MASTER INITIALIZATION BLOCK
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Camden Health Dashboard...');
    
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    // 1. Sync Map Dropdowns with Global State
    const leftSel = document.getElementById('leftMapSelector');
    const rightSel = document.getElementById('rightMapSelector');
    if(leftSel) leftSel.value = currentLeftMetric;
    if(rightSel) rightSel.value = currentRightMetric;

    // 2. Initialize Core Components
    initializeMaps();
    setupEventListeners();
    loadInitialData();
    initializeAllCharts();
    
    // 3. Initialize Data Explorer Table & Connect Chart Listeners
    if (typeof populateDataExplorer === 'function') {
        populateDataExplorer(); 
    }

    // 4. Handle Global Search Parameters (from URL)
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        setTimeout(() => {
            if(window.highlightNeighborhood) window.highlightNeighborhood(searchParam);
            const searchBox = document.getElementById('globalSearchInput');
            if(searchBox) searchBox.value = searchParam;
        }, 1000);
    }
});
// ==========================================


// --- STYLING ---
const STYLE_BLUE = {
    color: "#2c3e50", weight: 2, opacity: 1, 
    fillColor: "#87CEEB", fillOpacity: 0.7 
};

const STYLE_HIGHLIGHT = {
    color: "#1e8449", weight: 3, opacity: 1, 
    fillColor: "#2ecc71", fillOpacity: 0.8 
};

// 3. INITIALIZE MAPS
function initializeMaps() {
    try {
        leftMap = L.map('leftMap', { zoomControl: true, scrollWheelZoom: false }).setView([39.9259, -75.1196], 11.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(leftMap);

        rightMap = L.map('rightMap', { zoomControl: true, scrollWheelZoom: false }).setView([39.9259, -75.1196], 11.5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(rightMap);

        renderMapPolygons(leftMap, leftPolygons, 'left', currentLeftMetric);
        renderMapPolygons(rightMap, rightPolygons, 'right', currentRightMetric);

        console.log('Maps initialized with:', currentLeftMetric, currentRightMetric);

    } catch (error) { console.error('Error initializing maps:', error); }
}

// 4. CORE RENDER FUNCTION
function renderMapPolygons(mapInstance, polygonArray, mapSide, metric) {
    polygonArray.forEach(p => mapInstance.removeLayer(p));
    polygonArray.length = 0; 

    if (mapInstance.legendControl) {
        mapInstance.removeControl(mapInstance.legendControl);
    }

    const values = camdenNeighborhoods.map(n => n.data[metric]).filter(v => v !== undefined);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    const scheme = POSITIVE_METRICS.includes(metric) ? COLORS_GREEN : COLORS_BLUE;

    camdenNeighborhoods.forEach(n => {
        const val = n.data[metric];
        const dynamicColor = getColor(val, min, max, scheme);
        
        const polyStyle = {
            color: "#2c3e50", 
            weight: 2, 
            opacity: 1, 
            fillColor: dynamicColor, 
            fillOpacity: 0.7 
        };

        const popupContent = createPopupContent(n, metric);
        const poly = L.polygon(n.bounds, polyStyle).addTo(mapInstance);
        poly.bindPopup(popupContent);
        
        poly.neighborhoodName = n.name;
        poly.defaultStyle = polyStyle; 
        
        poly.on('click', (e) => handlePolygonClick(e, mapSide));
        polygonArray.push(poly);
    });

    addLegend(mapInstance, min, max, scheme, metric);
}

function addLegend(mapInstance, min, max, scheme, metric) {
    const legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        
        const format = (num) => {
            if (metric === 'income') return '$' + (num/1000).toFixed(0) + 'k';
            if (['food_access'].includes(metric)) return num.toFixed(1);
            return num.toFixed(0) + '%';
        };

        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 0 15px rgba(0,0,0,0.2)';
        div.style.fontSize = '12px';
        div.style.lineHeight = '18px';

        div.innerHTML += `<strong>${getMetricLabel(metric)}</strong><br>`;

        const step = (max - min) / scheme.length;
        
        for (let i = 0; i < scheme.length; i++) {
            const rangeStart = min + (i * step);
            const rangeEnd = min + ((i + 1) * step);
            
            div.innerHTML +=
                `<i style="background:${scheme[i]}; width:18px; height:18px; float:left; margin-right:8px; opacity:0.7"></i> ` +
                `${format(rangeStart)} – ${format(rangeEnd)}<br>`;
        }

        return div;
    };

    legend.addTo(mapInstance);
    mapInstance.legendControl = legend; 
}

// 5. CREATE POPUP CONTENT
function createPopupContent(n, metric) {
    let statsHtml = '';

    if (metric && metric !== "" && n.data[metric] !== undefined) {
        const label = getMetricLabel(metric);
        let value = n.data[metric];
        
        if (typeof value === 'number') {
            value = (metric === 'income') ? `$${value.toLocaleString()}` : `${value.toFixed(1)}%`;
        } 

        statsHtml = `<div style="font-size: 1.1rem; color: #1e8449; margin-top:5px;">
                        <strong>${label}:</strong> ${value}
                     </div>`;
    } else {
        statsHtml = `<div style="color:#666; font-style:italic;">Select a metric...</div>`;
    }

    return `
        <div style="text-align: left; min-width: 150px;">
            <h6 style="color: #2c3e50; font-weight: bold; margin: 0 0 5px 0; border-bottom: 2px solid #eee; padding-bottom: 5px;">
                ${n.name}
            </h6>
            ${statsHtml}
        </div>
    `;
}

// 6. EVENT LISTENERS
function setupEventListeners() {
    const leftSelector = document.getElementById('leftMapSelector');
    const rightSelector = document.getElementById('rightMapSelector');
    const overlayToggle = document.getElementById('overlayToggle'); 

    if (leftSelector) {
        leftSelector.addEventListener('change', function() {
            currentLeftMetric = this.value; 
            renderMapPolygons(leftMap, leftPolygons, 'left', currentLeftMetric);
            updateMetrics();
        });
    }

    if (rightSelector) {
        rightSelector.addEventListener('change', function() {
            currentRightMetric = this.value; 
            renderMapPolygons(rightMap, rightPolygons, 'right', currentRightMetric);
            updateMetrics();
        });
    }

    let isSyncing = false;
    if (overlayToggle) {
        overlayToggle.addEventListener('change', function() {
            if (this.checked) rightMap.setView(leftMap.getCenter(), leftMap.getZoom(), { animate: true });
        });
        leftMap.on('move', function() {
            if (overlayToggle.checked && !isSyncing) {
                isSyncing = true;
                rightMap.setView(leftMap.getCenter(), leftMap.getZoom(), { animate: false });
                isSyncing = false;
            }
        });
        rightMap.on('move', function() {
            if (overlayToggle.checked && !isSyncing) {
                isSyncing = true;
                leftMap.setView(rightMap.getCenter(), rightMap.getZoom(), { animate: false });
                isSyncing = false;
            }
        });
    }
}

// 7. CLICK HANDLER (Green Highlight)
function handlePolygonClick(e, sourceMap) {
    const targetName = e.target.neighborhoodName;

    window.currentSelection = targetName; 

    leftPolygons.forEach(p => p.setStyle(p.defaultStyle));
    rightPolygons.forEach(p => p.setStyle(p.defaultStyle));

    const leftTarget = leftPolygons.find(p => p.neighborhoodName === targetName);
    const rightTarget = rightPolygons.find(p => p.neighborhoodName === targetName);

    if (leftTarget) {
        leftTarget.setStyle(STYLE_HIGHLIGHT);
        if(sourceMap === 'left') leftTarget.openPopup();
    }
    if (rightTarget) {
        rightTarget.setStyle(STYLE_HIGHLIGHT);
        if(sourceMap === 'right') rightTarget.openPopup();
    }

    updateMetrics(targetName);
}

// 8. HELPERS
function loadInitialData() {
    updateMetrics(); 
}

function getMetricLabel(metric) {
    const labels = {
        diabetes: 'Diabetes Rate', obesity: 'Obesity Rate', asthma: 'Asthma Rate',
        mental_distress: 'Mental Distress', high_blood_pressure: 'High Blood Pressure',
        income: 'Median Income', education: 'Education Level', food_access: 'Food Access Score',
        poverty_rate: 'Poverty Rate', unemployment: 'Unemployment Rate', healthcare_access: 'Healthcare Access',
        lack_health_insurance: 'Uninsured Rate', visited_dentist: 'Visited Dentist', air_quality: 'Air Quality Index'
    };
    return labels[metric] || metric;
}

function updateMetrics() {
    const leftValues = camdenNeighborhoods.map(n => n.data[currentLeftMetric]).filter(v => v !== undefined);
    const rightValues = camdenNeighborhoods.map(n => n.data[currentRightMetric]).filter(v => v !== undefined);
    
    if (leftValues.length === 0 || rightValues.length === 0) return;
    
    const leftMean = leftValues.reduce((a, b) => a + b, 0) / leftValues.length;
    let disparityIndex = 0;
    if (leftMean > 0) {
        const leftStd = Math.sqrt(leftValues.reduce((sum, val) => sum + Math.pow(val - leftMean, 2), 0) / leftValues.length);
        disparityIndex = (leftStd / leftMean * 100);
    }
    
    const correlation = calculateCorrelation(leftValues, rightValues);
    const equityGap = Math.max(...leftValues) - Math.min(...leftValues);
    
    if(document.getElementById('disparityScore')) document.getElementById('disparityScore').textContent = disparityIndex.toFixed(1);
    if(document.getElementById('correlationScore')) document.getElementById('correlationScore').textContent = correlation.toFixed(2);
    if(document.getElementById('equityScore')) document.getElementById('equityScore').textContent = equityGap.toFixed(1);
}

function calculateCorrelation(x, y) {
    if (x.length !== y.length || x.length === 0) return 0;
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    return denominator === 0 ? 0 : (n * sumXY - sumX * sumY) / denominator;
}

// 8. INITIALIZE ALL CHARTS (Full Restoration)
function initializeAllCharts() {
    console.log('Initializing all dashboard charts...');
    
    // 1. Neighborhood Chart (Bar: Top 10 Diabetes)
    const neighborhoodCanvas = document.getElementById('neighborhoodChart');
    if (neighborhoodCanvas) {
        if (Chart.getChart(neighborhoodCanvas)) Chart.getChart(neighborhoodCanvas).destroy();
        
        const ctx = neighborhoodCanvas.getContext('2d');
        const sorted = [...camdenNeighborhoods].sort((a, b) => (b.data.diabetes || 0) - (a.data.diabetes || 0)).slice(0, 10);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sorted.map(n => n.name),
                datasets: [{
                    label: 'Diabetes Rate (%)',
                    data: sorted.map(n => n.data.diabetes),
                    backgroundColor: sorted.map(n => n.data.diabetes > 20 ? 'rgba(220, 53, 69, 0.8)' : 'rgba(25, 135, 84, 0.8)'),
                    borderColor: 'rgba(108, 117, 125, 1)', borderWidth: 1
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, title: { display: true, text: 'Top 10 Neighborhoods by Diabetes Rate' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Rate (%)' } } }
            }
        });
    }
    
    // 2. Demographics Chart (Doughnut: Income Ranges)
    const demographicsCanvas = document.getElementById('demographicsChart');
    if (demographicsCanvas) {
        if (Chart.getChart(demographicsCanvas)) Chart.getChart(demographicsCanvas).destroy();

        const ctx = demographicsCanvas.getContext('2d');
        const incomeRanges = [
            { range: '< $25K', count: camdenNeighborhoods.filter(n => n.data.income < 25000).length },
            { range: '$25K-35K', count: camdenNeighborhoods.filter(n => n.data.income >= 25000 && n.data.income < 35000).length },
            { range: '$35K-45K', count: camdenNeighborhoods.filter(n => n.data.income >= 35000 && n.data.income < 45000).length },
            { range: '$45K+', count: camdenNeighborhoods.filter(n => n.data.income >= 45000).length }
        ];
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: incomeRanges.map(r => r.range),
                datasets: [{
                    data: incomeRanges.map(r => r.count),
                    backgroundColor: ['#dc3545', '#ffc107', '#17a2b8', '#28a745'],
                    borderWidth: 1
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' }, title: { display: true, text: 'Neighborhoods by Income Level' } } 
            }
        });
    }
    
    // 3. Trend Chart (Scatter: Income vs Diabetes)
    const trendCanvas = document.getElementById('trendChart');
    if (trendCanvas) {
        if (Chart.getChart(trendCanvas)) Chart.getChart(trendCanvas).destroy();

        const ctx = trendCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Neighborhoods',
                    data: camdenNeighborhoods.map(n => ({ x: n.data.income/1000, y: n.data.diabetes })),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false },
                    title: { display: true, text: 'Correlation: Income vs Diabetes' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Income: $${context.parsed.x}k, Diabetes: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: { 
                    x: { title: { display: true, text: 'Median Income ($1k)' } }, 
                    y: { title: { display: true, text: 'Diabetes Rate (%)' } } 
                }
            }
        });
    }
    
    // 4. SDOH Chart (Radar: City Averages)
    const sdohCanvas = document.getElementById('sdohChart');
    if (sdohCanvas) {
        if (Chart.getChart(sdohCanvas)) Chart.getChart(sdohCanvas).destroy();

        const ctx = sdohCanvas.getContext('2d');
        const avgs = {
            pov: camdenNeighborhoods.reduce((s, n) => s + (n.data.poverty_rate || 0), 0) / 19,
            unemp: camdenNeighborhoods.reduce((s, n) => s + (n.data.unemployment || 0), 0) / 19,
            edu: camdenNeighborhoods.reduce((s, n) => s + (n.data.education || 0), 0) / 19,
            ins: camdenNeighborhoods.reduce((s, n) => s + (n.data.lack_health_insurance || 0), 0) / 19
        };
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Poverty Rate', 'Unemployment', 'HS Diploma %', 'Uninsured %'],
                datasets: [{
                    label: 'City Average',
                    data: [avgs.pov, avgs.unemp, avgs.edu, avgs.ins],
                    backgroundColor: 'rgba(255, 159, 64, 0.2)', 
                    borderColor: 'rgba(255, 159, 64, 1)',
                    pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { r: { beginAtZero: true, suggestMax: 60 } },
                plugins: { title: { display: true, text: 'Social Determinants Profile' } }
            }
        });
    }
}

// --- SEARCH FUNCTIONALITY BRIDGE ---
window.highlightNeighborhood = function(query) {
    if (!query) return;
    
    const searchTerm = query.toLowerCase().trim();
    const target = camdenNeighborhoods.find(n => n.name.toLowerCase() === searchTerm);
    
    if (target) {
        console.log("Search found:", target.name);
        
        const poly = leftPolygons.find(p => p.neighborhoodName === target.name);
        
        if (poly) {
            poly.fire('click'); 
            leftMap.fitBounds(poly.getBounds());
            rightMap.fitBounds(poly.getBounds());
        }
    } else {
        alert("Neighborhood not found: " + query);
    }
};

// --- REVOLUTIONARY DATA EXPLORER (Table + Chart + Analytics) ---
function populateDataExplorer() {
    console.log("Initializing Revolutionary Data Explorer...");
    
    // 1. Populate the Data Table
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        dashboardData.neighborhoods.forEach((name, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="ps-3 fw-bold">${name}</td>
                <td>$${dashboardData.income[i].toLocaleString()}</td>
                <td>${dashboardData.poverty[i]}%</td>
                <td>${dashboardData.diabetes[i]}%</td>
                <td>${dashboardData.obesity[i]}%</td>
                <td>${dashboardData.asthma[i]}%</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 2. Setup Event Listeners for the Chart Selectors
    const ids = ['xVariable', 'yVariable'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            // Remove old listeners to be safe, then add new one
            el.replaceWith(el.cloneNode(true)); 
            document.getElementById(id).addEventListener('change', renderCorrelationChart);
        }
    });

    // 3. Render the Initial Chart
    setTimeout(renderCorrelationChart, 500);
}

// --- INTERACTIVE DATA EXPLORATION CHART ---
let correlationChart;

function renderCorrelationChart() {
    const ctx = document.getElementById('correlationChart');
    if (!ctx) {
        console.error("Canvas 'correlationChart' not found.");
        return;
    }

    const xSelect = document.getElementById('xVariable');
    const ySelect = document.getElementById('yVariable');
    if (!xSelect || !ySelect) return;

    const xMetric = xSelect.value;
    const yMetric = ySelect.value;

    if (typeof camdenNeighborhoods === 'undefined' || camdenNeighborhoods.length === 0) {
        console.error("camdenNeighborhoods data is missing.");
        return;
    }

    const scatterData = camdenNeighborhoods.map(n => {
        const dataObj = n.data ? n.data : n; 
        return {
            x: dataObj[xMetric] || 0,
            y: dataObj[yMetric] || 0,
            name: n.name
        };
    });

    if (correlationChart) {
        correlationChart.destroy();
    }

    correlationChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Neighborhoods',
                data: scatterData,
                backgroundColor: 'rgba(13, 110, 253, 0.6)',
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: { top: 20, right: 30, bottom: 20, left: 10 }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const p = context.raw;
                            const xLabel = typeof getMetricLabel === 'function' ? getMetricLabel(xMetric) : xMetric;
                            const yLabel = typeof getMetricLabel === 'function' ? getMetricLabel(yMetric) : yMetric;
                            return `${p.name}: ${xLabel} ${p.x}, ${yLabel} ${p.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { 
                        display: true, 
                        text: typeof getMetricLabel === 'function' ? getMetricLabel(xMetric) : xMetric 
                    },
                    grace: '5%'
                },
                y: {
                    title: { 
                        display: true, 
                        text: typeof getMetricLabel === 'function' ? getMetricLabel(yMetric) : yMetric 
                    },
                    grace: '5%'
                }
            }
        }
    });
}

window.startTour = function() { alert('Welcome to the Camden Health Dashboard!'); };
window.exportData = function(format) { alert(`Data export (${format}) coming soon.`); };

console.log('Dashboard script loaded with GLOBAL DEFAULTS');