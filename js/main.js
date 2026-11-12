var P=[
{id:'project-one',t:'Project One',y:2026,c:'Product design',s:'Redesign of a booking app, from research to launch.',role:'Lead designer',time:'4 months',tools:'Figma, React',body:['Customers abandoned the old booking flow at the payment step. I interviewed twenty users, mapped where they got stuck and cut the flow from seven screens to three.','The new design shipped in three cities first, then went nationwide after the numbers held.'],res:['+32% completed bookings','4.8 store rating','3 cities at launch']},
{id:'project-two',t:'Project Two',y:2025,c:'Web app',s:'A dashboard that turns raw sales data into daily decisions.',role:'Designer and developer',time:'3 months',tools:'React, D3',body:['The sales team lived in spreadsheets. I built a dashboard that shows today’s priorities first and lets people drill into the numbers only when they need to.','Charts load in under a second, even on slow office networks.'],res:['−60% report time','200 daily users','Under 1s load']},
{id:'project-three',t:'Project Three',y:2025,c:'Branding',s:'Brand identity and website for a neighbourhood café.',role:'Brand designer',time:'6 weeks',tools:'Illustrator, HTML',body:['The café wanted to feel warm but modern. I designed a hand-drawn logo, a small color palette and a one-page site with the menu and opening hours up front.'],res:['Logo and guide','1-page site','Menu print kit']},
{id:'project-four',t:'Project Four',y:2024,c:'Open source',s:'An open-source tool for planning team schedules.',role:'Maintainer',time:'Ongoing',tools:'TypeScript, Node',body:['A small tool that finds meeting times across time zones. It started as a weekend project and now has contributors from several countries.'],res:['900 stars','25 contributors','MIT licence']}];
var $=function(s){return document.querySelector(s)};
function row(p){var i=P.indexOf(p);return '<li><a class="pcard" href="#'+p.id+'"><div class="pc-cover" style="--a:'+(120+i*55)+'deg"><span>'+p.y+'</span><em>'+p.c+'</em></div><div class="pc-body"><h3>'+p.t+'</h3><p>'+p.s+'</p><span class="arr">View project →</span></div></a></li>'}
function fillList(el,arr){el.innerHTML=arr.map(row).join('')}
var cats=['All'].concat(P.map(function(p){return p.c}).filter(function(c,i,a){return a.indexOf(c)===i}));
var cur='All';
function drawWork(){
 $('#filters').innerHTML=cats.map(function(c){return '<button type="button" class="chip" aria-pressed="'+(c===cur)+'" data-c="'+c+'">'+c+'</button>'}).join('');
 var arr=P.filter(function(p){return cur==='All'||p.c===cur});
 fillList($('#work-list'),arr);$('#empty').hidden=arr.length>0}
$('#filters').addEventListener('click',function(e){var b=e.target.closest('.chip');if(b){cur=b.dataset.c;drawWork();anim()}});
drawWork();
function project(i){var p=P[i],pr=P[(i+P.length-1)%P.length],nx=P[(i+1)%P.length];
 $('#project').innerHTML='<div class="pagehead"><p><a href="#work">← All work</a></p><small class="eyebrow">Case study · '+p.c+'</small><h1>'+p.t+'</h1><p>'+p.s+'</p></div><div class="cover" role="img" aria-label="Cover image placeholder for '+p.t+'">'+p.t+'</div><dl class="meta"><div><dt>Year</dt><dd>'+p.y+'</dd></div><div><dt>Role</dt><dd>'+p.role+'</dd></div><div><dt>Timeline</dt><dd>'+p.time+'</dd></div><div><dt>Tools</dt><dd>'+p.tools+'</dd></div></dl><div class="prose">'+p.body.map(function(t){return '<p>'+t+'</p>'}).join('')+'</div><h2>Results</h2><ul class="res">'+p.res.map(function(r){return '<li>'+r+'</li>'}).join('')+'</ul><div class="pn"><a href="#'+pr.id+'">← '+pr.t+'</a><a href="#'+nx.id+'">'+nx.t+' →</a></div>'}
