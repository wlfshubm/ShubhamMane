var P=[
{id:'project-one',t:'Project One',y:2026,c:'Product design',s:'Redesign of a booking app, from research to launch.',role:'Lead designer',time:'4 months',tools:'Figma, React',body:['Customers abandoned the old booking flow at the payment step. I interviewed twenty users, mapped where they got stuck and cut the flow from seven screens to three.','The new design shipped in three cities first, then went nationwide after the numbers held.'],res:['+32% completed bookings','4.8 store rating','3 cities at launch']},
{id:'project-two',t:'Project Two',y:2025,c:'Web app',s:'A dashboard that turns raw sales data into daily decisions.',role:'Designer and developer',time:'3 months',tools:'React, D3',body:['The sales team lived in spreadsheets. I built a dashboard that shows today’s priorities first and lets people drill into the numbers only when they need to.','Charts load in under a second, even on slow office networks.'],res:['−60% report time','200 daily users','Under 1s load']},
{id:'project-three',t:'Project Three',y:2025,c:'Branding',s:'Brand identity and website for a neighbourhood café.',role:'Brand designer',time:'6 weeks',tools:'Illustrator, HTML',body:['The café wanted to feel warm but modern. I designed a hand-drawn logo, a small color palette and a one-page site with the menu and opening hours up front.'],res:['Logo and guide','1-page site','Menu print kit']},
{id:'project-four',t:'Project Four',y:2024,c:'Open source',s:'An open-source tool for planning team schedules.',role:'Maintainer',time:'Ongoing',tools:'TypeScript, Node',body:['A small tool that finds meeting times across time zones. It started as a weekend project and now has contributors from several countries.'],res:['900 stars','25 contributors','MIT licence']}];
var $=function(s){return document.querySelector(s)};
function row(p){return '<li><a href="#'+p.id+'"><span class="yr">'+p.y+'</span><span><h3>'+p.t+'</h3><p>'+p.s+'</p></span><span class="tag">'+p.c+'</span></a></li>'}
function fillList(el,arr){el.innerHTML=arr.map(row).join('')}
fillList($('#home-list'),P.slice(0,3));
var cats=['All'].concat(P.map(function(p){return p.c}).filter(function(c,i,a){return a.indexOf(c)===i}));
var cur='All';
function drawWork(){
 $('#filters').innerHTML=cats.map(function(c){return '<button type="button" class="chip" aria-pressed="'+(c===cur)+'" data-c="'+c+'">'+c+'</button>'}).join('');
 var arr=P.filter(function(p){return cur==='All'||p.c===cur});
 fillList($('#work-list'),arr);$('#empty').hidden=arr.length>0}
$('#filters').addEventListener('click',function(e){var b=e.target.closest('.chip');if(b){cur=b.dataset.c;drawWork();anim()}});
drawWork();
function project(i){var p=P[i],pr=P[(i+P.length-1)%P.length],nx=P[(i+1)%P.length];
 $('#project').innerHTML='<div class="pagehead"><p><a href="#work">← All work</a></p><h1>'+p.t+'</h1><p>'+p.s+'</p></div><div class="cover" role="img" aria-label="Cover image placeholder for '+p.t+'">'+p.t+'</div><dl class="meta"><div><dt>Year</dt><dd>'+p.y+'</dd></div><div><dt>Role</dt><dd>'+p.role+'</dd></div><div><dt>Timeline</dt><dd>'+p.time+'</dd></div><div><dt>Tools</dt><dd>'+p.tools+'</dd></div></dl><div class="prose">'+p.body.map(function(t){return '<p>'+t+'</p>'}).join('')+'</div><h2>Results</h2><ul class="res">'+p.res.map(function(r){return '<li>'+r+'</li>'}).join('')+'</ul><div class="pn"><a href="#'+pr.id+'">← '+pr.t+'</a><a href="#'+nx.id+'">'+nx.t+' →</a></div>'}
