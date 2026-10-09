const THEME_KEY = 'devboard:theme';

export function initThemeToggle(button) {
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  }

  apply(document.documentElement.dataset.theme || 'light');

  button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked; the theme still changes for this visit.
    }
  });
}
