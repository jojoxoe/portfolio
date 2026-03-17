// Skills Loader & Display
(async function() {
  async function loadSkills() {
    try {
      const response = await fetch('data/skills.json');
      if (!response.ok) throw new Error('Failed to load skills');
      
      const skillsData = await response.json();
      renderSkills(skillsData);
    } catch (error) {
      console.error('Error loading skills:', error);
      document.getElementById('skillsContainer').innerHTML = 
        '<p class="text-center col-span-full">Error loading skills. Please try again later.</p>';
    }
  }

  function renderSkills(skillsData) {
    const container = document.getElementById('skillsContainer');
    
    container.innerHTML = Object.entries(skillsData).map(([key, category]) => `
      <div class="skill-category">
        <h3 class="skill-category-title">
          <i class="fas fa-${getIconForSkillCategory(key)}"></i> ${category.title}
        </h3>
        <div>
          ${category.skills.map(skill => `
            <div class="skill-item">
              <div class="skill-name">
                <span class="skill-name-text">${skill.name}</span>
                <span class="skill-proficiency">${skill.proficiency}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-bar-fill" style="width: ${skill.proficiency}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Animate skill bars on view
    animateSkillBars();
  }

  function getIconForSkillCategory(category) {
    const icons = {
      'frontend': 'palette',
      'backend': 'server',
      'gamedev': 'gamepad',
      'tools': 'wrench'
    };
    return icons[category] || 'code';
  }

  function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'none';
          // Trigger reflow to restart animation
          void entry.target.offsetWidth;
          entry.target.style.animation = 'fillBar 1s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    bars.forEach(bar => observer.observe(bar));
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSkills);
  } else {
    loadSkills();
  }
})();
