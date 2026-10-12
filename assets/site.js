// Progressive enhancement only: without this file every section is readable and
// every engagement panel is shown. Scroll-scrubbed motion lives in CSS.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Nav gains its shadow once the hero top leaves the viewport (no scroll listener).
  var nav = document.querySelector('.nav');
  var top = document.getElementById('top');
  if (nav && top && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { nav.classList.toggle('stuck', !e[0].isIntersecting); }).observe(top);
  }

  // Reveal on entry.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Manifesto: one span per word, so the CSS timeline can light them in reading order.
  document.querySelectorAll('[data-words]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.style.setProperty('--step', (70 / words.length).toFixed(2) + '%');
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w, i) {
      return '<span class="wd" aria-hidden="true" style="--i:' + i + '">' + w + '</span>';
    }).join(' ');
  });

  // Engagement tabs (WAI-ARIA tabs pattern, arrow keys move between tabs).
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) { panel.classList.remove('enter'); void panel.offsetWidth; panel.classList.add('enter'); }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!n) return;
      e.preventDefault();
      select(tabs[(i + n + tabs.length) % tabs.length], true);
    });
  });
  if (tabs.length) select(tabs[0]);

  // Contact button leans toward the pointer.
  if (finePointer && !still) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.28;
        var y = (e.clientY - r.top - r.height / 2) * 0.38;
        el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
