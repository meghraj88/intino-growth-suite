(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close on link click (mobile)
  menu.addEventListener('click', function (e) {
    const target = e.target;
    if (target && target.tagName === 'A') {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('click', function (e) {
    if (!menu.classList.contains('open')) return;
    const nav = document.querySelector('.site-nav');
    if (nav && !nav.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

