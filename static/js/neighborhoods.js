// Real Camden neighborhood data with health metrics
const realCamdenData = [
    { name: 'Gateway', diabetes: 17.0, obesity: 43.9, income: 26750, poverty: 30.78, population: 1693, lat: 39.9442, lng: -75.1030 },
    { name: 'Bergen Square', diabetes: 15.7, obesity: 47.6, income: 12104, poverty: 54.36, population: 2766, lat: 39.9389, lng: -75.1194 },
    { name: 'Cooper Poynt', diabetes: 18.9, obesity: 44.8, income: 29789, poverty: 36.71, population: 1338, lat: 39.9267, lng: -75.1075 },
    { name: 'Pyne Point', diabetes: 21.4, obesity: 46.6, income: 19412, poverty: 39.82, population: 5211, lat: 39.9278, lng: -75.1139 },
    { name: 'Cramer Hill', diabetes: 18.4, obesity: 44.8, income: 28198, poverty: 38.68, population: 3804, lat: 39.9611, lng: -75.1083 },
    { name: 'Beideman', diabetes: 13.4, obesity: 40.2, income: 58983, poverty: 11.91, population: 5645, lat: 39.9417, lng: -75.1000 },
    { name: 'Dudley', diabetes: 22.2, obesity: 41.8, income: 35491, poverty: 24.96, population: 3295, lat: 39.9308, lng: -75.1167 },
    { name: 'Rosedale', diabetes: 16.9, obesity: 38.8, income: 51741, poverty: 19.22, population: 5044, lat: 39.9150, lng: -75.1072 },
    { name: 'Stockton', diabetes: 17.9, obesity: 41.9, income: 44357, poverty: 20.17, population: 6529, lat: 39.9167, lng: -75.1000 },
    { name: 'Marlton', diabetes: 19.2, obesity: 43.2, income: 31312, poverty: 30.43, population: 4726, lat: 39.9228, lng: -75.1028 },
    { name: 'Parkside', diabetes: 15.0, obesity: 46.1, income: 45662, poverty: 19.40, population: 4181, lat: 39.9372, lng: -75.1028 },
    { name: 'Whitman Park', diabetes: 21.5, obesity: 44.8, income: 31941, poverty: 28.40, population: 5394, lat: 39.9311, lng: -75.1111 },
    { name: 'Liberty Park', diabetes: 23.1, obesity: 48.7, income: 29210, poverty: 26.21, population: 2401, lat: 39.9239, lng: -75.1194 },
    { name: 'Centerville', diabetes: 14.7, obesity: 51.4, income: 22181, poverty: 42.97, population: 2805, lat: 39.9356, lng: -75.1139 },
    { name: 'Waterfront South', diabetes: 20.3, obesity: 44.3, income: 54324, poverty: 40.45, population: 918, lat: 39.9175, lng: -75.1167 },
    { name: 'Morgan Village', diabetes: 17.5, obesity: 45.7, income: 34796, poverty: 32.57, population: 2701, lat: 39.9406, lng: -75.1111 },
    { name: 'Fairview', diabetes: 17.3, obesity: 43.6, income: 41840, poverty: 20.76, population: 6221, lat: 39.9533, lng: -75.1139 },
    { name: 'Cooper Grant', diabetes: 19.4, obesity: 36.0, income: 51635, poverty: 41.01, population: 2274, lat: 39.9378, lng: -75.1167 },
    { name: 'Lanning Square', diabetes: 18.0, obesity: 41.3, income: 38447, poverty: 18.62, population: 4853, lat: 39.9494, lng: -75.1167 }
];

