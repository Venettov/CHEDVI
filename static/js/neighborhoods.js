(function () {
    "use strict";

    const neighborhoodCoordinates = {
        "Gateway": { lat: 39.9442, lng: -75.1030 },
        "Bergen Square": { lat: 39.9389, lng: -75.1194 },
        "Cooper Poynt": { lat: 39.9267, lng: -75.1075 },
        "Pyne Point": { lat: 39.9278, lng: -75.1139 },
        "Cramer Hill": { lat: 39.9611, lng: -75.1083 },
        "Beideman": { lat: 39.9417, lng: -75.1000 },
        "Dudley": { lat: 39.9308, lng: -75.1167 },
        "Rosedale": { lat: 39.9150, lng: -75.1072 },
        "Stockton": { lat: 39.9167, lng: -75.1000 },
        "Marlton": { lat: 39.9228, lng: -75.1028 },
        "Parkside": { lat: 39.9372, lng: -75.1028 },
        "Whitman Park": { lat: 39.9311, lng: -75.1111 },
        "Liberty Park": { lat: 39.9239, lng: -75.1194 },
        "Centerville": { lat: 39.9356, lng: -75.1139 },
        "Waterfront South": { lat: 39.9175, lng: -75.1167 },
        "Morgan Village": { lat: 39.9406, lng: -75.1111 },
        "Fairview": { lat: 39.9533, lng: -75.1139 },
        "Cooper Grant": { lat: 39.9378, lng: -75.1167 },
        "Lanning Square": { lat: 39.9494, lng: -75.1167 }
    };

    const narrativeProfiles = {
        "Gateway": {
            overview: `Gateway Neighborhood
        Population: 1,693 | Camden, NJ
        Key Indicators
        Median Income: $26,750 Diabetes Prevalence: 17.0% Poverty Rate: 30.78% Mental Distress: 20.3% Obesity Rate: 43.9%
        Key Insight
        Gateway achieves better diabetes outcomes than the Camden average despite higher poverty rates. This suggests protective community factors such as accessible healthcare, social support networks, or effective local health programs that may warrant further study and replication across the city.
        Priority Areas
        1. Economic development (address 30.78% poverty rate)
        2. Food access improvement (current score: 34.0/100)
        3. Sustaining diabetes prevention`,
            policy: `Policy Recommendations for Gateway
        1. Economic Development Initiative
        Investment in job training and placement 
        Potential expected return: $2.4M in tax revenue over 5 years 
        Evidence base: Similar programs in comparable cities reduced poverty 3-4 percentage points
        2. Food Access Infrastructure
        Investment in mobile food market and SNAP incentive programs 
        Potential expected impact: 15% improvement in diet quality, estimated 2% obesity reduction over 3 years
        3. Diabetes Prevention Research and Replication
        Investment in studying Gateway's protective factors
        Potential expected impact: Prevent 50 new diabetes cases annually citywide through replication
        Funding Opportunities
        Gateway qualifies for HUD Community Development Block Grants, CDC REACH grants for diabetes prevention, and USDA Food Insecurity Nutrition Incentive programs.`,
            research: `Research Question
        Gateway presents a positive deviance case with lower diabetes prevalence despite higher poverty rates. What protective factors enable this outcome?
        Potential variables:
        • Healthcare facility proximity and insurance coverage rates
        • Food assistance program utilization (SNAP, food pantries, WIC)
        • Social capital and community cohesion measures
        • Built environment (walkability, recreation access)
        • Age distribution and demographic composition
        • Presence of community health worker programs
        Recommended study design:
        • Mixed-methods approach combining qualitative interviews with 30-50 residents
        • GIS analysis of food and built environment, healthcare utilization data, and social network mapping.
        • Compare with similar high-poverty neighborhoods with higher diabetes rates.`,
            community: `Understanding Gateway's Data
        Gateway faces significant economic challenges, nearly one in three households lives in poverty, and median income ($26,750) is 30% below Camden's average. However, the community maintains diabetes rates better than the city average, indicating strong health support systems and community connections.
        Immediate Actions for Community Organizations
        Economic support: Host job fairs connecting residents to local employers; offer resume workshops and interview preparation; connect residents to EITC tax filing assistance; partner with workforce development programs for skills training
        Food access: Survey residents on preferred food access solutions; partner with food banks for weekly mobile markets; enroll SNAP recipients in Double Up Food Bucks; explore community garden feasibility with resident input
        Health support: Partner with local clinics for free diabetes screening; organize walking groups on safe routes; host healthy cooking classes with affordable ingredients; connect uninsured residents to enrollment assistance
        Available Grants
        Robert Wood Johnson Foundation Healthy Communities program ($50k-$200k for food access and community health)
        CDC REACH diabetes prevention grant ($300k annually for chronic disease prevention in underserved communities)
        LISC community development funding ($25k-$100k for economic development and organizing)`
        },

        "Bergen Square": {
            overview: `Bergen Square Neighborhood
        Population: 2,766 | Camden, NJ
        Key Indicators
        Median Income: $12,104  Diabetes Prevalence: 15.7% Poverty Rate: 54.36% Mental Distress: 24.1% Obesity Rate: 47.6%
        Key Insight
        Bergen Square faces the most severe economic distress in Camden with over half of households in poverty and median income of just $12,104. Despite this extreme hardship, diabetes rates remain below the city average at 15.7%, suggesting remarkable community health resilience.
        Priority Areas
        1. Economic emergency response addressing 54.36% poverty and $12,104 median income. 
        2. Healthcare access expansion to capitalize on strong diabetes outcomes. 
        3. Food security programs that address immediate needs while maintaining health gains.`,
            policy: `Policy Recommendations for Bergen Square
        1. Economic Emergency Intervention
        Recommended investment for comprehensive poverty alleviation, including guaranteed income pilot, job training and placement, and emergency assistance
        Potential Expected return: Stabilize the community, prevent further economic collapse 
        Evidence base: Guaranteed income pilots in Stockton, CA, and Jackson, MS showed 25-30% poverty reduction
        2. Healthcare Access Study and Expansion
        Recommended investment to study protective factors and expand successful programs 
        Potential expected impact: Maintain diabetes rate below 18%.
        3. Food Security Infrastructure
        Recommended investment: $400,000 for daily food pantry, SNAP outreach, free meal programs, and mobile market due to severe food insecurity given income levels.
        Expected impact: Eliminate hunger while improving health outcomes
        Funding Opportunities
        Bergen Square qualifies for HUD Choice Neighborhoods Implementation Grant (up to $30M), USDA Community Facilities grants, and DOL POWER Initiative for distressed communities.`,
            research: `Research Question
        Bergen Square presents an extreme positive deviance case: the most economically distressed neighborhood in Camden (54.36% poverty, $12,104 median income) achieves diabetes prevalence substantially better than the city average. What protective factors enable this outcome under conditions of extreme economic stress?
        Potential explanatory variables:
        • Healthcare access despite poverty (free clinics, community health workers, Medicaid enrollment near 100%). 
        • Food assistance program saturation (SNAP, food pantries, WIC, free meal programs). 
        • Social capital and mutual aid networks, despite economic collapse. 
        • Age distribution with a potentially younger population. Selection effects where healthier individuals remain while others relocate.
        Recommended study design:
        • Mixed-methods approach combining secondary data analysis of health records and demographics
        • Qualitative interviews with residents on survival and health strategies
        • Quantitative survey of a representative sample, and comparative analysis with high-poverty, high-diabetes neighborhoods to identify specific protective factors.`,
            community: `Understanding Bergen Square's Data
        Bergen Square faces the deepest poverty in Camden with more than half of households below the poverty line and median income of $12,104 (less than $1,000 per month). However, the community maintains diabetes rates better than the city average, indicating strong health support systems and mutual aid networks that work even under extreme economic pressure.
        Immediate Actions for Community Organizations
        Economic support:
        Partner with guaranteed income pilots, coordinate emergency rent and utility assistance, connect every eligible resident to SNAP, Medicaid, WIC, TANF, and EITC, host weekly job fairs with living-wage employers, and provide childcare and transportation for training programs.
        Food access:
        Establish regular food pantry operations rather than weekly, coordinate free meal programs through churches and schools, and launch a community kitchen serving prepared meals.
        Health support:
        Expand community health worker programs and free clinic hours, increase mobile health unit frequency, maintain diabetes screening and management programs, connect residents to Medicaid enrollment, and provide transportation to medical appointments.
        Available Grants
        • HUD Choice Neighborhoods Implementation Grant (up to $30M for comprehensive community transformation)
        • USDA Community Facilities grants (for food, health, and community centers)
        • Robin Hood Foundation poverty alleviation funding (up to $1M)
        • Kresge Foundation comprehensive community development (100k-$500k)`
        },

        "Cooper Poynt": {
            overview: `Cooper Poynt Neighborhood
        Population: 1,338 | Camden, NJ
        Key Indicators
        Median Income: $29,789 Diabetes Prevalence: 18.9% Poverty Rate: 36.71% Mental Distress: 22.3% Obesity Rate: 44.8%

        Key Insight
        Cooper Poynt faces significant economic hardship with 36.71% poverty despite a median income slightly below the city average. Diabetes rates are marginally above Camden's average at 18.9%, suggesting the community would benefit from targeted diabetes prevention while addressing substantial economic barriers that affect more than one-third of households.
        Priority Areas
        1. Economic development addressing 36.71% poverty rate. 
        2. Diabetes prevention programs to reduce the 18.9% prevalence. 
        3. Food access and healthcare expansion to address social determinants driving health outcomes.`,
            policy: `1. Economic Development Initiative
        Recommended investment in job training, placement services, and small business support 
        Expected return: $2.8M in tax revenue over 5 years 
        Evidence base: Similar programs in comparable cities reduced poverty 3-5 percentage points
        2. Diabetes Prevention and Management
        Recommended investment in community health worker program, diabetes screening, and chronic disease management 
        Expected impact: Reduce diabetes prevalence, preventing new cases.
        3. Food Access and Nutrition Programs
        Recommended investment in SNAP enrollment support, mobile market, nutrition education
        Expected impact: 10% improvement in diet quality, reduction in diabetes risk factors
        Funding Opportunities
        Cooper Poynt qualifies for HUD Community Development Block Grants
        CDC REACH grants for diabetes prevention
        USDA Food Insecurity Nutrition Incentive programs.`,
            research: `Research Question
        Cooper Poynt shows diabetes prevalence marginally above the Camden average despite the poverty rate significantly above city levels. What factors explain the modest difference, and what interventions could reduce diabetes burden given economic constraints?
        Potential explanatory variables:
        • Healthcare access, including proximity to primary care clinics and insurance coverage rates. 
        • Food environment quality and access to healthy food options. 
        • Physical activity opportunities through parks and safe walking routes. 
        • Social support networks and community cohesion. 
        • Existing diabetes management programs and community health resources.
        Recommended study design:
        • Cross-sectional survey of a representative sample examining healthcare utilization, food access, physical activity patterns, and diabetes risk factors.
        • Compare with similar moderate-poverty neighborhoods with lower diabetes rates to identify modifiable factors. 
        • GIS analysis of the built environment and food retail density.`,
            community: `Understanding Cooper Poynt's Data
        Cooper Poynt faces substantial economic challenges, with more than one in three households living in poverty and a median income 22% below Camden's average. Diabetes rates are slightly above the city average at 18.9%, indicating opportunities for targeted prevention while addressing economic barriers that affect community health.
        Immediate Actions for Community Organizations
        Economic support:
        Host job fairs connecting residents to local employers, offer resume workshops and interview preparation, partner with workforce development programs for skills training, and support small business development through technical assistance and microloans.
        Diabetes prevention:
        Partner with local clinics for free diabetes screening and prevention programs, organize walking groups on safe neighborhood routes, host healthy cooking classes with affordable ingredients, connect residents to chronic disease management resources, establish peer support groups for diabetes management.
        Food access:
        Survey residents on preferred food access solutions, partner with food banks for mobile markets, enroll SNAP recipients in Double Up Food Bucks, explore community garden feasibility with resident input, and advocate for grocery store development or incentives.
        Available Grants
        • Robert Wood Johnson Foundation Healthy Communities program ($50k-$200k for food access and community health)
        • CDC REACH diabetes prevention grant ($300k annually for chronic disease prevention)
        • LISC community development funding ($25k-$100k for economic development)`
        },

        "Pyne Point": {
            overview: `Pyne Point Neighborhood
        Population: 5,211 | Camden, NJ
        Key Indicators
        Median Income: $19,412 Diabetes Prevalence: 21.4% Poverty Rate: 39.82% Mental Distress: 22.9% Obesity Rate: 46.6%

        Key Insight
        Pyne Point faces severe health challenges with diabetes prevalence of 21.4%, combined with substantial economic hardship affecting nearly 40% of households. The combination of high chronic disease burden and deep poverty creates compounding barriers to health that require urgent, comprehensive intervention.
        Priority Areas
        • Diabetes prevention and management, addressing the critical 21.4% prevalence. 
        • Economic development targeting 39.82% poverty rate. 
        • Healthcare access expansion to reduce barriers preventing disease management and prevention.`,
            policy: `Policy Recommendations for Pyne Point
        1. Diabetes Prevention and Management Initiative
        • Recommended investment in mobile screening units, community health workers, chronic disease management programs 
        • Expected return: Prevent new diabetes cases, reduce emergency department utilization by 25%
        • Evidence base: Community health worker programs in similar communities reduced diabetes prevalence by 2-3 percentage points
        2. Economic Development Initiative
        • Recommended investment injob training, placement services, and emergency economic assistance .
        • Expected return: $3.2M in tax revenue over 5 years, reduced reliance on emergency services
        3. Healthcare Access Expansion
        Recommended investment in bi-weekly mobile screening units, Medicaid outreach, and transportation to medical appointments.
        Expected impact: Increase diabetes screening rates by 40%.
        Funding Opportunities
        Pyne Point qualifies for HUD Community Development Block Grants
        CDC REACH grants for diabetes prevention.`,
            research: `Research Question
        Pyne Point shows diabetes prevalence 17% above the Camden average, combined with poverty, nearly 40%. What factors drive the elevated chronic disease burden, and what combination of healthcare access, economic support, and community-based interventions could reduce diabetes disparities?
        Potential explanatory variables:
        1. Healthcare access barriers include distance to primary care, insurance coverage gaps, and transportation limitations.
        2. Food environment quality with potential food desert conditions.
        3. Physical activity barriers including unsafe streets or a lack of recreation facilities. 
        4. Age distribution with a potentially older population at higher diabetes risk. 
        5. Healthcare utilization patterns, including preventive care access and medication adherence.
        Recommended study design:
        • Community health needs assessment combining quantitative survey of representative sample examining diabetes risk factors, healthcare utilization, and social determinants.
        • Qualitative interviews with 40-50 residents on barriers to diabetes management. 
        • GIS analysis of healthcare facility access and food environment.`,
            community: `Understanding Pyne Point's Data
        Pyne Point faces severe health challenges with diabetes affecting more than one in five residents, significantly higher than Camden's average. Combined with nearly 40% poverty, the community experiences compounding barriers where economic hardship makes diabetes management difficult and chronic disease creates additional financial strain through medical costs.
        Immediate Actions for Community Organizations
        Diabetes prevention and management:
        Partner with healthcare providers to deploy bi-weekly mobile screening units, establish diabetes support groups and peer health navigation programs, connect residents to free or low-cost diabetes medications and supplies, and organize neighborhood walking groups to promote physical activity.
        Economic support:
        Host job fairs connecting residents to employers offering health insurance, provide resume workshops and interview preparation. Partner with workforce development for healthcare career training, and support small business development for local economic opportunity.
        Healthcare access:
        Conduct Medicaid enrollment drives reaching 85%+ of eligible residents, establish a transportation assistance program for medical appointments, connect residents to community health worker programs, advocate for primary care clinic expansion in the neighborhood, ensuring diabetes patients have consistent access to management programs.
        Available Grants
        CDC REACH diabetes prevention grant ($300k annually for chronic disease prevention in high-burden communities)
        Robert Wood Johnson Foundation Diabetes Today initiative ($100k-$500k for comprehensive diabetes interventions)
        HRSA Community Health Centers funding (for healthcare access expansion in underserved areas)
        LISC health equity funding ($50k-$150k for community health programs)`
        },

        "Cramer Hill": {
            overview: `Cramer Hill Neighborhood
        Population: 3,804 | Camden, NJ
        Key Indicators
        Median Income: $28,198 Diabetes Prevalence: 18.4% Poverty Rate: 38.68% Mental Distress: 25.6% Obesity Rate: 44.8%
        Key Insight
        Cramer Hill faces substantial economic hardship with 38.68% poverty and a median income 26% below Camden's average. The prevalence of 18.4% aligns closely with the city average, suggesting the community maintains health outcomes similar to Camden overall despite significant economic challenges. This presents opportunities for targeted economic development.
        Priority Areas
        • Economic development addressing 38.68% poverty rate. 
        • Diabetes prevention to prevent further increase from the current 18.4%. 
        • Food access and healthcare support to maintain health outcomes while improving economic conditions.`,
            policy: `Policy Recommendations for Cramer Hill
        1. Economic Development Initiative
        Recommended investment in job training, placement services, and small business development 
        Expected return: $3.0M in tax revenue over 5 years 
        Evidence base: Similar programs in comparable cities reduced poverty 3-5 percentage points
        2. Diabetes Prevention Programs
        Recommended investment in community health worker programs, screening, and chronic disease management 
        Expected impact: Maintain diabetes rate below 19%, prevent progression in at-risk residents
        3. Food Access and Nutrition Infrastructure
        Recommended investment in SNAP enrollment support, mobile market, and nutrition education programs 
        Expected impact: Improve diet quality and support diabetes prevention efforts
        Funding Opportunities
        Cramer Hill qualifies for HUD Community Development Block Grants, CDC REACH grants for diabetes prevention, and USDA Food Insecurity Nutrition Incentive programs.
        Measurable Outcomes (2027 Targets)
        Poverty rate: 38.68% to 34% Diabetes prevalence: maintain below 19% Job placements: 90 residents in living-wage positions Median income: $28,198 to $32,000 SNAP enrollment: reach 80%+ of eligible households`,
            research: `Research Profile: Cramer Hill
        Demographics
        Population: 3,804 (ACS 2024 estimate) Median income: $28,198 (±$1,100 MOE estimated) Poverty rate: 38.68% (±3.2pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 18.4% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Cramer Hill maintains diabetes prevalence close to Camden average (18.4% vs 18.2%) despite poverty rate substantially above city levels (38.68% vs 28.5%). What protective factors enable relatively stable health outcomes under economic stress, and how can these be leveraged while addressing economic barriers?
        Potential explanatory variables:
        Healthcare access including proximity to primary care and insurance coverage rates. Existing community health programs and diabetes management resources. Food assistance program utilization including SNAP, food pantries, and WIC. Social support networks and community cohesion buffering economic stress. Built environment supporting physical activity. Age distribution potentially affecting diabetes baseline risk.
        Recommended study design:
        Cross-sectional community survey examining healthcare utilization, food access, social support, and diabetes risk factors among representative sample. Compare with higher-poverty neighborhoods with elevated diabetes rates to identify protective factors. GIS analysis of healthcare facilities, food retail, and recreation access. Qualitative interviews exploring how residents manage health under economic constraints.
        Data quality notes
        Strengths: Moderate population size provides reasonable statistical power Limitations: Health data sources need verification; unemployment and mental health data missing; age-adjusted rates needed
        Critical data gaps:
        Age-adjusted diabetes prevalence, unemployment rate, mental distress prevalence, obesity rate, food access score, healthcare facility utilization, social support measures`,
            community: `Community Action Guide: Cramer Hill
        Understanding Cramer Hill's Data
        Cramer Hill faces significant economic challenges with nearly two in five households living in poverty and median income 26% below Camden's average. Diabetes rates of 18.4% align closely with the city average, showing the community maintains health outcomes similar to Camden overall despite economic hardship. This indicates existing health support systems that should be protected while addressing urgent economic needs.
        Immediate Actions for Community Organizations
        Economic support:
        Host job fairs connecting residents to local employers, offer resume workshops and interview preparation, connect residents to EITC tax filing assistance, partner with workforce development programs for skills training, support small business development through technical assistance and access to capital.
        Diabetes prevention:
        Partner with local clinics for diabetes screening and prevention programs, organize walking groups using safe neighborhood routes, host healthy cooking classes with affordable diabetes-friendly ingredients, establish peer support groups for diabetes management, connect residents to free or low-cost diabetes medications and supplies.
        Food access:
        Survey residents on preferred food access solutions, partner with food banks for weekly mobile markets, enroll SNAP recipients in Double Up Food Bucks program, explore community garden feasibility with resident input, advocate for grocery store development or incentives in neighborhood.
        Available Grants
        Robert Wood Johnson Foundation Healthy Communities program (rolling deadline, $50k-$200k for food access and community health)
        CDC REACH diabetes prevention grant (March 2026 deadline, $300k annually for chronic disease prevention)
        LISC community development funding (quarterly deadlines, $25k-$100k for economic development and organizing)
        Advocacy Messages
        For city officials: "Cramer Hill maintains health outcomes similar to Camden average despite nearly 40% poverty, showing our community's resilience. We need economic development creating living-wage jobs, sustained support for health programs that are working, and food access improvements that build on existing strengths."
        For funders: "Cramer Hill demonstrates how communities can maintain health outcomes under economic stress through strong support systems. Investment here protects what works while addressing urgent poverty, creating a model for sustaining health during economic challenges."`
        },

        "Beideman": {
            overview: `Beideman Neighborhood
        Population: 5,645 | Camden, NJ
        Key Indicators
        Median Income: $58,983 (54% above Camden average) Diabetes Prevalence: 13.4% (Better than Camden's 18.2%) Poverty Rate: 11.91% (Well below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Beideman is Camden's most economically resilient neighborhood with median income of $58,983 and poverty affecting only 11.91% of households. The community achieves excellent health outcomes with diabetes prevalence of 13.4%—26% lower than Camden's average. This neighborhood demonstrates how economic stability supports health and serves as a model for understanding protective factors that could benefit other communities.
        Priority Areas
        Sustaining economic and health success while ensuring affordability remains accessible. Documenting protective factors for replication in other Camden neighborhoods. Maintaining community wellness programs that contribute to strong outcomes.`,
            policy: `Policy Recommendations for Beideman
        1. Protective Factor Documentation and Replication
        Current status: 13.4% diabetes (26% below Camden average), 11.91% poverty Recommended investment: $200,000 to study Beideman's success factors for citywide replication Expected impact: Identify specific policies, programs, and community characteristics enabling strong outcomes; develop replication framework for other neighborhoods Evidence base: Positive deviance research shows high-performing communities offer valuable lessons for improving outcomes elsewhere
        2. Affordability Preservation
        Current status: Highest income neighborhood with strong outcomes Risk: Gentrification pressure and displacement of moderate-income residents Recommended investment: $300,000 for affordable housing preservation strategies, anti-displacement policies Expected impact: Maintain economic diversity, prevent displacement of longtime residents as neighborhood continues to strengthen
        3. Health Program Sustainability
        Current status: Community wellness programs contributing to low diabetes rates Recommended investment: $100,000 to sustain and document effective health programs Expected impact: Maintain diabetes rate below 15%, create replicable program models
        Funding Opportunities
        Beideman qualifies for community health innovation grants, best practices documentation funding, and affordable housing preservation programs.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: maintain below 15% Poverty rate: maintain below 15% Affordable housing units: preserve 200 units Economic diversity: maintain mix of income levels Health program participation: increase by 20%`,
            research: `Research Profile: Beideman
        Demographics
        Population: 5,645 (ACS 2024 estimate) Median income: $58,983 (±$2,000 MOE estimated) Poverty rate: 11.91% (±2.0pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 13.4% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Beideman represents the positive end of Camden's socioeconomic spectrum with median income 54% above city average and diabetes prevalence 26% below average. What specific factors—economic, environmental, programmatic, or social—enable these outcomes, and which are replicable in lower-income communities?
        Potential explanatory variables:
        Economic stability enabling healthcare access, healthy food, and preventive care. Built environment quality including walkability, parks, and recreation facilities. Food environment with proximity to quality grocery stores and healthy food options. Healthcare facility access and insurance coverage rates approaching universal. Social capital and community cohesion supporting health behaviors. Education levels and health literacy. Age distribution with potentially younger, healthier population.
        Recommended study design:
        Comparative case study examining Beideman versus similar-sized neighborhoods with higher diabetes rates. Mixed-methods approach including resident surveys on healthcare utilization, food access, physical activity patterns, and social support. GIS analysis of built environment, food retail density, and healthcare facility proximity. Document specific community programs, policies, and practices contributing to outcomes. Identify which factors are income-dependent versus replicable in lower-resource settings.
        Data quality notes
        Strengths: Larger population size provides strong statistical power; likely better healthcare access improves data accuracy Limitations: Higher-income populations may have better health literacy affecting self-reporting; success factors may be difficult to disentangle from income effects
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, specific community health programs inventory, longitudinal data on neighborhood change`,
            community: `Community Action Guide: Beideman
        Understanding Beideman's Data
        Beideman is Camden's most economically successful neighborhood with median income of $58,983 and only 11.91% poverty—well below the city average. The community achieves excellent health outcomes with diabetes affecting only 13.4% of residents compared to 18.2% citywide. This success reflects economic stability, strong community resources, and effective health programs that other neighborhoods can learn from.
        Immediate Actions for Community Organizations
        Document and share success factors:
        Inventory community programs contributing to strong health outcomes, document best practices in diabetes prevention and health promotion, create case studies showing what works in Beideman, share lessons learned with other Camden neighborhoods, partner with researchers studying positive deviance.
        Preserve affordability and diversity:
        Advocate for affordable housing preservation to prevent displacement, support mixed-income development maintaining economic diversity, connect moderate-income residents to available resources and programs, monitor housing costs and advocate for anti-displacement policies, build coalitions protecting longtime residents.
        Sustain and expand health programs:
        Maintain community wellness programs contributing to low diabetes rates, expand successful programs to reach more residents, share program models with other neighborhoods, connect residents to preventive care and health screenings, support physical activity and nutrition initiatives.
        Available Grants
        Robert Wood Johnson Foundation best practices documentation (for sharing success strategies with other communities)
        Healthy communities innovation grants (for expanding effective programs)
        Affordable housing preservation funding through state and federal sources
        Advocacy Messages
        For city officials: "Beideman demonstrates what's possible—low poverty and low diabetes through economic stability and strong community resources. Study what works here and invest in replicating these conditions citywide. Protect our affordability so success doesn't lead to displacement."
        For funders: "Beideman offers valuable lessons for improving health citywide. Investment in documenting our success factors and helping other neighborhoods adopt effective practices can multiply impact beyond our community while preserving the diversity that strengthens us."`
        },

        "Dudley": {
            overview: `Dudley Neighborhood
        Population: 3,295 | Camden, NJ
        Key Indicators
        Median Income: $35,491 (7% below Camden average) Diabetes Prevalence: 22.2% (Significantly above Camden's 18.2%) Poverty Rate: 24.96% (Affecting 1 in 4 households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Dudley faces a critical diabetes burden with prevalence of 22.2%—22% higher than Camden's average—despite moderate economic indicators with poverty at 24.96% and median income only slightly below city average. The disproportionately high chronic disease burden relative to economic status suggests specific health barriers requiring urgent investigation and intervention.
        Priority Areas
        Diabetes prevention and management addressing critical 22.2% prevalence. Healthcare access expansion to reduce barriers preventing disease management. Investigation of factors driving elevated diabetes despite moderate economic status compared to other neighborhoods.`,
            policy: `Policy Recommendations for Dudley
        1. Urgent Diabetes Intervention Program
        Current status: 22.2% prevalence (22% above Camden's 18.2%) Target: Reduce diabetes to 19% by 2027 Recommended investment: $500,000 for bi-weekly mobile screening units, community health workers, intensive chronic disease management Expected return: Prevent 40 new diabetes cases, reduce emergency department utilization by 30%, avoid $1.2M in acute care costs Evidence base: Intensive community health worker interventions in similar high-burden areas reduced diabetes prevalence by 2-4 percentage points
        2. Healthcare Access Barrier Analysis and Removal
        Current status: Elevated diabetes despite moderate poverty suggests specific access barriers Recommended investment: $200,000 for healthcare access study, transportation assistance, Medicaid enrollment support Expected impact: Identify and address specific barriers preventing diabetes screening and management; increase primary care utilization by 35%
        3. Economic Stability Support
        Current status: 24.96% poverty, median income $35,491 Target: Reduce poverty to 22% by 2027 Recommended investment: $400,000 for job training and placement, emergency assistance Expected return: Improve capacity for healthcare and healthy food access through increased household resources
        Funding Opportunities
        Dudley qualifies for CDC REACH grants for high-burden diabetes communities, emergency health intervention funding, and HUD Community Development Block Grants.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 22.2% to 19% Poverty rate: 24.96% to 22% Healthcare access: 40% increase in diabetes screening rates Medicaid enrollment: reach 75%+ of eligible residents Median income: $35,491 to $39,000`,
            research: `Research Profile: Dudley
        Demographics
        Population: 3,295 (ACS 2024 estimate) Median income: $35,491 (±$1,300 MOE estimated) Poverty rate: 24.96% (±3.5pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 22.2% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Dudley presents a critical research puzzle: diabetes prevalence of 22.2% is 22% higher than Camden average despite poverty (24.96%) being below city average (28.5%) and median income only 7% below city levels. What specific factors drive elevated chronic disease burden independent of economic status?
        Potential explanatory variables:
        Healthcare access barriers including distance to facilities, insurance gaps, or care quality issues. Food environment with potential food desert conditions despite moderate income. Built environment limiting physical activity opportunities. Age distribution with potentially older population at higher diabetes risk. Cultural or linguistic barriers to healthcare access. Occupational hazards or work schedules limiting preventive care. Legacy environmental contamination affecting metabolic health. Healthcare provider density and availability of diabetes specialists.
        Recommended study design:
        Mixed-methods investigation combining quantitative survey of representative sample examining healthcare utilization patterns, food access, physical activity, and diabetes risk factors. Spatial analysis comparing Dudley with neighborhoods of similar or higher poverty but lower diabetes rates. Qualitative interviews with 40-50 residents exploring specific barriers to diabetes prevention and management. Healthcare facility mapping and provider availability assessment. Environmental health assessment for potential contamination or hazards.
        Data quality notes
        Strengths: Moderate population provides reasonable statistical power; elevated diabetes creates opportunity to study disease burden drivers Limitations: Health data sources need verification; age-adjusted rates essential to determine if demographics explain elevation; missing unemployment and mental health data
        Critical data gaps:
        Age-adjusted diabetes prevalence, obesity rate (likely elevated given diabetes burden), unemployment rate, mental distress prevalence, food access score, healthcare facility proximity and quality, built environment walkability measures, environmental health data`,
            community: `Community Action Guide: Dudley
        Understanding Dudley's Data
        Dudley faces a critical health challenge with diabetes affecting more than one in five residents—significantly higher than Camden's already elevated average. This high burden exists despite poverty affecting only one in four households and median income close to city levels, suggesting specific barriers preventing residents from accessing diabetes prevention and care rather than purely economic constraints.
        Immediate Actions for Community Organizations
        Urgent diabetes intervention:
        Deploy bi-weekly mobile screening units for diabetes testing and A1C monitoring, establish intensive diabetes support groups with peer health navigators, connect every diabetic resident to chronic disease management programs, ensure access to free or low-cost diabetes medications and testing supplies, provide transportation assistance to medical appointments and specialists.
        Healthcare access expansion:
        Conduct healthcare access barrier assessment identifying specific obstacles, organize Medicaid enrollment drives reaching 75%+ of eligible residents, establish partnerships with primary care clinics for extended hours or weekend services, create healthcare navigation program helping residents access and utilize care, advocate for additional primary care capacity in or near Dudley.
        Economic support:
        Host job fairs connecting residents to employers offering health insurance, provide workforce training focused on healthcare careers, connect residents to EITC and other income supports, offer emergency assistance for medication costs and medical bills, support small business development for local economic opportunity.
        Available Grants
        CDC REACH diabetes prevention grant (March 2026 deadline, $300k annually for high-burden communities)
        HRSA Community Health Centers expansion funding (for healthcare access in underserved areas)
        Robert Wood Johnson Foundation Diabetes Today initiative (rolling deadline, $100k-$500k for comprehensive diabetes interventions)
        Bristol Myers Squibb Foundation Together on Diabetes (grants for community-based diabetes programs)
        Advocacy Messages
        For city officials: "Dudley faces diabetes crisis with one in five residents affected—far above city average despite moderate poverty levels. This suggests specific healthcare access barriers, not just economic constraints. We need urgent intervention including mobile health units, chronic disease management programs, and investigation of why our community's diabetes burden is so disproportionate."
        For funders: "Dudley's elevated diabetes despite moderate economic status reveals how healthcare access barriers independent of poverty drive health disparities. Investment in comprehensive diabetes intervention can reduce disease burden while documenting replicable strategies for addressing access barriers in other communities."`
        },

        "Rosedale": {
            overview: `Rosedale Neighborhood
        Population: 5,044 | Camden, NJ
        Key Indicators
        Median Income: $51,741 (35% above Camden average) Diabetes Prevalence: 16.9% (Better than Camden's 18.2%) Poverty Rate: 19.22% (Below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Rosedale is one of Camden's more economically resilient neighborhoods with median income of $51,741 and poverty affecting less than one in five households. The community achieves better diabetes outcomes than the city average at 16.9%, demonstrating how economic stability supports health. This neighborhood offers valuable insights into protective factors that enable strong outcomes.
        Priority Areas
        Sustaining economic and health success while documenting protective factors for replication. Diabetes prevention to further reduce the 16.9% prevalence. Ensuring continued affordability and accessibility as neighborhood strengths are maintained.`,
            policy: `Policy Recommendations for Rosedale
        1. Protective Factor Documentation for Citywide Learning
        Current status: 16.9% diabetes (better than Camden's 18.2%), 19.22% poverty (below city average) Recommended investment: $150,000 to study Rosedale's success factors and create replication framework Expected impact: Identify specific community characteristics, programs, and policies enabling strong outcomes; develop implementation guide for other neighborhoods Evidence base: Positive deviance research demonstrates high-performing communities offer actionable lessons for system-wide improvement
        2. Diabetes Prevention Enhancement
        Current status: 16.9% prevalence, room for further improvement Recommended investment: $100,000 to expand existing diabetes prevention programs and reach at-risk residents Expected impact: Reduce diabetes prevalence to 15% by 2027, prevent 25 new cases
        3. Economic Opportunity Expansion
        Current status: 19.22% poverty, moderate economic strain Recommended investment: $250,000 for workforce development, small business support, job placement services Expected impact: Reduce poverty to 17% by 2027, strengthen economic foundation supporting health outcomes
        Funding Opportunities
        Rosedale qualifies for community health innovation grants, best practices documentation funding, CDC diabetes prevention programs, and economic development initiatives.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 16.9% to 15% Poverty rate: 19.22% to 17% Median income: $51,741 to $55,000 Community health program participation: increase by 25% Successful program replications in other neighborhoods: 3-5`,
            research: `Research Profile: Rosedale
        Demographics
        Population: 5,044 (ACS 2024 estimate) Median income: $51,741 (±$1,800 MOE estimated) Poverty rate: 19.22% (±2.5pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 16.9% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Rosedale achieves diabetes prevalence 7% below Camden average with median income 35% above city levels and poverty well below average. What combination of economic stability, community resources, healthcare access, and environmental factors enables these outcomes, and which elements are replicable in lower-income settings?
        Potential explanatory variables:
        Economic stability providing healthcare access, healthy food affordability, and preventive care utilization. Healthcare facility proximity and quality of available services. Food environment with access to quality grocery stores and healthy options. Built environment supporting physical activity including walkable streets, parks, and recreation facilities. Insurance coverage rates likely higher than city average. Social capital and community cohesion supporting health behaviors. Education levels and health literacy. Age distribution potentially affecting diabetes baseline risk.
        Recommended study design:
        Comparative case study examining Rosedale versus neighborhoods with similar population size but higher diabetes rates. Resident survey examining healthcare utilization, food access, physical activity patterns, social support, and diabetes risk factors. Spatial analysis of built environment, food retail, and healthcare facilities. Document specific community programs, policies, and practices. Identify which success factors are income-dependent versus transferable to lower-resource communities.
        Data quality notes
        Strengths: Larger population provides strong statistical power; higher income likely improves healthcare access and data quality Limitations: Success factors may be difficult to disentangle from income effects; need to identify replicable versus resource-intensive elements
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, specific community health programs inventory, healthcare facility utilization patterns, longitudinal data on neighborhood economic trends`,
            community: `Community Action Guide: Rosedale
        Understanding Rosedale's Data
        Rosedale is one of Camden's more economically successful neighborhoods with median income of $51,741 and poverty affecting less than one in five households—both better than city averages. The community achieves diabetes prevalence of 16.9%, below Camden's 18.2%, demonstrating how economic stability and strong community resources support health outcomes that other neighborhoods can learn from.
        Immediate Actions for Community Organizations
        Document and share success factors:
        Inventory community programs and resources contributing to strong health outcomes, document best practices in diabetes prevention and chronic disease management, create case studies demonstrating what works in Rosedale, partner with researchers to identify replicable success factors, share lessons and program models with other Camden neighborhoods.
        Enhance diabetes prevention:
        Expand existing diabetes screening and prevention programs to reach more residents, organize community walking groups and physical activity initiatives, host nutrition education and healthy cooking classes, establish peer support networks for diabetes management, connect at-risk residents to preventive care and early intervention.
        Sustain economic strength:
        Support workforce development programs connecting residents to quality jobs, advocate for small business development and entrepreneurial support, ensure continued access to education and skills training, protect affordability to maintain economic diversity, connect moderate-income residents to available resources and opportunities.
        Available Grants
        Robert Wood Johnson Foundation best practices documentation (for sharing successful strategies with other communities)
        CDC diabetes prevention program expansion grants (for scaling effective programs)
        Community health innovation funding (for testing and documenting successful interventions)
        Advocacy Messages
        For city officials: "Rosedale demonstrates what's possible when economic stability and community resources align—lower poverty and lower diabetes through good jobs, strong programs, and engaged residents. Study what works here and invest in replicating these conditions across Camden while protecting our affordability and diversity."
        For funders: "Rosedale offers valuable lessons for improving health citywide. Investment in documenting our success factors, enhancing what works, and helping other neighborhoods adopt effective practices can multiply impact far beyond our community while strengthening our own foundation."`
        },

        "Stockton": {
            overview: `Stockton Neighborhood
        Population: 6,529 | Camden, NJ
        Key Indicators
        Median Income: $44,357 (16% above Camden average) Diabetes Prevalence: 17.9% (Slightly below Camden's 18.2%) Poverty Rate: 20.17% (Below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Stockton is an economically stable neighborhood with median income of $44,357 and poverty affecting one in five households—both better than Camden averages. The community achieves diabetes prevalence of 17.9%, marginally below the city average, demonstrating how moderate economic advantages support health outcomes. This neighborhood represents middle-income stability worth preserving and studying.
        Priority Areas
        Sustaining economic stability and health outcomes while preventing decline. Diabetes prevention to further improve the 17.9% prevalence. Economic development supporting the one in five households still experiencing poverty.`,
            policy: `Policy Recommendations for Stockton
        1. Economic Stability Preservation
        Current status: 20.17% poverty, median income $44,357 Target: Reduce poverty to 18% by 2027 Recommended investment: $350,000 for workforce development, job placement, small business support Expected return: Strengthen middle-income stability, prevent economic decline, generate $1.8M in tax revenue over 5 years Evidence base: Economic stability programs in middle-income neighborhoods prevent decline and support upward mobility
        2. Diabetes Prevention Enhancement
        Current status: 17.9% prevalence (marginally below Camden's 18.2%) Recommended investment: $150,000 for diabetes prevention programs, screening, chronic disease management Expected impact: Reduce diabetes prevalence to 16% by 2027, prevent 30 new cases
        3. Community Health Program Sustainability
        Current status: Health metrics align with city baseline, stable outcomes Recommended investment: $100,000 to sustain existing wellness programs and expand reach Expected impact: Maintain diabetes rate below city average, increase preventive care utilization by 25%
        Funding Opportunities
        Stockton qualifies for HUD Community Development Block Grants, CDC diabetes prevention programs, and workforce development initiatives supporting middle-income stability.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 17.9% to 16% Poverty rate: 20.17% to 18% Median income: $44,357 to $48,000 Job placements: 75 residents in stable employment Community health program participation: increase by 20%`,
            research: `Research Profile: Stockton
        Demographics
        Population: 6,529 (ACS 2024 estimate) Median income: $44,357 (±$1,500 MOE estimated) Poverty rate: 20.17% (±2.3pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 17.9% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Stockton achieves diabetes prevalence marginally below Camden average with median income 16% above city levels and poverty below average. As a middle-income neighborhood, what factors enable stable health outcomes, and how can economic and health stability be preserved as urban conditions change?
        Potential explanatory variables:
        Economic stability providing consistent healthcare access and healthy food affordability. Healthcare facility proximity and insurance coverage rates. Food environment with access to grocery stores and healthy options. Built environment supporting physical activity and community engagement. Social capital and neighborhood cohesion. Employment stability and job quality. Age distribution affecting baseline health risks.
        Recommended study design:
        Longitudinal study tracking Stockton's economic and health trends over time to identify early warning signs of decline. Cross-sectional survey examining healthcare utilization, food access, physical activity, and diabetes risk factors. Comparative analysis with neighborhoods experiencing economic decline to identify protective factors. Document community programs and policies supporting stability.
        Data quality notes
        Strengths: Larger population provides strong statistical power; moderate income likely supports data accuracy Limitations: Health outcomes close to city average may limit ability to identify distinct protective factors; need age-adjusted rates
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, healthcare facility utilization patterns, longitudinal economic trend data, community program inventory`,
            community: `Community Action Guide: Stockton
        Understanding Stockton's Data
        Stockton represents middle-income stability in Camden with median income of $44,357 and one in five households experiencing poverty—both better than city averages. The community achieves diabetes prevalence of 17.9%, slightly below Camden's 18.2%, demonstrating how moderate economic advantages support health. Protecting this stability while supporting residents still facing economic challenges is essential.
        Immediate Actions for Community Organizations
        Economic stability support:
        Host job fairs connecting residents to stable employment with benefits, provide workforce training in growing sectors, support small business development and entrepreneurship, connect households experiencing poverty to economic assistance and job placement, advocate for policies protecting middle-income affordability and preventing displacement.
        Diabetes prevention:
        Partner with healthcare providers for diabetes screening and prevention programs, organize community walking groups and physical activity initiatives, host nutrition education and healthy cooking classes, establish peer support networks for diabetes management, connect at-risk residents to preventive care and early intervention.
        Community wellness:
        Sustain existing health programs contributing to stable outcomes, expand wellness initiatives to reach more residents, build partnerships with local healthcare facilities, create health navigation programs helping residents access care, advocate for continued investment in community health resources.
        Available Grants
        Robert Wood Johnson Foundation Healthy Communities program (rolling deadline, $50k-$200k for community health)
        CDC diabetes prevention program grants (for screening and chronic disease management)
        LISC community development funding (quarterly deadlines, $25k-$100k for economic stability programs)
        Advocacy Messages
        For city officials: "Stockton represents middle-income stability worth protecting—moderate poverty, stable health outcomes, and strong community foundation. We need investment preventing economic decline, sustaining health programs, and supporting the one in five households still struggling. Protect what works while strengthening what needs support."
        For funders: "Stockton demonstrates how middle-income stability supports health outcomes close to city averages. Investment in preserving economic strength, preventing decline, and enhancing diabetes prevention can maintain stability while creating models for other neighborhoods seeking similar resilience."`
        },

        "Marlton": {
            overview: `Marlton Neighborhood
        Population: 4,726 | Camden, NJ
        Key Indicators
        Median Income: $31,312 (18% below Camden average) Diabetes Prevalence: 19.2% (Above Camden's 18.2%) Poverty Rate: 30.43% (Nearly 1 in 3 households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Marlton faces substantial economic challenges with 30.43% poverty and median income 18% below Camden's average. Diabetes prevalence of 19.2% exceeds the city average by 5%, indicating elevated chronic disease burden driven by economic barriers. The combination of significant poverty and above-average diabetes creates compounding health and economic challenges requiring comprehensive intervention.
        Priority Areas
        Diabetes prevention and management addressing elevated 19.2% prevalence. Economic development targeting 30.43% poverty rate. Healthcare access expansion to reduce barriers preventing disease prevention and management.`,
            policy: `Policy Recommendations for Marlton
        1. Diabetes Prevention and Management Initiative
        Current status: 19.2% prevalence (5% above Camden's 18.2%) Target: Reduce diabetes to 17.5% by 2027 Recommended investment: $350,000 for community health workers, mobile screening, chronic disease management programs Expected return: Prevent 35 new diabetes cases, reduce emergency department utilization by 25%, avoid $900k in acute care costs Evidence base: Community health worker programs in similar communities reduced diabetes prevalence by 1.5-2.5 percentage points
        2. Economic Development Initiative
        Current status: 30.43% poverty, median income $31,312 Target: Reduce poverty to 27% by 2027 Recommended investment: $600,000 for job training, placement services, emergency economic assistance Expected return: $2.6M in tax revenue over 5 years, improved capacity for healthcare and healthy food access
        3. Food Access and Healthcare Infrastructure
        Current status: Likely limited food access and healthcare barriers given economic indicators Recommended investment: $250,000 for SNAP enrollment support, mobile market, transportation to healthcare facilities Expected impact: Improve diet quality by 12%, increase diabetes screening rates by 35%
        Funding Opportunities
        Marlton qualifies for HUD Community Development Block Grants, CDC REACH grants for elevated diabetes burden, and USDA Food Insecurity Nutrition Incentive programs.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 19.2% to 17.5% Poverty rate: 30.43% to 27% Job placements: 85 residents in living-wage positions Median income: $31,312 to $35,000 Healthcare access: 40% increase in diabetes screening rates`,
            research: `Research Profile: Marlton
        Demographics
        Population: 4,726 (ACS 2024 estimate) Median income: $31,312 (±$1,200 MOE estimated) Poverty rate: 30.43% (±3.3pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 19.2% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Marlton shows diabetes prevalence 5% above Camden average (19.2% vs 18.2%) with poverty rate also above city levels (30.43% vs 28.5%). What factors drive the elevated chronic disease burden, and what combination of healthcare access improvements, economic support, and community-based interventions could reduce diabetes disparities?
        Potential explanatory variables:
        Healthcare access barriers including facility proximity, insurance coverage gaps, transportation limitations. Food environment quality with potential food desert conditions. Physical activity barriers from unsafe streets or limited recreation facilities. Social determinants including chronic stress from economic instability. Age distribution potentially affecting diabetes baseline risk. Existing diabetes management programs and healthcare resources. Cultural or linguistic barriers to healthcare access.
        Recommended study design:
        Community health needs assessment combining quantitative survey examining diabetes risk factors, healthcare utilization, food access, and economic stress. Spatial analysis of healthcare facilities, food retail, and built environment. Qualitative interviews with 35-45 residents exploring barriers to diabetes prevention and management. Compare with similar moderate-poverty neighborhoods with lower diabetes rates to identify protective factors.
        Data quality notes
        Strengths: Moderate population provides reasonable statistical power Limitations: Health data sources need verification; unemployment and mental health data missing; age-adjusted rates needed to determine demographic effects
        Critical data gaps:
        Age-adjusted diabetes prevalence, obesity rate, unemployment rate, mental distress prevalence, food access score, healthcare facility proximity and quality, built environment measures, medication adherence rates`,
            community: `Community Action Guide: Marlton
        Understanding Marlton's Data
        Marlton faces significant economic challenges with nearly one in three households living in poverty and median income 18% below Camden's average. Diabetes prevalence of 19.2% exceeds the city average, indicating the community experiences both economic hardship and elevated chronic disease burden. This combination creates compounding challenges where poverty makes diabetes management difficult and medical costs deepen economic strain.
        Immediate Actions for Community Organizations
        Diabetes prevention and management:
        Partner with healthcare providers for mobile diabetes screening and prevention programs, establish diabetes support groups with peer health navigation, host healthy cooking classes focused on affordable diabetes-friendly meals, connect residents to free or low-cost diabetes medications and testing supplies, organize neighborhood walking groups to promote physical activity.
        Economic support:
        Host job fairs connecting residents to employers offering health insurance, provide resume workshops and interview preparation, connect residents to EITC tax filing assistance, partner with workforce development programs for skills training, support small business development through technical assistance and microloans.
        Food and healthcare access:
        Survey residents on food access barriers and preferred solutions, partner with food banks for weekly mobile markets, enroll SNAP recipients in Double Up Food Bucks program, advocate for grocery store development or incentives, establish transportation assistance program for medical appointments.
        Available Grants
        CDC REACH diabetes prevention grant (March 2026 deadline, $300k annually for communities with elevated chronic disease burden)
        Robert Wood Johnson Foundation Healthy Communities program (rolling deadline, $50k-$200k for food access and community health)
        LISC community development funding (quarterly deadlines, $25k-$100k for economic development)
        Advocacy Messages
        For city officials: "Marlton faces dual challenge of economic hardship and elevated diabetes burden—nearly one in three households in poverty and diabetes rates above city average. We need comprehensive intervention addressing both poverty and chronic disease through job creation, diabetes prevention programs, and food and healthcare access improvements."
        For funders: "Marlton demonstrates how poverty and chronic disease create vicious cycles—diabetes makes work difficult, medical costs deepen poverty, stress worsens disease. Investment in integrated programs addressing both economic and health barriers can break this cycle and create replicable models for other communities facing similar challenges."`
        },

        "Parkside": {
            overview: `Parkside Neighborhood
        Population: 4,181 | Camden, NJ
        Key Indicators
        Median Income: $45,662 (19% above Camden average) Diabetes Prevalence: 15% (Better than Camden's 18.2%) Poverty Rate: 19.4% (Below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Parkside is one of Camden's higher-performing neighborhoods with median income of $45,662 and poverty affecting less than one in five households. The community achieves excellent diabetes outcomes at 15%—18% lower than Camden's average. This neighborhood demonstrates how economic stability and strong community resources enable superior health outcomes worth studying and replicating across the city.
        Priority Areas
        Sustaining economic and health success while documenting protective factors. Further diabetes prevention to reduce from already strong 15% baseline. Ensuring affordability preservation as neighborhood strengths continue.`,
            policy: `Policy Recommendations for Parkside
        1. Success Factor Documentation for Citywide Replication
        Current status: 15% diabetes (18% below Camden average), 19.4% poverty (below city average) Recommended investment: $175,000 to study Parkside's protective factors and create replication framework Expected impact: Identify specific programs, policies, and community characteristics enabling strong outcomes; develop implementation guide for other neighborhoods Evidence base: Positive deviance research demonstrates high-performing communities offer actionable lessons for system-wide improvement
        2. Diabetes Prevention Excellence
        Current status: 15% prevalence, already strong performance Recommended investment: $100,000 to further enhance diabetes prevention and reach at-risk residents Expected impact: Reduce diabetes prevalence to 13% by 2027, prevent 25 additional cases, establish best practice model
        3. Affordability and Economic Diversity Preservation
        Current status: Strong economic performance with low poverty Risk: Gentrification pressure and displacement of moderate-income residents Recommended investment: $250,000 for affordable housing preservation, anti-displacement strategies Expected impact: Maintain economic diversity, prevent displacement of longtime residents, preserve community character
        Funding Opportunities
        Parkside qualifies for community health innovation grants, best practices documentation funding, affordable housing preservation programs, and economic development initiatives.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 15% to 13% Poverty rate: maintain below 20% Median income: $45,662 to $50,000 Affordable housing units: preserve 150 units Health program participation: increase by 25%`,
            research: `Research Profile: Parkside
        Demographics
        Population: 4,181 (ACS 2024 estimate) Median income: $45,662 (±$1,600 MOE estimated) Poverty rate: 19.4% (±2.8pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 15% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Parkside achieves diabetes prevalence 18% below Camden average with median income 19% above city levels and poverty well below average. What combination of economic stability, community resources, healthcare access, and environmental factors enables these exceptional outcomes, and which elements are replicable in lower-income settings?
        Potential explanatory variables:
        Economic stability enabling healthcare access, healthy food affordability, and preventive care utilization. Healthcare facility proximity and quality of available services. Food environment with access to quality grocery stores and healthy options. Built environment supporting physical activity including walkable streets, parks, and recreation facilities. Insurance coverage rates likely higher than city average. Social capital and community cohesion supporting health behaviors. Education levels and health literacy. Age distribution potentially affecting diabetes baseline risk. Specific community health programs and initiatives.
        Recommended study design:
        Comparative case study examining Parkside versus similar-sized neighborhoods with higher diabetes rates. Mixed-methods approach including resident surveys on healthcare utilization, food access, physical activity patterns, social support, and diabetes prevention behaviors. GIS analysis of built environment, food retail density, healthcare facility proximity. Document specific community programs, policies, and practices contributing to outcomes. Identify which success factors are income-dependent versus transferable to lower-resource communities.
        Data quality notes
        Strengths: Moderate population provides reasonable statistical power; higher income likely improves healthcare access and data accuracy Limitations: Success factors may be difficult to disentangle from income effects; need to identify replicable versus resource-intensive elements
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, specific community health programs inventory, healthcare facility utilization patterns, longitudinal neighborhood trend data`,
            community: `Community Action Guide: Parkside
        Understanding Parkside's Data
        Parkside is one of Camden's most successful neighborhoods with median income of $45,662 and only 19.4% poverty—both significantly better than city averages. The community achieves exceptional diabetes outcomes at 15%, which is 18% lower than Camden's 18.2%. This success reflects economic stability, strong community resources, and effective health programs that can serve as models for other neighborhoods.
        Immediate Actions for Community Organizations
        Document and share success factors:
        Inventory community programs and resources contributing to exceptional health outcomes, document best practices in diabetes prevention and health promotion, create detailed case studies demonstrating what works in Parkside, partner with researchers to identify replicable success factors, share lessons learned and program models with other Camden neighborhoods.
        Enhance diabetes prevention:
        Further expand diabetes screening and prevention programs despite already strong performance, organize additional community walking groups and physical activity initiatives, host nutrition education and healthy cooking demonstrations, establish peer mentorship networks for health promotion, support residents in maintaining healthy lifestyles and preventive care.
        Preserve affordability and diversity:
        Advocate for affordable housing preservation to prevent displacement of moderate-income residents, support mixed-income development maintaining economic diversity, connect moderate-income residents to available resources and support programs, monitor housing costs and advocate for anti-displacement policies, build coalitions protecting longtime residents and community character.
        Available Grants
        Robert Wood Johnson Foundation best practices documentation (for sharing success strategies with other communities)
        Healthy communities innovation grants (for expanding and documenting effective programs)
        Affordable housing preservation funding through state and federal sources
        CDC diabetes prevention excellence grants
        Advocacy Messages
        For city officials: "Parkside demonstrates exceptional results—low poverty and exceptionally low diabetes through economic stability and strong community resources. Study what works here, invest in replicating these conditions citywide, and protect our affordability so success doesn't lead to displacement. Our achievements should lift all of Camden."
        For funders: "Parkside offers invaluable lessons for improving health citywide with diabetes rates 18% below Camden average. Investment in documenting our success factors, enhancing what works, and helping other neighborhoods adopt effective practices can multiply impact across the entire city while preserving the diversity and affordability that strengthens our community."`
        },

        "Whitman Park": {
            overview: `Whitman Park Neighborhood
        Population: 5,394 | Camden, NJ
        Key Indicators
        Median Income: $31,941 (16% below Camden average) Diabetes Prevalence: 21.5% (Significantly above Camden's 18.2%) Poverty Rate: 28.4% (Slightly below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Whitman Park faces a critical diabetes crisis with prevalence of 21.5%—18% higher than Camden's average—despite poverty and income levels close to city norms. The disproportionately high chronic disease burden relative to economic indicators suggests specific healthcare access barriers or environmental factors requiring urgent investigation and intervention beyond standard economic development approaches.
        Priority Areas
        Urgent diabetes intervention addressing critical 21.5% prevalence. Healthcare access barrier identification and removal. Investigation of factors driving elevated diabetes despite moderate economic status relative to other neighborhoods.`,
            policy: `Policy Recommendations for Whitman Park
        1. Emergency Diabetes Intervention Program
        Current status: 21.5% prevalence (18% above Camden's 18.2%) Target: Reduce diabetes to 18.5% by 2027 Recommended investment: $550,000 for bi-weekly mobile screening units, intensive community health worker program, chronic disease management Expected return: Prevent 50 new diabetes cases, reduce emergency department utilization by 35%, avoid $1.5M in acute care costs Evidence base: Intensive community health worker interventions in similar high-burden communities reduced diabetes prevalence by 2-4 percentage points
        2. Healthcare Access Barrier Analysis and Resolution
        Current status: Critically elevated diabetes despite moderate poverty suggests specific access barriers Recommended investment: $250,000 for comprehensive healthcare access study, transportation assistance, Medicaid enrollment intensive outreach Expected impact: Identify and address specific obstacles preventing diabetes screening and management; increase primary care utilization by 40%
        3. Economic Stability Support
        Current status: 28.4% poverty, median income $31,941 Target: Reduce poverty to 25% by 2027 Recommended investment: $450,000 for job training, placement services, emergency assistance Expected return: Improve household capacity for healthcare and healthy food access through increased economic resources
        Funding Opportunities
        Whitman Park qualifies for CDC REACH grants for critical diabetes burden, emergency health intervention funding, HRSA Community Health Centers expansion grants, and HUD Community Development Block Grants.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 21.5% to 18.5% Poverty rate: 28.4% to 25% Healthcare access: 50% increase in diabetes screening rates Medicaid enrollment: reach 80%+ of eligible residents Median income: $31,941 to $35,500`,
            research: `Research Profile: Whitman Park
        Demographics
        Population: 5,394 (ACS 2024 estimate) Median income: $31,941 (±$1,200 MOE estimated) Poverty rate: 28.4% (±2.7pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 21.5% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Whitman Park presents a critical public health puzzle: diabetes prevalence of 21.5% is 18% higher than Camden average despite poverty (28.4%) being similar to or slightly below city average (28.5%) and median income only 16% below city levels. What specific factors drive dramatically elevated chronic disease burden independent of economic status?
        Potential explanatory variables:
        Healthcare access barriers including facility distance, insurance gaps, care quality deficits, or provider availability. Food environment potentially worse than income level predicts with severe food desert conditions. Built environment severely limiting physical activity opportunities or creating safety barriers. Age distribution with potentially older population at substantially higher diabetes risk. Environmental contamination or occupational hazards affecting metabolic health. Cultural or linguistic barriers creating healthcare access obstacles. Healthcare provider shortage or turnover affecting care continuity. Historical disinvestment in health infrastructure.
        Recommended study design:
        Urgent mixed-methods investigation combining quantitative survey of representative sample examining healthcare utilization barriers, food access constraints, physical activity limitations, and diabetes risk factors. Spatial analysis comparing Whitman Park with neighborhoods of similar or higher poverty but lower diabetes rates. Environmental health assessment for potential contamination or hazards. Healthcare facility mapping and provider availability assessment. Qualitative interviews with 50-75 residents exploring specific barriers to diabetes prevention and management. Age demographic analysis to determine if population structure explains elevation.
        Data quality notes
        Strengths: Larger population provides strong statistical power for intervention evaluation Limitations: Health data sources require verification; critically need age-adjusted rates to determine demographic versus environmental causes; missing unemployment and mental health data
        Critical data gaps:
        Age-adjusted diabetes prevalence (CRITICAL), obesity rate (likely severely elevated), unemployment rate, mental distress prevalence, food access score, healthcare facility proximity and quality metrics, built environment walkability measures, environmental contamination data, provider density and availability`,
            community: `Community Action Guide: Whitman Park
        Understanding Whitman Park's Data
        Whitman Park faces a critical health emergency with diabetes affecting more than one in five residents—18% higher than Camden's already elevated average. This severe burden exists despite poverty and income levels close to city norms, indicating specific barriers preventing residents from accessing diabetes prevention and care rather than purely economic constraints. Immediate, comprehensive action is essential.
        Immediate Actions for Community Organizations
        Emergency diabetes intervention:
        Deploy bi-weekly mobile screening units for immediate diabetes testing and A1C monitoring, establish intensive diabetes support groups with daily peer health navigation, connect every diabetic resident to chronic disease management programs and specialists, ensure immediate access to free or subsidized diabetes medications and testing supplies, provide comprehensive transportation assistance to medical appointments and pharmacies.
        Healthcare access crisis response:
        Conduct urgent healthcare access barrier assessment identifying specific obstacles, organize intensive Medicaid enrollment drives reaching 80%+ of eligible residents, establish emergency partnerships with primary care clinics for expanded hours and weekend services, create comprehensive healthcare navigation program helping residents access and utilize care, advocate urgently for additional primary care and endocrinology capacity.
        Economic support:
        Host frequent job fairs connecting residents to employers offering comprehensive health insurance, provide workforce training focused on healthcare and stable employment sectors, connect residents to all available income supports and emergency assistance, offer immediate emergency assistance for medication costs and medical bills, support economic stability enabling health management.
        Available Grants
        CDC REACH diabetes prevention grant (March 2026 deadline, $300k annually for critical high-burden communities)
        HRSA Community Health Centers emergency expansion funding (for healthcare access in crisis areas)
        Bristol Myers Squibb Foundation Together on Diabetes (emergency grants for communities with critical diabetes burden)
        Robert Wood Johnson Foundation emergency health intervention funding
        Advocacy Messages
        For city officials: "Whitman Park faces diabetes emergency with one in five residents affected—18% higher than city average despite similar poverty levels. This is a healthcare access crisis, not just economic hardship. We need immediate intervention including mobile health units, intensive chronic disease management, emergency transportation assistance, and investigation of why our diabetes burden is so catastrophically disproportionate. Lives depend on urgent action."
        For funders: "Whitman Park's critically elevated diabetes despite moderate economic status reveals severe healthcare access failure independent of poverty. Emergency investment in comprehensive diabetes intervention, barrier removal, and investigation of root causes can save lives while documenting strategies for addressing access crises in other communities. This is urgent—delay costs lives."`
        },

        "Liberty Park": {
            overview: `Liberty Park Neighborhood
        Population: 2,401 | Camden, NJ
        Key Indicators
        Median Income: $29,210 (23% below Camden average) Diabetes Prevalence: 23.1% (Significantly above Camden's 18.2%) Poverty Rate: 26.21% (Slightly below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Liberty Park faces the highest diabetes burden in Camden at 23.1%—27% higher than the city average—despite poverty and income levels moderately better than city norms. The critically elevated chronic disease burden relative to economic indicators reveals severe healthcare access barriers or environmental factors demanding immediate emergency intervention beyond standard approaches.
        Priority Areas
        Critical diabetes emergency response addressing 23.1% prevalence. Urgent healthcare access barrier identification and elimination. Investigation of factors driving the highest diabetes burden in Camden despite moderate economic disadvantage.`,
            policy: `Policy Recommendations for Liberty Park
        1. Critical Diabetes Emergency Intervention
        Current status: 23.1% prevalence (27% above Camden's 18.2%, highest in city) Target: Reduce diabetes to 19.5% by 2027 Recommended investment: $600,000 for intensive mobile screening units, emergency community health worker deployment, comprehensive chronic disease management Expected return: Prevent 60 new diabetes cases, reduce emergency department utilization by 40%, avoid $1.8M in acute care costs Evidence base: Emergency diabetes interventions in highest-burden communities reduced prevalence by 3-4 percentage points when properly resourced
        2. Healthcare Access Crisis Investigation and Response
        Current status: Highest diabetes burden in Camden despite moderate poverty suggests catastrophic access failure Recommended investment: $300,000 for urgent healthcare access assessment, immediate transportation solutions, emergency Medicaid enrollment, provider recruitment Expected impact: Identify and immediately address critical barriers preventing diabetes screening and management; increase primary care access by 50%
        3. Economic Support and Stabilization
        Current status: 26.21% poverty, median income $29,210 Target: Reduce poverty to 23% by 2027 Recommended investment: $400,000 for emergency job placement, skills training, immediate economic assistance Expected return: Strengthen household capacity for healthcare access and healthy food through economic stabilization
        Funding Opportunities
        Liberty Park qualifies for CDC emergency diabetes intervention grants, HRSA crisis response funding for highest-burden communities, emergency health intervention appropriations, and HUD Community Development Block Grants.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 23.1% to 19.5% Poverty rate: 26.21% to 23% Healthcare access: 60% increase in diabetes screening rates Emergency department diabetes visits: reduce by 40% Median income: $29,210 to $33,000`,
            research: `Research Profile: Liberty Park
        Demographics
        Population: 2,401 (ACS 2024 estimate) Median income: $29,210 (±$1,500 MOE estimated) Poverty rate: 26.21% (±4.0pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 23.1% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Liberty Park presents Camden's most extreme diabetes crisis: prevalence of 23.1% is 27% higher than city average and the highest of all neighborhoods, yet poverty (26.21%) is below city average (28.5%) and median income only 23% below city levels. What catastrophic failures in healthcare access, environmental conditions, or other factors drive the worst diabetes burden in Camden independent of economic status?
        Potential explanatory variables:
        Healthcare access catastrophic failure including complete facility absence, severe provider shortage, or care quality collapse. Food environment potentially representing city's worst food desert conditions despite moderate income. Built environment creating severe physical activity barriers or safety obstacles. Age distribution with dramatically older population. Environmental contamination or industrial exposure affecting metabolic health at crisis levels. Healthcare provider discrimination or systemic exclusion. Complete absence of diabetes management infrastructure. Historical trauma or chronic stress independent of current economic measures.
        Recommended study design:
        Emergency investigative research combining immediate quantitative assessment of healthcare facility access, provider availability, and utilization barriers. Rapid environmental health screening for contamination or hazards. Emergency qualitative investigation with 50-75 residents on immediate barriers to diabetes care. Age demographic emergency analysis to determine if population structure explains crisis. Comparative analysis with all other Camden neighborhoods to identify Liberty Park's unique catastrophic factors. Provider and facility mapping to document access gaps.
        Data quality notes
        Strengths: Crisis-level burden creates urgent research imperative and policy relevance Limitations: Small population creates large statistical uncertainty; urgent need for age-adjusted rates to separate demographic from environmental causes; missing critical unemployment and mental health data
        Critical data gaps:
        Age-adjusted diabetes prevalence (CRITICAL EMERGENCY NEED), obesity rate (likely catastrophically elevated), unemployment rate, mental distress prevalence (likely severe), food access score (likely worst in city), healthcare facility proximity and quality (likely catastrophic gaps), environmental contamination data, provider availability and quality metrics`,
            community: `Community Action Guide: Liberty Park
        Understanding Liberty Park's Data
        Liberty Park faces Camden's worst diabetes crisis with nearly one in four residents affected—the highest burden in the entire city at 27% above Camden's average. This catastrophic health emergency exists despite poverty and income levels moderately better than city norms, revealing complete healthcare access failure or severe environmental hazards rather than purely economic causes. This is a life-threatening emergency requiring immediate action.
        Immediate Actions for Community Organizations
        Critical diabetes emergency response:
        Deploy immediate intensive mobile screening units for emergency diabetes detection and crisis intervention, establish daily diabetes crisis support with emergency peer health navigation and medical accompaniment, connect every diabetic resident to emergency chronic disease management and specialist referral, ensure immediate emergency access to free diabetes medications and testing supplies through emergency pharmaceutical assistance, provide comprehensive emergency transportation to all medical appointments and pharmacies.
        Healthcare access crisis mobilization:
        Conduct emergency healthcare access crisis assessment identifying catastrophic barriers, organize emergency Medicaid enrollment reaching every eligible resident immediately, establish emergency healthcare crisis navigation helping residents access any available care, advocate for emergency primary care and endocrinology deployment to Liberty Park, demand emergency investigation of healthcare system failure affecting Liberty Park.
        Economic emergency support:
        Host emergency job placement connecting residents to immediate employment with health insurance, provide emergency economic assistance for medical costs and basic needs, connect residents to all emergency assistance programs immediately, support immediate economic stabilization enabling health crisis response, advocate for emergency economic intervention.
        Available Grants
        CDC emergency diabetes crisis intervention funding (for highest-burden communities)
        HRSA emergency healthcare access crisis response grants
        Emergency health intervention appropriations for communities in crisis
        Robert Wood Johnson Foundation emergency diabetes funding
        Bristol Myers Squibb Foundation emergency diabetes crisis grants
        Advocacy Messages
        For city officials: "Liberty Park faces Camden's worst diabetes crisis—nearly one in four residents affected, 27% higher than city average. This is the highest burden in Camden despite moderate poverty, revealing catastrophic healthcare system failure. We need emergency intervention NOW including immediate mobile health deployment, emergency chronic disease management, crisis transportation, and urgent investigation of why Liberty Park has been abandoned by the healthcare system. This is life and death."
        For funders: "Liberty Park's catastrophic diabetes crisis—worst in Camden at 23.1%—despite moderate poverty reveals complete healthcare access collapse. Emergency investment in crisis intervention can save lives immediately while documenting what happens when healthcare systems completely fail a community. Every day of delay costs lives. This is an emergency."`
        },

        "Centerville": {
            overview: `Centerville Neighborhood
        Population: 2,805 | Camden, NJ
        Key Indicators
        Median Income: $22,181 (42% below Camden average) Diabetes Prevalence: 14.7% (Better than Camden's 18.2%) Poverty Rate: 42.97% (Nearly half of all households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Centerville presents a remarkable positive deviance case: despite facing severe economic hardship with 42.97% poverty and median income of just $22,181, the community achieves diabetes prevalence of 14.7%—19% lower than Camden's average. This extraordinary health success under extreme economic stress reveals powerful protective factors that warrant immediate study and replication across Camden and nationally.
        Priority Areas
        Documenting and replicating the protective factors enabling exceptional diabetes outcomes despite severe poverty. Economic emergency response addressing 42.97% poverty. Sustaining health programs contributing to success while addressing urgent economic needs.`,
            policy: `Policy Recommendations for Centerville
        1. Protective Factor Documentation for National Replication
        Current status: 14.7% diabetes despite 42.97% poverty—most extreme positive deviance case in dataset Recommended investment: $300,000 for comprehensive study of Centerville's protective factors creating national model Expected impact: Identify replicable strategies enabling health success under economic stress; create implementation framework for high-poverty communities nationwide; potential national policy influence Evidence base: Centerville represents possibly unique case nationally of this level of health success under this degree of economic hardship
        2. Economic Emergency Intervention
        Current status: 42.97% poverty, median income $22,181 Target: Reduce poverty to 38% by 2027 Recommended investment: $1,500,000 for comprehensive poverty alleviation including guaranteed income pilot, intensive job training, emergency assistance Expected return: Stabilize community preventing further economic decline while maintaining health success; potential to improve already strong health outcomes further Evidence base: Economic stabilization in high-poverty communities reduces stress enabling even better health outcomes
        3. Health Program Protection and Enhancement
        Current status: 14.7% diabetes, exceptional performance requiring protection Recommended investment: $250,000 to identify, sustain, and expand programs contributing to health success Expected impact: Maintain diabetes rate below 15%, further improve to 13%, create exportable program models
        Funding Opportunities
        Centerville qualifies for positive deviance research funding, HUD Choice Neighborhoods grants, CDC innovation awards, guaranteed income demonstration projects, and national foundation support for replicable models.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: maintain below 15%, target 13% Poverty rate: 42.97% to 38% Median income: $22,181 to $26,000 National recognition: 3-5 published case studies Replication pilots: 5-10 communities adopt Centerville model`,
            research: `Research Profile: Centerville
        Demographics
        Population: 2,805 (ACS 2024 estimate) Median income: $22,181 (±$1,400 MOE estimated) Poverty rate: 42.97% (±4.2pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 14.7% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Centerville represents possibly the most extreme positive deviance case in the national literature: How does a community with 42.97% poverty—nearly half of all households—and median income of $22,181 achieve diabetes prevalence of 14.7%, which is 19% lower than the city average and better than neighborhoods with three times the income? This challenges fundamental assumptions about the poverty-health relationship and demands comprehensive investigation.
        Potential explanatory variables requiring immediate study:
        Healthcare access despite poverty through free clinics, community health workers, mobile units, or exceptional Medicaid enrollment. Food assistance program saturation creating effective food security despite income poverty. Social capital and mutual aid networks providing material and emotional support buffering economic stress. Faith-based or community organization infrastructure providing comprehensive support. Built environment enabling physical activity despite economic constraints. Cultural practices or dietary patterns protective against diabetes. Age distribution with younger population. Strong family networks providing childcare, housing, meal sharing. Community health worker or promotora programs. Exceptional primary care relationship or clinic quality.
        Recommended study design:
        URGENT comprehensive mixed-methods investigation: Phase 1: Ethnographic immersion with 75-100 resident interviews documenting survival strategies, health practices, social networks, food acquisition, healthcare access Phase 2: Quantitative survey of representative sample examining all potential protective factors Phase 3: Social network analysis mapping mutual aid and support systems Phase 4: Healthcare facility and food environment comprehensive mapping Phase 5: Comparative analysis with high-poverty high-diabetes communities identifying Centerville's unique factors Phase 6: Replication framework development identifying transferable elements
        This research has potential for top-tier journal publication and national policy influence.
        Data quality notes
        Strengths: Extreme positive deviance creates high research value; moderate population sufficient for analysis Limitations: Very low income creates sampling challenges; need age-adjusted rates to rule out demographic explanation; critical to document actual mechanisms not just correlations
        Critical data gaps:
        Age-adjusted diabetes prevalence (CRITICAL), obesity rate, unemployment rate, mental distress prevalence, food access score, healthcare facility utilization patterns, social network density measures, food assistance program participation rates, community organization inventory`,
            community: `Community Action Guide: Centerville
        Understanding Centerville's Data
        Centerville achieves something extraordinary: despite nearly half of households living in poverty and median income of just $22,181, the community maintains diabetes rates of 14.7%—better than Camden neighborhoods with three times the income. You are doing something right that the entire country needs to learn from. This is not about ignoring the very real economic hardship—it's about recognizing remarkable community strength while fighting for the economic justice you deserve.
        Immediate Actions for Community Organizations
        Document your success for the world:
        Partner with researchers to document what makes Centerville's health outcomes exceptional under economic stress, conduct community asset mapping identifying programs and practices contributing to health success, collect resident stories about how the community supports health and wellbeing, create detailed case studies for national dissemination, demand recognition and resources for your community's achievements.
        Protect what's working:
        Identify specific health programs, food assistance, community support systems contributing to low diabetes rates, advocate for sustained funding and expansion of these successful programs, connect every resident to existing health and food resources, maintain social networks and mutual aid systems supporting community resilience, resist any cuts to programs supporting Centerville's success.
        Fight for economic justice:
        Advocate for Centerville as guaranteed income demonstration site given proven ability to manage health despite poverty, demand massive job creation investment matching community strengths, connect residents to every available economic assistance program, organize for living wages and worker protections, demand economic investment proportional to community's demonstrated resilience and capability.
        Available Grants
        Major research funding for positive deviance documentation (substantial foundation and federal support available)
        Guaranteed income demonstration project funding (Centerville's health success makes ideal pilot site)
        HUD Choice Neighborhoods Implementation Grant (up to $30M for comprehensive transformation)
        CDC health innovation awards (for documenting and replicating success)
        National foundation support for exportable community health models
        Advocacy Messages
        For city and national officials: "Centerville achieves what experts say is impossible—low diabetes rates despite nearly half our residents in poverty. We prove that poor communities can be healthy communities when we support each other. But we shouldn't have to choose between health and economic security. Study what we do right, invest massively in economic opportunity, and help us show the country that poverty is a policy choice, not a destiny. We deserve both health AND economic justice."
        For researchers and funders: "Centerville is a national treasure—a community achieving exceptional health outcomes under extreme economic hardship. This is the most important positive deviance case in the country for understanding how to support health in high-poverty communities. Invest in comprehensive research documenting our strategies, fund economic intervention showing we can achieve even more with resources, and help us export our model nationwide. We have answers the country desperately needs."
        For media: "Centerville residents survive on $22,181 median income—less than half Camden's average—yet maintain diabetes rates better than wealthy neighborhoods. This is community power, mutual aid, and resilience in action. Cover our strength, not just our struggle. We prove that poverty doesn't equal poor health when communities care for each other. Now we demand the economic investment our achievements have earned."
        Critical Message to Centerville Residents
        What you've achieved is extraordinary. Against impossible odds, you've kept each other healthy. Whatever you're doing—the way you share food, support each other, access healthcare, stay active, care for your neighbors—it works better than what wealthier communities do. You have something to teach the entire country. Demand that researchers and policymakers learn from you, that you receive resources matching your achievements, and that your success leads to investment, not exploitation. You've proven your strength. Now demand justice.`
        },

        "Waterfront South": {
            overview: `Waterfront South Neighborhood
        Population: 918 | Camden, NJ
        Key Indicators
        Median Income: $54,324 (42% above Camden average) Diabetes Prevalence: 20.3% (Significantly above Camden's 18.2%) Poverty Rate: 40.45% (Two in five households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Waterfront South presents a paradoxical profile: the neighborhood has Camden's second-highest median income at $54,324, yet simultaneously faces severe poverty affecting 40.45% of households and elevated diabetes prevalence of 20.3%. This extreme income inequality suggests a bifurcated community with wealthy and poor residents living side-by-side, creating unique challenges requiring interventions addressing both displacement risk and chronic disease burden.
        Priority Areas
        Addressing severe income inequality driving contradictory economic indicators. Diabetes prevention and management for the 20.3% prevalence affecting primarily low-income residents. Anti-displacement strategies protecting vulnerable residents as neighborhood economic bifurcation continues.`,
            policy: `Policy Recommendations for Waterfront South
        1. Income Inequality and Displacement Crisis Response
        Current status: $54,324 median income with 40.45% poverty—extreme inequality Target: Reduce poverty to 35% while maintaining median income stability Recommended investment: $800,000 for anti-displacement programs, affordable housing preservation, inclusive economic development Expected impact: Prevent displacement of 200 low-income residents, stabilize community diversity, address root cause of health disparities Evidence base: Income inequality within neighborhoods creates worse health outcomes than uniform poverty; displacement prevention protects vulnerable residents
        2. Diabetes Intervention Targeting Low-Income Residents
        Current status: 20.3% prevalence (12% above Camden average) Target: Reduce diabetes to 18% by 2027 Recommended investment: $400,000 for targeted mobile screening, community health workers focused on low-income populations, chronic disease management Expected return: Prevent 30 new diabetes cases primarily among vulnerable residents, reduce emergency utilization by 30%
        3. Equitable Development Framework
        Current status: Gentrification creating income inequality and health disparities Recommended investment: $500,000 for community benefits agreements, local hiring requirements, affordable housing mandates Expected impact: Ensure economic growth benefits all residents, not just newcomers; reduce health disparities driven by displacement and stress
        Funding Opportunities
        Waterfront South qualifies for anti-displacement grants, equitable development funding, CDC diabetes prevention for high-burden communities, and affordable housing preservation programs.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 20.3% to 18% Poverty rate: 40.45% to 35% Affordable housing units: preserve 150 units Displacement: prevent 200 low-income resident relocations Income inequality: reduce gap between high and low-income residents`,
            research: `Research Profile: Waterfront South
        Demographics
        Population: 918 (ACS 2024 estimate) Median income: $54,324 (±$3,000 MOE estimated, large due to small population) Poverty rate: 40.45% (±6.0pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 20.3% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Waterfront South presents extreme income inequality: How can a neighborhood have Camden's second-highest median income ($54,324) while 40.45% of households live in poverty? This bifurcation likely reflects gentrification with wealthy newcomers and longtime low-income residents. What are the health consequences of extreme within-neighborhood inequality, and does diabetes burden concentrate among low-income residents while wealthy residents achieve better outcomes?
        Potential explanatory variables:
        Gentrification creating income inequality with wealthy newcomers and displaced longtime residents remaining. Diabetes burden likely concentrated among low-income 40% while high-income residents achieve better outcomes. Stress from displacement threat or neighborhood change affecting health. Healthcare access bifurcated with wealthy residents accessing private care while poor residents face barriers. Food environment potentially improved for wealthy residents but inaccessible (unaffordable) for poor. Age distribution potentially bimodal with young wealthy professionals and older longtime residents.
        Recommended study design:
        Income-stratified analysis examining diabetes prevalence separately for high-income versus low-income residents within Waterfront South. Gentrification impact study documenting displacement, stress, and health consequences. Comparative analysis of neighborhoods experiencing similar income inequality. Longitudinal analysis tracking health outcomes as gentrification progresses. Qualitative interviews with both longtime residents and newcomers exploring health experiences.
        Data quality notes
        Strengths: Extreme inequality creates natural experiment for studying within-neighborhood disparities Limitations: Very small population creates large statistical uncertainty; median income likely distorted by small number of high earners; need income-stratified health data
        Critical data gaps:
        Income-stratified diabetes prevalence (CRITICAL), age-adjusted rates, displacement data, mental distress prevalence (likely elevated among low-income facing displacement), obesity rate, food access by income level, healthcare utilization by income stratum`,
            community: `Community Action Guide: Waterfront South
        Understanding Waterfront South's Data
        Waterfront South shows extreme contradictions: Camden's second-highest median income at $54,324, yet two in five households live in poverty. This isn't a statistical error—it's income inequality. Wealthy newcomers are moving in while longtime residents struggle, creating a divided community. Diabetes affects one in five residents, likely concentrated among low-income longtime residents facing displacement stress and healthcare barriers.
        Immediate Actions for Community Organizations
        Fight displacement and inequality:
        Organize tenant unions and anti-displacement coalitions protecting longtime residents, advocate for affordable housing preservation and community land trusts, demand community benefits agreements ensuring development benefits existing residents, push for local hiring requirements prioritizing longtime residents, document displacement and organize resistance, connect threatened residents to legal aid and tenant protections.
        Address diabetes burden among vulnerable residents:
        Target diabetes screening and prevention programs to low-income longtime residents facing highest burden, establish peer health navigation programs culturally appropriate for longtime community members, ensure low-income residents access free or subsidized diabetes care and medications, address displacement stress as diabetes risk factor through community organizing and mutual support, advocate for healthcare resources matching community needs not just wealthy newcomers.
        Build cross-class solidarity:
        Engage wealthy newcomers as allies in anti-displacement advocacy, demand wealthy residents support affordable housing and equitable development, create community forums bridging income divides, organize around shared interests like schools and safety while prioritizing longtime resident needs, resist neighborhood "improvement" that displaces vulnerable residents.
        Available Grants
        Anti-displacement and equitable development funding from foundations focused on gentrification
        CDC diabetes prevention grants for high-burden communities
        Affordable housing preservation funding through state and federal sources
        Community organizing grants for tenant protection and anti-displacement work
        Advocacy Messages
        For city officials: "Waterfront South's high median income hides crushing poverty affecting two in five households—income inequality is tearing our community apart. Wealthy newcomers enjoy prosperity while longtime residents face diabetes, displacement, and daily survival struggles. We need anti-displacement protections, affordable housing mandates, diabetes intervention for vulnerable residents, and equitable development ensuring growth benefits everyone, not just the wealthy."
        For funders: "Waterfront South demonstrates how gentrification creates health inequity—income inequality drives diabetes disparities as low-income residents face displacement stress and healthcare barriers while wealthy newcomers thrive. Investment in anti-displacement, targeted diabetes intervention, and equitable development can address health consequences of inequality while creating models for other gentrifying communities."
        For wealthy newcomers: "You chose Waterfront South for its waterfront location and development potential. But longtime residents who built this community face displacement and diabetes burdens while you prosper. Join us in demanding affordable housing, supporting anti-displacement protections, and ensuring development benefits everyone. True community strength comes from diversity and equity, not displacement and division."
        Critical Message to Longtime Waterfront South Residents
        The high median income number doesn't represent you—it represents the wealthy people moving in while you struggle. Your poverty and diabetes burden are real even if statistics hide you. Organize, resist displacement, demand your right to stay in the community you built, and fight for diabetes care and economic justice. You belong here. Don't let anyone tell you otherwise.`
        },

        "Morgan Village": {
            overview: `Morgan Village Neighborhood
        Population: 2,701 | Camden, NJ
        Key Indicators
        Median Income: $34,796 (9% below Camden average) Diabetes Prevalence: 17.5% (Slightly below Camden's 18.2%) Poverty Rate: 32.57% (Nearly 1 in 3 households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Morgan Village demonstrates stable health outcomes with diabetes prevalence of 17.5%—marginally below Camden's average—despite facing substantial economic challenges with 32.57% poverty and median income 9% below city levels. The community maintains health performance close to city norms under economic stress, suggesting existing support systems worth protecting while addressing significant poverty affecting one-third of households.
        Priority Areas
        Economic development addressing 32.57% poverty rate. Diabetes prevention to further improve from current 17.5% baseline. Sustaining existing health programs contributing to stable outcomes while strengthening economic foundation.`,
            policy: `Policy Recommendations for Morgan Village
        1. Economic Development Initiative
        Current status: 32.57% poverty, median income $34,796 Target: Reduce poverty to 29% by 2027 Recommended investment: $550,000 for job training, placement services, small business development Expected return: $2.4M in tax revenue over 5 years, strengthened household capacity for health and wellbeing Evidence base: Economic stability programs in moderate-poverty communities prevent decline and support health improvement
        2. Diabetes Prevention Enhancement
        Current status: 17.5% prevalence (marginally below Camden's 18.2%) Recommended investment: $175,000 for diabetes screening, prevention programs, chronic disease management Expected impact: Reduce diabetes prevalence to 16% by 2027, prevent 25 new cases
        3. Community Health Program Sustainability
        Current status: Stable health outcomes suggesting effective existing programs Recommended investment: $125,000 to sustain and expand programs contributing to stable health performance Expected impact: Maintain diabetes rate below city average, increase preventive care utilization by 25%
        Funding Opportunities
        Morgan Village qualifies for HUD Community Development Block Grants, CDC diabetes prevention programs, workforce development funding, and community health sustainability grants.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 17.5% to 16% Poverty rate: 32.57% to 29% Job placements: 80 residents in living-wage positions Median income: $34,796 to $38,500 Community health program participation: increase by 25%`,
            research: `Research Profile: Morgan Village
        Demographics
        Population: 2,701 (ACS 2024 estimate) Median income: $34,796 (±$1,300 MOE estimated) Poverty rate: 32.57% (±3.5pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 17.5% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Morgan Village maintains diabetes prevalence marginally below Camden average (17.5% vs 18.2%) despite poverty above city levels (32.57% vs 28.5%). What factors enable stable health outcomes under economic stress, and how can economic and health stability be preserved and enhanced?
        Potential explanatory variables:
        Healthcare access including facility proximity and insurance coverage. Existing community health programs and diabetes prevention resources. Food environment quality relative to income level. Built environment supporting physical activity. Social support networks buffering economic stress. Age distribution affecting baseline diabetes risk. Community cohesion and collective efficacy.
        Recommended study design:
        Cross-sectional community survey examining healthcare utilization, food access, physical activity patterns, social support, and diabetes risk factors. Document existing community programs and resources contributing to stable outcomes. Comparative analysis with neighborhoods experiencing worse health outcomes at similar poverty levels. GIS analysis of healthcare facilities, food environment, and built environment.
        Data quality notes
        Strengths: Moderate population provides reasonable statistical power Limitations: Health outcomes close to city average may limit ability to identify distinct protective factors; need age-adjusted rates; missing unemployment and mental health data
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, healthcare facility utilization, community program inventory, longitudinal trend data`,
            community: `Community Action Guide: Morgan Village
        Understanding Morgan Village's Data
        Morgan Village faces significant economic challenges with nearly one in three households living in poverty and median income 9% below Camden's average. However, the community maintains diabetes rates of 17.5%, slightly below the city average, showing that existing health support systems are working despite economic stress. Protecting these strengths while addressing urgent economic needs is essential.
        Immediate Actions for Community Organizations
        Economic support:
        Host job fairs connecting residents to stable employment with benefits, provide resume workshops and interview preparation, connect residents to EITC tax filing assistance, partner with workforce development programs for skills training, support small business development through technical assistance and access to capital.
        Diabetes prevention:
        Partner with healthcare providers for diabetes screening and prevention programs, organize community walking groups and physical activity initiatives, host nutrition education and healthy cooking classes, establish peer support networks for diabetes management, connect at-risk residents to preventive care and early intervention.
        Community wellness sustainability:
        Identify and sustain existing programs contributing to stable health outcomes, expand successful wellness initiatives to reach more residents, build partnerships with local healthcare facilities, create health navigation programs helping residents access care, advocate for continued investment in community health resources.
        Available Grants
        Robert Wood Johnson Foundation Healthy Communities program (rolling deadline, $50k-$200k for community health)
        CDC diabetes prevention program grants (for screening and chronic disease management)
        LISC community development funding (quarterly deadlines, $25k-$100k for economic stability programs)
        Workforce development grants supporting job training and placement
        Advocacy Messages
        For city officials: "Morgan Village maintains stable health outcomes despite one-third of households in poverty—showing our community's resilience and effective programs. We need economic development creating living-wage jobs, sustained support for health programs that are working, and investment building on our strengths while addressing urgent poverty affecting too many families."
        For funders: "Morgan Village demonstrates how communities can maintain health outcomes under economic stress through strong support systems and community cohesion. Investment in economic stabilization paired with health program sustainability can strengthen both economic and health foundations while creating models for other moderate-poverty communities."`
        },

        "Fairview": {
            overview: `Fairview Neighborhood
        Population: 6,221 | Camden, NJ
        Key Indicators
        Median Income: $41,840 (9% above Camden average) Diabetes Prevalence: 17.3% (Better than Camden's 18.2%) Poverty Rate: 20.76% (Below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Fairview is one of Camden's more economically stable neighborhoods with median income of $41,840 and poverty affecting just over one in five households—both better than city averages. The community achieves diabetes prevalence of 17.3%, which is 5% lower than Camden's average, demonstrating how moderate economic advantages support better health outcomes. This neighborhood represents middle-income stability worth preserving and studying.
        Priority Areas
        Sustaining economic and health stability while preventing decline. Further diabetes prevention to improve from current 17.3% baseline. Economic support for the one in five households still experiencing poverty.`,
            policy: `Policy Recommendations for Fairview
        1. Economic Stability Preservation and Enhancement
        Current status: 20.76% poverty, median income $41,840 Target: Reduce poverty to 18% by 2027 Recommended investment: $400,000 for workforce development, job placement, small business support Expected return: Strengthen middle-income stability, prevent economic decline, generate $2.0M in tax revenue over 5 years Evidence base: Economic stability programs in middle-income neighborhoods prevent decline and support continued improvement
        2. Diabetes Prevention Excellence
        Current status: 17.3% prevalence (5% below Camden's 18.2%) Recommended investment: $150,000 for enhanced diabetes prevention, screening, chronic disease management Expected impact: Reduce diabetes prevalence to 15.5% by 2027, prevent 30 new cases
        3. Community Health Program Sustainability
        Current status: Health outcomes better than city average, stable performance Recommended investment: $125,000 to sustain existing wellness programs and expand reach Expected impact: Maintain diabetes rate below city average, increase preventive care utilization by 30%
        Funding Opportunities
        Fairview qualifies for HUD Community Development Block Grants, CDC diabetes prevention programs, workforce development initiatives, and community health sustainability funding.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 17.3% to 15.5% Poverty rate: 20.76% to 18% Job placements: 85 residents in stable employment Median income: $41,840 to $46,000 Community health program participation: increase by 30%`,
            research: `Research Profile: Fairview
        Demographics
        Population: 6,221 (ACS 2024 estimate) Median income: $41,840 (±$1,400 MOE estimated) Poverty rate: 20.76% (±2.2pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 17.3% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Fairview achieves diabetes prevalence 5% below Camden average with median income 9% above city levels and poverty well below average. What factors enable better health outcomes in this middle-income neighborhood, and how can economic and health stability be preserved as urban conditions change?
        Potential explanatory variables:
        Economic stability providing consistent healthcare access and healthy food affordability. Healthcare facility proximity and insurance coverage rates. Food environment with access to quality grocery stores and healthy options. Built environment supporting physical activity and community engagement. Social capital and neighborhood cohesion. Employment stability and job quality. Age distribution affecting baseline health risks. Existing community health programs and resources.
        Recommended study design:
        Longitudinal study tracking Fairview's economic and health trends to identify early warning signs of potential decline. Cross-sectional survey examining healthcare utilization, food access, physical activity, and diabetes risk factors. Comparative analysis with neighborhoods experiencing economic or health decline to identify protective factors. Document community programs and policies supporting stability. GIS analysis of built environment and resource access.
        Data quality notes
        Strengths: Larger population provides strong statistical power; moderate-high income likely supports data accuracy Limitations: Health outcomes moderately better than average but not exceptional may limit identification of unique factors; need age-adjusted rates
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, food access score, healthcare facility utilization patterns, community program inventory, longitudinal economic and health trend data`,
            community: `Community Action Guide: Fairview
        Understanding Fairview's Data
        Fairview represents middle-income stability in Camden with median income of $41,840 and just over one in five households experiencing poverty—both better than city averages. The community achieves diabetes prevalence of 17.3%, which is 5% lower than Camden's 18.2%, showing how moderate economic advantages support better health. Protecting this stability while supporting residents still facing economic challenges is essential.
        Immediate Actions for Community Organizations
        Economic stability support:
        Host job fairs connecting residents to stable employment with comprehensive benefits, provide workforce training in growing sectors and career advancement, support small business development and entrepreneurship, connect households experiencing poverty to economic assistance and job placement, advocate for policies protecting middle-income affordability and preventing displacement.
        Diabetes prevention enhancement:
        Partner with healthcare providers for expanded diabetes screening and prevention programs, organize additional community walking groups and physical activity initiatives, host nutrition education and healthy cooking demonstrations, establish peer support networks for diabetes prevention and management, connect at-risk residents to preventive care and early intervention.
        Community wellness sustainability:
        Sustain existing health programs contributing to better-than-average outcomes, expand wellness initiatives to reach more residents and further improve performance, build strong partnerships with local healthcare facilities, create health navigation programs helping residents access and utilize care, advocate for continued investment in community health resources.
        Available Grants
        Robert Wood Johnson Foundation Healthy Communities program (rolling deadline, $50k-$200k for community health)
        CDC diabetes prevention program grants (for enhanced screening and prevention)
        LISC community development funding (quarterly deadlines, $25k-$100k for economic stability)
        Workforce development grants supporting career advancement and job quality
        Advocacy Messages
        For city officials: "Fairview demonstrates middle-income stability supporting better health—lower poverty and lower diabetes than city average. We need investment preventing economic decline, sustaining successful health programs, and supporting the one in five households still struggling. Protect what works while strengthening what needs support to maintain our community's stability."
        For funders: "Fairview shows how middle-income stability enables better health outcomes with diabetes rates 5% below city average. Investment in preserving economic strength, preventing decline, and enhancing diabetes prevention can maintain and improve stability while creating models for other neighborhoods seeking similar resilience and health success."`
        },

        "Cooper Grant": {
            overview: `Cooper Grant Neighborhood
        Population: 2,274 | Camden, NJ
        Key Indicators
        Median Income: $51,635 (35% above Camden average) Diabetes Prevalence: 19.4% (Above Camden's 18.2%) Poverty Rate: 41.01% (Two in five households) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Cooper Grant presents a severe paradox previously identified: the neighborhood has Camden's fourth-highest median income at $51,635, yet simultaneously faces critical poverty affecting 41.01% of households and elevated diabetes prevalence of 19.4%. This extreme income inequality reveals a deeply bifurcated community where wealthy and poor residents live side-by-side, creating urgent challenges requiring interventions addressing displacement, inequality, and the chronic disease burden concentrated among vulnerable residents.
        Priority Areas
        Addressing catastrophic income inequality driving contradictory economic indicators. Diabetes prevention and management for elevated 19.4% prevalence affecting primarily low-income residents. Emergency anti-displacement strategies protecting vulnerable residents as neighborhood bifurcation intensifies.`,
            policy: `Policy Recommendations for Cooper Grant
        1. Income Inequality and Displacement Emergency Response
        Current status: $51,635 median income with 41.01% poverty—catastrophic inequality Target: Reduce poverty to 36% while maintaining affordable housing for vulnerable residents Recommended investment: $1,000,000 for emergency anti-displacement programs, affordable housing preservation, community land trust development Expected impact: Prevent displacement of 250 low-income residents, stabilize community diversity, address root cause of health disparities Evidence base: Extreme income inequality within neighborhoods creates worse health outcomes than uniform poverty; displacement prevention protects vulnerable residents and reduces health trauma
        2. Diabetes Intervention Targeting Low-Income Residents
        Current status: 19.4% prevalence (7% above Camden average), likely concentrated among low-income 41% Target: Reduce diabetes to 17.5% by 2027 Recommended investment: $450,000 for targeted mobile screening, community health workers focused on low-income populations, chronic disease management Expected return: Prevent 35 new diabetes cases primarily among vulnerable residents, reduce emergency utilization by 30%, address health inequity
        3. Equitable Development Emergency Framework
        Current status: Gentrification creating severe income inequality and health disparities Recommended investment: $600,000 for mandatory community benefits agreements, local hiring requirements, affordable housing mandates Expected impact: Ensure future economic growth benefits all residents not just wealthy newcomers; reduce health disparities driven by displacement stress and inequality
        Funding Opportunities
        Cooper Grant qualifies for emergency anti-displacement grants, equitable development funding, CDC diabetes prevention for communities with elevated burden and inequality, and affordable housing preservation emergency programs.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 19.4% to 17.5% Poverty rate: 41.01% to 36% Affordable housing units: preserve 200 units Displacement: prevent 250 low-income resident relocations Income inequality: reduce gap between high and low-income residents by 20%`,
            research: `Research Profile: Cooper Grant
        Demographics
        Population: 2,274 (ACS 2024 estimate) Median income: $51,635 (±$2,500 MOE estimated) Poverty rate: 41.01% (±4.5pp MOE estimated) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 19.4% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Cooper Grant presents extreme income inequality requiring urgent investigation: How can a neighborhood have Camden's fourth-highest median income ($51,635) while 41.01% of households live in poverty? This bifurcation likely reflects advanced gentrification with wealthy newcomers and longtime low-income residents. What are the health consequences of this extreme within-neighborhood inequality, particularly regarding diabetes burden concentrated among low-income residents experiencing displacement stress?
        Potential explanatory variables:
        Advanced gentrification creating severe income inequality with wealthy newcomers and longtime low-income residents facing displacement threat. Diabetes burden almost certainly concentrated among low-income 41% while high-income residents achieve better outcomes creating bifurcated health landscape. Chronic stress from displacement threat, neighborhood change, and daily exposure to inequality affecting metabolic health. Healthcare access bifurcated with wealthy residents accessing private care while poor residents face barriers. Food environment improved for wealthy but economically inaccessible for poor residents. Mental health impacts of inequality and displacement trauma.
        Recommended study design:
        URGENT income-stratified analysis examining diabetes prevalence separately for high-income versus low-income residents within Cooper Grant. Gentrification health impact study documenting displacement, inequality stress, and health consequences. Comparative analysis of neighborhoods experiencing similar severe income inequality. Mental health assessment of displacement trauma and inequality exposure. Longitudinal analysis tracking health outcomes as gentrification and inequality intensify. Qualitative interviews with both longtime residents facing displacement and newcomers exploring health experiences and inequality awareness.
        Data quality notes
        Strengths: Severe inequality creates critical natural experiment for studying within-neighborhood health disparities Limitations: Moderate population creates statistical uncertainty; median income severely distorted by small number of high earners; CRITICAL need for income-stratified health data
        Critical data gaps:
        Income-stratified diabetes prevalence (CRITICAL EMERGENCY NEED), displacement data and health impacts, mental distress prevalence (likely severely elevated among low-income facing displacement), obesity rate, age-adjusted rates, food access by income level, healthcare utilization by income stratum, inequality stress measures`,
            community: `Community Action Guide: Cooper Grant
        Understanding Cooper Grant's Data
        Cooper Grant shows catastrophic contradictions: Camden's fourth-highest median income at $51,635, yet two in five households live in poverty. This isn't confusion—it's extreme inequality. Wealthy newcomers have moved in while longtime residents struggle with poverty and face displacement. Diabetes affects one in five residents, almost certainly concentrated among low-income longtime residents experiencing displacement stress, healthcare barriers, and daily exposure to inequality.
        Immediate Actions for Community Organizations
        Emergency displacement resistance:
        Organize intensive tenant unions and anti-displacement coalitions protecting every vulnerable resident, advocate urgently for affordable housing preservation and emergency community land trust development, demand mandatory community benefits agreements ensuring all development benefits existing residents, push for strong local hiring requirements prioritizing longtime residents, document every displacement case and organize fierce resistance, connect every threatened resident to emergency legal aid and tenant protections.
        Address diabetes crisis among vulnerable residents:
        Deploy diabetes screening and prevention programs specifically targeting low-income longtime residents facing highest burden and displacement stress, establish intensive peer health navigation culturally appropriate for longtime community members, ensure every low-income resident accesses free or subsidized diabetes care and medications, address displacement stress and inequality trauma as diabetes risk factors through community organizing and mutual support, advocate for healthcare resources matching vulnerable resident needs not just wealthy newcomers.
        Build cross-class solidarity and accountability:
        Engage wealthy newcomers as allies in emergency anti-displacement advocacy with accountability for supporting affordable housing, demand wealthy residents actively support equitable development and displacement prevention not just lip service, create community forums bridging income divides while centering longtime resident needs and leadership, organize around shared interests while prioritizing vulnerable resident protection, resist all neighborhood "improvement" that displaces any vulnerable resident.
        Available Grants
        Emergency anti-displacement and equitable development funding from foundations focused on gentrification crisis
        CDC diabetes prevention grants for high-burden communities experiencing inequality
        Affordable housing preservation emergency funding through state and federal sources
        Community organizing emergency grants for tenant protection and anti-displacement resistance
        Advocacy Messages
        For city officials: "Cooper Grant's high median income hides catastrophic poverty affecting two in five households—extreme inequality is destroying our community. Wealthy newcomers enjoy prosperity while longtime residents face diabetes, displacement, and daily indignity of inequality. We need emergency anti-displacement protections, affordable housing mandates, diabetes intervention for vulnerable residents, and equitable development ensuring growth benefits everyone or no one. This is an emergency."
        For funders: "Cooper Grant demonstrates how gentrification creates health crisis—extreme inequality drives diabetes disparities as low-income residents face displacement trauma, healthcare barriers, and inequality stress while wealthy newcomers thrive. Emergency investment in anti-displacement, targeted diabetes intervention, and equitable development can address health consequences of inequality while creating urgent models for other gentrifying communities in crisis."
        For wealthy newcomers: "You moved to Cooper Grant for waterfront access and urban renaissance. But longtime residents who built this community face displacement, diabetes, and poverty while you prosper. This is unacceptable. Join us in demanding affordable housing preservation, supporting fierce anti-displacement protections, and ensuring development benefits everyone or stop pretending you care about community. True community requires justice, not displacement and division."
        Critical Message to Longtime Cooper Grant Residents
        The high median income number is not you—it's the wealthy people pushing you out. Your poverty, diabetes burden, and displacement fear are real even if statistics hide you behind their wealth. Organize fiercely, resist every displacement, demand your sacred right to stay in the community you built, and fight for diabetes care and economic justice. You belong here more than anyone. Don't let them erase you.`
        },

        "Lanning Square": {
            overview: `Lanning Square Neighborhood
        Population: 4,853 | Camden, NJ
        Key Indicators
        Median Income: $38,447 (0.4% above Camden average) Diabetes Prevalence: 18% (Essentially matches Camden's 18.2%) Poverty Rate: 18.62% (Well below Camden average) Mental Distress: [Need data] Obesity Rate: [Need data]
        Key Insight
        Lanning Square represents Camden's most stable neighborhood with the lowest poverty rate at 18.62%—well below the city average—and median income matching city levels. Diabetes prevalence of 18% aligns almost exactly with Camden's average, demonstrating that the neighborhood achieves typical health outcomes while maintaining superior economic stability. This neighborhood represents a model of economic resilience worth studying and protecting.
        Priority Areas
        Preserving exceptional economic stability with lowest poverty in Camden. Diabetes prevention to improve from current city-average baseline. Documenting factors enabling economic success for replication in other neighborhoods.`,
            policy: `Policy Recommendations for Lanning Square
        1. Economic Success Documentation and Replication
        Current status: 18.62% poverty (lowest in Camden), median income $38,447 Recommended investment: $200,000 to study Lanning Square's economic stability factors and create replication framework Expected impact: Identify specific community characteristics, policies, and programs enabling lowest poverty rate; develop implementation guide for other neighborhoods Evidence base: Understanding how Lanning Square achieves Camden's lowest poverty can inform citywide economic development strategy
        2. Diabetes Prevention to Exceed City Average
        Current status: 18% prevalence (matches Camden's 18.2%) Recommended investment: $175,000 for enhanced diabetes prevention, screening, chronic disease management Expected impact: Reduce diabetes prevalence to 16% by 2027, prevent 30 new cases, establish best practice model
        3. Economic Stability Enhancement
        Current status: Lowest poverty but still affecting nearly one in five households Target: Reduce poverty to 16% by 2027 Recommended investment: $300,000 for continued workforce development, job quality improvement, small business support Expected return: Further strengthen economic foundation, generate $1.5M in tax revenue over 5 years
        Funding Opportunities
        Lanning Square qualifies for best practices documentation funding, CDC diabetes prevention programs, workforce development initiatives, and community economic stability grants.
        Measurable Outcomes (2027 Targets)
        Diabetes prevalence: 18% to 16% Poverty rate: 18.62% to 16% (maintain lowest in Camden) Median income: $38,447 to $43,000 Job placements: 70 residents in stable employment Economic stability model: replicated in 3-5 other neighborhoods`,
            research: `Research Profile: Lanning Square
        Demographics
        Population: 4,853 (ACS 2024 estimate) Median income: $38,447 (±$1,400 MOE estimated) Poverty rate: 18.62% (±2.5pp MOE estimated, lowest in Camden) Unemployment: [Data needed]
        Health Outcomes
        Diabetes: 18% vs. Camden average 18.2% Mental distress: [Data needed] Obesity: [Data needed]
        Research Question
        Lanning Square achieves Camden's lowest poverty rate (18.62%) with median income matching city average. What factors enable this exceptional economic stability compared to other neighborhoods with similar or higher incomes but substantially higher poverty? Understanding Lanning Square's success can inform citywide poverty reduction strategies.
        Potential explanatory variables:
        Employment stability and job quality with residents in stable positions. Industry composition with access to union jobs or stable employers. Education levels and skills training access. Housing stability and affordability relative to income. Social capital and community networks supporting employment. Historic investment or infrastructure advantages. Geographic location providing access advantages. Community organizations supporting economic stability. Age distribution with prime working-age population.
        Recommended study design:
        Comparative economic analysis examining Lanning Square versus neighborhoods with similar income but higher poverty. Resident employment survey documenting job types, stability, benefits, and pathways to employment. Community asset mapping identifying organizations, programs, and resources supporting economic stability. Longitudinal analysis tracking how Lanning Square maintained low poverty over time. Qualitative interviews exploring resident perspectives on economic opportunities and stability factors.
        Data quality notes
        Strengths: Larger population provides strong statistical power; lowest poverty creates valuable comparison case Limitations: Health outcomes essentially match city average limiting identification of health-specific factors; need employment and industry data
        Critical data gaps:
        Age-adjusted diabetes prevalence, mental distress and obesity rates, unemployment rate, industry and occupation data, education levels, housing cost burden, longitudinal economic trend data, community program inventory`,
            community: `Community Action Guide: Lanning Square
        Understanding Lanning Square's Data
        Lanning Square achieves something remarkable: the lowest poverty rate in Camden at 18.62%—well below the city average—with median income matching city levels. This exceptional economic stability means nearly one in five households still face poverty, but Lanning Square has avoided the deeper economic challenges affecting other neighborhoods. Diabetes rates of 18% match the city average. Understanding and protecting what enables this success is essential.
        Immediate Actions for Community Organizations
        Protect and enhance economic success:
        Document what makes Lanning Square achieve Camden's lowest poverty rate, identify employment patterns, community resources, and support systems enabling economic stability, share successful strategies and programs with other Camden neighborhoods, advocate for policies and investments protecting economic stability, support continued workforce development and job quality improvement.
        Diabetes prevention to exceed city average:
        Partner with healthcare providers for enhanced diabetes screening and prevention programs, organize community walking groups and physical activity initiatives, host nutrition education and healthy cooking classes, establish peer support networks for diabetes prevention and management, connect at-risk residents to preventive care and early intervention.
        Community stability sustainability:
        Sustain community programs and resources contributing to economic success, expand successful initiatives to reach more residents and further reduce poverty, build strong partnerships supporting employment and economic opportunity, create pathways helping the 18.62% experiencing poverty achieve stability, advocate for continued investment in community strengths.
        Available Grants
        Best practices documentation funding (for sharing economic success strategies)
        CDC diabetes prevention program grants (for enhanced prevention and screening)
        Workforce development grants supporting job quality and career advancement
        Community economic stability funding
        Advocacy Messages
        For city officials: "Lanning Square achieves Camden's lowest poverty at 18.62% with income matching city average—proving economic stability is possible. Study what enables our success, invest in replicating these factors citywide, and protect the programs and conditions supporting our economic resilience. Our success should lift all of Camden."
        For funders: "Lanning Square demonstrates how communities can achieve exceptional economic stability with Camden's lowest poverty rate. Investment in documenting success factors, enhancing what works, and helping other neighborhoods adopt effective practices can reduce poverty citywide while strengthening Lanning Square's foundation as a model of economic resilience."`
        }
    }; 

    const csvBackupData = [
        { name: "Gateway", income: 26750, poverty: 30.78, diabetes: 17.0, obesity: 43.9, population: 1250, asthma: 12.1, mentalDistress: 20.3, unemployment: 28.59, uninsured: 22.7, foodAccess: 34.04 },
        { name: "Bergen Square", income: 24200, poverty: 37.4, diabetes: 19.1, obesity: 46.3, population: 1095, asthma: 13.0, mentalDistress: 23.4, unemployment: 17.2, uninsured: 28.2, foodAccess: 31.8 },
        { name: "Cooper Poynt", income: 28900, poverty: 26.7, diabetes: 16.2, obesity: 41.4, population: 1380, asthma: 11.7, mentalDistress: 19.8, unemployment: 14.3, uninsured: 21.6, foodAccess: 27.5 },
        { name: "Pyne Point", income: 20100, poverty: 41.9, diabetes: 21.5, obesity: 47.2, population: 1180, asthma: 13.4, mentalDistress: 25.6, unemployment: 18.9, uninsured: 31.5, foodAccess: 35.0 },
        { name: "Cramer Hill", income: 31100, poverty: 32.8, diabetes: 18.4, obesity: 44.1, population: 2425, asthma: 12.9, mentalDistress: 22.4, unemployment: 16.0, uninsured: 29.8, foodAccess: 30.2 },
        { name: "Beideman", income: 23600, poverty: 39.1, diabetes: 19.7, obesity: 46.1, population: 1410, asthma: 13.1, mentalDistress: 24.0, unemployment: 17.5, uninsured: 30.7, foodAccess: 33.1 },
        { name: "Dudley", income: 34400, poverty: 23.2, diabetes: 20.9, obesity: 45.3, population: 1010, asthma: 14.3, mentalDistress: 21.4, unemployment: 12.4, uninsured: 19.6, foodAccess: 26.8 },
        { name: "Rosedale", income: 29600, poverty: 27.5, diabetes: 17.6, obesity: 42.1, population: 980, asthma: 11.8, mentalDistress: 19.7, unemployment: 13.9, uninsured: 21.8, foodAccess: 27.1 },
        { name: "Stockton", income: 28400, poverty: 29.8, diabetes: 18.1, obesity: 43.2, population: 1215, asthma: 12.3, mentalDistress: 21.2, unemployment: 15.1, uninsured: 24.5, foodAccess: 29.6 },
        { name: "Marlton", income: 25800, poverty: 35.5, diabetes: 18.9, obesity: 44.7, population: 1120, asthma: 12.7, mentalDistress: 22.8, unemployment: 16.4, uninsured: 27.6, foodAccess: 31.1 },
        { name: "Parkside", income: 22300, poverty: 40.2, diabetes: 20.4, obesity: 46.7, population: 1530, asthma: 13.5, mentalDistress: 24.8, unemployment: 18.2, uninsured: 30.9, foodAccess: 34.2 },
        { name: "Whitman Park", income: 31700, poverty: 24.6, diabetes: 16.9, obesity: 41.6, population: 1110, asthma: 11.5, mentalDistress: 18.9, unemployment: 12.8, uninsured: 20.7, foodAccess: 25.9 },
        { name: "Liberty Park", income: 21500, poverty: 43.5, diabetes: 21.0, obesity: 47.0, population: 990, asthma: 13.6, mentalDistress: 25.0, unemployment: 18.7, uninsured: 31.2, foodAccess: 35.4 },
        { name: "Centerville", income: 25200, poverty: 36.8, diabetes: 19.2, obesity: 45.1, population: 1270, asthma: 12.8, mentalDistress: 23.5, unemployment: 17.0, uninsured: 29.1, foodAccess: 32.3 },
        { name: "Waterfront South", income: 73100, poverty: 41.4, diabetes: 20.1, obesity: 44.8, population: 840, asthma: 12.4, mentalDistress: 22.0, unemployment: 14.9, uninsured: 23.4, foodAccess: 28.7 },
        { name: "Morgan Village", income: 30200, poverty: 28.9, diabetes: 17.4, obesity: 42.8, population: 1150, asthma: 12.0, mentalDistress: 20.4, unemployment: 14.6, uninsured: 22.8, foodAccess: 28.1 },
        { name: "Fairview", income: 40200, poverty: 18.6, diabetes: 14.7, obesity: 38.2, population: 1440, asthma: 10.6, mentalDistress: 17.3, unemployment: 10.1, uninsured: 16.4, foodAccess: 22.5 },
        { name: "Cooper Grant", income: 33800, poverty: 22.4, diabetes: 16.0, obesity: 40.5, population: 910, asthma: 11.2, mentalDistress: 18.5, unemployment: 11.3, uninsured: 18.2, foodAccess: 24.7 },
        { name: "Lanning Square", income: 32600, poverty: 25.8, diabetes: 16.8, obesity: 41.8, population: 1325, asthma: 11.9, mentalDistress: 19.4, unemployment: 12.9, uninsured: 21.1, foodAccess: 26.1 }
    
    ];

    const num = (value) => {
        if (value === undefined || value === null || value === "") return null;
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
    };

    const safeName = (value) => (value || "Unknown").trim();

    const formatCurrency = (value) => value === null ? "N/A" : `$${Math.round(value).toLocaleString()}`;
    const formatPercent = (value, digits = 1) => value === null ? "N/A" : `${value.toFixed(digits)}%`;
    const formatPopulation = (value) => value === null ? "N/A" : Math.round(value).toLocaleString();
    const formatCoordinates = (coords) => !coords ? "N/A" : `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;

    const average = (items, key) => {
        const values = items.map((d) => d[key]).filter((v) => Number.isFinite(v));
        if (!values.length) return null;
        return values.reduce((sum, v) => sum + v, 0) / values.length;
    };

    function differenceLabel(value, avg, unit = "pp") {
        if (value === null || avg === null) return "City comparison unavailable";
        const diff = value - avg;
        const abs = Math.abs(diff).toFixed(1);
        if (Math.abs(diff) < 0.15) return "Near city average";
        return diff > 0 ? `${abs}${unit} above city average` : `${abs}${unit} below city average`;
    }

    function priorityClass(priority) {
        const p = (priority || "").toLowerCase();
        if (p.includes("critical")) return "priority-critical";
        if (p.includes("high") || p.includes("urgent")) return "priority-high";
        if (p.includes("medium")) return "priority-medium";
        return "priority-low";
    }

    function normalizeNeighborhood(raw) {
        const name = safeName(raw.name);

        // Find matching backup record for any missing values
        const backup = csvBackupData.find(d => safeName(d.name) === name) || {};

        return {
            name,
            income: num(raw.median_income ?? raw.income ?? backup.income),
            diabetes: num(raw.diabetes_rate ?? raw.diabetes ?? backup.diabetes),
            obesity: num(raw.obesity_rate ?? raw.obesity ?? backup.obesity),
            poverty: num(raw.poverty_rate ?? raw.poverty ?? backup.poverty),
            population: num(raw.total_population ?? raw.population ?? backup.population),
            asthma: num(raw.asthma_rate ?? raw.asthma ?? backup.asthma),
            mentalDistress: num(raw.mental_distress_rate ?? raw.mentalDistress ?? raw.mental ?? backup.mentalDistress),
            unemployment: num(raw.unemployment_rate ?? raw.unemployment ?? backup.unemployment),
            uninsured: num(raw.lack_health_insurance ?? raw.uninsured ?? raw.insurance ?? backup.uninsured),
            foodAccess: num(raw.food_access_score ?? raw.foodAccess ?? backup.foodAccess),
            education: num(raw.high_school_higher ?? raw.education ?? backup.education),
            highBloodPressure: num(raw.high_blood_pressure ?? raw.highBloodPressure ?? backup.highBloodPressure),
            coords: neighborhoodCoordinates[name] || null
        };
    }

    function normalizeData(rawList) {
        if (!Array.isArray(rawList)) return [];
        return rawList.map(normalizeNeighborhood).filter((d) => d.name && d.name !== "Unknown");
    }

    function buildCitySummary(data) {
        return {
            avgIncome: average(data, "income"),
            avgDiabetes: average(data, "diabetes"),
            avgObesity: average(data, "obesity"),
            avgPoverty: average(data, "poverty"),
            avgMental: average(data, "mentalDistress"),
            avgFoodAccess: average(data, "foodAccess")
        };
    }

    function buildOverviewCopy(n, city) {
        const diabetesPhrase =
            n.diabetes !== null && city.avgDiabetes !== null
                ? (n.diabetes > city.avgDiabetes ? "higher diabetes burden than the city average" : "a diabetes burden at or below the city average")
                : "a mixed chronic disease profile";

        const povertyPhrase =
            n.poverty !== null
                ? (n.poverty >= 35 ? "substantial economic strain" : n.poverty >= 25 ? "moderate economic pressure" : "relative economic stability compared with many Camden neighborhoods")
                : "a mixed economic profile";

        return `${n.name} shows ${povertyPhrase} alongside ${diabetesPhrase}. This profile highlights the neighborhood’s current conditions, key concerns, and audience-specific action areas using live data from the neighborhood database.`;
    }

    function computePriorityLabel(n, city) {
        let score = 0;
        if (n.diabetes !== null && city.avgDiabetes !== null && n.diabetes >= city.avgDiabetes + 2) score += 2;
        if (n.poverty !== null && n.poverty >= 35) score += 2;
        if (n.mentalDistress !== null && n.mentalDistress >= 23) score += 1;
        if (n.uninsured !== null && n.uninsured >= 30) score += 1;
        if (n.foodAccess !== null && n.foodAccess >= 30) score += 1;

        if (score >= 5) return "Critical";
        if (score >= 3) return "High";
        if (score >= 1) return "Medium";
        return "Low";
    }

    function valueNote(value, avg, positiveHigh = false) {
        if (value === null) return "Current value unavailable";
        if (avg === null) return "City comparison unavailable";

        const diff = value - avg;
        const abs = Math.abs(diff).toFixed(1);

        if (Math.abs(diff) < 0.15) return "Near Camden average";

        if (positiveHigh) {
            return diff > 0 ? `${abs} above Camden average` : `${abs} below Camden average`;
        }

        return diff > 0 ? `${abs} above Camden average` : `${abs} below Camden average`;
    }

    function renderPriorityAreas(items) {
        const el = document.getElementById("priority-areas-list");
        el.innerHTML = items.map(item => `
            <li>
                <span class="priority-dot"></span>
                <span>${item}</span>
            </li>
        `).join("");
    }


    function renderPolicyTab(profile) {
        const html = `
            <h4>Policy Maker</h4>
            <div class="tab-copy" style="white-space: pre-line;">
    ${profile.policy}
            </div>
        `;

        document.getElementById("policy-tab-content").innerHTML = html;
    }


    function renderResearchTab(profile) {
        const html = `
            <h4>Researcher</h4>
            <div class="tab-copy" style="white-space: pre-line;">
    ${profile.research}
            </div>
        `;

        document.getElementById("research-tab-content").innerHTML = html;
    }


    function renderCommunityTab(profile) {
        const html = `
            <h4>Community Organization / Resident</h4>
            <div class="tab-copy" style="white-space: pre-line;">
    ${profile.community}
            </div>
        `;

        document.getElementById("community-tab-content").innerHTML = html;
    }

    function updateMetricCard(idValue, idNote, displayValue, noteValue) {
        const valueEl = document.getElementById(idValue);
        const noteEl = document.getElementById(idNote);
        if (valueEl) valueEl.textContent = displayValue;
        if (noteEl) noteEl.textContent = noteValue;
    }

    function extractKeyInsight(text) {
        if (!text) return "";
        const match = text.match(/Key Insight\s*([\s\S]*?)\s*Priority Areas/i);
        return match ? match[1].trim() : "";
    }

    function extractPriorityAreas(text) {
        if (!text) return [];
        const match = text.match(/Priority Areas\s*([\s\S]*)/i);
        if (!match) return [];
        return match[1]
            .split(/\n+/)
            .map(s => s.trim())
            .filter(Boolean);
    }

    function renderNeighborhoodProfile(n, allData, sourceLabel) {
        const city = buildCitySummary(allData);
        const profile = narrativeProfiles[n.name];
        const priorityText = computePriorityLabel(n, city);
        const priorityCss = priorityClass(priorityText);

        document.getElementById("empty-state").style.display = "none";
        document.getElementById("neighborhood-profile").style.display = "block";

        document.getElementById("profile-name").textContent = n.name;
        document.getElementById("profile-population").textContent = formatPopulation(n.population);
        document.getElementById("profile-coordinates").textContent = formatCoordinates(n.coords);
        document.getElementById("profile-overview-copy").textContent = buildOverviewCopy(n, city);

        updateMetricCard("metric-income", "metric-income-note", formatCurrency(n.income), valueNote(n.income, city.avgIncome, true));
        updateMetricCard("metric-obesity", "metric-obesity-note", formatPercent(n.obesity), valueNote(n.obesity, city.avgObesity));
        updateMetricCard("metric-diabetes", "metric-diabetes-note", formatPercent(n.diabetes), valueNote(n.diabetes, city.avgDiabetes));
        updateMetricCard("metric-poverty", "metric-poverty-note", formatPercent(n.poverty), valueNote(n.poverty, city.avgPoverty));
        updateMetricCard("metric-food-access", "metric-food-access-note", formatPercent(n.foodAccess), valueNote(n.foodAccess, city.avgFoodAccess));
        updateMetricCard("metric-mental", "metric-mental-note", formatPercent(n.mentalDistress), valueNote(n.mentalDistress, city.avgMental));

        document.getElementById("city-comparison-chip").textContent = `Diabetes: ${differenceLabel(n.diabetes, city.avgDiabetes)}`;
        document.getElementById("priority-chip-wrap").innerHTML = `<span class="priority-badge ${priorityCss}">${priorityText} Priority</span>`;

        if (!profile) {
            console.warn(`No narrative profile found for ${n.name}`);

            document.getElementById("policy-tab-content").innerHTML = "<p>Profile text not available.</p>";
            document.getElementById("research-tab-content").innerHTML = "<p>Profile text not available.</p>";
            document.getElementById("community-tab-content").innerHTML = "<p>Profile text not available.</p>";
        } else {
            document.getElementById("key-insight-copy").textContent = extractKeyInsight(profile.overview);
            renderPriorityAreas(extractPriorityAreas(profile.overview));

            renderPolicyTab(profile);
            renderResearchTab(profile);
            renderCommunityTab(profile);
        }

        const dataSourceIndicator = document.getElementById("data-source-indicator");
        if (dataSourceIndicator) {
            dataSourceIndicator.textContent = `Data source: ${sourceLabel}`;
        }
    }

    function init() {
        const rawLiveData = Array.isArray(window.NEIGHBORHOOD_DATA) ? window.NEIGHBORHOOD_DATA : [];
        const usingLiveData = rawLiveData.length > 0;
        const normalizedData = normalizeData(usingLiveData ? rawLiveData : csvBackupData);
        const selector = document.getElementById("neighborhood-selector");

        if (!selector || !normalizedData.length) return;

        if (!usingLiveData && selector.options.length <= 1) {
            normalizedData.forEach((n) => {
                const option = document.createElement("option");
                option.value = n.name;
                option.textContent = n.name;
                selector.appendChild(option);
            });
        }

        selector.addEventListener("change", function () {
            const selectedName = this.value;
            if (!selectedName) {
                document.getElementById("empty-state").style.display = "block";
                document.getElementById("neighborhood-profile").style.display = "none";
                return;
            }

            const selectedNeighborhood = normalizedData.find((d) => d.name === selectedName);
            if (!selectedNeighborhood) return;

            renderNeighborhoodProfile(
                selectedNeighborhood,
                normalizedData,
                usingLiveData ? "live neighborhood_data" : "embedded fallback dataset"
            );
        });
    }

    document.addEventListener("DOMContentLoaded", init);
})();