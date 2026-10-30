const menu=document.querySelector('.menu');
const nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a===link));}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
let filter='all';
const search=document.querySelector('#search');
const cards=[...document.querySelectorAll('.category-card')];
function applyFilter(){const query=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const show=(filter==='all'||card.dataset.type===filter)&&(`${card.dataset.name} ${card.dataset.keywords}`).toLowerCase().includes(query);card.hidden=!show;if(show)visible++;});document.querySelector('#empty').hidden=visible>0;}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});applyFilter();}));
search.addEventListener('input',applyFilter);
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('.directions').href='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent('Khushi decoration & hardware, Belsand Road, Demapul Chowk, Dema, Bihar 843325');

const photoButtons=[...document.querySelectorAll('[data-photo-index]')];
const photoViewer=document.querySelector('#photo-viewer');
let viewerPhotos=photoButtons.filter(button=>!button.dataset.photoSource);
let currentPhoto=0;
function showPhoto(index){
 currentPhoto=(index+viewerPhotos.length)%viewerPhotos.length;
 const button=viewerPhotos[currentPhoto],source=button.querySelector('img');
 const image=document.querySelector('#viewer-image');image.src=button.dataset.fullSrc||source.getAttribute('src');image.alt=source.alt;
 document.querySelector('#photo-title').textContent=button.querySelector('.gallery-caption>span').textContent;
 document.querySelector('#photo-position').textContent=`${currentPhoto+1} / ${viewerPhotos.length}`;
 updatePhotoSource(button);
 updateDesignEnquiry(button);
}
function updatePhotoSource(button){
 const group=button.dataset.photoSource||'google';
 const catalogue=group==='catalogue';
 if(button.dataset.photoNote){
  document.querySelector('#viewer-source').textContent=button.dataset.photoNote;
 }else if(group==='bouquets'||group==='car'){
  document.querySelector('#viewer-source').textContent=group==='car'?'Our car decoration · background edited for presentation. Discuss your colours and occasion with the shop.':'Our arrangement · background edited for presentation. Call for current availability.';
 }else{
 const sourceLink=document.createElement('a');
 sourceLink.href=catalogue?'assets/catalogue/khushi-decoration.pdf':'https://share.google/AcQQ3sAe2lfxC8NM6';
 sourceLink.target='_blank';sourceLink.rel='noopener';
 sourceLink.textContent=catalogue?'event catalogue ↗':'Google Business Profile ↗';
 document.querySelector('#viewer-source').replaceChildren(document.createTextNode(catalogue?'Design from our ':'Photo from our '),sourceLink);
 }
}
photoButtons.forEach(button=>button.addEventListener('click',()=>{
 const group=button.dataset.photoSource||'google';
 viewerPhotos=button.dataset.galleryCategory?photoButtons.filter(item=>item.dataset.galleryCategory===button.dataset.galleryCategory):photoButtons.filter(item=>(item.dataset.photoSource||'google')===group);
 showPhoto(viewerPhotos.indexOf(button));photoViewer.showModal();
}));
document.querySelector('.viewer-close').addEventListener('click',()=>photoViewer.close());
document.querySelector('.viewer-prev').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.querySelector('.viewer-next').addEventListener('click',()=>showPhoto(currentPhoto+1));
photoViewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1);}if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1);}});
photoViewer.addEventListener('click',event=>{if(event.target===photoViewer){const r=photoViewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoViewer.close();}});

// Keep enquiries tied to the exact design being viewed.
function whatsappURL(message){return 'https://wa.me/917549645076?text='+encodeURIComponent(message);}
function updateDesignEnquiry(button){
 const name=button.querySelector('.gallery-caption>span').textContent.trim();
 const photo=new URL(button.dataset.fullSrc||button.querySelector('img').getAttribute('src'),document.baseURI).href;
 document.querySelector('#design-enquiry').href=whatsappURL(`Namaste Khushi! Mujhe aisa design chahiye: ${name} (Design ${button.dataset.photoIndex}).\nPhoto: ${photo}\nOccasion: \nDate: \nLocation: \nBudget: `);
}
document.querySelectorAll('[data-whatsapp]').forEach(link=>{link.href=whatsappURL('Namaste Khushi! Main apna decoration design discuss karna chahta/chahti hoon.\nOccasion: \nDate: \nLocation: \nBudget: \nMain apni reference photo bhi bhejunga/bhejungi.');});
photoButtons.forEach(button=>{const hint=document.createElement('span');hint.className='enquiry-hint';hint.textContent='View design & enquire ↗';button.append(hint);});


// Each photograph belongs to exactly one collection; featured occasion photos stay in place.
const categoryPanels=[...document.querySelectorAll('[data-category-panel]')];
const categoryControls=[...document.querySelectorAll('[data-design-category]')];
const expandedCategories=new Set();
let activeCategory='birthday';
function renderCategories(){
 let matching=0;
 categoryPanels.forEach(panel=>{
  const key=panel.dataset.categoryPanel;
  const photos=[...panel.querySelectorAll('[data-photo-index]')];
  panel.hidden=activeCategory!=='all'&&activeCategory!==key;
  if(!panel.hidden)matching+=photos.length;
  const expanded=expandedCategories.has(key);
  photos.forEach((photo,i)=>{
   photo.hidden=!expanded&&i>=6;
   // Load only visible previews in the selected collection.
   photo.querySelector('img').loading=!panel.hidden&&!photo.hidden?'eager':'lazy';
  });
  const shown=Math.min(photos.length,expanded?photos.length:6);
  panel.querySelector('.design-count').textContent=`Showing ${shown} of ${photos.length} photos`;
  const more=panel.querySelector('[data-more-category]');
  more.hidden=expanded||photos.length<=6;
  more.setAttribute('aria-expanded',String(expanded));
 });
 categoryControls.forEach(control=>control.setAttribute('aria-pressed',String(control.dataset.designCategory===activeCategory)));
 const title=activeCategory==='all'?'all categories':categoryControls.find(c=>c.dataset.designCategory===activeCategory).textContent.trim().replace(/\s+\d+$/,'');
 document.getElementById('design-category-status').textContent=`${matching} photos in ${title}. Select a photo to view it and enquire.`;
}
categoryControls.forEach(control=>control.addEventListener('click',()=>{activeCategory=control.dataset.designCategory;renderCategories();}));
document.querySelectorAll('[data-more-category]').forEach(control=>control.addEventListener('click',()=>{expandedCategories.add(control.dataset.moreCategory);renderCategories();}));
function revealCategoryTarget(hash){
 const target=document.getElementById(hash.replace(/^#/,''));
 const panel=target?.closest('[data-category-panel]');
 if(panel){activeCategory=panel.dataset.categoryPanel;renderCategories();}
}
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>revealCategoryTarget(link.hash)));
revealCategoryTarget(location.hash);
renderCategories();
window.addEventListener('hashchange',()=>revealCategoryTarget(location.hash));
