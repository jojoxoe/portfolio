// Project Filter & Display Functionality
(async function() {
  let projects = [];
  
  // Load projects from JSON
  async function loadProjects() {
    try {
      const response = await fetch('data/projects.json');
      if (!response.ok) throw new Error('Failed to load projects');
      projects = await response.json();
      renderProjects(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      document.getElementById('projectsGrid').innerHTML = 
        '<p class="text-center col-span-full">Error loading projects. Please try again later.</p>';
    }
  }

  // Render projects grid
  function renderProjects(projectsToRender) {
    const grid = document.getElementById('projectsGrid');
    const noResults = document.getElementById('noResults');

    if (projectsToRender.length === 0) {
      grid.innerHTML = '';
      noResults.classList.remove('hidden');
      return;
    }

    noResults.classList.add('hidden');
    grid.innerHTML = projectsToRender.map(project => `
      <div class="project-card" data-category="${project.category}" data-title="${project.title.toLowerCase()}" data-tech="${project.technologies.join(' ').toLowerCase()}">
        <div class="project-card-header">
          <i class="fas fa-${getIconForCategory(project.category)}"></i>
        </div>
        <div class="project-card-body">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-description">${project.description}</p>
          <div class="project-card-tech">
            ${project.technologies.map(tech => 
              `<span class="tech-badge">${tech}</span>`
            ).join('')}
          </div>
          <div class="project-card-links">
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link github">
              <i class="fab fa-github mr-1"></i> GitHub
            </a>
            ${project.live !== '#' ? 
              `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link live">
                <i class="fas fa-external-link-alt mr-1"></i> Live
              </a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Get icon based on category
  function getIconForCategory(category) {
    const icons = {
      'Business Systems': 'briefcase',
      'Web Application': 'globe',
      'Game Development': 'gamepad',
      'University Project': 'graduation-cap'
    };
    return icons[category] || 'code';
  }

  // Filter projects
  function filterProjects() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
    
    const filterCategory = activeFilter.textContent.trim();

    const filtered = projects.filter(project => {
      const matchesCategory = filterCategory === 'All Projects' || project.category === filterCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm));
      
      return matchesCategory && matchesSearch;
    });

    renderProjects(filtered);
  }

  // Set up filter buttons
  function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterProjects();
      });
    });
  }

  // Set up search
  function setupSearch() {
    const searchInput = document.getElementById('projectSearch');
    searchInput.addEventListener('input', filterProjects);
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = mobileMenu.querySelectorAll('a');

    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Smooth scroll for nav links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    setupFilterButtons();
    setupSearch();
    setupMobileMenu();
    setupSmoothScroll();
  });

  // If DOM already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadProjects();
      setupFilterButtons();
      setupSearch();
      setupMobileMenu();
      setupSmoothScroll();
    });
  } else {
    loadProjects();
    setupFilterButtons();
    setupSearch();
    setupMobileMenu();
    setupSmoothScroll();
  }
})();
