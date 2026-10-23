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
 viewerPhotos=button.closest('#photo-grid')?photoButtons.filter(item=>item.closest('#photo-grid')):photoButtons.filter(item=>(item.dataset.photoSource||'google')===group);
 if(activeOccasion!=='all')viewerPhotos=viewerPhotos.filter(item=>!item.hidden);
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


// Keep enquiries tied to the exact design being viewed.
function whatsappURL(message){return 'https://wa.me/917352173036?text='+encodeURIComponent(message);}
function updateDesignEnquiry(button){
 const name=button.querySelector('.gallery-caption>span').textContent.trim();
 const photo=new URL(button.querySelector('img').getAttribute('src'),document.baseURI).href;
 document.querySelector('#design-enquiry').href=whatsappURL(`Namaste Khushi! Mujhe aisa design chahiye: ${name} (Design ${button.dataset.photoIndex}).\nPhoto: ${photo}\nOccasion: \nDate: \nLocation: \nBudget: `);
}
document.querySelectorAll('[data-whatsapp]').forEach(link=>{link.href=whatsappURL('Namaste Khushi! Main apna decoration design discuss karna chahta/chahti hoon.\nOccasion: \nDate: \nLocation: \nBudget: \nMain apni reference photo bhi bhejunga/bhejungi.');});
photoButtons.forEach(button=>{const hint=document.createElement('span');hint.className='enquiry-hint';hint.textContent='View design & enquire ↗';button.append(hint);});

// Filter the existing photos in place: no duplicate gallery images.
const occasionSections=['bouquets','wedding-car','catalogue','gallery'].map(id=>document.getElementById(id));
const initialHidden=new Map(photoButtons.map(button=>[button,button.hidden]));
const moreControls=[showAllPhotos,showAllDesigns,bouquetMore];
const initialMore=new Map(moreControls.map(button=>[button,button.hidden]));
let activeOccasion='all';
function photoOccasion(button){
 const text=(button.querySelector('img').alt+' '+button.textContent).toLowerCase();
 if(button.dataset.photoSource==='bouquets')return 'bouquet';
 if(button.dataset.photoSource==='car'||/\bcar\b|ride|mile/.test(text))return 'car';
 if(/devotion|faith|puja|festival|seasonal|marigold|toran/.test(text))return 'seasonal';
 if(/stage|wedding|mandap|canopy|backdrop|seating|entrance|arch/.test(text))return 'stage';
 return 'other';
}
document.querySelectorAll('[data-occasion]').forEach(control=>control.addEventListener('click',()=>{
 if(activeOccasion==='all'){
  photoButtons.forEach(button=>initialHidden.set(button,button.hidden));
  moreControls.forEach(button=>initialMore.set(button,button.hidden));
 }
 activeOccasion=control.dataset.occasion;
 document.querySelectorAll('[data-occasion]').forEach(button=>button.setAttribute('aria-pressed',String(button===control)));
 let matches=0;
 photoButtons.forEach(button=>{const match=photoOccasion(button)===activeOccasion;button.hidden=activeOccasion==='all'?initialHidden.get(button):!match;if(!button.hidden)matches++;});
 occasionSections.forEach(section=>{section.hidden=![...section.querySelectorAll('[data-photo-index]')].some(button=>!button.hidden);});
 moreControls.forEach(button=>{button.hidden=activeOccasion==='all'?initialMore.get(button):true;});
 document.querySelectorAll('#gallery-count,#bouquet-count,#catalogue-count').forEach(count=>{count.hidden=activeOccasion!=='all';});
 document.getElementById('occasion-status').textContent=activeOccasion==='all'?'Browse our collection, then open a photo to enquire about that design.':`${matches} photos for ${control.textContent}. Open any photo to enquire.`;
}));

// Section links should also work while an occasion filter is selected.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
 const target=document.getElementById(link.getAttribute('href').slice(1));
 if(target&&target.hidden&&occasionSections.includes(target))document.querySelector('[data-occasion="all"]').click();
}));
