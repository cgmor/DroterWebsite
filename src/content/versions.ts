/** The design versions under review. Shared by the review index and the review bar. */
export const versions = [
  {
    id: "v1",
    number: 1,
    name: "Airway Bite first",
    idea: "Opens on the device at product scale: the airway story, the rotating 3D model in detail, then the education and the man behind it.",
  },
  {
    id: "v2",
    number: 2,
    name: "Dr. Droter first",
    idea: "Opens on Dr. Droter and his diagnostic approach. The Airway Bite is presented as his chairside technique, with his lectures close behind.",
  },
  {
    id: "v3",
    number: 3,
    name: "Education first",
    idea: "Opens on TMD itself: 190+ causes, the joint, and the common conditions in layers. The Airway Bite follows within the first scroll.",
  },
] as const;

export const versionPages = [
  { slug: "", label: "Home" },
  { slug: "airway-bite", label: "Airway Bite" },
  { slug: "understanding-tmd", label: "Understanding TMD" },
  { slug: "conditions", label: "Conditions" },
  { slug: "library", label: "Library" },
  { slug: "about", label: "About" },
] as const;

export type VersionId = (typeof versions)[number]["id"];
