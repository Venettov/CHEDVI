/**
 * policy.js - Dynamic Policy Recommendations Engine
 * Logic to calculate city-wide metrics from window.NEIGHBORHOOD_DATA
 */

document.addEventListener('DOMContentLoaded', function() {
    const data = window.NEIGHBORHOOD_DATA;
    
    // Safety check: Don't run if data failed to load
    if (!data || data.length === 0) {
        console.warn("Policy Engine: No database data found.");
        return;
    }

    // Helper function to calculate city-wide averages easily
    const getAverage = (key) => {
        const sum = data.reduce((acc, current) => acc + (current[key] || 0), 0);
        return (sum / data.length).toFixed(1);
    };

    try {
        // --- 1. Populate City-Wide Average Statistics ---
        document.getElementById('stat-poverty-avg').textContent = getAverage('poverty') + '%';
        document.getElementById('stat-asthma-avg').textContent = getAverage('asthma') + '%';
        
        document.getElementById('stat-uninsured-avg').textContent = getAverage('uninsured') + '%';
        document.getElementById('stat-diabetes-avg').textContent = getAverage('diabetes') + '%';
        
        document.getElementById('stat-foodaccess-avg').textContent = getAverage('foodAccess');
        document.getElementById('stat-obesity-avg').textContent = getAverage('obesity') + '%';
        
        document.getElementById('stat-mental-avg').textContent = getAverage('mentalDistress') + '%';
        document.getElementById('stat-unemployment-avg').textContent = getAverage('unemployment') + '%';

        // --- 2. Calculate Extremes for Key Findings Cards ---
        // Sort poverty descending (highest first)
        const sortedByPoverty = [...data].sort((a, b) => b.poverty - a.poverty);
        // Sort income ascending (lowest first)
        const sortedByIncome = [...data].sort((a, b) => a.income - b.income);

        const highestPovertyTract = sortedByPoverty[0];
        const lowestIncomeTract = sortedByIncome[0]; 
        const highestIncomeTract = sortedByIncome[sortedByIncome.length - 1]; 

        // Inject findings into Priority Card
        document.getElementById('priority-neighborhood').textContent = highestPovertyTract.name;
        document.getElementById('priority-poverty').textContent = highestPovertyTract.poverty.toFixed(1);
        document.getElementById('priority-unemployment').textContent = highestPovertyTract.unemployment.toFixed(1);

        // Inject findings into Health Gap Card
        document.getElementById('gap-name-low').textContent = lowestIncomeTract.name; // <--- ADD THIS
        document.getElementById('gap-name-high').textContent = highestIncomeTract.name; // <--- ADD THIS
        document.getElementById('gap-diabetes-high').textContent = lowestIncomeTract.diabetes.toFixed(1);
        document.getElementById('gap-diabetes-low').textContent = highestIncomeTract.diabetes.toFixed(1);
        
        console.log("Policy Engine initialized successfully with live data.");
    } catch (error) {
        console.error("Policy Engine Error: Could not map data to HTML elements.", error);
    }
});