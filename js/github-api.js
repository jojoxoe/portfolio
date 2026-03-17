// GitHub API Integration
(async function() {
  const GITHUB_USERNAME = 'lloyd-pili'; // Update with your GitHub username
  const API_BASE = 'https://api.github.com';

  // Mock data fallback for development/when API fails
  const MOCK_DATA = {
    stats: {
      public_repos: 12,
      followers: 45,
      following: 23
    },
    repos: [
      {
        name: 'ecommerce-platform',
        description: 'Full-stack e-commerce system with Laravel and Vue.js',
        language: 'PHP',
        stargazers_count: 15,
        html_url: 'https://github.com/lloyd-pili/ecommerce-platform'
      },
      {
        name: 'task-management',
        description: 'Collaborative task management app with React and MongoDB',
        language: 'JavaScript',
        stargazers_count: 12,
        html_url: 'https://github.com/lloyd-pili/task-management'
      },
      {
        name: 'inventory-system',
        description: 'Real-time inventory tracking for small businesses',
        language: 'PHP',
        stargazers_count: 8,
        html_url: 'https://github.com/lloyd-pili/inventory-system'
      },
      {
        name: 'snake-game',
        description: 'Classic snake game built with Pygame',
        language: 'Python',
        stargazers_count: 5,
        html_url: 'https://github.com/lloyd-pili/snake-game'
      },
      {
        name: 'blog-platform',
        description: 'Dynamic blog with markdown support and comments',
        language: 'JavaScript',
        stargazers_count: 10,
        html_url: 'https://github.com/lloyd-pili/blog-platform'
      },
      {
        name: 'weather-dashboard',
        description: 'Real-time weather app with OpenWeather API integration',
        language: 'JavaScript',
        stargazers_count: 7,
        html_url: 'https://github.com/lloyd-pili/weather-dashboard'
      }
    ]
  };

  // Fetch user stats
  async function fetchUserStats() {
    try {
      const response = await fetch(`${API_BASE}/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error('Failed to fetch user stats');
      
      const data = await response.json();
      updateStats(data);
    } catch (error) {
      console.warn('Error fetching GitHub stats, using mock data:', error);
      updateStats(MOCK_DATA.stats);
    }
  }

  // Update stats display
  function updateStats(stats) {
    document.getElementById('repoCount').textContent = stats.public_repos || MOCK_DATA.stats.public_repos;
    document.getElementById('followerCount').textContent = stats.followers || MOCK_DATA.stats.followers;
    document.getElementById('followingCount').textContent = stats.following || MOCK_DATA.stats.following;
  }

  // Fetch repositories
  async function fetchRepositories() {
    try {
      const response = await fetch(
        `${API_BASE}/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=6`
      );
      if (!response.ok) throw new Error('Failed to fetch repositories');
      
      const repos = await response.json();
      renderRepositories(repos);
    } catch (error) {
      console.warn('Error fetching repositories, using mock data:', error);
      renderRepositories(MOCK_DATA.repos);
    }
  }

  // Render repositories
  function renderRepositories(repos) {
    const container = document.getElementById('reposContainer');
    
    if (!repos || repos.length === 0) {
      container.innerHTML = '<p class="text-center col-span-full">No repositories found.</p>';
      return;
    }

    container.innerHTML = repos.slice(0, 6).map(repo => `
      <div class="repo-card">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">
          <i class="fas fa-code-branch mr-2"></i>${repo.name}
        </a>
        <p class="repo-description">${repo.description || 'No description available'}</p>
        <div class="repo-meta">
          ${repo.language ? `
            <span class="repo-meta-item">
              <i class="fas fa-code"></i> ${repo.language}
            </span>
          ` : ''}
          <span class="repo-meta-item">
            <i class="fas fa-star"></i> ${repo.stargazers_count}
          </span>
        </div>
      </div>
    `).join('');
  }

  // Initialize
  function init() {
    fetchUserStats();
    fetchRepositories();
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
