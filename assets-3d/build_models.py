"""Rebuild the five original low-poly GLB islands for Save Life.
Requires: pip install numpy trimesh
Run: python assets-3d/build_models.py
"""
from pathlib import Path
import numpy as np
import trimesh

ROOT=Path(__file__).resolve().parent
COLORS={'soil':(120,78,48,255),'grass':(133,192,94,255),'pine':(52,137,85,255),'leaf':(89,162,94,255),'trunk':(130,86,52,255),'water':(68,173,195,255),'cream':(249,226,182,255),'roof':(217,135,89,255),'gold':(245,187,91,255),'wind':(239,241,229,255),'rock':(154,166,150,255),'fire':(237,105,60,255),'bin':(65,163,118,255),'solar':(59,106,144,255)}
def box(size,pos,col):
 m=trimesh.creation.box(extents=size);m.apply_translation(pos);m.visual.vertex_colors=COLORS[col];return m
def cylinder(radius,height,pos,col,sections=8):
 m=trimesh.creation.cylinder(radius=radius,height=height,sections=sections);m.apply_translation(pos);m.visual.vertex_colors=COLORS[col];return m
def cone(radius,height,pos,col,sections=7):
 m=trimesh.creation.cone(radius=radius,height=height,sections=sections);m.apply_translation(pos);m.visual.vertex_colors=COLORS[col];return m
def sphere(radius,pos,col):
 m=trimesh.creation.icosphere(subdivisions=1,radius=radius);m.apply_translation(pos);m.visual.vertex_colors=COLORS[col];return m
def construct(kind):
 rng=np.random.default_rng(2401);scene=trimesh.Scene();n=0
 def add(mesh):
  nonlocal n;n+=1;scene.add_geometry(mesh,node_name=f'{kind}_{n:03d}')
 for i in range(-6,7):
  for j in range(-4,5):
   if (i/6.6)**2+(j/4.8)**2>1:continue
   add(box((.70,.78,.70),(i*.71,-.40,j*.71),'grass' if kind!='water' or abs(j+.3*i)>1 else 'water'))
   add(box((.70,.53,.70),(i*.71,-.77,j*.71),'soil'))
 def pine(x,z,s=1):
  add(cylinder(.08*s,.9*s,(x,.6*s,z),'trunk'))
  for k in range(3):add(cone((.58-.13*k)*s,.85*s,(x,(1+.3*k)*s,z),'pine'))
 def broad(x,z,s=1):
  add(cylinder(.09*s,1.1*s,(x,.72*s,z),'trunk'))
  add(sphere(.62*s,(x,1.55*s,z),'leaf'))
 def house(x,z):
  add(box((1,.8,1),(x,.52,z),'cream'));add(cone(.81,.68,(x,1.27,z),'roof',sections=4))
 if kind=='forest':
  for k in range(17):
   x=float(rng.uniform(-4,4));z=float(rng.uniform(-2.5,2.5))
   if x<-2 and z>0:continue
   (pine if k%3 else broad)(x,z,float(rng.uniform(.62,.9)))
  house(-3,1.3);add(cone(.6,.7,(2.5,.4,-.7),'rock'));add(cylinder(.6,.07,(2.6,.09,1.5),'water'))
 if kind=='water':
  for k in range(10):
   x=float(rng.uniform(-4,4));z=float(rng.uniform(-2.4,2.4))
   if abs(z+.3*x)>1.2:pine(x,z,.8)
  house(-3,1.3);house(3,-1.5)
 if kind=='waste':
  for k in range(8):pine(float(rng.uniform(-4,4)),float(rng.uniform(-2.2,2.2)),.68)
  for x,col in [(-1.25,'bin'),(0,'gold'),(1.25,'water')]:
   add(box((.8,.85,.8),(x,.55,0),col));add(box((.89,.12,.86),(x,1.05,0),'soil'))
 if kind=='climate':
  for k in range(9):pine(float(rng.uniform(-4,4)),float(rng.uniform(-2.4,2.4)),.68)
  for x in [-1.9,.4,2.4]:
   add(cylinder(.07,2.4,(x,1.2,-.4),'wind'));add(box((1.6,.10,.12),(x,2.37,-.4),'wind'));add(box((.12,.10,1.6),(x,2.37,-.4),'wind'))
  for k in range(5):add(box((.40,.08,.6),(-3+k*.46,.16,1.6),'solar'))
 if kind=='earth':
  for k in range(25):
   x=float(rng.uniform(-4,4));z=float(rng.uniform(-2.3,2.3))
   (pine if k%2 else broad)(x,z,float(rng.uniform(.6,.95)))
  add(cylinder(.6,.08,(2.9,.11,1.5),'water'))
 path=ROOT/f'{kind}_guardian_island.glb';path.write_bytes(scene.export(file_type='glb'))
 print(path.name,path.stat().st_size,'bytes',n,'objects')
if __name__=='__main__':
 for kind in ['forest','water','waste','climate','earth']:construct(kind)
