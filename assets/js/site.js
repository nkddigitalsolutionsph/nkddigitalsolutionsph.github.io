(function(){var d=document,h=d.documentElement,$=function(q,r){return[].slice.call((r||d).querySelectorAll(q))},E="norineseo@nkddigitalsolutions.com",FE="justnorine2024@gmail.com";
window.NKD_FORM_ENDPOINT=window.NKD_FORM_ENDPOINT||"https://formsubmit.co/ajax/"+FE;window.NKD_NEWSLETTER_URL=window.NKD_NEWSLETTER_URL||"";
/* theme */
var T="light";try{T=localStorage.getItem("nkd-theme")||"dark"}catch(e){}
function st(t){T=t;h.setAttribute("data-theme",t);$(".tg").forEach(function(b){b.textContent=b.classList.contains("tg-m")?"Switch to "+(t=="dark"?"light":"dark")+" mode":(t=="dark"?"Light":"Dark")});var m=d.querySelector("meta[name=theme-color]");if(m)m.content=t=="dark"?"#0f1c27":"#172B3A"}
st(T);$(".tg").forEach(function(b){b.addEventListener("click",function(){st(T=="dark"?"light":"dark");try{localStorage.setItem("nkd-theme",T)}catch(e){}})});
/* mobile drawer */
var mn=$("#mn")[0],mb=$("#mb")[0],mo=$(".mo")[0];function op(o){mn.classList.toggle("o",o);mo.classList.toggle("on",o);h.classList.toggle("mo-open",o);mb.setAttribute("aria-expanded",o)}
mb.addEventListener("click",function(){op(!mn.classList.contains("o"))});mo.addEventListener("click",function(){op(false)});$(".mn-x")[0].addEventListener("click",function(){op(false)});$("#mn a").forEach(function(a){a.addEventListener("click",function(){op(false)})});
addEventListener("keydown",function(e){if(e.key==="Escape")op(false)});addEventListener("resize",function(){if(innerWidth>1100)op(false)});
/* reveal with fail-safe */
var rv=$(".rv");if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});rv.forEach(function(x){io.observe(x)});setTimeout(function(){rv.forEach(function(x){if(x.getBoundingClientRect().top<innerHeight*1.5)x.classList.add("in")})},1200)}else rv.forEach(function(x){x.classList.add("in")});
addEventListener("scroll",function(){rv.forEach(function(x){if(!x.classList.contains("in")&&x.getBoundingClientRect().top<innerHeight)x.classList.add("in")})},{passive:true});
/* process timeline */
$(".tb button").forEach(function(b){b.addEventListener("click",function(){var i=+b.dataset.i;$(".tb button").forEach(function(x,k){x.setAttribute("aria-selected",k==i)});$(".tp").forEach(function(p,k){p.hidden=k!=i})})});
/* work filters */
$(".flt button").forEach(function(b){b.addEventListener("click",function(){$(".flt button").forEach(function(x){x.classList.toggle("on",x==b)});$(".cs").forEach(function(c){c.hidden=b.dataset.f!="all"&&c.dataset.c!=b.dataset.f})})});
/* forms: delivered by FormSubmit to the inbox; newsletter can use a list provider URL instead */
function bad(id,msg){var el=d.getElementById(id),er=d.getElementById(id+"-e");if(er)er.textContent=msg;if(el)el.setAttribute("aria-invalid",!!msg);return!msg}
var em=function(v){return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())};
var FAIL='We could not send that. Please email <a href="mailto:'+E+'">'+E+'</a> or message us on <a href="https://wa.me/639655896569" rel="noopener" target="_blank">WhatsApp</a>.';
function post(data,out,btn,ok,form){var fs=d.getElementById(out);btn.disabled=true;fs.textContent="Sending...";
fetch(window.NKD_FORM_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(Object.assign({_template:"table",_captcha:"false"},data))}).then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{ok:r.ok,j:j}})}).then(function(x){btn.disabled=false;if(x.ok&&String(x.j.success)!=="false"){fs.textContent=ok;form.reset()}else fs.innerHTML=FAIL}).catch(function(){btn.disabled=false;fs.innerHTML=FAIL})}
var cf=d.getElementById("cf");if(cf)cf.addEventListener("submit",function(e){e.preventDefault();var g=function(i){return d.getElementById(i).value.trim()};if(g("hp"))return;var ok=[bad("c-n",g("c-n").length>1?"":"Please enter your name."),bad("c-e",em(g("c-e"))?"":"Enter a valid email."),bad("c-m",g("c-m").length>9?"":"Please describe your project."),bad("c-k",d.getElementById("c-k").checked?"":"Please agree to continue.")].every(Boolean);if(!ok){var f=cf.querySelector("[aria-invalid=true]");if(f)f.focus();return}
var sv=$("input[name=sv]:checked").map(function(x){return x.value}).join(", ")||"Not specified";
post({_subject:"NKD website inquiry from "+g("c-n"),name:g("c-n"),email:g("c-e"),company:g("c-c"),website:g("c-w"),industry:g("c-i"),services:sv,budget:g("c-b")||"Prefer to discuss",preferred_communication:g("c-p"),message:g("c-m")},"cfs",cf.querySelector("button[type=submit]"),"Thank you, "+g("c-n")+". We received your inquiry and will reply by email.",cf)});
var nf=d.getElementById("nf");if(nf)nf.addEventListener("submit",function(e){e.preventDefault();if(d.getElementById("hp2").value)return;var ev=d.getElementById("ne").value.trim(),nm=d.getElementById("nn").value.trim();var ok=[bad("ne",em(ev)?"":"Enter a valid email."),bad("nc",d.getElementById("nc").checked?"":"Please agree to subscribe.")].every(Boolean);if(!ok)return;var btn=nf.querySelector("button[type=submit]"),fs=d.getElementById("nfs"),msg="Thank you. You are subscribed to NKD updates.";
if(window.NKD_NEWSLETTER_URL){btn.disabled=true;fetch(window.NKD_NEWSLETTER_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"email="+encodeURIComponent(ev)+"&name="+encodeURIComponent(nm)}).then(function(){btn.disabled=false;fs.textContent=msg;nf.reset()}).catch(function(){btn.disabled=false;fs.innerHTML=FAIL})}
else post({_subject:"NKD newsletter subscription",name:nm||"(no name)",email:ev,message:"Please add this person to the NKD newsletter. Consent given on the website."},"nfs",btn,msg,nf)});
/* pause sliders on touch */
$(".lgm").forEach(function(el){el.addEventListener("touchstart",function(){el.classList.add("hold")},{passive:true});["touchend","touchcancel"].forEach(function(v){el.addEventListener(v,function(){setTimeout(function(){el.classList.remove("hold")},1500)},{passive:true})})});
})();

/* Talk to NKD floating support: waves with headphones, greets once per visit, re-waves on scroll */
(function(){var d=document,b=d.getElementById("tk-t");if(!b)return;var p=d.getElementById("tk-p"),g=d.getElementById("tk-b");function sh(o){p.hidden=!o;b.setAttribute("aria-expanded",o);if(o)g.hidden=true}
b.addEventListener("click",function(){sh(p.hidden)});addEventListener("keydown",function(e){if(e.key==="Escape")sh(false)});d.addEventListener("click",function(e){if(!e.target.closest(".tk"))sh(false)});
try{if(!sessionStorage.getItem("nkd-hi")){sessionStorage.setItem("nkd-hi","1");setTimeout(function(){if(p.hidden){g.hidden=false;setTimeout(function(){g.hidden=true},7000)}},2200)}}catch(e){}
var t;addEventListener("scroll",function(){b.classList.add("wave");clearTimeout(t);t=setTimeout(function(){b.classList.remove("wave")},1800)},{passive:true})})();
