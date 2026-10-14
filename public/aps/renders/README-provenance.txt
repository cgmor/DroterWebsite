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

The device-airway-bite-*.png renders predate this note; their PNG metadata
records a Blender Cycles render (192 samples) dated 2026-10-13.
