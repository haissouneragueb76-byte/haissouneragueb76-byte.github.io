const c = window.portfolioConfig;
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);document.querySelector('nav').classList.toggle('open',open)});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open')}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',b===button)});document.querySelectorAll('[data-category]').forEach(p=>p.hidden=button.dataset.filter!=='all'&&button.dataset.filter!==p.dataset.category)}));
const dialog=document.querySelector('dialog');
document.querySelectorAll('.project-open').forEach(b=>b.addEventListener('click',()=>{
 const p=window.portfolioProjects[b.dataset.project];
 document.querySelector('#dialog-title').textContent=p.title;
 document.querySelector('#dialog-kind').textContent=p.kind;
 document.querySelector('#dialog-authors').textContent=p.authors;
 document.querySelector('#dialog-note').textContent=p.note;
 const details=document.querySelector('#dialog-details');details.replaceChildren();
 p.details.forEach(([title,body],i)=>{const dt=document.createElement('dt');dt.textContent=String(i+1).padStart(2,'0')+' / '+title;const dd=document.createElement('dd');dd.textContent=body;details.append(dt,dd)});
 document.querySelector('#dialog-read').href=p.file;document.querySelector('#dialog-download').href=p.file;
 dialog.showModal();dialog.scrollTop=0;
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
if(c.cvUrl){['cv-view','cv-download'].forEach(id=>{const a=document.getElementById(id);a.href=c.cvUrl;a.removeAttribute('aria-disabled');if(id==='cv-download')a.download='CV-Haissoune-Ragueb.pdf';else {a.target='_blank';a.rel='noopener'}});document.querySelector('.cv-status').textContent='Disponible au format PDF.';document.querySelector('.hero a[href="#cv"]').href=c.cvUrl;}
if(c.linkedinUrl){const a=document.querySelector('#linkedin-link');a.href=c.linkedinUrl;a.textContent='Voir mon profil LinkedIn ↗';a.removeAttribute('aria-disabled');a.target='_blank';a.rel='noopener';}
if(c.email){const a=document.querySelector('#email-link');a.href='mailto:'+c.email;a.textContent=c.email+' ↗';a.removeAttribute('aria-disabled');document.querySelector('#send').disabled=false;document.querySelector('#contact-status').textContent='Ce formulaire prépare un message dans votre application e-mail. Aucun message n’est envoyé automatiquement.';}
document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();if(!c.email)return;const f=new FormData(e.target);location.href='mailto:'+c.email+'?subject='+encodeURIComponent(f.get('subject'))+'&body='+encodeURIComponent(f.get('message')+'\n\n'+f.get('name')+'\n'+f.get('email'));document.querySelector('#contact-status').textContent='Votre brouillon a été préparé. Finalisez son envoi dans votre application e-mail.'});
