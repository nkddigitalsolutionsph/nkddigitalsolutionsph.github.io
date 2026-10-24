/* NKD modern home interactions: theme, responsive feedback, subtle magnetic CTAs, slider pause. */
(function(){
  'use strict';
  var body=document.body;
  if(!body.classList.contains('home-modern')) return;
  var nav=document.getElementById('nv');
  var themeBtn=document.createElement('button');
  themeBtn.type='button'; themeBtn.className='theme-toggle'; themeBtn.setAttribute('aria-label','Switch color theme');
  themeBtn.innerHTML='<span aria-hidden="true">◐</span><span class="theme-label">Dark mode</span>';
  if(nav && nav.parentNode){nav.parentNode.insertBefore(themeBtn,nav.nextSibling);}
  var saved=''; try{saved=localStorage.getItem('nkd-home-theme')||'';}catch(e){}
  if(saved==='dark') body.setAttribute('data-theme','dark');
  function syncTheme(){var dark=body.getAttribute('data-theme')==='dark';themeBtn.innerHTML='<span aria-hidden="true">'+(dark?'☼':'◐')+'</span><span class="theme-label">'+(dark?'Light mode':'Dark mode')+'</span>';themeBtn.setAttribute('aria-pressed',dark?'true':'false');var meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',dark?'#111525':'#f8f5f0');}
  syncTheme(); themeBtn.addEventListener('click',function(){var dark=body.getAttribute('data-theme')==='dark';if(dark)body.removeAttribute('data-theme');else body.setAttribute('data-theme','dark');try{localStorage.setItem('nkd-home-theme',dark?'light':'dark');}catch(e){}syncTheme();themeBtn.animate([{transform:'scale(.94)'},{transform:'scale(1)'}],{duration:180,easing:'ease-out'});});
  // Give every in-page CTA a visible, accessible click response without blocking navigation.
  document.querySelectorAll('.home-modern .btn').forEach(function(btn){btn.classList.add('magnetic-cta');btn.addEventListener('pointerdown',function(){btn.classList.add('is-pressed');});['pointerup','pointercancel','pointerleave'].forEach(function(ev){btn.addEventListener(ev,function(){btn.classList.remove('is-pressed');});});});
  // Subtle cursor attraction on pointer devices only; no movement on touch or reduced motion.
  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine=window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if(fine&&!reduce){document.querySelectorAll('.home-modern .magnetic-cta').forEach(function(btn){btn.addEventListener('pointermove',function(e){var r=btn.getBoundingClientRect(),dx=(e.clientX-r.left-r.width/2)/r.width,dy=(e.clientY-r.top-r.height/2)/r.height;btn.style.transform='translate('+Math.max(-4,Math.min(4,dx*7))+'px,'+Math.max(-4,Math.min(4,dy*6))+'px)';});btn.addEventListener('pointerleave',function(){btn.style.transform='';});});}
  // Pause cascading tracks while hovered or keyboard-focused; reduced motion handled in CSS.
  document.querySelectorAll('.cascade-window').forEach(function(windowEl){windowEl.addEventListener('mouseenter',function(){windowEl.querySelectorAll('.cascade-track').forEach(function(t){t.style.animationPlayState='paused';});});windowEl.addEventListener('mouseleave',function(){windowEl.querySelectorAll('.cascade-track').forEach(function(t){t.style.animationPlayState='';});});windowEl.addEventListener('focusin',function(){windowEl.querySelectorAll('.cascade-track').forEach(function(t){t.style.animationPlayState='paused';});});windowEl.addEventListener('focusout',function(){windowEl.querySelectorAll('.cascade-track').forEach(function(t){t.style.animationPlayState='';});});});
})();
