/* DDP PRO landing interactions + minimal animations */

// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Mobile menu (simple, premium: bottom sheet)
const burger = $('#burger');
const mobileSheet = $('#mobileSheet');
const sheetOverlay = $('#sheetOverlay');
const sheetClose = $('#sheetClose');

function openSheet(){
  sheetOverlay.classList.add('is-open');
  mobileSheet.classList.add('is-open');
  burger.setAttribute('aria-expanded','true');
}
function closeSheet(){
  sheetOverlay.classList.remove('is-open');
  mobileSheet.classList.remove('is-open');
  burger.setAttribute('aria-expanded','false');
}

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  expanded ? closeSheet() : openSheet();
});

sheetOverlay?.addEventListener('click', (e) => {
  if(e.target === sheetOverlay) closeSheet();
});

sheetClose?.addEventListener('click', closeSheet);

// Partner form (front-end only)
$('#partnerForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const btn = $('#partnerSubmit');
  if(!btn) return;
  btn.disabled = true;
  btn.textContent = 'Заявка отправлена';
  setTimeout(()=>{ btn.disabled=false; btn.textContent='Первая отгрузка'; e.target.reset(); }, 1200);
});

// Smooth scroll for internal links
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    const target = id && id.length>1 ? document.getElementById(id.slice(1)) : null;
    if(!target) return;
    e.preventDefault();
    closeSheet();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Animations (respect reduced motion)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion && window.gsap){
  gsap.registerPlugin(ScrollTrigger);

  // First screen
  gsap.from('[data-hero="kicker"]', {opacity:0, y:10, duration:.7, ease:'power2.out'});
  gsap.from('[data-hero="h1"]', {opacity:0, y:14, duration:.85, delay:.08, ease:'power2.out'});
  gsap.from('[data-hero="badges"] .badge', {opacity:0, y:10, duration:.6, stagger:.07, delay:.14, ease:'power2.out'});
  gsap.from('[data-hero="panel"]', {opacity:0, x:18, duration:.75, delay:.14, ease:'power2.out'});

  // Sections
  $$('[data-animate="section"]').forEach((section)=>{
    const items = $$('[data-animate-item]', section);
    gsap.from(items, {
      opacity:0,
      y:14,
      duration:.7,
      stagger:.08,
      ease:'power2.out',
      scrollTrigger:{trigger:section, start:'top 80%'}
    });
  });
}
