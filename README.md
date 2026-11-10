# SAVE LIFE — Green Generation

**Interactive environmental education prototype built with Astro and original procedural 3D scenes.**

**Live:** https://savelife-zeta.vercel.app  
**GitHub:** https://github.com/Darren0099/savelife

## About
Five educational worlds introduce forest-fire prevention and haze safety, flood awareness, waste reduction, climate literacy, and biodiversity. Forest Guardian contains three playable missions that teach the learner to read, decide and reflect.

This is a classroom-oriented concept prototype, **not** a live environmental-monitoring service or an official government application.

## Features
- Lightweight procedural low-poly islands, interactive rotation and zoom
- WebGL2 rendering with Canvas 2D fallback
- Five worlds and branching educational missions
- Explanations for right and wrong answers, XP rewards
- Progress saved in the browser via localStorage
- Mobile-responsive design and reduced-motion CSS
- Original 3D model exports under `assets-3d/*.glb`

## Getting started
Requires Node.js 20 or later.

```bash
git clone https://github.com/Darren0099/savelife.git
cd savelife
npm install
npm run dev
```

Open http://localhost:4321.

```bash
npm run build
npm run preview
```

## Source structure
- `src/pages/index.astro` — Astro page with self-contained HTML, styles, procedural world renderer and client-side gameplay
- `public/offline-all-in-one.html` — standalone demo without Astro build, available at `/offline-all-in-one.html`
- `assets-3d/*.glb` — original exported island models
- `assets-3d/build_models.py` — deterministic asset generator
- `.github/workflows/generate-3d.yml` — regenerates and commits the GLB exports
- `docs/PRODUCT_BRIEF.md` — audience, research hypothesis, MVP scope and planned evaluation
- `docs/SOURCES.md` — reference sources and responsible data use

## Rebuild 3D assets (optional)
```bash
python -m pip install numpy trimesh
python assets-3d/build_models.py
```

The live website currently renders the procedural scene; the GLB exports are reusable 3D assets for subsequent versions.

## Safety and limitations
- The health/index indicators and game states are **simulated**, not live measurements.
- A satellite hotspot is not necessarily a confirmed fire.
- This is not an emergency warning or evacuation system. Follow local authorities in an actual emergency.
- No learner account or sensitive personal data is collected for the MVP.
- Before use in schools, validate content with educators, test with students, and review WCAG 2.2 AA usability.
