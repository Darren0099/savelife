import { WorldRenderer } from './scene.js';

const cases = [
  {
    title:'Hotspot belum tentu api.',tag:'OBSERVASI',step:'STEP 01 / OBSERVE',
    detail:'Satelit menemukan anomali panas di hutan. Hotspot belum memastikan adanya kebakaran.',
    question:'Apa langkah paling tepat setelah melihat penanda panas?',
    options:['Periksa data dan laporkan untuk verifikasi','Nyatakan pasti ada kebakaran besar','Masuk hutan untuk mencari sumber panas'],correct:0,xp:100,
    success:'Benar. Hotspot adalah indikasi anomali panas, bukan konfirmasi kejadian. Petugas memeriksa lebih lanjut.',
    error:'Belum tepat. Hotspot tidak otomatis membuktikan kebakaran, dan masuk ke lokasi berisiko membahayakan diri.',
    scene:'Mode pemantauan satelit: titik panas perlu diverifikasi.',
    ref:'https://firms.modaps.eosdis.nasa.gov/'
  },
  {
    title:'Jaga lahan gambut.',tag:'PENCEGAHAN',step:'STEP 02 / RESPOND',
    detail:'Gambut yang mengering mudah terbakar. Api dapat merambat di bawah permukaan, dan kini tampak api di tepi lahan.',
    question:'Api mulai membesar. Tindakan apa yang paling aman?',
    options:['Menjauh dan hubungi petugas pemadam','Masuk sendiri untuk memadamkan api','Biarkan karena api akan padam sendiri'],correct:0,xp:120,
    success:'Pilihan aman. Tim berwenang datang menangani lokasi. Penyiraman di peta hanyalah ilustrasi; kebakaran gambut membutuhkan strategi profesional.',
    error:'Berbahaya. Api di gambut bisa tersembunyi di bawah permukaan. Menangani kebakaran sendiri atau membiarkannya memperbesar risiko.',
    scene:'Api terlihat di lahan gambut. Pilih respons yang aman.',
    ref:'https://spartan.bmkg.go.id/'
  },
  {
    title:'Saat kabut asap datang.',tag:'KESELAMATAN',step:'STEP 03 / PROTECT',
    detail:'Asap kebakaran mendekati permukiman. Paparan asap dapat mengganggu kesehatan, terutama kelompok rentan.',
    question:'Apa yang perlu dilakukan untuk mengurangi risiko?',
    options:['Kurangi paparan dan ikuti arahan resmi','Datangi asal asap agar tahu penyebabnya','Tetap beraktivitas di luar seperti biasa'],correct:0,xp:150,
    success:'Tepat. Kurangi paparan asap dan pantau arahan resmi. Petugas menangani lokasi kebakaran.',
    error:'Berbahaya. Mendekati asap atau tetap berada di luar meningkatkan paparan polutan dan risiko keselamatan.',
    scene:'Asap meningkat. Pertimbangkan keselamatan warga.',
    ref:'https://www.who.int/news-room/fact-sheets/detail/wildfires-and-health'
  }
];
const $ = id => document.getElementById(id);
const renderer = new WorldRenderer($('world-canvas'));
let caseNo = 0, choice = null, result = null, timer=null;
let saved={};try{saved=JSON.parse(localStorage.getItem('save-life-v2-progress')||'{}')||{}}catch{saved={}};
const save = ()=>{try{localStorage.setItem('save-life-v2-progress',JSON.stringify(saved))}catch{}};
const progressCount=()=>cases.filter((_,i)=>saved[i]===true).length;
const earnedXP=()=>cases.reduce((sum,c,i)=>sum+(saved[i]?c.xp:0),0);
function announce(message, mode=''){const e=$('scene-status');e.classList.toggle('is-alert',mode==='alert');e.classList.toggle('is-safe',mode==='safe');$('scene-status-text').textContent=message}
function progress(){
 $('xp-counter').innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 2-9 11h7l-2 9 10-12h-7l1-8Z" fill="currentColor" /></svg> ${earnedXP()} XP`;
 $('progress-count').textContent=`${progressCount()}/3 MISI`;
 $('top-progress').innerHTML=`0${caseNo+1} <span>/ 03</span>`;
 document.querySelectorAll('.progress-dots i').forEach((d,i)=>{d.classList.toggle('current',i===caseNo);d.classList.toggle('complete',saved[i]===true)});
}
function loadCase(n){
 clearTimeout(timer);caseNo=n;choice=null;result=null;const c=cases[caseNo];
 $('case-index').textContent=`CASE 0${caseNo+1}`;$('case-topic').textContent=c.tag;$('case-kicker').textContent=c.step;
 $('case-title').textContent=c.title;$('case-detail').textContent=c.detail;$('case-question').textContent=c.question;
 $('source-link').href=c.ref;$('source-link').setAttribute('aria-label',`Buka sumber resmi untuk materi: ${c.title}`);
 $('choices').innerHTML='';c.options.forEach((option,i)=>{
  const b=document.createElement('button');b.type='button';b.className='choice-btn';b.dataset.choice=String(i);
  const label=document.createElement('span');label.className='choice-letter';label.textContent=String.fromCharCode(65+i);
  const t=document.createElement('span');t.textContent=option;b.append(label,t);b.addEventListener('click',()=>decide(i));$('choices').append(b);
 });
 $('case-feedback').hidden=true;$('case-feedback').classList.remove('wrong');$('case-feedback').textContent='';
 $('next-case').hidden=true;$('retry-case').hidden=true;
 renderer.setScenario(caseNo,'idle');announce(c.scene,caseNo>0?'alert':'');progress();
}
function decide(i){if(choice!==null)return;choice=i;const c=cases[caseNo];const correct=i===c.correct;result=correct?'safe':'unsafe';
 $('choices').querySelectorAll('button').forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add(correct?'selected-correct':'selected-wrong')});
 renderer.setScenario(caseNo,result);
 if(correct){announce(caseNo===0?'Verifikasi dilakukan tanpa mendekati lokasi berbahaya.':'Tim penanganan bergerak menuju lokasi kejadian.','safe')}
 else{announce('Situasi memburuk. Lihat akibat pilihan di peta 3D.','alert')}
 const timeToShow=correct&&caseNo>0?3600:correct?1200:2400;
 timer=setTimeout(()=>{
  const fb=$('case-feedback');fb.hidden=false;fb.classList.toggle('wrong',!correct);fb.textContent=correct?c.success:c.error;
  if(correct){saved[caseNo]=true;save();progress();$('next-case').hidden=false;$('next-case').textContent=caseNo===2?'Ulangi petualangan ↺':'Lanjut kasus →';announce(caseNo===0?'Anomali telah ditandai untuk pemeriksaan petugas.': 'Simulasi respons profesional selesai.','safe')}
  else $('retry-case').hidden=false;
 },timeToShow);
}
$('retry-case').addEventListener('click',()=>loadCase(caseNo));
$('next-case').addEventListener('click',()=>loadCase((caseNo+1)%cases.length));
$('reset-case').addEventListener('click',()=>loadCase(caseNo));
$('zoom-in').addEventListener('click',()=>renderer.zoom(-1));
$('zoom-out').addEventListener('click',()=>renderer.zoom(1));
$('reset-camera').addEventListener('click',()=>renderer.reset());
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&choice!==null)loadCase(caseNo)});
loadCase(0);