// Development recommendations based on neighborhood health data
const developmentRecommendations = {
    'Gateway': {
        priority: 'Medium',
        recommendations: [
            'Expand community health center capacity',
            'Implement diabetes prevention programs',
            'Increase healthy food access through mobile markets',
            'Develop economic development initiatives'
        ],
        actions: [
            'Partner with local hospitals for mobile health clinics',
            'Create community gardens and nutrition education programs',
            'Establish job training programs for healthcare careers'
        ]
    },
    'Bergen Square': {
        priority: 'High',
        recommendations: [
            'Urgent poverty reduction initiatives',
            'Comprehensive health insurance enrollment',
            'Food security programs',
            'Economic development and job creation'
        ],
        actions: [
            'Establish emergency food assistance programs',
            'Create workforce development partnerships',
            'Implement rent assistance and housing stability programs'
        ]
    },
    'Cooper Poynt': {
        priority: 'Medium-High',
        recommendations: [
            'Diabetes management and prevention programs',
            'Economic mobility initiatives',
            'Healthcare access improvements',
            'Community wellness programs'
        ],
        actions: [
            'Launch diabetes support groups and education',
            'Expand public transportation to healthcare facilities',
            'Develop small business incubator programs'
        ]
    },
    'Pyne Point': {
        priority: 'High',
        recommendations: [
            'Comprehensive diabetes care programs',
            'Poverty reduction strategies',
            'Healthcare infrastructure development',
            'Economic opportunity creation'
        ],
        actions: [
            'Establish neighborhood health hub',
            'Create job placement and training programs',
            'Implement chronic disease management programs'
        ]
    },
    'Cramer Hill': {
        priority: 'Medium-High',
        recommendations: [
            'Chronic disease prevention programs',
            'Economic development initiatives',
            'Healthcare access expansion',
            'Community wellness centers'
        ],
        actions: [
            'Develop waterfront economic opportunities',
            'Create community health worker programs',
            'Establish diabetes prevention initiatives'
        ]
    },
    'Beideman': {
        priority: 'Low',
        recommendations: [
            'Maintain current health outcomes',
            'Expand successful programs to other neighborhoods',
            'Continue preventive care emphasis',
            'Support community leadership'
        ],
        actions: [
            'Document and share best practices',
            'Mentor other neighborhoods in health initiatives',
            'Maintain robust preventive care programs'
        ]
    },
    'Dudley': {
        priority: 'High',
        recommendations: [
            'Urgent diabetes intervention programs',
            'Community health education',
            'Healthcare access improvements',
            'Economic stability programs'
        ],
        actions: [
            'Establish diabetes management center',
            'Create health education campaigns',
            'Develop job training and placement programs'
        ]
    },
    'Rosedale': {
        priority: 'Low-Medium',
        recommendations: [
            'Maintain positive health trends',
            'Expand preventive care programs',
            'Support community wellness initiatives',
            'Continue economic development'
        ],
        actions: [
            'Enhance existing community programs',
            'Expand health screening programs',
            'Support local business development'
        ]
    },
    'Stockton': {
        priority: 'Medium',
        recommendations: [
            'Diabetes prevention programs',
            'Community health initiatives',
            'Economic development support',
            'Healthcare access improvements'
        ],
        actions: [
            'Implement workplace wellness programs',
            'Create community fitness and nutrition programs',
            'Expand healthcare provider network'
        ]
    },
    'Marlton': {
        priority: 'Medium',
        recommendations: [
            'Diabetes management programs',
            'Economic mobility initiatives',
            'Healthcare access expansion',
            'Community wellness programs'
        ],
        actions: [
            'Establish community health center',
            'Create diabetes support groups',
            'Develop job training programs'
        ]
    },
    'Parkside': {
        priority: 'Low-Medium',
        recommendations: [
            'Maintain good health outcomes',
            'Expand preventive care',
            'Support community wellness',
            'Continue economic development'
        ],
        actions: [
            'Strengthen existing health programs',
            'Expand community recreation facilities',
            'Support local business growth'
        ]
    },
    'Whitman Park': {
        priority: 'Medium-High',
        recommendations: [
            'Diabetes prevention and management',
            'Economic development initiatives',
            'Healthcare access improvements',
            'Community wellness programs'
        ],
        actions: [
            'Create diabetes education programs',
            'Establish community health workers',
            'Develop economic opportunity zones'
        ]
    },
    'Liberty Park': {
        priority: 'High',
        recommendations: [
            'Urgent diabetes intervention',
            'Comprehensive health programs',
            'Economic development initiatives',
            'Healthcare infrastructure'
        ],
        actions: [
            'Establish diabetes specialty clinic',
            'Create intensive health education programs',
            'Develop job creation initiatives'
        ]
    },
    'Centerville': {
        priority: 'Medium-High',
        recommendations: [
            'Poverty reduction programs',
            'Healthcare access expansion',
            'Economic development initiatives',
            'Community wellness programs'
        ],
        actions: [
            'Establish community resource center',
            'Create job training and placement programs',
            'Expand healthcare provider network'
        ]
    },
    'Waterfront South': {
        priority: 'Medium-High',
        recommendations: [
            'Diabetes management programs',
            'Economic development initiatives',
            'Healthcare access improvements',
            'Community wellness programs'
        ],
        actions: [
            'Leverage waterfront development for health benefits',
            'Create community health programs',
            'Establish diabetes support services'
        ]
    },
    'Morgan Village': {
        priority: 'Medium',
        recommendations: [
            'Diabetes prevention programs',
            'Economic mobility initiatives',
            'Healthcare access expansion',
            'Community wellness programs'
        ],
        actions: [
            'Implement community health education',
            'Create economic development programs',
            'Establish health screening programs'
        ]
    },
    'Fairview': {
        priority: 'Medium',
        recommendations: [
            'Diabetes prevention programs',
            'Community health initiatives',
            'Economic development support',
            'Healthcare access improvements'
        ],
        actions: [
            'Expand community health center services',
            'Create diabetes prevention programs',
            'Support local business development'
        ]
    },
    'Cooper Grant': {
        priority: 'Medium-High',
        recommendations: [
            'Diabetes management programs',
            'Economic development initiatives',
            'Healthcare access improvements',
            'Community wellness programs'
        ],
        actions: [
            'Establish neighborhood health hub',
            'Create community health education programs',
            'Develop economic opportunity initiatives'
        ]
    },
    'Lanning Square': {
        priority: 'Low-Medium',
        recommendations: [
            'Maintain good health outcomes',
            'Expand preventive care programs',
            'Support community wellness',
            'Continue economic development'
        ],
        actions: [
            'Strengthen existing health programs',
            'Expand community wellness initiatives',
            'Support local economic development'
        ]
    }
};

