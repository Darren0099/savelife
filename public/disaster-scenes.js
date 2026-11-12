/**
 * SAVE LIFE disaster dioramas.
 * Original procedural meshes, illustrated and deliberately NOT geospatial forecasts.
 * Geometry is shared with the existing no-dependency WebGL2 renderer.
 */
const C = {
 grass:'#a5ce7d', grass2:'#84bc74', grass3:'#c2dc95', soil:'#ad8d68',
 soilSide:'#816349', blue:'#4fb9ca', deep:'#308eae', foam:'#e7fbfb',
 road:'#667782', roof:'#e58e68', white:'#f9f4e8', wall:'#f1d9aa',
 green:'#397d62', light:'#d5e9ce', yellow:'#f4c664',
 red:'#e96e55', mud:'#b27b50', dark:'#445969'
};
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
function randomFactory(seed=113){return()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646;};}
function block(g,x,y,z,w,h,d,color,side='#879a83') {g.box(x,y,z,w,h,d,color,color,side);}
function tree(g,x,z,s=1,r=()=>.5){
 g.cylinder(x,.55*s,z,.11*s,.09*s,1.1*s,'#88684b',7);
 const c=['#4f956b','#78b771','#a2c872','#3d866a'][Math.floor(r()*4)];
 g.sphere(x,1.4*s,z,.61*s,c,4,8);
 g.sphere(x-.24*s,1.2*s,z-.24*s,.39*s,c,3,7);
}
function building(g,x,z,s=1,color=C.wall,h=1.3,rot=0){
 g.box(x,h*s/2,z,1.16*s,h*s,.94*s,'#f6f1df',color,'#b5c4ba',rot);
 g.box(x,h*s+.14*s,z,1.34*s,.22*s,1.12*s,'#6a8690','#6e8b96','#587481',rot);
 for(let y=.48;y<h;y+=.50)for(let dx of [-.29,.29]){
  g.box(x+dx*s,y*s,z+.482*s,.25*s,.27*s,.05*s,'#74bad0','#7ebed3','#699bac');
 }
}
function house(g,x,z,s=1,roof=C.roof){
 g.box(x,.46*s,z,1.23*s,.92*s,.99*s,'#fff2d8','#f5e4c7','#cfbda8');
 g.box(x,.99*s,z,1.39*s,.20*s,1.14*s,roof,roof,'#c8765d');
 g.box(x-.33*s,.40*s,z+.51*s,.27*s,.48*s,.055*s,'#6f9b95','#6f9b95');
 g.box(x+.3*s,.60*s,z+.52*s,.27*s,.28*s,.06*s,'#76bfcc','#76bfcc');
}
function road(g,x,z,w,d){block(g,x,.105,z,w,.07,d,C.road,'#526570');}
function marker(g,x,z,color=C.yellow,h=1.6){
 g.cylinder(x,h/2+.12,z,.045,.045,h,'#f9f4db',7);
 g.cone(x,h+.30,z,.30,.48,color,5);
}
function path(g,coords,active=false){
 for(let i=0;i<coords.length;i++){
  const [x,z]=coords[i];
  block(g,x,.18,z,.24,.07,.24,active?'#f9de75':'#deebba');
 }
}
function tileWorld(g,type,r){
 const hill=type==='landslide';
 for(let i=-6;i<=6;i++)for(let j=-4;j<=4;j++){
  let edge=(i*i)/(6.6*6.6)+(j*j)/(4.7*4.7);
  if(edge>1)continue;
  const coast=type==='tsunami'&&i>2;
  const y=hill?Math.max(0,(i+2))*.15:0;
  const top=coast?(r()>.48?C.blue:C.deep):([C.grass,C.grass2,C.grass3][Math.floor(r()*3)]);
  g.box(i*.7,y-.43,j*.7,.69,.85,.69,top,coast?C.deep:C.soil,C.soilSide);
 }
 // Floating neutral base gives the model a clear edge against the background.
 g.box(0,-.91,0,9.1,.2,5.65,'#b2bfa1','#bac6ad','#94a38f');
}
function tsunami(g,r,p,outcome,t){
 // Calm coast at left; open sea to right. An illustration, not a wave model.
 for(let z=-2.7;z<=2.7;z+=.45){
  const active=outcome!=='idle';
  const front=3.4-2.8*p;
  let x=active?front:3.45+Math.sin(t*.0008+z)*.15;
  g.box(x,.22+(.25+Math.sin(t*.003+z)*.12)*(.4+p),z,.4,.22+p*1.1,.40,active?'#7ad6db':'#91e2dd','#61bdcb','#3ca3b5');
  if(active)g.sphere(x-.19,.35+p*.9,z,.15+p*.10,C.foam,3,6);
 }
 road(g,-1.45,.0,1.5,5.0);road(g,-2,1.6,4.4,.52);
 for(const [x,z] of [[-3.7,-1.8],[-2.1,-1.9],[-3.5,.6],[-.5,1.35]])house(g,x,z,.7);
 for(const [x,z,s] of [[-4,2.1,.7],[-4.7,-.25,.7],[-.8,-2.2,.54]])tree(g,x,z,s,r);
 // Elevated refuge and narrow stairs.
 block(g,-4.35,.51,-.05,1.45,.75,1.65,'#8eab73','#718b60');
 building(g,-4.3,-.05,.68,'#f7e4c9',1.5);
 marker(g,-4.28,-.05,'#f1d267',1.5);
 path(g,[[-.95,.15],[-1.45,.15],[-2,.15],[-2.55,.15],[-3.1,.15],[-3.55,.12]],outcome==='safe');
 // Breakwater and signal station.
 block(g,1.85,-.03,1.7,.25,.4,2.4,'#c0b9a0');
 g.cylinder(.95,.78,-2.15,.25,.15,1.55,'#fbf3df',8);
 g.cone(.95,1.7,-2.15,.38,.48,C.red,7);
 if(outcome==='unsafe'&&p>.1){
  for(const [x,z] of [[-1,1.35],[-.5,1.35],[-2.15,-1.9]])block(g,x,.35+p*.28,z,1.1,.12,.95,'#6ec4d4');
 }
}
function flood(g,r,p,outcome,t){
 // River spine splits the settlement. Floodplain overtops the banks on risk.
 const rise=outcome==='unsafe'?p*.67:outcome==='safe'?p*.17:.01;
 for(let z=-3;z<=3;z+=.47){
  const x=.5+Math.sin(z*.88)*.48;
  block(g,x,.15+rise/2,z,1.5,.16+rise,.52,'#55bfd4','#469fb5');
  for(const edge of [-1,1]){
   const sx=x+edge*(1.02+rise*.34);
   g.sphere(sx,.22+rise*.6,z,.10+(Math.sin(t*.005+z)*.025),'#d6f1ea',3,6);
  }
 }
 road(g,-2.1,.12,.68,5.2); road(g,2.55,-.5,.75,4.6);
 // Short bridge and elevated community buildings.
 block(g,.5,.36,-.5,3.5,.22,.58,'#d7cfb7','#adac9d');
 for(const [x,z] of [[-3,-1.85],[-2.55,1.8],[2,1.55],[3,-1.9]])house(g,x,z,.72);
 building(g,3.4,.5,.74,'#e1dfc8',1.65);
 for(const [x,z] of [[-4,1],[-3.7,-.2],[3.65,2.1],[3.9,-.8]])tree(g,x,z,.60,r);
 // Animated boat moves toward a dry collection point in safe response.
 if(outcome==='safe'){
  const x=1.3-p*1.5,z=-2+p*1.25;
  block(g,x,.34,z,.93,.24,.38,C.yellow,'#dcae48');
  block(g,x,.55,z,.33,.22,.32,'#f6f1df');
  marker(g,-3.8,1.85,'#e8be59',1.3);
 }
 if(outcome==='unsafe'){
  for(const [x,z] of [[-2.55,1.8],[2,1.55],[-3,-1.85]])
   block(g,x,.14+rise/2,z,1.5,.1+rise,1.5,'#6cbed0','#4d9db3');
 }
}
function earthquake(g,r,p,outcome,t){
 road(g,0,0,7.65,.72);road(g,-.7,0,.72,4.7);
 for(const [x,z,h] of [[-3,-1.7,1.85],[-1.8,-1.7,1.2],[1.25,-1.6,2.1],[3.0,-1.6,1.5],[-3,1.65,1.3],[1.25,1.6,1.45],[3.1,1.6,1.7]]){
  const wobble=outcome==='unsafe'?Math.sin(t*.017+x*2)*p*.16:outcome==='idle'?Math.sin(t*.007+x)*.02:Math.sin(t*.014+x)*p*.08;
  building(g,x+wobble,z,.75,x>0?'#dbe4d3':'#f5dfc5',h);
 }
 for(const [x,z] of [[-4.45,-2.0],[-4.3,1.45],[4.45,1.0]])tree(g,x,z,.56,r);
 // Fracture line and debris change with shaking.
 const crack=p*(outcome!=='idle'?1:0);
 if(crack>.01){
  for(let i=0;i<9;i++){
   const x=-2.3+i*.55;
   g.box(x,.17,-.14+Math.sin(i*1.9)*.14,.34*crack,.03,.075,'#464e4f');
  }
  if(outcome==='unsafe')for(let i=0;i<9;i++){
   const x=1.8+(i%3)*.28,z=-2.5+Math.floor(i/3)*.25;
   block(g,x,.22+crack*.16,z,.18,.17,.23,'#9faaa3');
  }
 }
 // Designated open space for assembly, after shaking stops.
 block(g,-2.3,.20,2.22,2.15,.06,.96,'#d8e9b0');
 marker(g,-2.4,2.25,'#e9c55b',1.35);
 if(outcome==='safe')path(g,[[-.6,.2],[-1.25,.65],[-1.75,1.2],[-2.15,1.65]],true);
}
function landslide(g,r,p,outcome,t){
 // Tiers along a hillside, with the most severe slope on right.
 for(let i=0;i<5;i++){
  let x=.55+i*.83,h=.25+i*.28;
  block(g,x,h/2,0,.88,h,4.65,['#a7c875','#95bb73','#8eb471','#80aa6b','#749b64'][i],'#7f6548');
 }
 for(const [x,z,s] of [[1,-1.9,.65],[2.5,-1.35,.68],[3.75,-1.5,.68],[4,1.65,.66],[1.6,1.7,.65],[-4,-2.1,.58]])tree(g,x,z,s,r);
 road(g,-2.5,-.35,2.45,.65);road(g,-.25,-.35,2,.65);
 for(const [x,z] of [[-3.8,1.5],[-3,-1.8],[-1.7,1.3]])house(g,x,z,.79);
 // Tension fracture and rocks; soil travels downhill when a risky response is chosen.
 for(let i=0;i<8;i++){
  let x=1.65+i*.33;
  g.box(x,.85+i*.12,-.85+Math.sin(i*1.4)*.17,.27,.07,.085,'#765638');
 }
 if(outcome!=='idle'){
  const descent=(outcome==='unsafe'?p*.8:p*.37);
  for(let i=0;i<22;i++){
   const x=2.7-(i%5)*.18-descent*4.2,z=-.4+(Math.floor(i/5)-2)*.32;
   const y=Math.max(.23,.8+x*.19);
   g.cone(x,y,z,.18+r()*.16,.28+r()*.24,i%3===0?'#c49862':'#8d6b4c',5);
  }
  if(outcome==='unsafe'){
   for(let i=0;i<7;i++){const x=-1+Math.cos(i)*p*.7,z=.25+Math.sin(i)*p*.9;g.box(x,.23,z,.43,.14,.41,'#ac7f56');}
  }
 }
 marker(g,-4.1,-1.7,'#f4d176',1.4);
 if(outcome==='safe')path(g,[[-2.3,.2],[-2.75,-.2],[-3.25,-.6],[-3.7,-1.10]],true);
}
export function buildDisasterWorld(type,sim,{Geometry}){
 const g=new Geometry(),r=randomFactory(410);
 tileWorld(g,type,r);
 const p=clamp(sim.elapsed/3300);
 const outcome=sim.outcome||'idle',t=sim.elapsed||0;
 if(type==='tsunami')tsunami(g,r,p,outcome,t);
 else if(type==='flood')flood(g,r,p,outcome,t);
 else if(type==='earthquake')earthquake(g,r,p,outcome,t);
 else if(type==='landslide')landslide(g,r,p,outcome,t);
 return g;
}
