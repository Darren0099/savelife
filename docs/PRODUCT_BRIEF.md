# SaveLife — Multi-Disaster 3D Learning / Product Brief

## Product intent
A full-screen interactive learning experience that uses five stylized low-poly disaster environments and short, contextual decisions instead of lengthy popups. Primary audience: Indonesian secondary school learners, educators and community groups.

## Current scope

- **Forest Guardian:** three existing missions, with hotspot, fire, haze and responder effects.
- **Coastal Escape:** coastal settlement, animated tsunami front, visible illustrative route to higher ground.
- **Rising Waters:** riverside town, animated rising water, flooded homes and rescue boat.
- **Ground Motion:** shaking buildings, road cracks, rubble and a post-shaking assembly area.
- **Slope Alert:** terraced hillside, soil fracture, moving debris and safe-distance route.

## Interaction
User selects a world, drags to orbit, answers a small decision card, observes the changed 3D environment, and receives concise evidence-linked feedback. XP/completions are saved locally without registration.

## Visual direction
References supplied by the user: Aerial-style pastel low-poly isometric islands, architectural miniature dioramas, a green sustainable city, and a connected curved-path landscape. Reference composition and art direction only; 3D geometry is original procedural code.

## Technical constraints
Astro static output on Vercel; no backend needed for this educational prototype. Shared WebGL2 renderer and Canvas2D fallback; device pixel ratio limited to avoid excessive GPU load; no downloaded 3D models required. Browser testing remains necessary across low-powered mobile GPUs.

## Non-goals and safety
No forecasting, terrain-accurate route planning, real hazard location, alerting, or operational safety instructions. Any simulated evacuation markers, shaking and water levels are illustrative only. Users must follow authorized agencies in a real disaster.

## Acceptance checklist
- All five environments render without console errors.
- Safe and unsafe answers produce different visible consequences.
- Mission progress persists after reload.
- Keyboard-accessible choices and camera buttons, readable in-app source links.
- Mobile HUD leaves the world navigable, with no oversized learning popup.
- No external API keys or personal-data collection.
- Build succeeds on Vercel and preview checked before merging.
