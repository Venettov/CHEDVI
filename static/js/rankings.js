// CHEDVI - Rankings JavaScript (Live DB Sync Version)

let rankingsData = []; // This will hold our final merged data
let rankingsChart;

// 1. HARDCODED FALLBACK DATA (Safety Net)
const camdenRankingsData = [
    { name: 'Gateway', diabetes: 17.0, obesity: 43.9, asthma: 12.1, mental_distress: 20.3, high_blood_pressure: 37.4, income: 26750, education: 69.34, food_access: 34.04, poverty_rate: 30.78, unemployment: 28.59, population: 1693, healthcare_access: 77.1, lack_health_insurance: 22.7 },
    { name: 'Bergen Square', diabetes: 15.7, obesity: 47.6, asthma: 11.7, mental_distress: 24.1, high_blood_pressure: 40.4, income: 12104, education: 57.70, food_access: 77.61, poverty_rate: 54.36, unemployment: 34.22, population: 2766, healthcare_access: 76.1, lack_health_insurance: 29.8 },
    { name: 'Cooper Poynt', diabetes: 18.9, obesity: 44.8, asthma: 14.3, mental_distress: 22.3, high_blood_pressure: 41.0, income: 29789, education: 41.41, food_access: 8.97, poverty_rate: 36.71, unemployment: 11.43, population: 1338, healthcare_access: 75.1, lack_health_insurance: 32.2 },
    { name: 'Pyne Point', diabetes: 21.4, obesity: 46.6, asthma: 12.9, mental_distress: 22.9, high_blood_pressure: 35.6, income: 19412, education: 36.94, food_access: 0.31, poverty_rate: 39.82, unemployment: 14.21, population: 5211, healthcare_access: 75.7, lack_health_insurance: 36.1 },
    { name: 'Cramer Hill', diabetes: 18.4, obesity: 44.8, asthma: 14.1, mental_distress: 25.6, high_blood_pressure: 48.5, income: 28198, education: 25.47, food_access: 1.16, poverty_rate: 38.68, unemployment: 9.42, population: 3804, healthcare_access: 71.5, lack_health_insurance: 39.9 },
    { name: 'Beideman', diabetes: 13.4, obesity: 40.2, asthma: 13.0, mental_distress: 19.1, high_blood_pressure: 45.1, income: 58983, education: 43.14, food_access: 2.21, poverty_rate: 11.91, unemployment: 9.73, population: 5645, healthcare_access: 73.4, lack_health_insurance: 29.7 },
    { name: 'Dudley', diabetes: 22.2, obesity: 41.8, asthma: 12.4, mental_distress: 20.9, high_blood_pressure: 48.7, income: 35491, education: 37.81, food_access: 12.45, poverty_rate: 24.96, unemployment: 3.93, population: 3295, healthcare_access: 73.5, lack_health_insurance: 34.2 },
    { name: 'Rosedale', diabetes: 16.9, obesity: 38.8, asthma: 13.1, mental_distress: 18.6, high_blood_pressure: 38.6, income: 51741, education: 44.01, food_access: 25.12, poverty_rate: 19.22, unemployment: 13.15, population: 5044, healthcare_access: 75.3, lack_health_insurance: 28.7 },
    { name: 'Stockton', diabetes: 17.9, obesity: 41.9, asthma: 11.2, mental_distress: 20.1, high_blood_pressure: 36.3, income: 44357, education: 49.38, food_access: 33.45, poverty_rate: 20.17, unemployment: 5.94, population: 6529, healthcare_access: 74.9, lack_health_insurance: 27.4 },
    { name: 'Marlton', diabetes: 19.2, obesity: 43.2, asthma: 11.5, mental_distress: 21.0, high_blood_pressure: 42.7, income: 31312, education: 45.20, food_access: 18.76, poverty_rate: 30.43, unemployment: 16.67, population: 4726, healthcare_access: 74.9, lack_health_insurance: 28.6 },
    { name: 'Parkside', diabetes: 15.0, obesity: 46.1, asthma: 10.6, mental_distress: 21.9, high_blood_pressure: 40.2, income: 45662, education: 48.07, food_access: 6.07, poverty_rate: 19.40, unemployment: 26.16, population: 4181, healthcare_access: 80.0, lack_health_insurance: 19.4 },
    { name: 'Whitman Park', diabetes: 21.5, obesity: 44.8, asthma: 10.6, mental_distress: 22.0, high_blood_pressure: 35.1, income: 31941, education: 60.14, food_access: 5.25, poverty_rate: 28.40, unemployment: 18.81, population: 5394, healthcare_access: 77.8, lack_health_insurance: 21.8 },
    { name: 'Liberty Park', diabetes: 23.1, obesity: 48.7, asthma: 11.0, mental_distress: 24.9, high_blood_pressure: 43.6, income: 29210, education: 55.44, food_access: 45.53, poverty_rate: 26.21, unemployment: 11.37, population: 2401, healthcare_access: 78.3, lack_health_insurance: 25.4 },
    { name: 'Centerville', diabetes: 14.7, obesity: 51.4, asthma: 13.4, mental_distress: 25.5, high_blood_pressure: 35.4, income: 22181, education: 41.57, food_access: 77.96, poverty_rate: 42.97, unemployment: 25.90, population: 2805, healthcare_access: 79.6, lack_health_insurance: 26.9 },
    { name: 'Waterfront South', diabetes: 20.3, obesity: 44.3, asthma: 10.4, mental_distress: 22.1, high_blood_pressure: 36.4, income: 54324, education: 43.90, food_access: 81.58, poverty_rate: 40.45, unemployment: 8.51, population: 918, healthcare_access: 76.9, lack_health_insurance: 24.6 },
    { name: 'Morgan Village', diabetes: 17.5, obesity: 45.7, asthma: 11.3, mental_distress: 22.4, high_blood_pressure: 46.7, income: 34796, education: 61.16, food_access: 42.91, poverty_rate: 32.57, unemployment: 9.16, population: 2701, healthcare_access: 78.1, lack_health_insurance: 21.9 },
    { name: 'Fairview', diabetes: 17.3, obesity: 43.6, asthma: 12.7, mental_distress: 20.9, high_blood_pressure: 40.4, income: 41840, education: 62.64, food_access: 12.34, poverty_rate: 20.76, unemployment: 24.87, population: 6221, healthcare_access: 77.5, lack_health_insurance: 19.3 },
    { name: 'Cooper Grant', diabetes: 19.4, obesity: 36.0, asthma: 12.3, mental_distress: 19.2, high_blood_pressure: 38.5, income: 51635, education: 90.55, food_access: 1.05, poverty_rate: 41.01, unemployment: 14.15, population: 2274, healthcare_access: 76.5, lack_health_insurance: 14.7 },
    { name: 'Lanning Square', diabetes: 18.0, obesity: 41.3, asthma: 13.4, mental_distress: 21.0, high_blood_pressure: 47.7, income: 38447, education: 61.43, food_access: 11.02, poverty_rate: 18.62, unemployment: 8.24, population: 4853, healthcare_access: 74.7, lack_health_insurance: 22.2 }
];