function route(){
 var h=location.hash.slice(1)||'home',v=h,idx=P.map(function(p){return p.id}).indexOf(h),title='';
 if(idx>-1){v='project';project(idx);title=P[idx].t}
 else if(!document.querySelector('[data-view="'+h+'"]')){v='home';h='home'}
 document.querySelectorAll('[data-view]').forEach(function(e){e.hidden=e.dataset.view!==v});
 document.querySelectorAll('[data-nav]').forEach(function(a){var on=a.dataset.nav===(v==='project'?'work':v);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 document.title=(title||h.charAt(0).toUpperCase()+h.slice(1))+' – SHUBHAM';
 window.scrollTo(0,0);anim(v)}
var RV='.pgrid li,.panel,.stats>div,.svc>div,.steps li,.tl li,.res li,.tile,.skills li,.meta>div,.pagehead,.filters,section>h2,form label,.pn,.prose p,.social';
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
addEventListener('scroll',function(){var h=document.documentElement,m=h.scrollHeight-h.clientHeight;$('#prog').style.transform='scaleX('+(m>0?h.scrollTop/m:0)+')'},{passive:true});
var mb=$('#menu'),dr=$('#drawer'),sc=$('#scrim');
dr.querySelectorAll('a').forEach(function(a,i){a.style.setProperty('--i',i)});
function tgl(o){document.body.classList.toggle('lock',o);['main','footer'].forEach(function(q){var el=$(q);if(el){if(o)el.setAttribute('inert','');else el.removeAttribute('inert')}});dr.classList.toggle('open',o);sc.classList.toggle('show',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');if(o)dr.querySelector('a').focus()}
mb.addEventListener('click',function(){tgl(!dr.classList.contains('open'))});
sc.addEventListener('click',function(){tgl(false)});
dr.addEventListener('click',function(e){if(e.target.closest('a'))tgl(false)});
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

(function(){
var hero=$('#hero'),RMo=matchMedia('(prefers-reduced-motion: reduce)').matches;
var n=$('#hname'),txt=n.textContent;
n.innerHTML=txt.split('').map(function(c,i){return '<span class="ch" style="--d:'+i+'">'+c+'</span>'}).join('');
function mv(el,e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')}
hero.addEventListener('pointermove',function(e){mv(hero,e)});
document.querySelectorAll('.tile').forEach(function(t){t.addEventListener('pointermove',function(e){mv(t,e)})});
if(!RMo){document.querySelectorAll('.mag').forEach(function(b){
 b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.25)+'px '+((e.clientY-r.top-r.height/2)*.35)+'px'});
 b.addEventListener('pointerleave',function(){b.style.translate=''})})}
$('#cue').addEventListener('click',function(){$('#explore').scrollIntoView({behavior:RMo?'auto':'smooth'})});
var W=['designer','developer','problem solver','product thinker'],r=$('#rot'),wi=0,ci=W[0].length,del=true;
if(!RMo){(function tick(){var w=W[wi],d=90;
 if(del){ci--;if(ci<=0){del=false;wi=(wi+1)%W.length;ci=0}d=45}
 else{ci++;if(ci>=W[wi].length){del=true;d=1800}}
 r.textContent=W[wi].slice(0,Math.max(ci,0))||'\u00a0';setTimeout(tick,d)})()}
})();

(function(){
var SP='.tile,.pcard,.svc>div,.steps li,.res li,.meta>div,.panel,#cf,.pn a';
document.addEventListener('pointermove',function(e){var el=e.target.closest&&e.target.closest(SP);if(!el)return;
 var r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 el.style.setProperty('--mx',x+'px');el.style.setProperty('--my',y+'px');
 if(el.classList.contains('pcard')&&!RM){el.style.setProperty('--ry',((x/r.width-.5)*8)+'deg');el.style.setProperty('--rx',(-(y/r.height-.5)*8)+'deg')}});
document.addEventListener('pointerout',function(e){var el=e.target.closest&&e.target.closest(SP);if(!el||el.contains(e.relatedTarget))return;
 ['--mx','--my','--rx','--ry'].forEach(function(k){el.style.removeProperty(k)})});
})();

/* ---- Portrait tilt + live VS Code status (via Discord Rich Presence + Lanyard) ---- */
(function(){
var LIVE_DISCORD_ID='';   // <- paste your Discord user ID here
var SHOW_FILE=true;       // false = show only project name, hide file names
var p=$('#portrait');
if(p&&!RM){var im=p.querySelector('img');
 p.addEventListener('pointermove',function(e){var r=p.getBoundingClientRect();im.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');im.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*10+'deg')});
 p.addEventListener('pointerleave',function(){im.style.removeProperty('--rx');im.style.removeProperty('--ry')})}
var demo=/livedemo/.test(location.search),box=$('#live');
if(!box||(!LIVE_DISCORD_ID&&!demo))return;
box.hidden=false;
var k=$('#live-k'),t=$('#live-t'),s=$('#live-s'),cur=null,ws,hb,retry=0;
function ago(ms){var m=Math.floor(ms/6e4);return m<1?'just started':m<60?m+'m':Math.floor(m/60)+'h '+(m%60)+'m'}
function render(){
 if(!cur){box.classList.remove('on');k.textContent='Offline';t.textContent='';s.textContent='Not coding right now';return}
 var proj=(cur.state||'').replace(/^(workspace|working on|project)\s*[:\-]?\s*/i,'')||'a new project';
 box.classList.add('on');k.textContent='Live · VS Code';t.textContent=proj;
 var bits=[];if(SHOW_FILE&&cur.details)bits.push(cur.details);
 if(cur.timestamps&&cur.timestamps.start)bits.push(ago(Date.now()-cur.timestamps.start));
 s.textContent=bits.join(' · ')}
function handle(d){var a=(d&&d.activities||[]).filter(function(x){return /visual studio code|vscodium|^code$|cursor/i.test(x.name||'')})[0];cur=a||null;render()}
render();setInterval(render,30000);
if(demo){cur={name:'Visual Studio Code',details:'Editing main.js',state:'Workspace: new-project',timestamps:{start:Date.now()-14*6e4}};render();return}
fetch('https://api.lanyard.rest/v1/users/'+LIVE_DISCORD_ID).then(function(r){return r.json()}).then(function(j){if(j&&j.success)handle(j.data)}).catch(function(){});
function connect(){try{ws=new WebSocket('wss://api.lanyard.rest/socket')}catch(e){return}
 ws.onopen=function(){retry=0};
 ws.onmessage=function(m){var d=JSON.parse(m.data);
  if(d.op===1){ws.send(JSON.stringify({op:2,d:{subscribe_to_id:LIVE_DISCORD_ID}}));clearInterval(hb);hb=setInterval(function(){if(ws.readyState===1)ws.send(JSON.stringify({op:3}))},d.d.heartbeat_interval)}
  else if(d.op===0&&d.d)handle(d.d)};
 ws.onclose=function(){clearInterval(hb);setTimeout(connect,Math.min(3e4,2e3*(++retry)))}}
connect();
})();