// Initialize the neighborhoods page
document.addEventListener('DOMContentLoaded', function() {
    initializeNeighborhoodSelector();
    
    // Check for URL parameter to auto-select neighborhood
    const urlParams = new URLSearchParams(window.location.search);
    const selectedNeighborhood = urlParams.get('selected');
    if (selectedNeighborhood) {
        const selector = document.getElementById('neighborhoodSelector');
        if (selector) {
            selector.value = selectedNeighborhood;
            displayNeighborhoodDetails(selectedNeighborhood);
        }
    }
    
    console.log('Neighborhood profiles page initialized - Ready for dropdown selection');
});

function initializeNeighborhoodSelector() {
    const selector = document.getElementById('neighborhood-selector');
    
    // Populate dropdown with neighborhoods
    realCamdenData.forEach(neighborhood => {
        const option = document.createElement('option');
        option.value = neighborhood.name;
        option.textContent = neighborhood.name;
        selector.appendChild(option);
    });
    
    // Handle neighborhood selection
    selector.addEventListener('change', function() {
        const selectedNeighborhood = this.value;
        if (selectedNeighborhood) {
            displayNeighborhoodDetails(selectedNeighborhood);
        } else {
            hideNeighborhoodDetails();
        }
    });
}

function displayNeighborhoodDetails(neighborhoodName) {
    const neighborhood = realCamdenData.find(n => n.name === neighborhoodName);
    const recommendations = developmentRecommendations[neighborhoodName];
    
    if (!neighborhood) return;
    
    // Show details section
    document.getElementById('neighborhood-details').style.display = 'block';
    
    // Update main content
    document.getElementById('neighborhood-name').innerHTML = `<i class="fas fa-home me-2"></i>${neighborhood.name}`;
    document.getElementById('population-stat').textContent = neighborhood.population.toLocaleString();
    document.getElementById('income-stat').textContent = `$${(neighborhood.income/1000).toFixed(0)}k`;
    document.getElementById('diabetes-stat').textContent = `${neighborhood.diabetes.toFixed(1)}%`;
    document.getElementById('poverty-stat').textContent = `${neighborhood.poverty.toFixed(1)}%`;
    
    // Calculate equity status
    const equityStatus = getEquityStatus(neighborhood);
    document.getElementById('equity-status').innerHTML = `<span class="text-${equityStatus.color}">${equityStatus.label}</span>`;
    
    // Calculate health rank
    const healthRank = calculateHealthRank(neighborhood);
    document.getElementById('health-rank').innerHTML = `<span class="text-${healthRank.color}">#${healthRank.rank}</span>`;
    
    // Set priority level
    document.getElementById('priority-level').innerHTML = `<span class="text-${getPriorityColor(recommendations.priority)}">${recommendations.priority}</span>`;
    
    // Update community context
    updateCommunityContext(neighborhood);
    
    // Update recommendations
    updateRecommendations(recommendations);
    
    // Scroll to details
    document.getElementById('neighborhood-details').scrollIntoView({ behavior: 'smooth' });
}

function hideNeighborhoodDetails() {
    document.getElementById('neighborhood-details').style.display = 'none';
}

