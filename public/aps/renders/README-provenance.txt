APS renders: provenance

temp-anterior-stop-narrow.png
temp-anterior-stop-low-vert.png

Rendered 2026-10-14 in Blender 5.1.1 (headless, Cycles, 192 samples, denoised)
from the CAD GLBs in this repository:

  /aps/3d/temp-anterior-stop-narrow.glb   -> temp-anterior-stop-narrow.png
  /aps/3d/temp-anterior-stop-low-vert.glb -> temp-anterior-stop-low-vert.png

- Geometry and material come from the GLBs unchanged: "Light grey resin",
  base colour 0.62 / 0.645 / 0.68 (linear), roughness 0.38.
- Soft three-point studio light (key, fill, rim, plus a soft top light) and a
  dim neutral world, AgX view transform (Base Contrast look), exposure -0.9.
- Camera: rear three-quarter view (model-viewer orbit 150deg 56deg), 85 mm lens,
  framed with about 16% margin on each side.
- Output: 2000 x 1500 px transparent PNG, sRGB. No retouching or compositing.

Used as the poster and fallback image for the Temp Anterior Stop 3D stage
on /appliances (src/components/product/AnteriorStopModel.tsx).

device-airway-bite-three-quarter.png
device-airway-bite-side.png
device-airway-bite-top.png

Re-rendered 2026-10-15 in Blender 5.1.1 (headless, Cycles, 192 samples,
denoised, 2000 x 2000 px transparent PNG) with the same camera, light and
"Clear resin" material as the 2026-10-13 originals, from the Airway Bite CAD
with its 3.88 mm through-bore removed ("no hole", the correct device):
  Airway Anterior Stop 4.0mm 3.88brush v4 no-hole.stl
The same no-hole mesh is in /aps/3d/airway-bite.glb.
