
(() => {
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
  }
  document.querySelectorAll('.nav-toggle').forEach(button => {
    button.addEventListener('click', () => {
      // Desktop navigation is hover-driven. On touch screens, tap to expand.
      if (window.matchMedia('(min-width: 981px)').matches) return;
      const group = button.closest('.nav-group');
      const willOpen = !group.classList.contains('open');

      // Keep only one mobile dropdown open at a time.
      document.querySelectorAll('.nav-group.open').forEach(openGroup => {
        openGroup.classList.remove('open');
        const openButton = openGroup.querySelector('.nav-toggle');
        if (openButton) openButton.setAttribute('aria-expanded', 'false');
      });

      group.classList.toggle('open', willOpen);
      button.setAttribute('aria-expanded', String(willOpen));
    });
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get('subject'));
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\n\n${data.get('message')}`
      );
      const status = document.getElementById('form-status');
      status.textContent = 'Dein E-Mail-Programm sollte sich jetzt öffnen. Bitte prüfe die Nachricht und sende sie dort ab.';
      window.location.href = `mailto:info@aero-club-berlin.de?subject=${subject}&body=${body}`;
    });
  }
})();
