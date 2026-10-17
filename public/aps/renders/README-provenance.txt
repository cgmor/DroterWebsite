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

Re-rendered 2026-10-17 in Blender 5.1.1 (headless, Cycles, 192 samples,
denoised, 2000 x 2000 px transparent PNG) with the same script, camera, light
and "Clear resin" material as the 2026-10-15 renders. Only the geometry
changed:
  Airway Anterior Stop 4.0mm 3.88brush v4 no-hole.stl (2026-10-17 shape)
- 2026-10-15: the 3.88 mm through-bore was removed from the Airway Bite CAD
  ("no hole", the correct device).
- 2026-10-17: the front block that carried the bore was resized to match
  photographs of the physical device taken against a mm ruler. It is now a
  low plate at the underside: 9.18 mm wide (was 12.0), 1.91 mm tall (was
  6.6; its top is 1.9 mm below the top of the base), front face 0.13 mm
  further back. The midline groove is kept. The rest of the mesh is
  unchanged, and the framing is pinned to the 2026-10-15 mesh, so the rest
  of the device sits on the same pixels as before.
The same mesh is in /aps/3d/airway-bite.glb (same node, mesh name and
"Light grey resin" material; only the vertex data changed).
