(function () {
  'use strict';

  /* ============ SETTINGS: edit these two lines ============ */
  var FORM_ENDPOINT = '';                               // e.g. your Formspree URL: https://formspree.io/f/xxxxxxx
  var FALLBACK_EMAIL = 'hello@nkddigitalsolutions.com'; // used only if FORM_ENDPOINT is empty
  /* ======================================================== */

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  function setTheme(t) {
    root.dataset.theme = t;
    try { localStorage.setItem('nkd-theme', t); } catch (e) {}
    var m = document.querySelector('meta[name=theme-color]');
    if (m) m.content = t === 'light' ? '#ffffff' : '#07070d';
  }
  function toggleTheme() { setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'); }
  $$('.theme-toggle, .theme-toggle-text').forEach(function (b) { b.addEventListener('click', toggleTheme); });

  /* ---------- Nav border on scroll ---------- */
  var nav = $('#nav');
  function onScroll() { nav.classList.toggle('s', scrollY > 8); }
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile drawer ---------- */
  var burger = $('#burger'), drawer = $('#drawer'), scrim = $('#scrim');
  function drawerSet(open) {
    drawer.classList.toggle('open', open);
    scrim.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', open);
    drawer.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('lock', open);
  }
  burger.addEventListener('click', function () { drawerSet(!drawer.classList.contains('open')); });
  scrim.addEventListener('click', function () { drawerSet(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') drawerSet(false); });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { drawerSet(false); }); });
  matchMedia('(min-width:1001px)').addEventListener('change', function (e) { if (e.matches) drawerSet(false); });

  /* ---------- Audit modal ---------- */
  var dlg = $('#audit'), form = $('#audit-form'), ok = $('#audit-ok');
  function openAudit() {
    drawerSet(false);
    form.hidden = false; ok.hidden = true;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    var f = $('input', form); if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function closeAudit() { dlg.close ? dlg.close() : dlg.removeAttribute('open'); }
  $$('[data-open-audit]').forEach(function (b) { b.addEventListener('click', openAudit); });
  $$('[data-close]', dlg).forEach(function (b) { b.addEventListener('click', closeAudit); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeAudit(); });

  var rules = {
    url: function (v) {
      v = v.trim(); if (!v) return 'Enter your website address.';
      return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v) ? '' : 'Enter a valid address, like yourcompany.com.';
    },
    name: function (v) { return v.trim().length >= 2 ? '' : 'Enter your name.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Enter a valid work email.'; },
    goal: function (v) { return v ? '' : 'Choose your main goal.'; }
  };
  function check(el) {
    var msg = rules[el.name](el.value);
    el.classList.toggle('invalid', !!msg);
    el.setAttribute('aria-invalid', !!msg);
    el.parentNode.querySelector('.err').textContent = msg;
    return !msg;
  }
  $$('input, select', form).forEach(function (el) {
    el.addEventListener('blur', function () { check(el); });
    el.addEventListener('input', function () { if (el.classList.contains('invalid')) check(el); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fields = $$('input, select', form), valid = true, first = null;
    fields.forEach(function (el) { if (!check(el)) { valid = false; first = first || el; } });
    if (!valid) { first.focus(); return; }
    var d = {}; fields.forEach(function (el) { d[el.name] = el.value.trim(); });
    var btn = $('button[type=submit]', form); btn.disabled = true; btn.textContent = 'Sending…';
    function done() {
      $('#ok-name').textContent = d.name; $('#ok-url').textContent = d.url; $('#ok-email').textContent = d.email;
      form.hidden = true; ok.hidden = false; form.reset();
      btn.disabled = false; btn.textContent = 'Request My Free Video Audit';
    }
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw 0; done(); })
        .catch(function () { btn.disabled = false; btn.textContent = 'Request My Free Video Audit'; $('.err', form.querySelector('select').parentNode).textContent = 'Could not send. Please try again.'; });
    } else {
      var body = 'Website: ' + d.url + '\nName: ' + d.name + '\nEmail: ' + d.email + '\nGoal: ' + d.goal;
      location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent('Free Video Audit request') + '&body=' + encodeURIComponent(body);
      done();
    }
  });

  /* ---------- Language switcher ---------- */
  var lang = $('#lang');
  lang.addEventListener('change', function () {
    if (lang.value === 'en') { if (/translate\.goog|translate\.google/.test(location.host)) location.href = 'https://nkddigitalsolutions.com/'; return; }
    window.open('https://translate.google.com/translate?sl=en&tl=' + lang.value + '&u=' + encodeURIComponent('https://nkddigitalsolutions.com/'), '_blank', 'noopener');
    lang.value = 'en';
  });
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- Reveal + counters ---------- */
  $$('.sec .head, .card, .col, .steps li, .founder > *, .final').forEach(function (el, i) { el.classList.add('rv'); el.style.transitionDelay = ((i % 3) * 80) + 'ms'; });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$('.rv').forEach(function (el) { io.observe(el); });

  function count(el) {
    var n = +el.dataset.n, s = el.dataset.s || '', st = performance.now(), d = 1200;
    if (reduce) { el.textContent = n + s; return; }
    (function f(now) {
      var t = Math.min(1, (now - st) / d);
      el.textContent = Math.round(n * (1 - Math.pow(1 - t, 3))) + (t === 1 ? s : '');
      if (t < 1) requestAnimationFrame(f);
    })(st);
  }
  var cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } });
  }, { threshold: .6 });
  $$('[data-n]').forEach(function (el) { cio.observe(el); });

  /* ---------- Particle orb (hero visual) ---------- */
  var cv = $('#orb'), ctx = cv.getContext('2d'), pts = [], W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 2);
  var N = innerWidth < 600 ? 700 : 1300, rx = 0, ry = 0, mx = 0, my = 0, visible = true;
  for (var i = 0; i < N; i++) {
    var u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    pts.push([r * Math.cos(a), u, r * Math.sin(a), Math.random()]);
  }
  function size() {
    var b = cv.getBoundingClientRect(); W = b.width; H = b.height;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    var light = root.dataset.theme === 'light', R = Math.min(W, H) * .42, cx = W / 2, cy = H / 2;
    var cA = Math.cos(ry), sA = Math.sin(ry), cB = Math.cos(rx), sB = Math.sin(rx);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i], x = p[0] * cA - p[2] * sA, z = p[0] * sA + p[2] * cA, y = p[1] * cB - z * sB; z = p[1] * sB + z * cB;
      var s = 1 / (1.8 - z * .5), al = (z + 1) / 2 * .8 + .15;
      ctx.fillStyle = light ? 'rgba(70,40,150,' + al + ')' : 'rgba(225,215,255,' + al + ')';
      ctx.beginPath(); ctx.arc(cx + x * R * s * 1.5, cy + y * R * s * 1.5, (0.6 + p[3] * 1.1) * s * 1.4, 0, 6.283); ctx.fill();
    }
  }
  function tick() {
    if (visible) { ry += .0026; rx += (my * .5 - rx) * .03; ry += mx * .0006; draw(); }
    requestAnimationFrame(tick);
  }
  size(); addEventListener('resize', size);
  addEventListener('pointermove', function (e) { mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5); }, { passive: true });
  new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(cv);
  if (reduce) { ry = .6; draw(); } else { tick(); }
})();
