const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню');nav.classList.remove('open')}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');nav.classList.toggle('open',open)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
nav.addEventListener('click',closeMenu);
const article=document.querySelector('#article-body');
const sections=[...article.querySelectorAll('section[id]')];
const tocLinks=[...document.querySelectorAll('.toc>a')];
const progress=document.querySelector('#reading-progress');
let scheduled=false;
function updateReading(){const start=article.getBoundingClientRect().top+window.scrollY-110;const end=start+article.offsetHeight-window.innerHeight+110;const percent=Math.max(0,Math.min(100,(window.scrollY-start)/Math.max(1,end-start)*100));progress.style.width=`${percent}%`;let current=null;for(const section of sections){if(section.getBoundingClientRect().top<=160)current=section.id}tocLinks.forEach(link=>{const active=link.hash===`#${current}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});scheduled=false}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(updateReading)}}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('load',schedule);updateReading();
document.querySelector('#share-article').addEventListener('click',async()=>{const status=document.querySelector('#share-status');const url=new URL(location.href);url.hash='';try{await navigator.clipboard.writeText(url.href);status.textContent='Ссылка скопирована'}catch{status.textContent=`Ссылка на статью: ${url.href}`}});
