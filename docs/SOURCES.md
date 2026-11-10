# Sources and data use

SAVE LIFE uses references to inform education. The current prototype does **not** stream live hazard data.

- BMKG — Kebakaran Hutan dan Lahan: https://www.bmkg.go.id/cuaca/karhutla
- BMKG SPARTAN: https://spartan.bmkg.go.id/
- Kementerian Kehutanan — SiPongi+: https://sipongi.gakkum.kehutanan.go.id/
- NASA FIRMS — Satellite fire/hotspot data: https://firms.modaps.eosdis.nasa.gov/
- BNPB — Disaster risk and preparedness: https://bnpb.go.id/
- BNPB InaRISK: https://inarisk.bnpb.go.id/
- WHO — Wildfires and Health: https://www.who.int/news-room/fact-sheets/detail/wildfires-and-health
- UNESCO — Greening Curriculum: https://www.unesco.org/en/sustainable-development/education/greening-future/curriculum
- UNEP — Environmental education and conservation: https://www.unep.org/

## Evidence vs simulation
A detected hotspot is an observed thermal anomaly; it may not establish a confirmed wildfire. Fictional lessons and simulation indicators are explicitly presented as illustrative. Do not use this prototype to decide on evacuation or emergency response.

When implementing a live public data integration, document the provider, observation timestamp, spatial coverage, API terms, caching policy and uncertainty. Present official advisories prominently and do not silently convert satellite observations into safety instructions.

## Visual assets
The low-poly procedural scene and the five GLB island models are original programmatic creations; no external 3D assets were copied from visual references. Regenerate them using `python assets-3d/build_models.py` after installing `numpy` and `trimesh`.
