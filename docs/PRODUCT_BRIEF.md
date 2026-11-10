# SAVE LIFE — Green Generation: Product Brief

## Purpose
An Astro-based educational prototype for Indonesian students (particularly ages 13–18) to explore environmental risks through short lessons, branching decisions and reusable 3D environments.

**Important:** This is a civic/environmental education prototype, not a government application or an emergency warning platform.

## Problem hypothesis
Environmental risks such as forest and peatland fires, floods and air pollution affect communities; students may benefit from interactive, local examples and simulated decisions rather than static articles alone. This hypothesis requires user validation.

## Pilot audience and location
- Students in middle and high schools in South Sumatra, Indonesia.
- Secondary users: educators, school clubs and youth communities.
- First learning module: Forest Guardian (karhutla and haze).

## Worlds
1. **Forest Guardian** — hotspot limitations, peatland protection, haze safety.
2. **Water Defender** — flood awareness and river protection.
3. **Waste Warrior** — waste reduction and sorting.
4. **Climate Hero** — climate literacy and energy.
5. **Earth Restorer** — habitats and biodiversity.

## Prototype learning cycle
Read a short concept → choose an action in a simulated scenario → inspect feedback → earn learning XP → reflect. XP and completed missions are stored in browser localStorage.

## MVP acceptance checks
- Interactive 3D low-poly forest works on supported desktop and mobile browsers, with graceful Canvas fallback.
- All five worlds render; Forest Guardian includes three core missions.
- A learner can complete a mission and receive a factual explanation.
- Progress survives a page reload in the same browser.
- Each safety-related lesson cites a reliable published source.
- No account, NIK, personal location, diagnosis or sensitive learner data is collected.

## Evaluation before expansion
Recruit ~8–12 students and 3–5 teachers for exploratory usability testing, with appropriate consent for minors. Compare understanding before and after lessons; track scenario reasoning rather than treating XP as a learning outcome.

## Content and safety caveats
- World-health scores are simulated values only.
- Satellite hotspots are not confirmed fires.
- Never suggest approaching or fighting fires to complete a game mission.
- The website does not provide real-time hazard advice. Follow local authorities in an actual emergency.
- Safety scripts should be reviewed by educators and relevant professionals before classroom use.

## Future iterations
Content management, teacher dashboard, accessibility review against WCAG 2.2 AA, classroom management, localized curriculum and responsible aggregation of public environmental datasets.
