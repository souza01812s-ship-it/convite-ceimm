const openButton=document.getElementById('openButton');
const details=document.getElementById('details');
const audio=document.getElementById('backgroundMusic');
const musicControl=document.getElementById('musicControl');
const musicButton=document.getElementById('musicButton');
const musicStatus=document.getElementById('musicStatus');
let playing=false;

// A reprodução é iniciada diretamente no clique do visitante para respeitar
// as políticas de autoplay dos navegadores. Não existe forma legítima de
// garantir áudio automático com som antes de uma interação do usuário.
openButton.addEventListener('click', async()=>{
  openButton.disabled=true;
  openButton.innerHTML='<span>✦</span> Convite aberto <span>✦</span>';
  details.classList.add('visible');
  requestAnimationFrame(()=>details.classList.add('revealed'));
  details.setAttribute('aria-hidden','false');
  musicControl.classList.add('active');
  try{
    audio.volume=0.85;
    await audio.play();
    playing=true;
    updateMusicControl();
  }catch(error){
    musicStatus.textContent='TOQUE PARA REPRODUZIR';
    musicButton.textContent='▶';
    musicButton.setAttribute('aria-label','Reproduzir música');
  }
  details.scrollIntoView({behavior:'smooth',block:'start'});
});

musicButton.addEventListener('click',async()=>{
  if(playing){audio.pause();playing=false;}
  else{try{await audio.play();playing=true;}catch(e){musicStatus.textContent='NÃO FOI POSSÍVEL REPRODUZIR';}}
  updateMusicControl();
});
function updateMusicControl(){
  musicButton.textContent=playing?'Ⅱ':'▶';
  musicButton.setAttribute('aria-label',playing?'Pausar música':'Reproduzir música');
  musicControl.classList.toggle('paused',!playing);
  musicStatus.textContent=playing?'TRILHA SONORA':'MÚSICA PAUSADA';
}
audio.addEventListener('ended',()=>{playing=false;updateMusicControl();});
