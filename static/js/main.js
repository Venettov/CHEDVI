// CHEDVI - Enhanced Main JavaScript with UX/UI Improvements

// Global namespace for CHEDVI utilities
window.CHEDVI = {
    // Configuration
    config: {
        textSize: 'medium',
        theme: localStorage.getItem('chedvi-theme') || 'light',
        animations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: false,
        searchEnabled: true
    },
    
    // Initialize all enhanced components
    init: function() {
        // Clear any existing loading states first
        this.hideLoadingState();
        
        this.initializeAccessibility();
        this.initializeEnhancedNavigation();
        this.initializeAnimations();
        this.initializeFormValidation();
        this.initializeEnhancedTooltips();
        this.initializeGlobalSearch();
        this.initializeThemeSystem();

        this.initializeComparisonTools();
        this.initializeBreadcrumbs();

        //this.initializeGuidedTour();
        this.initializeWelcomeModal();
        this.loadUserPreferences();
        this.addLoadingStates();
    },
    
    // Enhanced accessibility features
    initializeAccessibility: function() {
        // Add skip links
        this.addSkipLinks();
        
        // Keyboard navigation
        this.initializeKeyboardNavigation();
        
        // Text size controls
        this.initializeTextSizeControls();
        
        // High contrast mode
        this.initializeHighContrastMode();
        
        // Screen reader announcements
        this.initializeScreenReaderSupport();
        
        // Focus management
        this.initializeFocusManagement();
    },
    
    // Add skip links for accessibility
    addSkipLinks: function() {
        const skipLinks = document.createElement('div');
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
            <a href="#search" class="skip-link">Skip to search</a>
        `;
        document.body.insertBefore(skipLinks, document.body.firstChild);
        
        // Add main content landmark if not exists
        const mainContent = document.querySelector('main') || document.querySelector('.container').parentElement;
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    },
    
    // Enhanced keyboard navigation
    initializeKeyboardNavigation: function() {
        let focusedElementBeforeModal = null;
        
        document.addEventListener('keydown', (e) => {
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // Escape key handlers
            if (e.key === 'Escape') {
                this.handleEscapeKey();
            }
            
            // Arrow key navigation for data tables
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                this.handleArrowKeyNavigation(e);
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },
    
    // Handle escape key functionality
    handleEscapeKey: function() {
        // Close modals
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
        });
        
        // Close search results
        const searchResults = document.querySelectorAll('.search-results');
        searchResults.forEach(results => results.style.display = 'none');
        
        // Close dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    },
    
    // Arrow key navigation for tables and grids
    handleArrowKeyNavigation: function(e) {
        const activeElement = document.activeElement;
        if (activeElement.closest('.data-table') || activeElement.closest('.card-grid')) {
            e.preventDefault();
            // Implement grid navigation logic here
            this.navigateDataGrid(activeElement, e.key);
        }
    },
    
    // Text size controls
    initializeTextSizeControls: function() {
        const controls = document.createElement('div');
        controls.className = 'accessibility-controls position-fixed';
        controls.style.cssText = `
            top: 80px; 
            right: 20px; 
            z-index: 1050; 
            background: white; 
            padding: 1rem; 
            border-radius: 8px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 1px solid var(--border-color);
            min-width: 200px;
        `;
        controls.innerHTML = `
            <div class="mb-3">
                <small class="text-muted fw-bold">Accessibility</small>
            </div>
            <div class="mb-3">
                <label class="form-label small">Text Size</label>
                <div class="text-size-controls">
                    <button class="text-size-btn" data-size="small" aria-label="Small text">A</button>
                    <button class="text-size-btn active" data-size="medium" aria-label="Medium text">A</button>
                    <button class="text-size-btn" data-size="large" aria-label="Large text">A</button>
                </div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="highContrastToggle">
                    <label class="form-check-label small" for="highContrastToggle">
                        High Contrast
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="reduceMotionToggle">
                    <label class="form-check-label small" for="reduceMotionToggle">
                        Reduce Motion
                    </label>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-secondary w-100" onclick="CHEDVI.toggleAccessibilityPanel()">
                <i class="fas fa-times"></i> Close
            </button>
        `;
        
        document.body.appendChild(controls);
        controls.style.display = 'none';
        
        // Add accessibility toggle button to navbar
        this.addAccessibilityToggle();
        
        // Event listeners
        controls.addEventListener('click', (e) => {
            if (e.target.classList.contains('text-size-btn')) {
                const size = e.target.dataset.size;
                this.setTextSize(size);
                
                controls.querySelectorAll('.text-size-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
        
        document.getElementById('highContrastToggle').addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });
        
        document.getElementById('reduceMotionToggle').addEventListener('change', (e) => {
            this.toggleReducedMotion(e.target.checked);
        });
    },
    
    // Add accessibility toggle to navbar
    addAccessibilityToggle: function() {
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const accessibilityItem = document.createElement('li');
            accessibilityItem.className = 'nav-item';
            accessibilityItem.innerHTML = `
                <button class="nav-link btn" onclick="CHEDVI.toggleAccessibilityPanel()" aria-label="Accessibility Options">
                    <i class="fas fa-universal-access"></i>
                </button>
            `;
            navbar.appendChild(accessibilityItem);
        }
    },
    
    // Toggle accessibility panel
    toggleAccessibilityPanel: function() {
        const panel = document.querySelector('.accessibility-controls');
        if (panel) {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    },
    
    // Set text size - Now locked to uniform small size
    setTextSize: function(size) {
        // Force uniform small text size across entire site
        const root = document.documentElement;
        root.style.fontSize = '14px'; // Always use 14px regardless of selection
        
        this.config.textSize = 'small'; // Always set to small
        this.saveUserPreferences();
        this.announceToScreenReader('Text size is set to uniform small across the entire website');
    },
    
    // Toggle high contrast mode
    toggleHighContrast: function(enabled) {
        this.config.highContrast = enabled;
        document.documentElement.classList.toggle('high-contrast', enabled);
        this.saveUserPreferences();
        this.announceToScreenReader(`High contrast mode ${enabled ? 'enabled' : 'disabled'}`);
    },
    
    // Toggle reduced motion
    toggleReducedMotion: function(enabled) {
        this.config.animations = !enabled;
        document.documentElement.classList.toggle('reduce-motion', enabled);
        this.saveUserPreferences();
    },
    
    // Screen reader support
    initializeScreenReaderSupport: function() {
        // Create announcement region
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.id = 'screen-reader-announcements';
        document.body.appendChild(announcer);
    },
    
    // Announce to screen readers
    announceToScreenReader: function(message) {
        const announcer = document.getElementById('screen-reader-announcements');
        if (announcer) {
            announcer.textContent = message;
            setTimeout(() => announcer.textContent = '', 1000);
        }
    },
    
    // Focus management
    initializeFocusManagement: function() {
        // Track focus for modal management
        document.addEventListener('focusin', (e) => {
            if (!document.querySelector('.modal.show')) {
                this.lastFocusedElement = e.target;
            }
        });
    },
    
    // Enhanced navigation with breadcrumbs
    initializeEnhancedNavigation: function() {
        this.initializeOriginalNavigation();
        this.initializeMobileNavigation();
        // Navigation keyboard support - placeholder for future implementation
    },
    
    // Original navigation functionality
    initializeOriginalNavigation: function() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
        
        // Mobile menu handling
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        
        if (navToggler && navCollapse) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth < 992) {
                        const collapse = new bootstrap.Collapse(navCollapse, {toggle: false});
                        collapse.hide();
                    }
                });
            });
        }
    },
    
    // Enhanced mobile navigation
    initializeMobileNavigation: function() {
        // Touch gestures for mobile
        if ('ontouchstart' in window) {
            this.initializeTouchGestures();
        }
        
        // Improved mobile menu UX
        this.enhanceMobileMenu();
    },
    
    // Enhanced mobile menu functionality
    enhanceMobileMenu: function() {
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        
        if (navToggler && navCollapse) {
            // Add smooth animation to mobile menu
            navCollapse.addEventListener('show.bs.collapse', function() {
                this.style.transition = 'height 0.3s ease';
            });
            
            navCollapse.addEventListener('hide.bs.collapse', function() {
                this.style.transition = 'height 0.3s ease';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggler.contains(e.target) && !navCollapse.contains(e.target)) {
                    if (navCollapse.classList.contains('show')) {
                        const collapse = new bootstrap.Collapse(navCollapse, {toggle: false});
                        collapse.hide();
                    }
                }
            });
        }
    },
    
    // Touch gestures for mobile navigation
    initializeTouchGestures: function() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Horizontal swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next page
                    this.handleSwipeNavigation('left');
                } else {
                    // Swipe right - previous page
                    this.handleSwipeNavigation('right');
                }
            }
        });
    },
    
    // Handle swipe navigation
    handleSwipeNavigation: function(direction) {
        const pages = ['/', '/dashboard', '/neighborhoods', '/rankings', '/insights', '/policy', '/resources'];
        const currentPath = window.location.pathname;
        const currentIndex = pages.indexOf(currentPath);
        
        if (currentIndex !== -1) {
            let newIndex;
            if (direction === 'left' && currentIndex < pages.length - 1) {
                newIndex = currentIndex + 1;
            } else if (direction === 'right' && currentIndex > 0) {
                newIndex = currentIndex - 1;
            }
            
            if (newIndex !== undefined) {
                this.announceToScreenReader(`Navigating to next page`);
                window.location.href = pages[newIndex];
            }
        }
    },
    
    // Breadcrumb navigation
    initializeBreadcrumbs: function() {
        const breadcrumbContainer = this.createBreadcrumbContainer();
        if (breadcrumbContainer) {
            this.updateBreadcrumbs(breadcrumbContainer);
        }
    },
    
    // Create breadcrumb container
    createBreadcrumbContainer: function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return null;
        
        const breadcrumbSection = document.createElement('nav');
        breadcrumbSection.className = 'breadcrumb-nav';
        breadcrumbSection.setAttribute('aria-label', 'Breadcrumb navigation');
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const breadcrumb = document.createElement('ol');
        breadcrumb.className = 'breadcrumb mb-0';
        breadcrumb.id = 'main-breadcrumb';
        
        container.appendChild(breadcrumb);
        breadcrumbSection.appendChild(container);
        navbar.after(breadcrumbSection);
        
        return breadcrumb;
    },
    
    // Update breadcrumbs based on current page
    updateBreadcrumbs: function(container) {
        const path = window.location.pathname;
        const pathSegments = path.split('/').filter(segment => segment);
        
        const breadcrumbItems = [
            { text: 'Home', href: '/', icon: 'fas fa-home' }
        ];
        
        // Map paths to breadcrumb items
        const pathMap = {
            'dashboard': { text: 'Dashboard', icon: 'fas fa-chart-bar' },
            'neighborhoods': { text: 'Neighborhoods', icon: 'fas fa-map-marked-alt' },
            'rankings': { text: 'Rankings', icon: 'fas fa-trophy' },
            'insights': { text: 'Insights', icon: 'fas fa-lightbulb' },
            'policy': { text: 'Policy', icon: 'fas fa-gavel' },
            'resources': { text: 'Resources', icon: 'fas fa-hand-holding-heart' },
            'about': { text: 'About', icon: 'fas fa-info-circle' }
        };
        
        pathSegments.forEach((segment, index) => {
            if (pathMap[segment]) {
                const href = '/' + pathSegments.slice(0, index + 1).join('/');
                breadcrumbItems.push({
                    text: pathMap[segment].text,
                    href: href,
                    icon: pathMap[segment].icon
                });
            }
        });
        
        container.innerHTML = breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return `
                <li class="breadcrumb-item ${isLast ? 'active' : ''}" ${isLast ? 'aria-current="page"' : ''}>
                    ${isLast ? 
                        `<i class="${item.icon} me-1"></i>${item.text}` :
                        `<a href="${item.href}" class="text-decoration-none">
                            <i class="${item.icon} me-1"></i>${item.text}
                        </a>`
                    }
                </li>
            `;
        }).join('');
    },
    
    // Global search functionality
    initializeGlobalSearch: function() {
        this.createSearchWidget();
        this.initializeSearchFunctionality();
    },
    
    // Create search widget
    createSearchWidget: function() {
        const navbar = document.querySelector('.navbar .container');
        if (!navbar) return;
        
        const searchWidget = document.createElement('div');
        searchWidget.className = 'search-widget ms-auto me-3';
        searchWidget.innerHTML = `
            <div class="position-relative">
                <i class="fas fa-search search-icon"></i>
                <input type="text" 
                       class="search-input" 
                       placeholder="Search neighborhoods, metrics..." 
                       aria-label="Search"
                       id="global-search-input">
                <div class="search-results" id="search-results" role="listbox"></div>
            </div>
        `;
        
        // Insert before the navbar toggler or at the end
        const toggler = navbar.querySelector('.navbar-toggler');
        if (toggler) {
            toggler.before(searchWidget);
        } else {
            navbar.appendChild(searchWidget);
        }
    },
    
    // Initialize search functionality
    initializeSearchFunctionality: function() {
        const searchInput = document.getElementById('global-search-input');
        const searchResults = document.getElementById('search-results');
        
        if (!searchInput || !searchResults) return;
        
        let searchTimeout;
        
        // Search data
        const searchData = [
            { type: 'neighborhood', name: 'Gateway', url: '/neighborhoods?selected=Gateway' },
            { type: 'neighborhood', name: 'Bergen Square', url: '/neighborhoods?selected=Bergen Square' },
            { type: 'neighborhood', name: 'Cooper Poynt', url: '/neighborhoods?selected=Cooper Poynt' },
            { type: 'neighborhood', name: 'Pyne Point', url: '/neighborhoods?selected=Pyne Point' },
            { type: 'neighborhood', name: 'Cramer Hill', url: '/neighborhoods?selected=Cramer Hill' },
            { type: 'neighborhood', name: 'Beideman', url: '/neighborhoods?selected=Beideman' },
            { type: 'neighborhood', name: 'Dudley', url: '/neighborhoods?selected=Dudley' },
            { type: 'neighborhood', name: 'Rosedale', url: '/neighborhoods?selected=Rosedale' },
            { type: 'neighborhood', name: 'Stockton', url: '/neighborhoods?selected=Stockton' },
            { type: 'neighborhood', name: 'Marlton', url: '/neighborhoods?selected=Marlton' },
            { type: 'neighborhood', name: 'Parkside', url: '/neighborhoods?selected=Parkside' },
            { type: 'neighborhood', name: 'Whitman Park', url: '/neighborhoods?selected=Whitman Park' },
            { type: 'neighborhood', name: 'Liberty Park', url: '/neighborhoods?selected=Liberty Park' },
            { type: 'neighborhood', name: 'Centerville', url: '/neighborhoods?selected=Centerville' },
            { type: 'neighborhood', name: 'Waterfront South', url: '/neighborhoods?selected=Waterfront South' },
            { type: 'neighborhood', name: 'Morgan Village', url: '/neighborhoods?selected=Morgan Village' },
            { type: 'neighborhood', name: 'Fairview', url: '/neighborhoods?selected=Fairview' },
            { type: 'neighborhood', name: 'Cooper Grant', url: '/neighborhoods?selected=Cooper Grant' },
            { type: 'neighborhood', name: 'Lanning Square', url: '/neighborhoods?selected=Lanning Square' },
            { type: 'metric', name: 'Diabetes Rate', url: '/rankings?metric=diabetes' },
            { type: 'metric', name: 'Obesity Rate', url: '/rankings?metric=obesity' },
            { type: 'metric', name: 'Income', url: '/rankings?metric=income' },
            { type: 'metric', name: 'Poverty Rate', url: '/rankings?metric=poverty_rate' },
            { type: 'metric', name: 'Education Level', url: '/rankings?metric=education' },
            { type: 'page', name: 'Dashboard', url: '/dashboard' },
            { type: 'page', name: 'Insights', url: '/insights' },
            { type: 'page', name: 'Policy', url: '/policy' },
            { type: 'page', name: 'Resources', url: '/resources' }
        ];
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, searchData, searchResults);
            }, 300);
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
        
        // Keyboard navigation for search results
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSearchResults(e.key, searchResults);
            } else if (e.key === 'Enter') {
                this.selectSearchResult(searchResults);
            }
        });
    },
    
    // Perform search
    performSearch: function(query, data, resultsContainer) {
        const results = data.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8); // Limit to 8 results
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item text-muted">No results found</div>';
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item" data-url="${result.url}" tabindex="0">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-${this.getSearchIcon(result.type)} me-2 text-muted"></i>
                        <div>
                            <div class="fw-medium">${result.name}</div>
                            <small class="text-muted">${this.getSearchTypeLabel(result.type)}</small>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        resultsContainer.style.display = 'block';
        
        // Add click handlers
        resultsContainer.querySelectorAll('.search-result-item[data-url]').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    },
    
    // Get icon for search result type
    getSearchIcon: function(type) {
        const icons = {
            'neighborhood': 'map-marker-alt',
            'metric': 'chart-bar',
            'page': 'file-alt'
        };
        return icons[type] || 'search';
    },
    
    // Get label for search result type
    getSearchTypeLabel: function(type) {
        const labels = {
            'neighborhood': 'Neighborhood',
            'metric': 'Health Metric',
            'page': 'Page'
        };
        return labels[type] || type;
    },
    
    // Theme system
    initializeThemeSystem: function() {
        this.createThemeToggle();
        this.applyTheme(this.config.theme);
    },
    
    // Create theme toggle
    createThemeToggle: function() {
        const navbar = document.querySelector('.navbar-nav');
        if (!navbar) return;
        
        const themeItem = document.createElement('li');
        themeItem.className = 'nav-item';
        themeItem.innerHTML = `
            <button class="nav-link btn theme-toggle" onclick="CHEDVI.toggleTheme()" aria-label="Toggle theme">
                <i class="fas fa-moon" id="theme-icon"></i>
            </button>
        `;
        navbar.appendChild(themeItem);
    },
    
    // Toggle theme
    toggleTheme: function() {
        this.config.theme = this.config.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.config.theme);
        this.saveUserPreferences();
    },
    
    // Apply theme
    applyTheme: function(theme) {
        document.documentElement.classList.toggle('dark-mode', theme === 'dark');
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('chedvi-theme', theme);
    },
    

    

    

    
    // Comparison tools
    initializeComparisonTools: function() {
        if (window.location.pathname === '/neighborhoods' || window.location.pathname === '/rankings') {
            this.addComparisonWidget();
        }
    },
    
    // Add comparison widget
    addComparisonWidget: function() {
        const mainContent = document.querySelector('.container');
        if (!mainContent) return;
        
        const comparisonWidget = document.createElement('div');
        comparisonWidget.className = 'comparison-widget fade-in';
        comparisonWidget.innerHTML = `
            <h6 class="mb-3">
                <i class="fas fa-balance-scale me-2"></i>Compare Neighborhoods
            </h6>
            <div class="comparison-selector">
                <select class="form-select" id="compare-neighborhood-1">
                    <option value="">Select first neighborhood</option>
                </select>
                <span class="text-muted">vs</span>
                <select class="form-select" id="compare-neighborhood-2">
                    <option value="">Select second neighborhood</option>
                </select>
                <button class="btn btn-primary" onclick="CHEDVI.compareNeighborhoods()">
                    Compare
                </button>
            </div>
        `;
        
        const firstSection = mainContent.querySelector('section');
        if (firstSection) {
            firstSection.after(comparisonWidget);
        }
        
        // Comparison selectors - placeholder for future implementation
    },
    
    // Quick actions

    

    
    // Guided tour
    initializeGuidedTour: function() {
        if (!localStorage.getItem('chedvi-tour-completed')) {
            this.offerGuidedTour();
        }
    },


    // WELCOME MODAL LOGIC (Debug Version - Always Shows)
    initializeWelcomeModal: function() {
        console.log("Attempting to show Welcome Modal..."); // Debug Log 1

        const welcomeModalElement = document.getElementById('welcomeModal');
        
        if (welcomeModalElement) {
            console.log("Modal Element FOUND."); // Debug Log 2
            
            // Logic check REMOVED for testing. It will now show every single time.
            const welcomeModal = new bootstrap.Modal(welcomeModalElement);
            welcomeModal.show();
            
        } else {
            console.error("Modal Element NOT FOUND. Check index.html"); // Error Log
        }
    },

    // REVOLUTIONARY LAUNCH SEQUENCE
    launchExperience: function() {
        // 1. Close the modal
        const modalEl = document.getElementById('welcomeModal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        // 2. Fire Confetti Cannon (The "Revolutionary" Part)
        const duration = 2000; // 2 seconds
        const end = Date.now() + duration;

        (function frame() {
            // Launch confetti from left and right edges
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#2c3e50', '#27ae60', '#f39c12'] // Theme colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#2c3e50', '#27ae60', '#f39c12']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // 3. Redirect to Dashboard after 1 second (while confetti is falling)
        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1200);
    },

    
    // Offer guided tour
    offerGuidedTour: function() {
        if (window.location.pathname === '/') {
            setTimeout(() => {
                const tourPrompt = document.createElement('div');
                tourPrompt.className = 'position-fixed bottom-0 end-0 m-4 p-3 bg-primary text-white rounded shadow';
                tourPrompt.style.cssText = 'z-index: 1060; max-width: 300px;';
                tourPrompt.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <h6 class="mb-0">Welcome to CHEDVI!</h6>
                        <button class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
                    </div>
                    <p class="small mb-3">Take a quick tour to learn about our features?</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-light btn-sm" onclick="CHEDVI.startGuidedTour()">
                            Start Tour
                        </button>
                        <button class="btn btn-outline-light btn-sm" onclick="CHEDVI.dismissTour()">
                            Maybe Later
                        </button>
                    </div>
                `;
                document.body.appendChild(tourPrompt);
            }, 2000);
        }
    },
    
    // Start guided tour
    startGuidedTour: function() {
        localStorage.setItem('chedvi-tour-completed', 'true');
        this.announceToScreenReader('Starting guided tour');
        // Implementation for guided tour steps
        this.showTourStep(1);
    },
    
    // Show tour step
    showTourStep: function(step) {
        const tourSteps = {
            1: { element: '.navbar', message: 'This is the main navigation. Use it to explore different sections.' },
            2: { element: '.hero-section', message: 'The homepage shows an overview of Camden health equity data.' },
            3: { element: '.search-widget', message: 'Use the search to quickly find neighborhoods or metrics.' }
        };
        
        const currentStep = tourSteps[step];
        if (currentStep) {
            this.showTourTooltip(currentStep.element, currentStep.message, step);
        }
    },

    // Show tour tooltip
    showTourTooltip: function(selector, message, step) {
        // Remove any existing tooltips
        const existingTooltip = document.querySelector('.tour-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const element = document.querySelector(selector);
        if (!element) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip position-absolute bg-dark text-white p-3 rounded shadow';
        tooltip.style.cssText = 'z-index: 1070; max-width: 250px;';
        tooltip.innerHTML = `
            <div class="mb-2">${message}</div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-outline-light btn-sm" onclick="CHEDVI.dismissTour()">Skip</button>
                <button class="btn btn-light btn-sm" onclick="CHEDVI.nextTourStep(${step})">Next</button>
            </div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
    },

    // Next tour step
    nextTourStep: function(currentStep) {
        const nextStep = currentStep + 1;
        if (nextStep <= 3) {
            this.showTourStep(nextStep);
        } else {
            this.dismissTour();
        }
    },

    // Dismiss tour
    dismissTour: function() {
        const tourPrompt = document.querySelector('.position-fixed');
        if (tourPrompt && tourPrompt.innerHTML.includes('Welcome to CHEDVI!')) {
            tourPrompt.remove();
        }
        
        const tourTooltip = document.querySelector('.tour-tooltip');
        if (tourTooltip) {
            tourTooltip.remove();
        }
        
        localStorage.setItem('chedvi-tour-completed', 'true');
    },
    
    // Loading states
    addLoadingStates: function() {
        // Form enhancement - placeholder for future implementation
        // Skeleton loaders - placeholder for future implementation
    },
    
    // Show loading state
    showLoadingState: function(message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.id = 'global-loading';
        loader.innerHTML = `
            <div class="text-center">
                <div class="loading-spinner mb-2"></div>
                <div>${message}</div>
            </div>
        `;
        document.body.appendChild(loader);
    },
    
    // Hide loading state
    hideLoadingState: function() {
        // Remove global loading overlay
        const loader = document.getElementById('global-loading');
        if (loader) {
            loader.remove();
        }
        
        // Remove any orphaned loading elements
        const orphanedLoaders = document.querySelectorAll('.loading-overlay, .loading-spinner');
        orphanedLoaders.forEach(element => {
            if (element.parentElement) {
                element.remove();
            }
        });
        
        // Clear any loading classes from body
        document.body.classList.remove('loading');
    },
    
    // Enhanced animations
    initializeAnimations: function() {
        if (!this.config.animations) return;
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.card, .stat-card, .metric-card').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Form validation
    initializeFormValidation: function() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add real-time validation
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
            
            // Add form submission handling
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });
    },
    
    // Validate individual field
    validateField: function(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous validation
        field.classList.remove('is-invalid', 'is-valid');
        const existingFeedback = field.parentElement.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }
        
        // ZIP code validation
        if (fieldName === 'zip_code' && value) {
            const zipRegex = /^\d{5}(-\d{4})?$/;
            if (!zipRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).';
            }
        }
        
        // Apply validation result
        if (isValid && value) {
            field.classList.add('is-valid');
        } else if (!isValid) {
            field.classList.add('is-invalid');
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = errorMessage;
            field.parentElement.appendChild(feedback);
        }
        
        return isValid;
    },
    
    // Clear field error
    clearFieldError: function(field) {
        if (field.classList.contains('is-invalid')) {
            field.classList.remove('is-invalid');
            const feedback = field.parentElement.querySelector('.invalid-feedback');
            if (feedback) {
                feedback.remove();
            }
        }
    },
    
    // Get field label
    getFieldLabel: function(field) {
        const label = field.parentElement.querySelector('label');
        if (label) {
            return label.textContent.replace('*', '').trim();
        }
        return field.name.charAt(0).toUpperCase() + field.name.slice(1).replace('_', ' ');
    },
    
    // Handle form submission
    handleFormSubmit: function(e) {
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            e.preventDefault();
            this.announceToScreenReader('Please correct the form errors and try again.');
            return;
        }
        
        // Add loading state
        form.classList.add('form-submitting');
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
        }
        
        // Set timeout to prevent infinite loading
        setTimeout(() => {
            form.classList.remove('form-submitting');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.setAttribute('aria-busy', 'false');
            }
        }, 30000); // 30 second timeout
    },
    
    // Screen reader announcements
    announceToScreenReader: function(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    },
    
    // Enhanced tooltips
    initializeEnhancedTooltips: function() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Custom tooltips for data elements
        this.addDataTooltips();
    },
    
    // Add data tooltips
    addDataTooltips: function() {
        const dataElements = document.querySelectorAll('[data-metric]');
        dataElements.forEach(element => {
            element.classList.add('tooltip-enhanced');
            if (!element.querySelector('.tooltip-content')) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-content';
                tooltip.textContent = this.getMetricDescription(element.dataset.metric);
                element.appendChild(tooltip);
            }
        });
    },
    
    // Get metric description
    getMetricDescription: function(metric) {
        const descriptions = {
            'diabetes': 'Percentage of adults diagnosed with diabetes',
            'obesity': 'Percentage of adults with BMI ≥30',
            'income': 'Median household income in dollars',
            'poverty': 'Percentage of population below poverty line',
            'education': 'Percentage with high school education or higher'
        };
        return descriptions[metric] || 'Health equity metric';
    },
    
    // Save user preferences
    saveUserPreferences: function() {
        const preferences = {
            textSize: this.config.textSize,
            theme: this.config.theme,
            animations: this.config.animations,
            highContrast: this.config.highContrast
        };
        localStorage.setItem('chedvi-preferences', JSON.stringify(preferences));
    },
    
    // Load user preferences
    loadUserPreferences: function() {
        const saved = localStorage.getItem('chedvi-preferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            this.config = { ...this.config, ...preferences };
            
            // Apply loaded preferences
            this.setTextSize(this.config.textSize);
            this.applyTheme(this.config.theme);
            this.toggleHighContrast(this.config.highContrast);
            this.toggleReducedMotion(!this.config.animations);
        }
    },
    
    // Show loading state
    showLoading: function(message = 'Loading...') {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'global-loading';
        loadingDiv.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
        loadingDiv.style.cssText = 'background: rgba(255,255,255,0.9); z-index: 9999;';
        loadingDiv.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary mb-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="fw-bold text-primary">${message}</div>
            </div>
        `;
        document.body.appendChild(loadingDiv);
    },
    
    // Hide loading state
    hideLoading: function() {
        const loadingDiv = document.getElementById('global-loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }
    },
    
    // Show loading state for specific element
    showLoadingState: function(message = 'Loading...') {
        this.showLoading(message);
    },
    
    // Initialize accessibility features
    initializeScreenReaderSupport: function() {
        // Add screen reader announcements for page changes
        const pageTitle = document.title;
        this.announceToScreenReader(`Page loaded: ${pageTitle}`);
    },
    
    // Initialize focus management
    initializeFocusManagement: function() {
        // Focus on first interactive element after page load
        const firstInteractive = document.querySelector('input, button, select, textarea, a[href]');
        if (firstInteractive) {
            firstInteractive.focus();
        }
    },
    
    // Initialize text size controls
    initializeTextSizeControls: function() {
        // Text size controls are disabled for uniform design
        this.config.textSize = 'medium';
    },
    
    // Initialize high contrast mode
    initializeHighContrastMode: function() {
        if (this.config.highContrast) {
            document.documentElement.classList.add('high-contrast');
        }
    },
    
    // Initialize enhanced navigation
    initializeEnhancedNavigation: function() {
        // Add navigation enhancements
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.announceToScreenReader(`Navigating to ${link.textContent.trim()}`);
            });
        });
    },
    
    // Initialize global search
    initializeGlobalSearch: function() {
        const searchInput = document.getElementById('globalSearch');
        if (searchInput && this.config.searchEnabled) {
            // Add search functionality
            searchInput.addEventListener('input', (e) => {
                this.performGlobalSearch(e.target.value);
            });
            
            // Add search form submit handler
            const searchForm = searchInput.closest('form');
            if (searchForm) {
                searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.performGlobalSearch(searchInput.value);
                });
            }
        }
    },
    
    // Perform global search
    performGlobalSearch: function(query) {
        if (!query || query.length < 2) {
            this.hideSearchResults();
            return;
        }
        
        const results = this.searchContent(query);
        this.displaySearchResults(results);
    },
    
    // Search content across the site
    searchContent: function(query) {
        const results = [];
        query = query.toLowerCase();
        
        // Search neighborhoods
        const neighborhoods = [
            'Gateway', 'Bergen Square', 'Cooper Poynt', 'Pyne Point', 'Fairview',
            'Centerville', 'Parkside', 'Cramer Hill', 'North Camden', 'Waterfront',
            'Whitman Park', 'Stockton', 'Dudley', 'Marlton', 'Haddon Ave',
            'Haddon Ave 2', 'Dudley 2', 'Stockton 2', 'Whitman Park 2'
        ];
        
        neighborhoods.forEach(neighborhood => {
            if (neighborhood.toLowerCase().includes(query)) {
                results.push({
                    type: 'neighborhood',
                    title: neighborhood,
                    description: 'Camden neighborhood',
                    url: '/neighborhoods'
                });
            }
        });
        
        // Search health metrics
        const metrics = [
            { name: 'Diabetes', page: 'dashboard' },
            { name: 'Obesity', page: 'dashboard' },
            { name: 'Asthma', page: 'dashboard' },
            { name: 'Mental Health', page: 'insights' },
            { name: 'Income', page: 'rankings' },
            { name: 'Education', page: 'rankings' },
            { name: 'Healthcare Access', page: 'resources' }
        ];
        
        metrics.forEach(metric => {
            if (metric.name.toLowerCase().includes(query)) {
                results.push({
                    type: 'metric',
                    title: metric.name,
                    description: 'Health equity metric',
                    url: `/${metric.page}`
                });
            }
        });
        
        // Search pages
        const pages = [
            { name: 'Dashboard', url: '/dashboard', desc: 'Interactive health data visualization' },
            { name: 'Rankings', url: '/rankings', desc: 'Neighborhood health rankings' },
            { name: 'Insights', url: '/insights', desc: 'Health equity analysis' },
            { name: 'Resources', url: '/resources', desc: 'Community resources' },
            { name: 'Policy', url: '/policy', desc: 'Policy recommendations' }
        ];
        
        pages.forEach(page => {
            if (page.name.toLowerCase().includes(query) || page.desc.toLowerCase().includes(query)) {
                results.push({
                    type: 'page',
                    title: page.name,
                    description: page.desc,
                    url: page.url
                });
            }
        });
        
        return results.slice(0, 10); // Limit to 10 results
    },
    
    // Display search results
    displaySearchResults: function(results) {
        let searchResults = document.getElementById('searchResults');
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.id = 'searchResults';
            searchResults.className = 'search-results dropdown-menu show';
            searchResults.style.cssText = 'position: absolute; top: 100%; left: 0; right: 0; z-index: 1000; max-height: 400px; overflow-y: auto;';
            
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.parentElement.style.position = 'relative';
                searchInput.parentElement.appendChild(searchResults);
            }
        }
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="dropdown-item-text text-muted">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <a href="${result.url}" class="dropdown-item">
                    <div class="d-flex">
                        <div class="me-3">
                            <i class="fas fa-${this.getSearchIcon(result.type)}"></i>
                        </div>
                        <div>
                            <div class="fw-bold">${result.title}</div>
                            <div class="text-muted small">${result.description}</div>
                        </div>
                    </div>
                </a>
            `).join('');
        }
    },
    
    // Get search icon based on type
    getSearchIcon: function(type) {
        const icons = {
            neighborhood: 'map-marker-alt',
            metric: 'chart-line',
            page: 'file-alt'
        };
        return icons[type] || 'search';
    },
    
    // Hide search results
    hideSearchResults: function() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.remove();
        }
    },
    
    // Initialize theme system
    initializeThemeSystem: function() {
        // Apply saved theme
        this.applyTheme(this.config.theme);
    },
    
    // Initialize comparison tools
    initializeComparisonTools: function() {
        this.comparisonData = [];
        
        const addBtn = document.getElementById('addToComparison');
        const viewBtn = document.getElementById('viewComparison');
        const clearBtn = document.getElementById('clearComparison');
        
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addToComparison());
        }
        
        if (viewBtn) {
            viewBtn.addEventListener('click', () => this.showComparisonModal());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearComparison());
        }
    },
    
    // Add item to comparison
    addToComparison: function() {
        // Get current selected neighborhood and metric
        const selectedNeighborhood = this.getSelectedNeighborhood();
        const selectedMetric = this.getSelectedMetric();
        
        if (selectedNeighborhood && selectedMetric) {
            const item = {
                neighborhood: selectedNeighborhood,
                metric: selectedMetric,
                timestamp: new Date().toISOString()
            };
            
            // Avoid duplicates
            const exists = this.comparisonData.some(existing => 
                existing.neighborhood === item.neighborhood && existing.metric === item.metric
            );
            
            if (!exists) {
                this.comparisonData.push(item);
                this.updateComparisonUI();
                this.announceToScreenReader(`Added ${selectedNeighborhood} ${selectedMetric} to comparison`);
            }
        }
    },
    
    // Show comparison modal
    showComparisonModal: function() {
        if (this.comparisonData.length === 0) {
            alert('Please add items to comparison first');
            return;
        }
        
        const modal = this.createComparisonModal();
        document.body.appendChild(modal);
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Clean up modal when closed
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },
    
    // Create comparison modal
    createComparisonModal: function() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Neighborhood Comparison</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="comparison-table-container">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Neighborhood</th>
                                        <th>Metric</th>
                                        <th>Value</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.comparisonData.map((item, index) => `
                                        <tr>
                                            <td>${item.neighborhood}</td>
                                            <td>${item.metric}</td>
                                            <td>${this.getMetricValue(item.neighborhood, item.metric)}</td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-danger" 
                                                        onclick="CHEDVI.removeFromComparison(${index})">
                                                    <i class="fas fa-times"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="CHEDVI.exportComparison()">
                            <i class="fas fa-download me-1"></i>Export Comparison
                        </button>
                    </div>
                </div>
            </div>
        `;
        return modal;
    },
    
    // Clear comparison
    clearComparison: function() {
        this.comparisonData = [];
        this.updateComparisonUI();
        this.announceToScreenReader('Comparison cleared');
    },
    
    // Update comparison UI
    updateComparisonUI: function() {
        const countElement = document.getElementById('comparisonCount');
        const viewBtn = document.getElementById('viewComparison');
        const addBtn = document.getElementById('addToComparison');
        
        if (countElement) {
            countElement.textContent = this.comparisonData.length;
        }
        
        if (viewBtn) {
            viewBtn.disabled = this.comparisonData.length === 0;
        }
        
        if (addBtn) {
            addBtn.disabled = false; // Enable when we have selection logic
        }
    },
    
    // Get selected neighborhood (placeholder)
    getSelectedNeighborhood: function() {
        return 'Gateway'; // Placeholder - would get from UI selection
    },
    
    // Get selected metric (placeholder)
    getSelectedMetric: function() {
        const selector = document.getElementById('leftMapSelector');
        return selector ? selector.options[selector.selectedIndex].text : 'Diabetes Rate';
    },
    
    // Get metric value for neighborhood
    getMetricValue: function(neighborhood, metric) {
        // This would fetch from the actual data source
        const mockValues = {
            'Gateway': { 'Diabetes Rate (%)': '17.0%', 'Obesity Rate (%)': '43.9%' },
            'Bergen Square': { 'Diabetes Rate (%)': '15.7%', 'Obesity Rate (%)': '47.6%' }
        };
        return mockValues[neighborhood]?.[metric] || 'N/A';
    },
    
    // Initialize breadcrumbs
    initializeBreadcrumbs: function() {
        this.createBreadcrumbs();
        this.updateBreadcrumbsBasedOnLocation();
    },
    
    // Create breadcrumbs
    createBreadcrumbs: function() {
        const breadcrumbContainer = document.createElement('nav');
        breadcrumbContainer.setAttribute('aria-label', 'breadcrumb');
        breadcrumbContainer.innerHTML = `
            <ol class="breadcrumb" id="dynamicBreadcrumbs">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
            </ol>
        `;
        
        // Insert breadcrumbs after navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.insertAdjacentElement('afterend', breadcrumbContainer);
        }
    },
    
    // Update breadcrumbs based on current location
    updateBreadcrumbsBasedOnLocation: function() {
        const breadcrumbs = document.getElementById('dynamicBreadcrumbs');
        if (!breadcrumbs) return;
        
        const path = window.location.pathname;
        const breadcrumbMap = {
            '/dashboard': 'Dashboard',
            '/neighborhoods': 'Neighborhoods',
            '/rankings': 'Rankings',
            '/insights': 'Insights',
            '/policy': 'Policy',
            '/resources': 'Resources',
            '/about': 'About'
        };
        
        // Clear existing breadcrumbs except home
        const homeItem = breadcrumbs.querySelector('li');
        breadcrumbs.innerHTML = '';
        breadcrumbs.appendChild(homeItem);
        
        // Add current page
        if (breadcrumbMap[path]) {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item active';
            li.setAttribute('aria-current', 'page');
            li.textContent = breadcrumbMap[path];
            breadcrumbs.appendChild(li);
        }
    },
    
    // User onboarding tour
    initializeUserOnboarding: function() {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('chedvi_tour_completed');
        
        if (!hasSeenTour && window.location.pathname === '/dashboard') {
            setTimeout(() => {
                this.showOnboardingTour();
            }, 2000);
        }
        
        // Add tour functionality
        window.startTour = () => this.startGuidedTour();
    },
    
    // Show onboarding tour
    showOnboardingTour: function() {
        const tourElement = document.getElementById('onboardingTour');
        if (tourElement) {
            tourElement.style.display = 'block';
        }
    },
    
    // Start guided tour
    startGuidedTour: function() {
        const tourSteps = [
            {
                element: '#leftMapSelector',
                title: 'Select Health Metrics',
                description: 'Choose different health outcomes to visualize on the map'
            },
            {
                element: '#rightMapSelector',
                title: 'Compare Social Determinants',
                description: 'Select social factors to compare against health outcomes'
            },
            {
                element: '#overlayToggle',
                title: 'Overlay Analysis',
                description: 'Enable overlay mode to see correlations between metrics'
            },
            {
                element: '#exportDropdown',
                title: 'Export Data',
                description: 'Download your analysis as CSV, PDF, or image'
            }
        ];
        
        this.currentTourStep = 0;
        this.showTourStep(tourSteps[this.currentTourStep]);
    },
    
    // Show tour step
    showTourStep: function(step) {
        const element = document.querySelector(step.element);
        if (!element) return;
        
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.tour-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h6>${step.title}</h6>
                <p>${step.description}</p>
                <div class="tooltip-actions">
                    <button class="btn btn-sm btn-outline-secondary" onclick="CHEDVI.skipTour()">Skip</button>
                    <button class="btn btn-sm btn-primary" onclick="CHEDVI.nextTourStep()">Next</button>
                </div>
            </div>
        `;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 10}px;
            left: ${rect.left}px;
            z-index: 9999;
            background: white;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 300px;
        `;
        
        document.body.appendChild(tooltip);
        
        // Highlight element
        element.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.5)';
        element.style.borderRadius = '0.25rem';
    },
    
    // Next tour step
    nextTourStep: function() {
        // Implementation for next step
        this.skipTour(); // For now, just skip
    },
    
    // Skip tour
    skipTour: function() {
        const tooltip = document.querySelector('.tour-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
        
        // Remove highlights
        document.querySelectorAll('[style*="box-shadow"]').forEach(el => {
            el.style.boxShadow = '';
        });
        
        // Mark tour as completed
        localStorage.setItem('chedvi_tour_completed', 'true');
        
        // Hide onboarding banner
        const tourElement = document.getElementById('onboardingTour');
        if (tourElement) {
            tourElement.style.display = 'none';
        }
    },
    
    // Apply theme
    applyTheme: function(theme) {
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
        this.config.theme = theme;
    },
    
    // Toggle high contrast
    toggleHighContrast: function(enabled) {
        this.config.highContrast = enabled;
        if (enabled) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    },
    
    // Toggle reduced motion
    toggleReducedMotion: function(enabled) {
        this.config.animations = !enabled;
        document.documentElement.classList.toggle('reduced-motion', enabled);
    },
    
    // Set text size
    setTextSize: function(size) {
        // Text size is fixed for uniform design
        this.config.textSize = 'medium';
    },
    
    // Handle arrow key navigation
    handleArrowKeyNavigation: function(e) {
        // Arrow key navigation for tables and lists
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === 'TR' || focusedElement.tagName === 'TD') {
            // Table navigation logic
            const table = focusedElement.closest('table');
            if (table) {
                const rows = table.querySelectorAll('tr');
                const currentIndex = Array.from(rows).indexOf(focusedElement);
                
                if (e.key === 'ArrowUp' && currentIndex > 0) {
                    e.preventDefault();
                    rows[currentIndex - 1].focus();
                } else if (e.key === 'ArrowDown' && currentIndex < rows.length - 1) {
                    e.preventDefault();
                    rows[currentIndex + 1].focus();
                }
            }
        }
    }
};

// Initialize CHEDVI when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    CHEDVI.init();
});

// Export for use in other modules
window.CHEDVI = CHEDVI;