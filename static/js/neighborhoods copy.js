// NEIGHBORHOODS.JS - Reference Data & Configuration

// 1. COORDINATE LOOKUP
// Since the database (CSV) does not have Lat/Lng, we store them here.
const neighborhoodCoordinates = {
    'Gateway': { lat: 39.9442, lng: -75.1030 },
    'Bergen Square': { lat: 39.9389, lng: -75.1194 },
    'Cooper Poynt': { lat: 39.9267, lng: -75.1075 },
    'Pyne Point': { lat: 39.9278, lng: -75.1139 },
    'Cramer Hill': { lat: 39.9611, lng: -75.1083 },
    'Beideman': { lat: 39.9417, lng: -75.1000 },
    'Dudley': { lat: 39.9308, lng: -75.1167 },
    'Rosedale': { lat: 39.9150, lng: -75.1072 },
    'Stockton': { lat: 39.9167, lng: -75.1000 },
    'Marlton': { lat: 39.9228, lng: -75.1028 },
    'Parkside': { lat: 39.9372, lng: -75.1028 },
    'Whitman Park': { lat: 39.9311, lng: -75.1111 },
    'Liberty Park': { lat: 39.9239, lng: -75.1194 },
    'Centerville': { lat: 39.9356, lng: -75.1139 },
    'Waterfront South': { lat: 39.9175, lng: -75.1167 },
    'Morgan Village': { lat: 39.9406, lng: -75.1111 },
    'Fairview': { lat: 39.9533, lng: -75.1139 },
    'Cooper Grant': { lat: 39.9378, lng: -75.1167 },
    'Lanning Square': { lat: 39.9494, lng: -75.1167 }
};

// 2. RECOMMENDATION ENGINE
// Logic for generating specific recommendations based on neighborhood needs
const developmentRecommendations = {
    'Gateway': {
        priority: 'Medium',
        recommendations: ['Expand community health center capacity', 'Implement diabetes prevention programs', 'Increase healthy food access'],
        actions: ['Partner with local hospitals', 'Create community gardens']
    },
    'Bergen Square': {
        priority: 'High',
        recommendations: ['Urgent poverty reduction initiatives', 'Health insurance enrollment', 'Food security programs'],
        actions: ['Emergency food assistance', 'Workforce development partnerships']
    },
    'Cooper Poynt': { priority: 'Medium-High', recommendations: ['Diabetes management programs', 'Economic mobility initiatives'], actions: ['Diabetes support groups', 'Small business incubator'] },
    'Pyne Point': { priority: 'High', recommendations: ['Comprehensive diabetes care', 'Poverty reduction strategies'], actions: ['Neighborhood health hub', 'Job placement programs'] },
    'Cramer Hill': { priority: 'Medium-High', recommendations: ['Chronic disease prevention', 'Healthcare access expansion'], actions: ['Community health worker programs', 'Waterfront economic opportunities'] },
    'Beideman': { priority: 'Low', recommendations: ['Maintain current health outcomes', 'Continue preventive care'], actions: ['Share best practices', 'Mentorship programs'] },
    'Dudley': { priority: 'High', recommendations: ['Urgent diabetes intervention', 'Community health education'], actions: ['Diabetes management center', 'Health education campaigns'] },
    'Rosedale': { priority: 'Low-Medium', recommendations: ['Maintain positive trends', 'Support community wellness'], actions: ['Enhance existing programs', 'Local business support'] },
    'Stockton': { priority: 'Medium', recommendations: ['Diabetes prevention', 'Healthcare access improvements'], actions: ['Workplace wellness programs', 'Community fitness'] },
    'Marlton': { priority: 'Medium', recommendations: ['Diabetes management', 'Economic mobility'], actions: ['Community health center', 'Job training'] },
    'Parkside': { priority: 'Low-Medium', recommendations: ['Maintain good health', 'Support wellness'], actions: ['Recreation facilities', 'Business growth'] },
    'Whitman Park': { priority: 'Medium-High', recommendations: ['Diabetes prevention', 'Economic development'], actions: ['Diabetes education', 'Opportunity zones'] },
    'Liberty Park': { priority: 'High', recommendations: ['Urgent diabetes intervention', 'Healthcare infrastructure'], actions: ['Specialty clinic', 'Intensive education'] },
    'Centerville': { priority: 'Medium-High', recommendations: ['Poverty reduction', 'Healthcare access'], actions: ['Resource center', 'Job training'] },
    'Waterfront South': { priority: 'Medium-High', recommendations: ['Diabetes management', 'Economic development'], actions: ['Waterfront health initiatives', 'Support services'] },
    'Morgan Village': { priority: 'Medium', recommendations: ['Diabetes prevention', 'Economic mobility'], actions: ['Health education', 'Screening programs'] },
    'Fairview': { priority: 'Medium', recommendations: ['Diabetes prevention', 'Community health'], actions: ['Expand center services', 'Local business support'] },
    'Cooper Grant': { priority: 'Medium-High', recommendations: ['Diabetes management', 'Economic initiatives'], actions: ['Neighborhood hub', 'Education programs'] },
    'Lanning Square': { priority: 'Low-Medium', recommendations: ['Maintain outcomes', 'Preventive care'], actions: ['Strengthen programs', 'Economic development'] }
};

console.log('Neighborhoods JS loaded: Coordinates & Recommendations ready.');