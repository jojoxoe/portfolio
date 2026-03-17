(function() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const THEME_KEY = 'portfolioTheme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    
    if (savedTheme === 'light') {
      html.classList.add('light-mode');
      updateThemeIcon('sun');
    } else {
      html.classList.remove('light-mode');
      updateThemeIcon('moon');
    }
  }

  function updateThemeIcon(icon) {
    themeToggle.innerHTML = icon === 'sun' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }

  function toggleTheme() {
    const isLightMode = html.classList.contains('light-mode');
    
    if (isLightMode) {
      html.classList.remove('light-mode');
      localStorage.setItem(THEME_KEY, 'dark');
      updateThemeIcon('moon');
    } else {
      html.classList.add('light-mode');
      localStorage.setItem(THEME_KEY, 'light');
      updateThemeIcon('sun');
    }
  }

  themeToggle.addEventListener('click', toggleTheme);

  document.addEventListener('DOMContentLoaded', initTheme);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
