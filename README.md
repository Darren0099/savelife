# SaveLife — Interactive Disaster Lab 3D

A visual, scenario-driven disaster education prototype for Indonesian learners. Built with **Astro 5**, **vanilla JavaScript**, and an original **low-poly procedural WebGL2 renderer** (with a Canvas 2D fallback). It does not require a 3D asset CDN or API keys.

## Five worlds / seven missions

| World | Illustrated environment | Decisions and effects |
| --- | --- | --- |
| Forest Guardian | Peatland, trees, watch tower, fire crew | Hotspot verification, firefighting response, haze |
| Coastal Escape | Coastal town, shoreline, lighthouse, elevated refuge | Tsunami wave, evacuation path |
| Rising Waters | Riverside neighborhood, bridge and roads | Rising floodwater, rescue boat, flooded homes |
| Ground Motion | Urban blocks and gathering area | Building shake, road cracks, debris |
| Slope Alert | Terraced hillside and houses below | Slope fracture, moving soil and debris |

Scenes and visual consequences are **illustrations**, not scientific hazard prediction. Each mission links to a primary public education/reference source.

## Install

```bash
npm install
npm run dev
npm run build
```

## UX controls

- Select a world with the top hazard selector.
- Drag/swipe the 3D world to rotate; mousewheel or camera controls to zoom.
- Read the small bottom mission HUD and choose an action.
- Watch the corresponding environment react; retry or continue to the next mission.
- Earn XP for safe choices. Completion is stored only in localStorage.
- On older devices without WebGL2, the app attempts a Canvas 2D fallback.

## Core files

- `src/pages/index.astro` — accessible full-viewport layout
- `public/styles.css` — responsive HUD and color treatments
- `public/game.js` — seven scenarios, progress and decisions
- `public/scene.js` — shared GPU renderer and original forest world
- `public/disaster-scenes.js` — four new procedural disaster dioramas

## Safety and limitations

SaveLife is not a warning system, mapping of actual hazard zones, official evacuation route planner, or a substitute for instructions from BMKG, BNPB, BPBD, and local authorities. Example scenes intentionally use stylized terrain rather than real places, time scales, elevations or numerical flood and wave depths. Do not use the depicted movement, water paths or safety markers to make operational decisions.

## References

- BMKG: https://www.bmkg.go.id/gempabumi/mitigasi/antisipasi-gempabumi
- BMKG tsunami education: https://www.bmkg.go.id/gempabumi/mitigasi/edukasi-gempabumi-tsunami
- BNPB InaRISK: https://inarisk.bnpb.go.id/
- BMKG SPARTAN: https://spartan.bmkg.go.id/
- NASA FIRMS: https://firms.modaps.eosdis.nasa.gov/
- WHO wildfires: https://www.who.int/news-room/fact-sheets/detail/wildfires-and-health
