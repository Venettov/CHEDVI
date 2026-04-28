/**
 * policy.js - Dynamic Policy Recommendations Engine
 * Logic to calculate city-wide metrics from window.NEIGHBORHOOD_DATA
 */

const PolicyEngine = {
    data: window.NEIGHBORHOOD_DATA || [],

    init: function() {
        if (this.data.length === 0) {
            console.warn("Policy Engine: No data found. Check database connection.");
            return;
        }
        this.calculateAndRender();
    },

    calculateAndRender: function() {
        // 1. Identify Extremes (Highest Poverty, Lowest Income)
        const highestPoverty = [...this.data].sort((a, b) => b.poverty - a.poverty)[0];
        const highestIncome = [...this.data].sort((a, b) => b.income - a.income)[0];

        // 2. Calculate Averages for "Current Status"
        const avgAsthma = this.data.reduce((acc, curr) => acc + curr.asthma, 0) / this.data.length;
        const avgDiabetes = this.data.reduce((acc, curr) => acc + curr.diabetes, 0) / this.data.length;
        const avgUninsured = this.data.reduce((acc, curr) => acc + curr.uninsured, 0) / this.data.length;

        // 3. Update the UI
        document.getElementById('highest-poverty-name').textContent = highestPoverty.name;
        document.getElementById('highest-poverty-value').textContent = highestPoverty.poverty.toFixed(1);
        document.getElementById('highest-income-name').textContent = highestIncome.name;

        // Update Target Metric Status
        if(document.getElementById('current-asthma-avg')) {
            document.getElementById('current-asthma-avg').textContent = `${avgAsthma.toFixed(1)}%`;
        }
        if(document.getElementById('current-diabetes-avg')) {
            document.getElementById('current-diabetes-avg').textContent = `${avgDiabetes.toFixed(1)}%`;
        }
        
        console.log("Policy Engine: UI updated with live database stats.");
    }
};

document.addEventListener('DOMContentLoaded', () => PolicyEngine.init());