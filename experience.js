// Progressive enhancement: content remains visible even when motion is unavailable.
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const header=document.querySelector('header');
 const progress=document.querySelector('.reading-progress');
 const motionToggle=document.querySelector('.motion-toggle');
 let motionPaused=false;
 motionToggle?.addEventListener('click',()=>{
  motionPaused=!motionPaused;
  document.documentElement.classList.toggle('motion-paused',motionPaused);
  motionToggle.setAttribute('aria-pressed',String(motionPaused));
  motionToggle.textContent=motionPaused?'Resume motion ▷':'Pause motion Ⅱ';
  document.getAnimations().forEach(a=>{if(motionPaused)a.pause();else a.play();});
 });
 let scheduled=false;
 function updateScroll(){
  const distance=document.documentElement.scrollHeight-innerHeight;
  progress.style.transform=`scaleX(${distance>0?Math.min(1,scrollY/distance):0})`;
  header.classList.toggle('is-scrolled',scrollY>35);
  scheduled=false;
 }
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
 addEventListener('resize',updateScroll,{passive:true});
 updateScroll();
 if(reduced.matches||!('IntersectionObserver' in window))return;
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries){
   if(!entry.isIntersecting)continue;
   const el=entry.target;
   if(el.animate&&!motionPaused)el.animate([{opacity:.15,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:Number(el.dataset.motionDelay||0),easing:'cubic-bezier(.2,.7,.2,1)'});
   observer.unobserve(el);
  }
 },{threshold:.1});
 document.querySelectorAll('.section-head,.celebration-service,.occasion-feature-layout,.design-photo,.booking-steps li,.visit-heading,.visit-contact-card,.visit-map-card,.about-inner,.service-area-layout').forEach(el=>{
  if(el.matches('.celebration-service,.booking-steps li'))el.dataset.motionDelay=String([...el.parentElement.children].indexOf(el)%3*80);
  observer.observe(el);
 });
 document.querySelectorAll('.hero-copy>*').forEach((el,i)=>{
  if(el.animate)el.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,delay:i*90,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
 });
 reduced.addEventListener('change',event=>{
  if(event.matches){observer.disconnect();document.getAnimations().forEach(a=>a.cancel());}
 });
})();