function getEquityStatus(neighborhood) {
    const diabetesScore = neighborhood.diabetes <= 15 ? 2 : neighborhood.diabetes <= 20 ? 1 : 0;
    const incomeScore = neighborhood.income >= 45000 ? 2 : neighborhood.income >= 30000 ? 1 : 0;
    const povertyScore = neighborhood.poverty <= 20 ? 2 : neighborhood.poverty <= 35 ? 1 : 0;
    
    const totalScore = diabetesScore + incomeScore + povertyScore;
    
    if (totalScore >= 5) return { label: 'High Equity', color: 'success' };
    if (totalScore >= 3) return { label: 'Medium Equity', color: 'warning' };
    return { label: 'Low Equity', color: 'danger' };
}

function calculateHealthRank(neighborhood) {
    // Calculate composite health score (lower is better)
    const healthScore = neighborhood.diabetes + neighborhood.poverty - (neighborhood.income / 1000);
    
    // Sort all neighborhoods by health score
    const sortedNeighborhoods = [...realCamdenData].sort((a, b) => {
        const aScore = a.diabetes + a.poverty - (a.income / 1000);
        const bScore = b.diabetes + b.poverty - (b.income / 1000);
        return aScore - bScore;
    });
    
    const rank = sortedNeighborhoods.findIndex(n => n.name === neighborhood.name) + 1;
    
    let color;
    if (rank <= 6) color = 'success';
    else if (rank <= 12) color = 'warning';
    else color = 'danger';
    
    return { rank, color };
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'High': return 'danger';
        case 'Medium-High': return 'warning';
        case 'Medium': return 'info';
        case 'Low-Medium': return 'primary';
        case 'Low': return 'success';
        default: return 'secondary';
    }
}

function updateCommunityContext(neighborhood) {
    const contextElement = document.getElementById('community-context');
    
    let context = `<div class="row">
        <div class="col-md-12">
            <h6 class="text-primary mb-3">Health Profile Overview</h6>
            <p><strong>${neighborhood.name}</strong> is home to ${neighborhood.population.toLocaleString()} residents with a median income of $${neighborhood.income.toLocaleString()}.</p>
            
            <div class="row mt-3">
                <div class="col-md-6">
                    <h6 class="text-danger">Health Challenges</h6>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-exclamation-triangle text-warning me-2"></i>Diabetes rate: ${neighborhood.diabetes.toFixed(1)}%</li>
                        <li><i class="fas fa-exclamation-triangle text-warning me-2"></i>Poverty rate: ${neighborhood.poverty.toFixed(1)}%</li>
                        <li><i class="fas fa-weight text-info me-2"></i>Obesity rate: ${neighborhood.obesity.toFixed(1)}%</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h6 class="text-success">Opportunities</h6>
                    <ul class="list-unstyled">`;
    
    // Add opportunities based on neighborhood characteristics
    if (neighborhood.income > 40000) {
        context += `<li><i class="fas fa-dollar-sign text-success me-2"></i>Stable economic base</li>`;
    }
    if (neighborhood.diabetes < 18) {
        context += `<li><i class="fas fa-heart text-success me-2"></i>Relatively good health outcomes</li>`;
    }
    if (neighborhood.poverty < 25) {
        context += `<li><i class="fas fa-home text-success me-2"></i>Lower poverty rates</li>`;
    }
    if (neighborhood.population > 4000) {
        context += `<li><i class="fas fa-users text-success me-2"></i>Strong community size</li>`;
    }
    
    context += `</ul>
                </div>
            </div>
        </div>
    </div>`;
    
    contextElement.innerHTML = context;
}

function updateRecommendations(recommendations) {
    const recommendationsElement = document.getElementById('recommendations-content');
    const actionsElement = document.getElementById('action-items');
    
    // Update recommendations
    let recommendationsHtml = `<div class="mb-3">
        <h6 class="text-success mb-2">Key Development Strategies</h6>
        <ul class="list-unstyled">`;
    
    recommendations.recommendations.forEach(rec => {
        recommendationsHtml += `<li class="mb-2">
            <i class="fas fa-arrow-right text-success me-2"></i>${rec}
        </li>`;
    });
    
    recommendationsHtml += `</ul></div>`;
    recommendationsElement.innerHTML = recommendationsHtml;
    
    // Update action items
    let actionsHtml = `<div class="mb-2">
        <small class="text-muted">Priority: <strong class="text-${getPriorityColor(recommendations.priority)}">${recommendations.priority}</strong></small>
    </div>`;
    
    recommendations.actions.forEach((action, index) => {
        actionsHtml += `<div class="action-item mb-2">
            <small>
                <i class="fas fa-check-circle text-primary me-2"></i>
                ${action}
            </small>
        </div>`;
    });
    
    actionsElement.innerHTML = actionsHtml;
}

console.log('Neighborhood profiles JavaScript loaded - Ready for dropdown interface');