// Header border once the page scrolls, and a soft reveal for sections.
// Everything is visible without JS: the .js class only exists once this runs.
(function () {
  document.documentElement.classList.add('js');
  var head = document.querySelector('.site-head');
  function onScroll() { if (head) head.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
  // Safety net: if the observer never fires (some embedded or headless views), show everything anyway.
  setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 2500);

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
