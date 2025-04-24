const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


if (prefersDarkMode) {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.add('light-mode');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (e.matches) {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }
});