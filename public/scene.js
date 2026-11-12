/* Original procedural low-poly renderer; expanded with disaster-specific worlds. */
import { buildDisasterWorld } from './disaster-scenes.js';
const C={soil:'#7a5232',soilLight:'#96704a',soilDark:'#64432e',grass:'#88bd61',grass1:'#a5d57b',grass2:'#6dab59',trunk:'#82513d',pine:'#2e7652',pine2:'#3f9363',pine3:'#58a16b',leaf:'#4e9958',leaf2:'#78b866',rock:'#a6ab9e',water:'#61c4c7',water2:'#309ab5',yellow:'#f5c562',orange:'#ed7f48',white:'#f4eee1',roof:'#db8c63',blue:'#548ca3'};
function rgb(s){const h=s.replace('#','');return [parseInt(h.slice(0,2),16)/255,parseInt(h.slice(2,4),16)/255,parseInt(h.slice(4,6),16)/255]}
function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]}function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function norm(a){let d=Math.hypot(...a)||1;return a.map(v=>v/d)}function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]}
function viewMat(eye,tgt){let z=norm(sub(eye,tgt)),x=norm(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1])}function persp(fov,aspect,near,far){let f=1/Math.tan(fov/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,2*far*near*nf,0])}function mul(a,b){let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
class Geometry{constructor(){this.p=[];this.n=[];this.c=[]}tri(a,b,c,color){let nn=norm(cross(sub(b,a),sub(c,a))),col=rgb(color);for(let v of [a,b,c]){this.p.push(...v);this.n.push(...nn);this.c.push(...col)}}quad(a,b,c,d,color){this.tri(a,b,c,color);this.tri(a,c,d,color)}box(x,y,z,w,h,d,top,front=C.soil,side=C.soilDark,rot=0){let x0=-w/2,x1=w/2,z0=-d/2,z1=d/2,y0=-h/2,y1=h/2;function pt(xx,yy,zz){return [x+xx*Math.cos(rot)-zz*Math.sin(rot),y+yy,z+xx*Math.sin(rot)+zz*Math.cos(rot)]}let A=pt(x0,y1,z0),B=pt(x1,y1,z0),Cc=pt(x1,y1,z1),D=pt(x0,y1,z1),E=pt(x0,y0,z0),F=pt(x1,y0,z0),G=pt(x1,y0,z1),H=pt(x0,y0,z1);this.quad(A,D,Cc,B,top);this.quad(E,F,G,H,side);this.quad(D,H,G,Cc,front);this.quad(B,Cc,G,F,side);this.quad(A,B,F,E,front);this.quad(A,E,H,D,side)}cylinder(x,y,z,r1,r2,h,color,n=7){let t=[],b=[];for(let i=0;i<n;i++){let a=i/n*Math.PI*2;t.push([x+Math.cos(a)*r2,y+h/2,z+Math.sin(a)*r2]);b.push([x+Math.cos(a)*r1,y-h/2,z+Math.sin(a)*r1])}for(let i=0;i<n;i++){let j=(i+1)%n;this.quad(t[i],b[i],b[j],t[j],color)}for(let i=1;i<n-1;i++){this.tri(t[0],t[i],t[i+1],color);this.tri(b[0],b[i+1],b[i],color)}}cone(x,y,z,r,h,color,n=6){let tip=[x,y+h/2,z],base=[];for(let i=0;i<n;i++){let a=i*2*Math.PI/n;base.push([x+Math.cos(a)*r,y-h/2,z+Math.sin(a)*r])}for(let i=0;i<n;i++){let j=(i+1)%n;this.tri(base[i],tip,base[j],color)}}sphere(x,y,z,r,color,rings=4,segs=7){for(let j=0;j<rings;j++){let p0=-Math.PI/2+Math.PI*j/rings,p1=-Math.PI/2+Math.PI*(j+1)/rings;for(let i=0;i<segs;i++){let a0=i*2*Math.PI/segs,a1=(i+1)*2*Math.PI/segs;function pp(p,a){return [x+r*Math.cos(p)*Math.cos(a),y+r*Math.sin(p),z+r*Math.cos(p)*Math.sin(a)]}this.quad(pp(p0,a0),pp(p1,a0),pp(p1,a1),pp(p0,a1),color)}}}
}
let seed=77;function rand(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}function pick(arr){return arr[Math.floor(rand()*arr.length)]}
function pine(g,x,z,scale=1,dead=false){g.cylinder(x,.62*scale,z,.09*scale,.06*scale,1.25*scale,C.trunk,6);for(let i=0;i<3;i++){let green=dead?pick(['#a88b5d','#927a51','#b5a07a']):pick([C.pine,C.pine2,C.pine3]);g.cone(x,1.05*scale+i*.32*scale,z,(.64-i*.15)*scale,1.00*scale,green,7)}}function broad(g,x,z,scale=1,dead=false){g.cylinder(x,.7*scale,z,.11*scale,.09*scale,1.42*scale,C.trunk,6);let col=dead?'#967c58':pick([C.leaf,C.leaf2,C.pine2]);g.sphere(x,1.62*scale,z,.75*scale,col,4,7);g.sphere(x-.37*scale,1.4*scale,z-.26*scale,.45*scale,col,4,7);g.sphere(x+.36*scale,1.41*scale,z+.27*scale,.46*scale,col,4,7)}function rocks(g,x,z,s=1){g.cone(x,.28*s,z,.54*s,.65*s,pick([C.rock,'#c1c2a9','#899c92']),5);g.cone(x+.4*s,.19*s,z+.18*s,.3*s,.4*s,C.rock,5)}function hut(g,x,z){g.box(x,.58,z,1.13,1.0,1.1,'#f9ecd0','#edcf9d','#e0bf91');g.cone(x,1.5,z,.93,.85,C.roof,4);g.box(x,.63,z+.567,.24,.5,.055,'#5d8174','#5d8174');g.box(x+.36,.8,z+.565,.22,.25,.05,'#78aac5','#78aac5')}

function meshWorld(id='forest',stage=0,sim={caseIndex:0,outcome:'idle',elapsed:0}){
seed=77;
if(id!=='forest') return buildDisasterWorld(id,sim,{Geometry});
const g=new Geometry();
const tiles=[];
for(let i=-6;i<=6;i++)for(let j=-4;j<=4;j++){
 const edge=(i*i)/(6.6*6.6)+(j*j)/(4.8*4.8);if(edge>1)continue;
 const rv=rand(), yy=(rv-.5)*.12, col=pick([C.grass,C.grass1,C.grass2]);
 g.box(i*.71,-.42+yy,j*.71,.70,.81,.70,col,pick([C.soil,C.soilLight]),C.soilDark);
 if(rand()>.91)g.box(i*.71,.08+yy,j*.71,.23,.07,.25,'#6aaf4e',C.grass,C.grass);
}
for(let i=-5;i<=5;i++){g.box(i*.7,.065,-1.8,.7,.1,.46,'#d9c49f','#d1b28b','#c9a57b');}
// Forest is dense yet deliberately keeps an exposed peatland section for the learning scenario.
for(let i=0;i<22;i++){
 let x=rand()*8.0-4,z=rand()*4.7-2.35;
 if(x>-3&&x<-.5&&z>-2.3&&z<-.5)continue;
 if(x>.7&&x<2.7&&z>-1.6&&z<.35)continue;
 (i%3===0?broad:pine)(g,x,z,.65+rand()*.42,false);
}
hut(g,-3,1.45);rocks(g,2.8,1.6,.8);
// Local water basin, planted conservation zone, exposed peat patch.
g.box(-2.7,.12,-.3,1.3,.07,1.1,'#5bbec3','#439da6','#4faaa8');
g.box(1.65,.04,-.28,2.15,.07,1.6,'#a58a62','#927552','#835f46');
for(let i=0;i<8;i++){let x=-1.2+rand()*2,z=.4+rand()*1.2;pine(g,x,z,.3+rand()*.25)}
// Information tower / observation station in the safe part of the scene.
g.box(-3.8,.54,-1.05,.9,1.0,.75,'#f5f5df','#d6e1cd','#c7d8bd');g.box(-3.8,1.14,-1.05,1.0,.15,.87,'#59947a','#48785f','#3d6c55');
g.box(-3.76,1.72,-1.05,.07,1.2,.08,'#f5f0dc','#e9e8d1','#e9e8d1');
// Satellites provide anomaly signals. An abstract marker, not a confirmed fire.
if(sim.caseIndex===0){
 let wave=.09*Math.sin(sim.elapsed*.004);
 g.cylinder(1.6,1.06+wave,-.25,.37,.37,.08,sim.outcome==='unsafe'?'#e0763e':'#e6ba5d',10);
 g.cone(1.6,1.34+wave,-.25,.18,.55,sim.outcome==='safe'?'#75ae61':'#f1b24b',7);
 for(let n=0;n<4;n++){let a=n*Math.PI/2+sim.elapsed*.0007;g.box(1.6+Math.cos(a)*.61,.11,-.25+Math.sin(a)*.61,.11,.03,.12,sim.outcome==='unsafe'?'#ec9159':'#f0d887');}
}
// Fire and smoke levels are symbolic simulation states, not weather or predictive modelling.
let isBurning=sim.caseIndex>0;
let p=Math.max(0,Math.min(1,sim.elapsed/3100));
let isUnsafe=sim.outcome==='unsafe',isSafe=sim.outcome==='safe';
let fireStrength=isBurning ? (isSafe?Math.max(0,.9-p*.92):isUnsafe?.85+p*.9:.92):0;
if(isBurning && fireStrength>.02){
 const count=Math.max(1,Math.round(4+fireStrength*8));
 for(let i=0;i<count;i++){
  let x=1.05+(i%4)*.42,z=-1.17+Math.floor(i/4)*.46;
  let f=.17+.1*Math.sin(sim.elapsed*.009+i*1.7);
  g.cone(x,.47+f,z,.16+fireStrength*.055,.65*fireStrength+f,pick(['#f9bd60','#f38d41','#dd5c31']),5);
  g.cone(x+.045,.38+f,z,.09,.39*fireStrength+f,'#f5de84',5);
  let smokeCount=Math.max(1,Math.round(fireStrength*3));
  for(let s=0;s<smokeCount;s++){
    let rise=(sim.elapsed*.00031+i*.23+s*.31)%1.4;
    g.sphere(x+.15*Math.sin(rise*4+i),1.05+rise*1.55,z+.12*Math.cos(rise*3+s),.15+rise*.13,pick(['#9b9c8b','#bab8aa','#a3a69d']),3,6);
  }
 }
}
// On a safe response: licensed crew drive to the scene and spray water; do not teach civilians to fight forest fires.
if(isSafe&&isBurning){
 let drive=Math.min(1,sim.elapsed/1250),tx=-4.5+drive*4.6,tz=-1.8;
 // Truck body, chassis, roof and wheel silhouettes.
 g.box(tx,.34,tz,1.15,.48,.58,'#edeee7','#d75f42','#a14f3a');
 g.box(tx+.34,.67,tz,.43,.35,.6,'#f0f3e7','#dfe5d9','#d2d8cf');
 g.box(tx-.36,.67,tz,.54,.26,.59,'#d75339','#c94c36','#b2412e');
 g.box(tx-.25,.83,tz,.18,.1,.2,'#ffd778','#d7ab43','#d7ab43');
 for(let dx of [-.37,.43])for(let dz of [-.36,.36])g.sphere(tx+dx,.13,tz+dz,.17,'#2c4036',3,7);
 if(sim.elapsed>1450){let hose=Math.min(1,(sim.elapsed-1450)/800);for(let n=0;n<19;n++){
  const t=n/18*hose,x=tx+.25+(1.5)*t,y=.85+Math.sin(t*Math.PI)*(.9+.1*Math.sin(sim.elapsed*.009))-t*.28,z=tz+1.43*t;
  g.sphere(x,y,z,.06+(1-t)*.025,pick(['#a0e2e5','#65c8d3','#d8fbff']),3,6);
 }}
}
if(isUnsafe&&isBurning){for(let i=0;i<5;i++){let spread=p*(i*.36+.4);let x=2.1+(i%3)*.46*spread,z=-.8+Math.floor(i/3)*.52;g.cone(x,.41,z,.19,.5*spread,'#e96838',5)}}
return g;
}
export class WorldRenderer{
 constructor(canvas){
  this.canvas=canvas;this.yaw=.80;this.pitch=.75;this.distance=19;this.drag=false;this.last=[0,0];
  this.focusOffset=-.40;this.focusTarget=-.40;this.zoomOffset=1;this.zoomTarget=1;this.dockExpanded=false;
  this.caseIndex=1;this.world='forest';this.outcome='idle';this.simStart=performance.now();this.frame=0;
  this.gl=canvas.getContext('webgl2',{alpha:true,antialias:true,preserveDrawingBuffer:false});
  if(!this.gl){this.software=true;this.ctx=canvas.getContext('2d')}else this.setup();
  this.bind();this.resizeObserver=new ResizeObserver(()=>{this.fitCamera(false);this.render()});this.resizeObserver.observe(canvas);
  this.fitCamera(true);this.updateGeometry(performance.now());this.tick= this.tick.bind(this);this.tick(performance.now());
 }
 setup(){let gl=this.gl;
 const vs=`#version 300 es\nin vec3 aPos;in vec3 aNormal;in vec3 aColor;uniform mat4 uVP;out vec3 vColor;out float vLight;void main(){gl_Position=uVP*vec4(aPos,1.);vec3 light=normalize(vec3(.6,1.3,.8));vLight=.58+max(dot(normalize(aNormal),light),0.)*.41;vColor=aColor;}`;
 const fs=`#version 300 es\nprecision highp float;in vec3 vColor;in float vLight;out vec4 frag;void main(){frag=vec4(vColor*vLight,1.);}`;
 const sh=(type,src)=>{let s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s};
 let p=gl.createProgram();gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));
 this.program=p;this.attr=[gl.getAttribLocation(p,'aPos'),gl.getAttribLocation(p,'aNormal'),gl.getAttribLocation(p,'aColor')];this.uVP=gl.getUniformLocation(p,'uVP');gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
 }
 fitCamera(reset){
  const r=this.canvas.getBoundingClientRect();
  const aspect=Math.max(.25,r.width/Math.max(1,r.height));
  const fov=Math.PI/3.6,hfov=Math.atan(Math.tan(fov/2)*aspect);
  // Zoom fits the entire diorama even at sideways rotations. The new
  // compact HUD means the default camera can frame it much closer.
  const zoomRatio=this.minDistance?this.distance/this.minDistance:1.045;
  this.minDistance=Math.max(10.2,5.65/Math.sin(hfov),3.9/Math.sin(fov/2));
  this.maxDistance=this.minDistance*2.4;
  this.distance=Math.min(this.maxDistance,Math.max(this.minDistance,this.minDistance*(reset?1.045:zoomRatio)));
 }
 setDockExpanded(expanded){
  this.dockExpanded=!!expanded;
  // Smoothly move and fit the diorama above the taller drawer.
  this.focusTarget=expanded?-1.3:-.40;
  this.zoomTarget=expanded?1.17:1;
 }
 setScenario(world='forest',outcome='idle',stage=0){
  this.world=world;this.caseIndex=world==='forest'?stage:0;this.outcome=outcome;this.simStart=performance.now();this.updateGeometry(this.simStart);this.render();
 }
 updateGeometry(t){
  const geo=meshWorld(this.world,0,{caseIndex:this.caseIndex,outcome:this.outcome,elapsed:t-this.simStart});
  if(!this.gl){this.geo=geo;return}
  let gl=this.gl;this.count=geo.p.length/3;
  if(!this.buffers)this.buffers=[gl.createBuffer(),gl.createBuffer(),gl.createBuffer()];
  [geo.p,geo.n,geo.c].forEach((arr,i)=>{gl.bindBuffer(gl.ARRAY_BUFFER,this.buffers[i]);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(arr),gl.DYNAMIC_DRAW)});
 }
 resize(){const r=this.canvas.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,1.8),w=Math.max(2,Math.round(r.width*dpr)),h=Math.max(2,Math.round(r.height*dpr));if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;if(this.gl)this.gl.viewport(0,0,w,h)}}
 matrix(){
  const aspect=this.canvas.width/Math.max(1,this.canvas.height),distance=this.distance*this.zoomOffset;
  const shift=this.focusOffset;
  const y=Math.sin(this.pitch)*distance,x=Math.cos(this.pitch)*distance*Math.sin(this.yaw),z=Math.cos(this.pitch)*distance*Math.cos(this.yaw);
  return mul(persp(Math.PI/3.6,aspect,.1,100),viewMat([x,y+shift,z],[0,.2+shift,0]));
 }
 render(){this.resize();if(!this.gl){this.renderSoftware();return}const gl=this.gl;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);if(!this.buffers)return;gl.useProgram(this.program);gl.uniformMatrix4fv(this.uVP,false,this.matrix());this.buffers.forEach((b,i)=>{gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.enableVertexAttribArray(this.attr[i]);gl.vertexAttribPointer(this.attr[i],3,gl.FLOAT,false,0,0)});gl.drawArrays(gl.TRIANGLES,0,this.count)}
 renderSoftware(){if(!this.geo||!this.ctx)return;const w=this.canvas.width,h=this.canvas.height,ctx=this.ctx;ctx.clearRect(0,0,w,h);const vp=this.matrix(),p=this.geo.p,n=this.geo.n,c=this.geo.c,polys=[];
  const project=i=>{const X=p[i],Y=p[i+1],Z=p[i+2],cx=vp[0]*X+vp[4]*Y+vp[8]*Z+vp[12],cy=vp[1]*X+vp[5]*Y+vp[9]*Z+vp[13],cz=vp[2]*X+vp[6]*Y+vp[10]*Z+vp[14],cw=vp[3]*X+vp[7]*Y+vp[11]*Z+vp[15];if(cw<=.1)return null;return [(cx/cw*.5+.5)*w,(-cy/cw*.5+.5)*h,cz/cw]};
  for(let i=0;i<p.length;i+=9){const v1=project(i),v2=project(i+3),v3=project(i+6);if(!v1||!v2||!v3)continue;const l=Math.max(.54,Math.min(1.03,.64+.37*(n[i]*.5+n[i+1]*.85+n[i+2]*.7))),col=[0,1,2].map(j=>Math.min(255,Math.round(c[i+j]*255*l)));polys.push([(v1[2]+v2[2]+v3[2])/3,v1,v2,v3,`rgb(${col.join(',')})`]);}
  polys.sort((a,b)=>b[0]-a[0]);for(const it of polys){ctx.fillStyle=it[4];ctx.beginPath();ctx.moveTo(it[1][0],it[1][1]);ctx.lineTo(it[2][0],it[2][1]);ctx.lineTo(it[3][0],it[3][1]);ctx.closePath();ctx.fill()}
 }
 tick(t){
  if(!this.lastFrame||t-this.lastFrame>(this.software?230:75)){
   this.lastFrame=t;
   this.focusOffset+=(this.focusTarget-this.focusOffset)*.30;
   this.zoomOffset+=(this.zoomTarget-this.zoomOffset)*.30;
   this.updateGeometry(t);this.render();
  }
  requestAnimationFrame(this.tick);
 }
 bind(){const c=this.canvas;c.addEventListener('pointerdown',e=>{if(e.button!==0)return;this.drag=true;this.last=[e.clientX,e.clientY];c.setPointerCapture(e.pointerId)});c.addEventListener('pointermove',e=>{if(!this.drag)return;this.yaw+=(e.clientX-this.last[0])*.008;this.pitch=Math.min(1.25,Math.max(.27,this.pitch+(e.clientY-this.last[1])*.006));this.last=[e.clientX,e.clientY];this.render()});
 c.addEventListener('pointerup',()=>{this.drag=false});c.addEventListener('pointercancel',()=>{this.drag=false});c.addEventListener('wheel',e=>{e.preventDefault();this.zoom(e.deltaY>0?1:-1)},{passive:false});c.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){this.zoom(-1);e.preventDefault()}else if(e.key==='-'){this.zoom(1);e.preventDefault()}else if(e.key.startsWith('Arrow')){this.yaw+=(e.key==='ArrowLeft'?-1:e.key==='ArrowRight'?1:0)*.1;this.pitch=Math.min(1.25,Math.max(.27,this.pitch+(e.key==='ArrowDown'?.1:e.key==='ArrowUp'?-.1:0)));this.render();e.preventDefault()}})}
 zoom(direction){this.fitCamera(false);this.distance=Math.min(this.maxDistance,Math.max(this.minDistance,this.distance+direction*this.minDistance*.09));this.render()}
 reset(){this.yaw=.80;this.pitch=.75;this.fitCamera(true);this.render()}
}