// ==========================================
// 2. INITIALIZE AND SYNC WITH DATABASE
// ==========================================
window.initializeRankingsWithDB = function(dbResults) {
    console.log("✅ Rankings received live data. Syncing...");
    
    rankingsData = camdenRankingsData.map(neighborhood => {
        const fresh = dbResults.find(d => d.name === neighborhood.name);
        if (fresh) {
            return {
                name: neighborhood.name,
                diabetes: fresh.diabetes || neighborhood.diabetes,
                obesity: fresh.obesity || neighborhood.obesity,
                asthma: fresh.asthma || neighborhood.asthma,
                mental_distress: fresh.mentalDistress || neighborhood.mental_distress,
                high_blood_pressure: fresh.highBloodPressure || neighborhood.high_blood_pressure,
                income: fresh.income || neighborhood.income,
                education: fresh.education || neighborhood.education,
                food_access: fresh.foodAccess || neighborhood.food_access,
                poverty_rate: fresh.poverty || neighborhood.poverty_rate,
                unemployment: fresh.unemployment || neighborhood.unemployment,
                population: fresh.population || neighborhood.population,
                lack_health_insurance: fresh.uninsured || neighborhood.lack_health_insurance
            };
        }
        return neighborhood;
    });

    window.sortAndRenderRankings();
};

