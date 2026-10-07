/* Seungchan Song, portfolio: language toggle, reveal-on-scroll, active nav */
(function () {
  var root = document.documentElement;
  var KEY = 'sc-portfolio-lang';

  function safeGet() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function safeSet(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ } }

  function setLang(lang) {
    if (lang !== 'ko' && lang !== 'en') lang = 'ko';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
    document.querySelectorAll('[data-pdf]').forEach(function (a) {
      a.setAttribute('href', 'downloads/SeungchanSong_Portfolio_' + (lang === 'en' ? 'EN' : 'KO') + '.pdf');
    });
    document.title = lang === 'en'
      ? 'Seungchan Song · Information Security Portfolio'
      : '송승찬 · 정보보호 포트폴리오';
  }

  var q = new URLSearchParams(location.search).get('lang');
  setLang(q || safeGet() || 'ko');

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (!b) return;
    var lang = b.getAttribute('data-set-lang');
    setLang(lang);
    safeSet(lang);
  });

  /* reveal on scroll */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* active nav link */
  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('is-active', k === en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }
})();