function route(){
 var h=location.hash.slice(1)||'home',v=h,idx=P.map(function(p){return p.id}).indexOf(h),title='';
 if(idx>-1){v='project';project(idx);title=P[idx].t}
 else if(!document.querySelector('[data-view="'+h+'"]')){v='home';h='home'}
 document.querySelectorAll('[data-view]').forEach(function(e){e.hidden=e.dataset.view!==v});
 document.querySelectorAll('[data-nav]').forEach(function(a){var on=a.dataset.nav===(v==='project'?'work':v);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.title=(title||h.charAt(0).toUpperCase()+h.slice(1))+' – SHUBHAM';
 window.scrollTo(0,0);anim(v)}
var RV='.list li,.stats>div,.quote,.svc>div,.steps li,.tl li,.res li,.skills li,.meta>div,.pagehead,.filters,section>h2,form label,.pn,.prose p,.social';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.classList.remove('rv','in');t.style.transitionDelay=''},1400)}})},{threshold:.12}):null;
function anim(v){
 var vis=document.querySelector('[data-view]:not([hidden])');if(!vis)return;
 if(v){vis.style.animation='none';vis.offsetWidth;vis.style.animation=''}
 var els=vis.querySelectorAll(RV);
 els.forEach(function(el){el.style.transition='none';el.classList.add('rv');el.classList.remove('in')});
 vis.offsetWidth;
 els.forEach(function(el){el.style.transition='';el.style.transitionDelay=(Array.prototype.indexOf.call(el.parentNode.children,el)%6)*70+'ms';if(io&&!RM)io.observe(el);else el.classList.add('in')});
 if(v==='home')counts()}
function counts(){document.querySelectorAll('.stats b').forEach(function(b){b.dataset.t=b.dataset.t||b.textContent;var m=b.dataset.t.match(/(\d+)(.*)/);if(!m||RM)return;var n=+m[1],s=m[2],t0=null;function step(ts){t0=t0||ts;var k=Math.min((ts-t0)/1400,1);b.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(step)}requestAnimationFrame(step)})}
var mq=document.querySelector('.mq div');mq.innerHTML=mq.innerHTML+mq.innerHTML;
addEventListener('scroll',function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;$('#prog').style.transform='scaleX('+(m>0?h.scrollTop/m:0)+')'},{passive:true});
var mb=$('#menu'),dr=$('#drawer'),sc=$('#scrim');
dr.querySelectorAll('a').forEach(function(a,i){a.style.setProperty('--i',i)});
function tgl(o){document.body.classList.toggle('lock',o);['main','footer'].forEach(function(q){var el=$(q);if(el){if(o)el.setAttribute('inert','');else el.removeAttribute('inert')}});dr.classList.toggle('open',o);sc.classList.toggle('show',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');if(o)dr.querySelector('a').focus()}
mb.addEventListener('click',function(){tgl(!dr.classList.contains('open'))});
sc.addEventListener('click',function(){tgl(false)});
dr.addEventListener('click',function(e){if(e.target.closest('a'))tgl(false)});
matchMedia('(min-width:901px)').addEventListener('change',function(m){if(m.matches)tgl(false)});
addEventListener('keydown',function(e){if(e.key==='Escape'&&dr.classList.contains('open')){tgl(false);mb.focus()}});
window.addEventListener('hashchange',route);route();
$('#tg').addEventListener('click',function(){
 var r=document.documentElement,dark=r.dataset.theme!=='light',n=dark?'light':'dark';
 r.dataset.theme=n;this.setAttribute('aria-label',n==='light'?'Switch to dark theme':'Switch to light theme');try{localStorage.setItem('theme',n)}catch(e){}});
try{var t=localStorage.getItem('theme');if(t){document.documentElement.dataset.theme=t;if(t==='light')$('#tg').setAttribute('aria-label','Switch to dark theme')}}catch(e){}
$('#cf').addEventListener('submit',function(e){e.preventDefault();
 var b='Name: '+$('#f-name').value+'\nEmail: '+$('#f-email').value+'\nType: '+$('#f-type').value+'\n\n'+$('#f-msg').value;
 location.href='mailto:Shivammane666@gmail.com?subject='+encodeURIComponent('Project enquiry: '+$('#f-type').value)+'&body='+encodeURIComponent(b);
 $('#st').textContent='Opening your email app to send the message.'});