// ==========================================
// 3. CORE LOGIC (Sorting and Rendering)
// ==========================================
window.sortAndRenderRankings = function() {
    const metricElement = document.getElementById('metricSelector');
    const sortElement = document.getElementById('sortOrder');
    
    if (!metricElement || !sortElement) return;

    const rawMetric = metricElement.value;
    const sortOrder = sortElement.value;

    // MAP HTML VALUES TO DB KEYS
    const keyMap = {
        'poverty': 'poverty_rate',
        'insurance': 'lack_health_insurance',
        'uninsured': 'lack_health_insurance',
        'foodAccess': 'food_access',
        'mentalDistress': 'mental_distress',
        'highBloodPressure': 'high_blood_pressure'
    };
    const metric = keyMap[rawMetric] || rawMetric;

    // Update Header Text above the table
    const headerEl = document.getElementById('valueHeader');
    if (headerEl) {
        headerEl.innerText = getMetricDisplayName(metric);
    }

    // Sort Data Array
    rankingsData.sort((a, b) => {
        const valA = a[metric] || 0;
        const valB = b[metric] || 0;
        return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    renderRankingsTable(rankingsData, metric);
    updateRankingsChart(rankingsData, metric);
};

// --- Render the HTML Table ---
function renderRankingsTable(data, metric) {
    const tbody = document.getElementById('rankingsBody'); 
    if (!tbody) return;
    tbody.innerHTML = '';

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        
        let rawValue = row[metric] || 0;
        let valDisplay = rawValue;
        
        // Format Currency vs Percentage vs Raw Number
        if (metric === 'income') {
            valDisplay = `$${rawValue.toLocaleString()}`;
        } else if (metric !== 'population' && metric !== 'food_access') {
            valDisplay = `${rawValue}%`;
        } else {
            valDisplay = rawValue.toLocaleString();
        }

        // Restore Badge Logic
        let badgeClass = 'bg-secondary';
        let badgeText = 'Neutral';
        
        if (metric === 'income') {
            if (rawValue > 50000) { badgeClass = 'bg-success'; badgeText = 'High'; }
            else if (rawValue < 25000) { badgeClass = 'bg-danger'; badgeText = 'Critical'; }
            else { badgeClass = 'bg-warning text-dark'; badgeText = 'Medium'; }
        } else if (['diabetes', 'poverty_rate', 'obesity', 'asthma', 'mental_distress', 'lack_health_insurance'].includes(metric)) {
            if (rawValue > 20) { badgeClass = 'bg-danger'; badgeText = 'High Risk'; }
            else if (rawValue < 15) { badgeClass = 'bg-success'; badgeText = 'Low Risk'; }
            else { badgeClass = 'bg-warning text-dark'; badgeText = 'Moderate'; }
        }
        
        // The button <td> has been removed below:
        tr.innerHTML = `
            <td class="ps-4"><strong>#${index + 1}</strong></td>
            <td>${row.name}</td>
            <td class="text-primary fw-bold">${valDisplay}</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// --- Render the Chart.js Bar Chart ---
function updateRankingsChart(data, metric) {
    const ctx = document.getElementById('rankingsChart');
    if (!ctx) return;

    // Slice for Top 10 visualization!
    const top10Data = data.slice(0, 10);

    if (rankingsChart) rankingsChart.destroy();

    rankingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top10Data.map(d => d.name),
            datasets: [{
                label: getMetricDisplayName(metric),
                data: top10Data.map(d => d[metric]),
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Restored original blue
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { 
                y: { 
                    beginAtZero: true,
                    title: { display: true, text: getMetricDisplayName(metric) }
                } 
            },
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let val = context.raw;
                            if (metric === 'income') return `$${val.toLocaleString()}`;
                            if (metric !== 'population' && metric !== 'food_access') return `${val}%`;
                            return val;
                        }
                    }
                }
            }
        }
    });
}

// ==========================================
// 4. HELPERS AND EXPORTS
// ==========================================
function getMetricDisplayName(metric) {
    const metricNames = {
        'diabetes': 'Diabetes Rate (%)',
        'obesity': 'Obesity Rate (%)',
        'asthma': 'Asthma Rate (%)',
        'mental_distress': 'Mental Distress (%)',
        'high_blood_pressure': 'High Blood Pressure (%)',
        'income': 'Median Income ($)',
        'education': 'High School Graduation (%)',
        'food_access': 'Low Food Access Score',
        'poverty_rate': 'Poverty Rate (%)',
        'unemployment': 'Unemployment Rate (%)',
        'population': 'Population',
        'healthcare_access': 'Healthcare Access (%)',
        'lack_health_insurance': 'Uninsured Rate (%)',
        'visited_dentist': 'Visited Dentist (%)'
    };
    return metricNames[metric] || metric;
}

// Global CSV Export Function
window.exportToCSV = function() {
    if (!rankingsData || rankingsData.length === 0) {
        alert("No data to export");
        return;
    }

    const metricSelect = document.getElementById('metricSelector');
    let metric = metricSelect ? metricSelect.value : 'diabetes';
    
    // Map the key for export
    const keyMap = { 'poverty': 'poverty_rate', 'insurance': 'lack_health_insurance' };
    metric = keyMap[metric] || metric;

    const metricLabel = getMetricDisplayName(metric).replace(/,/g, ''); 

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += `Rank,Neighborhood,${metricLabel}\n`;

    rankingsData.forEach(function(row, index) {
        let val = row[metric];
        let rowString = `${index + 1},"${row.name}",${val}`;
        csvContent += rowString + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Camden_Rankings_${metric}.csv`);
    document.body.appendChild(link);
    
    link.click();
    document.body.removeChild(link);
};