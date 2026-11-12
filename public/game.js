import { WorldRenderer } from './scene.js';

// Five distinct 3D environments; each mission shows the consequence of a decision.
const worlds = [
 {id:'forest',label:'Karhutla',title:'Forest Guardian',subtitle:'Pahami titik panas, lahan gambut, dan perlindungan dari asap.',map:'HUTAN GAMBUT'},
 {id:'tsunami',label:'Tsunami',title:'Coastal Escape',subtitle:'Tentukan jalur yang tepat saat ancaman gelombang datang.',map:'KOTA PESISIR'},
 {id:'flood',label:'Banjir',title:'Rising Waters',subtitle:'Amati perubahan permukaan air di kawasan permukiman.',map:'KOTA TEPI SUNGAI'},
 {id:'earthquake',label:'Gempa',title:'Ground Motion',subtitle:'Pelajari perlindungan diri ketika bumi berguncang.',map:'KOTA DAN BANGUNAN'},
 {id:'landslide',label:'Longsor',title:'Slope Alert',subtitle:'Kenali risiko lereng dan pergerakan massa tanah.',map:'LERENG PERBUKITAN'}
];
const missions=[
 {world:'forest',stage:0,tag:'OBSERVASI',step:'01 / AMATI',title:'Hotspot belum tentu api.',detail:'Satelit mendeteksi anomali panas pada lahan gambut. Itu belum membuktikan telah terjadi kebakaran.',question:'Langkah pertama yang lebih aman?',options:['Verifikasi informasi lewat sumber resmi dan laporkan kepada petugas','Langsung menyatakan hutan terbakar','Masuk ke lokasi sendirian untuk memeriksa'],correct:0,xp:100,success:'Benar. Hotspot adalah indikasi yang membutuhkan verifikasi. Hindari mendatangi lokasi berisiko.',error:'Hotspot belum membuktikan adanya kebakaran. Jangan mendekati lokasi yang berpotensi berbahaya.',scene:'Sinyal anomali panas terdeteksi pada peta.',ref:'https://firms.modaps.eosdis.nasa.gov/'},
 {world:'forest',stage:1,tag:'KEBAKARAN',step:'02 / RESPONS',title:'Api muncul di lahan gambut.',detail:'Kebakaran tampak di wilayah hutan. Api pada gambut dapat tersembunyi di bawah permukaan.',question:'Tindakan paling aman bagi warga?',options:['Mendekati api dan menyiramnya sendiri','Menjauh, laporkan lokasi, ikuti arahan petugas','Menunggu api padam tanpa melapor'],correct:1,xp:120,success:'Tepat. Penanganan kebakaran dilakukan petugas terlatih. Efek mobil dan air di peta hanya ilustrasi.',error:'Jangan memadamkan api gambut sendiri atau mengabaikannya. Menjauh dan hubungi pihak berwenang.',scene:'Api menyebar di lahan gambut. Tentukan respons.',ref:'https://spartan.bmkg.go.id/'},
 {world:'forest',stage:2,tag:'KABUT ASAP',step:'03 / LINDUNGI',title:'Asap mendekati rumah.',detail:'Kualitas udara dapat memburuk ketika asap kebakaran bergerak menuju permukiman.',question:'Bagaimana mengurangi risiko paparan?',options:['Tetap berolahraga di luar rumah','Mendekati sumber asap untuk melihatnya','Batasi paparan dan ikuti informasi kesehatan resmi'],correct:2,xp:140,success:'Benar. Utamakan kesehatan, kurangi paparan, dan ikuti instruksi resmi setempat.',error:'Paparan asap berisiko bagi kesehatan. Hindari sumber asap dan ikuti arahan kesehatan.',scene:'Kabut asap bergerak ke arah area hunian.',ref:'https://www.who.int/news-room/fact-sheets/detail/wildfires-and-health'},
 {world:'tsunami',stage:0,tag:'EVAKUASI PESISIR',step:'01 / EVAKUASI',title:'Guncangan kuat di pantai.',detail:'Kamu berada di kota pesisir dan merasakan gempa kuat atau berlangsung lama. Ada potensi ancaman tsunami.',question:'Apa keputusan yang lebih aman?',options:['Tetap di pantai untuk merekam gelombang','Setelah dapat bergerak aman, segera menuju tempat tinggi melalui jalur evakuasi','Menunggu sirene sebelum bergerak'],correct:1,xp:180,success:'Benar. Setelah melindungi diri saat guncangan, segera menjauh dari pantai menuju tempat tinggi. Jangan menunggu peringatan jika ada tanda alami tsunami.',error:'Berbahaya. Jangan mendekati pantai atau menunda evakuasi saat ada tanda alami tsunami.',scene:'Permukaan laut berubah. Jalur ke elevasi tinggi terlihat.',ref:'https://www.bmkg.go.id/gempabumi/mitigasi/edukasi-gempabumi-tsunami'},
 {world:'flood',stage:0,tag:'KESELAMATAN BANJIR',step:'01 / AMANKAN',title:'Air sungai mulai meluap.',detail:'Permukaan air naik dan jalan di kawasan rumah mulai tergenang. Kedalaman serta arus tidak pasti.',question:'Respons yang paling aman?',options:['Menerobos air dengan motor','Mendekati kabel dan peralatan listrik yang terkena air','Menjauhi arus, pindah ke titik aman sesuai arahan petugas'],correct:2,xp:180,success:'Benar. Menjauhi genangan berarus dan sumber listrik mengurangi bahaya. Evakuasi sesuai instruksi resmi.',error:'Jangan menerobos banjir atau mendekati sumber listrik dalam genangan. Arus dapat lebih kuat daripada terlihat.',scene:'Ketinggian air bertambah di sekitar permukiman.',ref:'https://inarisk.bnpb.go.id/'},
 {world:'earthquake',stage:0,tag:'PERLINDUNGAN DIRI',step:'01 / LINDUNGI',title:'Bangunan mulai berguncang.',detail:'Kamu sedang berada di dalam bangunan ketika guncangan gempa terjadi.',question:'Apa yang sebaiknya dilakukan saat guncangan?',options:['Merunduk, berlindung, dan bertahan di bawah meja kokoh','Segera gunakan lift menuju lantai dasar','Berlari ke arah jendela kaca'],correct:0,xp:180,success:'Tepat. Drop, Cover, Hold On saat guncangan; setelah reda, evaluasi kondisi dan ikuti rute evakuasi yang aman.',error:'Jangan menggunakan lift atau berlari ke dekat kaca saat guncangan. Lindungi kepala, leher, dan tubuh terlebih dahulu.',scene:'Guncangan membuat gedung bergetar dan jalan retak.',ref:'https://www.bmkg.go.id/gempabumi/mitigasi/antisipasi-gempabumi'},
 {world:'landslide',stage:0,tag:'RISIKO LERENG',step:'01 / HINDARI',title:'Retakan muncul di lereng.',detail:'Hujan lama dan retakan baru terlihat pada lereng di atas permukiman. Longsor mungkin terjadi.',question:'Apa pilihan yang lebih aman?',options:['Berhenti di kaki lereng untuk mengambil foto','Menjauh dari jalur longsoran dan melapor kepada petugas','Mendaki mendekati retakan untuk mengukurnya'],correct:1,xp:180,success:'Tepat. Menjauh dari jalur material bergerak adalah prioritas. Ikuti jalur aman yang ditetapkan petugas.',error:'Jangan berada di bawah lereng tidak stabil atau mendekati retakan. Material bisa bergerak cepat.',scene:'Tanah lereng bergerak ke arah kaki bukit.',ref:'https://inarisk.bnpb.go.id/'}
];
const $=id=>document.getElementById(id);
const renderer=new WorldRenderer($('world-canvas'));
const STORE='save-life-v3-progress';
let saved={};
try{saved=JSON.parse(localStorage.getItem(STORE)||'{}')||{}}catch{saved={}}
if(!Object.keys(saved).length)try{
 const old=JSON.parse(localStorage.getItem('save-life-v2-progress')||'{}');
 for(let i=0;i<3;i++)if(old[i]===true)saved[i]=true;
}catch{}
const persist=()=>{try{localStorage.setItem(STORE,JSON.stringify(saved))}catch{}};
let index=0,responded=false,timer=null;
let dockExpanded=false;
function setDockExpanded(expanded,focusToggle=false){
 dockExpanded=expanded;
 $('case-dock').classList.toggle('is-collapsed',!expanded);
 $('case-dock').classList.toggle('is-expanded',expanded);
 $('dock-detail').hidden=!expanded;
 $('dock-toggle').setAttribute('aria-expanded',String(expanded));
 $('dock-toggle-label').textContent=expanded?'Tutup panel':responded?'Lihat penjelasan':'Mulai simulasi';
 renderer.setDockExpanded(expanded);
 if(focusToggle)$('dock-toggle').focus({preventScroll:true});
}
const doneCount=()=>missions.filter((_,i)=>saved[i]===true).length;
const xp=()=>missions.reduce((n,m,i)=>n+(saved[i]?m.xp:0),0);
function announce(text,style=''){
 const el=$('scene-status');el.classList.toggle('is-alert',style==='alert');el.classList.toggle('is-safe',style==='safe');
 $('scene-status-text').textContent=text;
}
function updateProgress(){
 const w=worlds.findIndex(x=>x.id===missions[index].world);
 $('xp-counter').textContent=xp()+' XP';$('progress-count').textContent=doneCount()+'/'+missions.length+' MISI SELESAI';
 $('dock-summary-progress').textContent=doneCount()+' / '+missions.length+' MISI';
 $('top-progress').innerHTML=String(w+1).padStart(2,'0')+' <span>/ '+String(worlds.length).padStart(2,'0')+'</span>';
 document.querySelectorAll('.world-tab').forEach(btn=>{
  const active=btn.dataset.world===missions[index].world;
  btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
  const complete=missions.every((m,i)=>m.world!==btn.dataset.world||saved[i]===true);
  btn.classList.toggle('complete',complete);
 });
}
function loadMission(n){
 clearTimeout(timer);index=n;responded=false;
 const m=missions[n],world=worlds.find(w=>w.id===m.world);
 $('app').dataset.world=world.id;
 $('world-title').innerHTML=world.title+'<span>.</span>';
 $('world-description').textContent=world.subtitle;
 $('map-label-text').textContent='DIORAMA '+String(worlds.indexOf(world)+1).padStart(2,'0')+' / '+world.map;
 $('dock-eyebrow').textContent=String(worlds.indexOf(world)+1).padStart(2,'0')+' / '+world.label.toUpperCase()+' · CASE '+String(n+1).padStart(2,'0');
 $('dock-summary-title').textContent=m.title;
 $('dock-summary-description').textContent='Amati peta dan tentukan tindakan paling aman.';
 $('dock-next').hidden=true;$('dock-retry').hidden=true;
 $('case-index').textContent='CASE '+String(n+1).padStart(2,'0');
 $('case-topic').textContent=m.tag;$('case-kicker').textContent='SIMULASI / '+m.step;
 $('case-title').textContent=m.title;$('case-detail').textContent=m.detail;$('case-question').textContent=m.question;
 $('source-link').href=m.ref;$('source-link').setAttribute('aria-label','Buka referensi resmi: '+m.title);
 $('choices').replaceChildren();
 m.options.forEach((option,i)=>{
  const btn=document.createElement('button');btn.className='choice-btn';btn.type='button';
  const letter=document.createElement('span');letter.className='choice-letter';letter.textContent=String.fromCharCode(65+i);
  const label=document.createElement('span');label.textContent=option;
  btn.append(letter,label);btn.addEventListener('click',()=>decide(i));$('choices').append(btn);
 });
 $('case-feedback').hidden=true;$('case-feedback').textContent='';$('case-feedback').classList.remove('wrong');
 $('next-case').hidden=true;$('retry-case').hidden=true;
 setDockExpanded(false);
 renderer.setScenario(m.world,'idle',m.stage);
 announce(m.scene,m.stage>0?'alert':'');updateProgress();
}
function decide(i){
 if(responded)return;responded=true;
 const m=missions[index],correct=i===m.correct;
 document.querySelectorAll('.choice-btn').forEach((b,j)=>{b.disabled=true;if(j===i)b.classList.add(correct?'selected-correct':'selected-wrong')});
 renderer.setScenario(m.world,correct?'safe':'unsafe',m.stage);
 // The choice returns the user to the unobstructed 3D world automatically.
 setDockExpanded(false,true);
 $('dock-summary-description').textContent=correct?'Respons aman diterapkan. Amati efeknya di dunia 3D.':'Situasi berisiko. Amati akibat pilihanmu di peta.';
 announce(correct?'Pilihan aman. Amati perubahan di lingkungan 3D.':'Risiko meningkat. Amati perubahan peta 3D.',correct?'safe':'alert');
 timer=setTimeout(()=>{
  const fb=$('case-feedback');fb.hidden=false;fb.classList.toggle('wrong',!correct);
  fb.textContent=correct?m.success:m.error;
  if(correct){
   saved[index]=true;persist();updateProgress();
   $('next-case').hidden=false;$('next-case').textContent=index===missions.length-1?'Jelajahi lagi ↺':'Lanjut simulasi →';
   $('dock-next').hidden=false;$('dock-next').textContent=index===missions.length-1?'Mulai lagi ↺':'Misi berikutnya →';
   announce('Keputusan aman. '+m.tag.toLowerCase()+' selesai.','safe');
  }else{$('retry-case').hidden=false;$('dock-retry').hidden=false;}
 },1700);
}
for(const w of worlds){
 const btn=document.createElement('button');btn.type='button';btn.className='world-tab';btn.dataset.world=w.id;
 const number=document.createElement('span');number.className='world-tab-number';number.textContent=String(worlds.indexOf(w)+1).padStart(2,'0');
 const label=document.createElement('span');label.textContent=w.label;
 btn.append(number,label);btn.addEventListener('click',()=>{const n=missions.findIndex(m=>m.world===w.id);loadMission(n)});
 $('world-tabs').append(btn);
}
$('dock-toggle').addEventListener('click',()=>setDockExpanded(!dockExpanded));
$('dock-next').addEventListener('click',()=>loadMission((index+1)%missions.length));
$('dock-retry').addEventListener('click',()=>loadMission(index));
$('retry-case').addEventListener('click',()=>loadMission(index));
$('next-case').addEventListener('click',()=>loadMission((index+1)%missions.length));
$('reset-case').addEventListener('click',()=>loadMission(index));
$('zoom-in').addEventListener('click',()=>renderer.zoom(-1));
$('zoom-out').addEventListener('click',()=>renderer.zoom(1));
$('reset-camera').addEventListener('click',()=>renderer.reset());
window.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&dockExpanded){setDockExpanded(false,true);e.preventDefault();}
});
loadMission(0);
