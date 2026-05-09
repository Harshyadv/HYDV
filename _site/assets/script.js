document.addEventListener("DOMContentLoaded", () => {
  // Theme Management
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.textContent = '🌓';
  document.body.appendChild(themeToggle);

  // Time-aware theme detection
  function getTimeBasedTheme() {
    const hour = new Date().getHours();
    return (hour >= 5 && hour < 18) ? 'light' : 'dark';
  }

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const timeTheme = getTimeBasedTheme();
    
    // Priority: saved > system preference > time-based
    const theme = savedTheme || systemTheme || timeTheme;
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
  }

  // Update theme button text
  function updateThemeButton(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('data-tooltip', theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme');
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  }

  themeToggle.addEventListener('click', toggleTheme);
  initTheme();

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const systemTheme = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', systemTheme);
      updateThemeButton(systemTheme);
    }
  });

  // Code copy functionality (existing)
  document.querySelectorAll("pre").forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";

    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.innerText = "Copy";

    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(button);

    button.addEventListener("click", () => {
      const code = pre.querySelector("code").innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = "Copied!";
        button.classList.add("copied");
        setTimeout(() => {
          button.innerText = "Copy";
          button.classList.remove("copied");
        }, 2000);
      });
    });
  });
});
