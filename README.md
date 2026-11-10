# SAVE LIFE — Green Generation

**Astro-based 3D gamified environmental education prototype.**

Original procedural low-poly models are rendered with a lightweight custom WebGL2 renderer. The app also includes playable branch-choice lessons and persistent progress via `localStorage`.

## Run with Astro

```bash
npm install
npm run dev
```

Open the address printed by Astro (normally http://localhost:4321).

## Standalone preview, no npm required

The `demo/` directory is fully self-contained. From project root:

```bash
python -m http.server 8000 --directory demo
```

Open http://localhost:8000. Opening the HTML directly with `file://` is not recommended because browsers restrict ES module imports.

## Interactions

- Drag the forest with the mouse or trackpad to orbit the actual 3D geometry.
- Zoom with the scroll wheel or plus/minus buttons.
- Switch 5 worlds through world cards; all worlds render distinct original geometry.
- Complete three Forest Guardian missions and one mini lesson in each remaining world.
- Correct answers grant XP, update local storage and change world-health/progress UI.
- Open each original source reference from within a lesson.

## Architecture

- `src/pages/index.astro`: Astro-rendered page and semantic layout.
- `public/_preview.html`: optional direct static preview.
- `public/style.css`: layout and effects.
- `public/app.js`: missions, world switching, state, gamification.
- `public/scene3d.js`: procedural terrain, trees, low-poly islands and custom WebGL renderer.
- `demo/`: standalone development copy.
- `assets-3d/`: exported example GLB, usable in future 3D engines.

The Astro page directly renders the HTML and client-side app module. Future production refactor: move the large template into smaller Astro components and the WebGL layer into a dedicated island.

## Sources and safety

Education-only prototype. The forest-health index is illustrative, not live environmental telemetry, and is not validated for emergencies. The content links to BMKG, BMKG SPARTAN, NASA FIRMS, WHO, BNPB, UNESCO and UNEP. Do not use as a real-time warning or emergency response tool. NASA/VIIRS hotspots do not necessarily represent confirmed fires. Avoid user location/health data collection, especially for minors.

## Proposed next steps

1. Usability and learning efficacy pilot with educators and students.
2. Professional review of safety scripts.
3. Formal curriculum, content versioning and citation management.
4. WCAG 2.2 AA manual audit + keyboard screen-reader testing.
5. Production content architecture and optional backend for teacher accounts.