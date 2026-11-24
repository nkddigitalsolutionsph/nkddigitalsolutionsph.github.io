(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav border appears after scrolling
  var nav = document.getElementById('nav');
  function onScroll(){ nav.classList.toggle('s', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Hero word rotator
  var words = document.querySelectorAll('.rot b');
  if (words.length && !reduce) {
    var i = 0;
    setInterval(function(){
      var cur = words[i];
      cur.classList.remove('on'); cur.classList.add('out');
      i = (i + 1) % words.length;
      var nxt = words[i];
      nxt.classList.remove('out'); nxt.style.transition = 'none';
      nxt.style.transform = 'translateY(60%)';
      void nxt.offsetWidth;
      nxt.style.transition = ''; nxt.style.transform = '';
      nxt.classList.add('on');
      setTimeout(function(){ cur.classList.remove('out'); }, 700);
    }, 3200);
  }

  // Count-up stats
  function count(el){
    var n = +el.dataset.n, s = el.dataset.s || '', t = 0, d = 1100, st = performance.now();
    if (reduce) { el.textContent = n + s; return; }
    (function f(now){
      t = Math.min(1, (now - st) / d);
      el.textContent = Math.round(n * (1 - Math.pow(1 - t, 3))) + (t === 1 ? s : '');
      if (t < 1) requestAnimationFrame(f);
    })(st);
  }

  // Reveal on scroll + flow line draw + counters
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.classList.add('in'); io.unobserve(e.target);
    });
  }, {threshold: .15});
  document.querySelectorAll('.rv, .flow').forEach(function(el, k){
    el.style.transitionDelay = el.classList.contains('rv') ? ((k % 4) * 70) + 'ms' : '';
    io.observe(el);
  });

  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); }
    });
  }, {threshold: .6});
  document.querySelectorAll('[data-n]').forEach(function(el){ cio.observe(el); });
})();
