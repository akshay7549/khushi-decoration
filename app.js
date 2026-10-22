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
 const image=document.querySelector('#viewer-image');image.src=source.getAttribute('src');image.alt=source.alt;
 document.querySelector('#photo-title').textContent=button.querySelector('.gallery-caption>span').textContent;
 document.querySelector('#photo-position').textContent=`${currentPhoto+1} / ${viewerPhotos.length}`;
 updatePhotoSource(button);
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
 viewerPhotos=button.closest('#photo-grid')?photoButtons.filter(item=>item.closest('#photo-grid')):photoButtons.filter(item=>(item.dataset.photoSource||'google')===group);
 showPhoto(viewerPhotos.indexOf(button));photoViewer.showModal();
}));
document.querySelector('.viewer-close').addEventListener('click',()=>photoViewer.close());
document.querySelector('.viewer-prev').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.querySelector('.viewer-next').addEventListener('click',()=>showPhoto(currentPhoto+1));
photoViewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1);}if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1);}});
photoViewer.addEventListener('click',event=>{if(event.target===photoViewer){const r=photoViewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)photoViewer.close();}});

const showAllPhotos=document.querySelector('#show-all-photos');
const galleryCount=document.querySelector('#gallery-count');
const googlePhotoButtons=photoButtons.filter(button=>button.closest('#photo-grid'));
if(googlePhotoButtons.length>8){
 googlePhotoButtons.forEach((button,index)=>{button.hidden=index>=8;});
 galleryCount.textContent=`Showing 8 of ${googlePhotoButtons.length} images`;
 showAllPhotos.addEventListener('click',()=>{
  googlePhotoButtons.forEach(button=>{button.hidden=false;});
  galleryCount.textContent=`Showing all ${googlePhotoButtons.length} images`;
  showAllPhotos.setAttribute('aria-expanded','true');showAllPhotos.hidden=true;
 });
}else{showAllPhotos.hidden=true;}

const catalogueButtons=photoButtons.filter(button=>button.dataset.photoSource==='catalogue');
const showAllDesigns=document.querySelector('#show-all-designs');
catalogueButtons.forEach((button,index)=>{button.hidden=index>=6;});
document.querySelector('#catalogue-count').textContent=`Showing 6 of ${catalogueButtons.length} designs`;
showAllDesigns.addEventListener('click',()=>{
 catalogueButtons.forEach(button=>{button.hidden=false;});
 document.querySelector('#catalogue-count').textContent=`Showing all ${catalogueButtons.length} designs`;
 showAllDesigns.setAttribute('aria-expanded','true');showAllDesigns.hidden=true;
});

const bouquetPhotos=photoButtons.filter(button=>button.dataset.photoSource==='bouquets');
const bouquetMore=document.querySelector('#show-all-bouquets');
const bouquetCount=document.querySelector('#bouquet-count');
bouquetPhotos.forEach((button,index)=>{button.hidden=index>=8;});
bouquetCount.textContent=`Showing 8 of ${bouquetPhotos.length} bouquet photos`;
bouquetMore.addEventListener('click',()=>{
 bouquetPhotos.forEach(button=>{button.hidden=false;});
 bouquetCount.textContent=`Showing all ${bouquetPhotos.length} bouquet photos`;
 bouquetMore.setAttribute('aria-expanded','true');bouquetMore.hidden=true;
});
