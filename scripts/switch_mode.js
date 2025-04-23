const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply the correct theme based on system preference
if (prefersDarkMode) {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.add('light-mode');
}

// Listen for changes in the system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }
});