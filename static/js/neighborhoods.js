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
            overview: {
                insight: "Gateway achieves better diabetes outcomes than the Camden average despite higher poverty pressure. This suggests the presence of protective community factors worth studying and replicating elsewhere.",
                priorities: [
                    "Economic development support to address the neighborhood poverty burden.",
                    "Food access improvement and affordability strategies.",
                    "Sustain the neighborhood’s relatively better diabetes performance through prevention and screening."
                ]
            },
            policy: {
                heading: "Policy Recommendations for Gateway",
                intro: "Gateway combines real economic pressure with comparatively better diabetes outcomes, making it a strong candidate for investment that both reduces hardship and preserves protective local strengths.",
                bullets: [
                    "Invest in workforce development, job placement, and income-support navigation to reduce neighborhood poverty.",
                    "Expand mobile food markets, SNAP incentive programs, and neighborhood-level healthy food infrastructure.",
                    "Study and preserve the neighborhood conditions associated with lower diabetes prevalence so they can be adapted citywide."
                ]
            },
            research: {
                heading: "Research Profile: Gateway",
                question: "Gateway presents a positive-deviance case: what protective factors help the neighborhood maintain diabetes outcomes below the city burden despite elevated poverty?",
                variables: [
                    "Healthcare facility proximity and insurance coverage",
                    "Food assistance utilization and grocery affordability",
                    "Social cohesion and informal support systems",
                    "Walkability, recreation access, and built environment conditions",
                    "Presence of clinics, community health workers, and prevention programs"
                ],
                design: "Use a mixed-methods design that combines interviews, GIS resource mapping, and comparison to similar high-poverty neighborhoods with worse diabetes outcomes."
            },
            community: {
                heading: "Community Organization / Resident Action Guide",
                intro: "Gateway’s data suggests strong community health support may already exist. The goal is to reduce economic stress while preserving what is already helping residents stay healthier than expected.",
                actions: [
                    "Host job fairs, resume workshops, and benefits-navigation events.",
                    "Partner with food banks and mobile markets to improve food affordability and access.",
                    "Support walking groups, screening events, and diabetes education with local clinics."
                ]
            }
        },
        "Pyne Point": {
            overview: {
                insight: "Pyne Point faces severe health and economic strain, with high diabetes prevalence alongside deep poverty. The combination increases barriers to prevention, treatment, and long-term stability.",
                priorities: [
                    "Diabetes prevention and disease management.",
                    "Economic development and direct poverty-reduction supports.",
                    "Healthcare access expansion, including transportation and neighborhood-based screening."
                ]
            },
            policy: {
                heading: "Policy Recommendations for Pyne Point",
                intro: "Pyne Point requires urgent, multi-sector investment that addresses disease burden and economic hardship together rather than as separate problems.",
                bullets: [
                    "Fund mobile screening, community health workers, and chronic disease management programs.",
                    "Expand job training, placement, and emergency economic support for residents.",
                    "Increase healthcare access through outreach, appointment transportation, and Medicaid enrollment assistance."
                ]
            },
            research: {
                heading: "Research Profile: Pyne Point",
                question: "What combination of healthcare access barriers, food environment constraints, and economic hardship explains Pyne Point’s elevated chronic disease burden?",
                variables: [
                    "Distance to primary care and transportation barriers",
                    "Insurance coverage and preventive care utilization",
                    "Food environment quality and affordability",
                    "Physical activity barriers and recreation access",
                    "Medication adherence, screening rates, and age structure"
                ],
                design: "Combine a community health needs assessment, qualitative resident interviews, and GIS analysis of food and healthcare access."
            },
            community: {
                heading: "Community Organization / Resident Action Guide",
                intro: "The data suggests Pyne Point would benefit from immediate, practical supports that reduce disease burden while strengthening household stability.",
                actions: [
                    "Partner with providers for neighborhood diabetes screening and support groups.",
                    "Connect residents to jobs with health insurance and workforce training.",
                    "Organize walking groups, medication support, and food-access events."
                ]
            }
        },
        "Dudley": {
            overview: {
                insight: "Dudley shows elevated diabetes burden even though its poverty rate is not among the city’s worst. That suggests neighborhood-specific barriers beyond income alone.",
                priorities: [
                    "Urgent diabetes intervention and chronic disease support.",
                    "Healthcare access expansion and navigation support.",
                    "Targeted economic assistance that reduces treatment barriers and routine disruption."
                ]
            },
            policy: {
                heading: "Policy Recommendations for Dudley",
                intro: "Dudley needs a targeted health-equity strategy focused on disease burden drivers that may not be explained by poverty alone.",
                bullets: [
                    "Deploy bi-weekly diabetes screening and chronic disease management services.",
                    "Improve healthcare navigation, clinic access, and extended-hours care options.",
                    "Pair health intervention with medication affordability support and workforce connection."
                ]
            },
            research: {
                heading: "Research Profile: Dudley",
                question: "Why does Dudley experience a diabetes burden well above the Camden average despite a less severe poverty profile than many peer neighborhoods?",
                variables: [
                    "Healthcare facility quality and access barriers",
                    "Food environment and healthy food affordability",
                    "Walkability and physical activity opportunities",
                    "Environmental exposure or neighborhood hazard history",
                    "Work schedules, transportation, and healthcare utilization patterns"
                ],
                design: "Use a mixed-methods neighborhood investigation with surveys, spatial analysis, and resident interviews to isolate local disease-burden drivers."
            },
            community: {
                heading: "Community Organization / Resident Action Guide",
                intro: "Dudley would benefit from practical neighborhood-level supports that make diabetes prevention and management easier to access consistently.",
                actions: [
                    "Organize diabetes support groups and regular screening days.",
                    "Offer healthcare enrollment drives and appointment-navigation help.",
                    "Connect residents to EITC, medication support, and employer-based health opportunities."
                ]
            }
        },
        "Fairview": {
            overview: {
                insight: "Fairview represents relative stability worth preserving. It shows lower poverty pressure and comparatively better diabetes outcomes than many neighborhoods in the city.",
                priorities: [
                    "Preserve economic and health stability while preventing decline.",
                    "Continue diabetes prevention and screening improvements.",
                    "Sustain community wellness programs that appear to support better outcomes."
                ]
            },
            policy: {
                heading: "Policy Recommendations for Fairview",
                intro: "Fairview is a neighborhood where preventive investment can protect current strengths and reduce the risk of future decline.",
                bullets: [
                    "Support workforce and economic-stability initiatives that preserve middle-income conditions.",
                    "Expand diabetes prevention and screening programs to improve on an already relatively strong baseline.",
                    "Sustain and scale community wellness programming with strong preventive-care participation."
                ]
            },
            research: {
                heading: "Research Profile: Fairview",
                question: "What protective factors help Fairview maintain relatively better health outcomes, and how can they be preserved as neighborhood conditions change?",
                variables: [
                    "Healthcare access and facility proximity",
                    "Food environment quality and healthy food availability",
                    "Built environment and physical activity opportunities",
                    "Community health programs and preventive care engagement",
                    "Employment stability and neighborhood social cohesion"
                ],
                design: "Use a longitudinal and comparative design to identify which conditions most strongly support resilience and prevention."
            },
            community: {
                heading: "Community Organization / Resident Action Guide",
                intro: "Fairview’s profile suggests a need to protect what is working while continuing to improve prevention and access.",
                actions: [
                    "Promote preventive screenings and neighborhood wellness participation.",
                    "Support local food access and community-based physical activity programs.",
                    "Build resident engagement around preserving neighborhood stability."
                ]
            }
        },
        "Waterfront South": {
            overview: {
                insight: "Waterfront South combines very high median income with very high poverty, suggesting extreme internal inequality rather than broad neighborhood prosperity.",
                priorities: [
                    "Address inequality and displacement pressure affecting longtime residents.",
                    "Target chronic disease support to vulnerable low-income households.",
                    "Link neighborhood development to equitable community benefits."
                ]
            },
            policy: {
                heading: "Policy Recommendations for Waterfront South",
                intro: "Waterfront South needs an equity-focused strategy that recognizes internal neighborhood divides rather than treating the area as uniformly prosperous.",
                bullets: [
                    "Protect affordable housing and reduce displacement pressure on longtime residents.",
                    "Target diabetes prevention and healthcare access resources to vulnerable low-income households.",
                    "Tie development activity to community benefits, local hiring, and anti-displacement safeguards."
                ]
            },
            research: {
                heading: "Research Profile: Waterfront South",
                question: "How does within-neighborhood inequality shape health outcomes in Waterfront South, and does diabetes burden concentrate among lower-income households?",
                variables: [
                    "Income stratification and housing displacement patterns",
                    "Healthcare access differences by income group",
                    "Food affordability across residents with very different economic conditions",
                    "Stress related to neighborhood change and instability",
                    "Age distribution and population turnover"
                ],
                design: "Use an income-stratified analysis paired with qualitative interviews and a longitudinal gentrification-health framework."
            },
            community: {
                heading: "Community Organization / Resident Action Guide",
                intro: "The neighborhood’s data suggests a need for both anti-displacement action and focused health support for vulnerable residents.",
                actions: [
                    "Support tenant organizing and anti-displacement coalitions.",
                    "Target screenings and peer health navigation toward longtime low-income residents.",
                    "Build cross-class neighborhood coalitions that protect longtime residents first."
                ]
            }
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
        return {
            name,
            income: num(raw.median_income ?? raw.income),
            diabetes: num(raw.diabetes_rate ?? raw.diabetes),
            obesity: num(raw.obesity_rate ?? raw.obesity),
            poverty: num(raw.poverty_rate ?? raw.poverty),
            population: num(raw.total_population ?? raw.population),
            asthma: num(raw.asthma_rate ?? raw.asthma),
            mentalDistress: num(raw.mental_distress_rate ?? raw.mentalDistress ?? raw.mental),
            unemployment: num(raw.unemployment_rate ?? raw.unemployment),
            uninsured: num(raw.lack_health_insurance ?? raw.uninsured ?? raw.insurance),
            foodAccess: num(raw.food_access_score ?? raw.foodAccess),
            education: num(raw.high_school_higher ?? raw.education),
            highBloodPressure: num(raw.high_blood_pressure ?? raw.highBloodPressure),
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

    function buildGenericInsight(n, city) {
        const pieces = [];

        if (n.diabetes !== null && city.avgDiabetes !== null) {
            pieces.push(`diabetes is ${differenceLabel(n.diabetes, city.avgDiabetes)}`);
        }
        if (n.poverty !== null && city.avgPoverty !== null) {
            pieces.push(`poverty is ${differenceLabel(n.poverty, city.avgPoverty)}`);
        }
        if (n.mentalDistress !== null && city.avgMental !== null) {
            pieces.push(`mental distress is ${differenceLabel(n.mentalDistress, city.avgMental)}`);
        }

        if (!pieces.length) {
            return `${n.name} presents a mixed neighborhood profile that should be interpreted through both economic and health indicators together rather than in isolation.`;
        }

        return `${n.name} stands out because ${pieces.join(", ")}. The combined pattern suggests that neighborhood conditions should be interpreted through multiple social determinants rather than any single metric.`;
    }

    function buildPriorityAreas(n, city) {
        const priorities = [];

        if (n.diabetes !== null && city.avgDiabetes !== null && n.diabetes >= city.avgDiabetes + 2) {
            priorities.push("Strengthen diabetes prevention, screening, and disease-management support.");
        }
        if (n.poverty !== null && n.poverty >= 35) {
            priorities.push("Expand poverty-reduction strategies, income support, and economic-mobility programs.");
        }
        if (n.foodAccess !== null && n.foodAccess >= 30) {
            priorities.push("Improve healthy food access and affordability at the neighborhood level.");
        }
        if (n.mentalDistress !== null && n.mentalDistress >= 23) {
            priorities.push("Expand mental health support, trauma-informed services, and outreach.");
        }
        if (n.uninsured !== null && n.uninsured >= 30) {
            priorities.push("Increase insurance enrollment and care-navigation assistance.");
        }
        if (n.obesity !== null && n.obesity >= 45) {
            priorities.push("Support long-term chronic disease prevention through nutrition and physical activity initiatives.");
        }

        if (!priorities.length) {
            priorities.push("Maintain current strengths while monitoring for changes in health and economic stability.");
            priorities.push("Preserve preventive care engagement and resident-facing wellness programs.");
            priorities.push("Use the neighborhood as a comparison case for identifying protective local factors.");
        }

        return priorities.slice(0, 3);
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

    function getNarrativeProfile(name) {
        return narrativeProfiles[name] || null;
    }

    function buildDefaultPolicy(n, city) {
        const bullets = [];
        if (n.poverty !== null && n.poverty >= 35) bullets.push("Prioritize neighborhood economic supports, workforce pathways, and benefits access.");
        if (n.diabetes !== null && city.avgDiabetes !== null && n.diabetes >= city.avgDiabetes + 2) bullets.push("Expand neighborhood-based diabetes screening, prevention, and chronic disease management.");
        if (n.foodAccess !== null && n.foodAccess >= 30) bullets.push("Increase healthy food affordability and food retail access in the neighborhood.");
        if (n.uninsured !== null && n.uninsured >= 28) bullets.push("Support insurance outreach, enrollment drives, and care-navigation assistance.");
        if (!bullets.length) bullets.push("Preserve neighborhood strengths while targeting preventive health and stability supports.");
        return {
            heading: `Policy Recommendations for ${n.name}`,
            intro: `${n.name} benefits from a focused policy approach that aligns economic conditions, access barriers, and chronic disease prevention into one neighborhood strategy.`,
            bullets
        };
    }

    function buildDefaultResearch(n, city) {
        const variables = [
            "Healthcare access and preventive care utilization",
            "Food environment quality and affordability",
            "Walkability, recreation access, and physical activity opportunities",
            "Insurance coverage, employment stability, and transportation barriers",
            "Resident experiences of stress, neighborhood change, and service access"
        ];

        return {
            heading: `Research Profile: ${n.name}`,
            question: `How do social determinants interact in ${n.name} to shape chronic disease burden and overall neighborhood health outcomes compared with the Camden average?`,
            variables,
            design: "Use a mixed-methods approach that combines quantitative neighborhood indicators with resident interviews, local service mapping, and comparative analysis across Camden neighborhoods."
        };
    }

    function buildDefaultCommunity(n) {
        const actions = [];
        if (n.diabetes !== null) actions.push("Organize neighborhood-level screenings, education sessions, and chronic disease support events.");
        if (n.foodAccess !== null) actions.push("Partner with food banks, mobile markets, and resident leaders to improve food access.");
        if (n.uninsured !== null) actions.push("Promote insurance enrollment drives and healthcare navigation assistance.");
        if (!actions.length) actions.push("Build local resident networks around preventive health, outreach, and neighborhood resource awareness.");

        return {
            heading: "Community Organization / Resident Action Guide",
            intro: `${n.name} can benefit from community-based action that makes prevention, support services, and neighborhood advocacy easier to access consistently.`,
            actions
        };
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

    function renderOverviewTab(n, city, profile) {
        const priorityText = computePriorityLabel(n, city);
        const html = `
            <h4>${n.name}: General Overview</h4>
            <p class="tab-copy">${profile?.overview?.insight || buildGenericInsight(n, city)}</p>

            <h5>Neighborhood Snapshot</h5>
            <ul>
                <li><strong>Population:</strong> ${formatPopulation(n.population)}</li>
                <li><strong>Median Income:</strong> ${formatCurrency(n.income)}</li>
                <li><strong>Poverty Rate:</strong> ${formatPercent(n.poverty)}</li>
                <li><strong>Diabetes:</strong> ${formatPercent(n.diabetes)}</li>
                <li><strong>Obesity:</strong> ${formatPercent(n.obesity)}</li>
                <li><strong>Low Food Access:</strong> ${formatPercent(n.foodAccess)}</li>
                <li><strong>Mental Distress:</strong> ${formatPercent(n.mentalDistress)}</li>
                <li><strong>Priority Level:</strong> ${priorityText}</li>
            </ul>

            <h5>Interpretation</h5>
            <p class="tab-copy">
                This overview combines health and socioeconomic indicators to help users quickly see where ${n.name}
                stands relative to other Camden neighborhoods. The profile is designed to support a broad public-facing understanding
                before users move into audience-specific policy, research, or community action tabs.
            </p>
        `;
        document.getElementById("overview-tab-content").innerHTML = html;
    }

    function renderPolicyTab(n, city, profile) {
        const policy = profile?.policy || buildDefaultPolicy(n, city);
        document.getElementById("policy-tab-content").innerHTML = `
            <h4>${policy.heading}</h4>
            <p class="tab-copy">${policy.intro}</p>
            <h5>Priority Actions</h5>
            <ul>
                ${policy.bullets.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
    }

    function renderResearchTab(n, city, profile) {
        const research = profile?.research || buildDefaultResearch(n, city);
        document.getElementById("research-tab-content").innerHTML = `
            <h4>${research.heading}</h4>
            <p class="tab-copy"><strong>Research Question:</strong> ${research.question}</p>
            <h5>Variables to Explore</h5>
            <ul>
                ${research.variables.map(item => `<li>${item}</li>`).join("")}
            </ul>
            <h5>Suggested Design</h5>
            <p class="tab-copy">${research.design}</p>
        `;
    }

    function renderCommunityTab(n, profile) {
        const community = profile?.community || buildDefaultCommunity(n);
        document.getElementById("community-tab-content").innerHTML = `
            <h4>${community.heading}</h4>
            <p class="tab-copy">${community.intro}</p>
            <h5>Immediate Community Actions</h5>
            <ul>
                ${community.actions.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
    }

    function updateMetricCard(idValue, idNote, displayValue, noteValue) {
        const valueEl = document.getElementById(idValue);
        const noteEl = document.getElementById(idNote);
        if (valueEl) valueEl.textContent = displayValue;
        if (noteEl) noteEl.textContent = noteValue;
    }

    function renderNeighborhoodProfile(n, allData, sourceLabel) {
        const city = buildCitySummary(allData);
        const profile = getNarrativeProfile(n.name);
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

        document.getElementById("key-insight-copy").textContent = profile?.overview?.insight || buildGenericInsight(n, city);
        document.getElementById("city-comparison-chip").textContent = `Diabetes: ${differenceLabel(n.diabetes, city.avgDiabetes)}`;
        document.getElementById("priority-chip").innerHTML = `<span class="priority-badge ${priorityCss}">${priorityText} Priority</span>`;

        renderPriorityAreas(profile?.overview?.priorities || buildPriorityAreas(n, city));
        renderOverviewTab(n, city, profile);
        renderPolicyTab(n, city, profile);
        renderResearchTab(n, city, profile);
        renderCommunityTab(n, profile);

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