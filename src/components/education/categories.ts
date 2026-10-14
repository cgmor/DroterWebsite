import { conditionCategories, conditionGuides, type ConditionGuide } from "@/content/tmd";

/** Anchor id for one of the seven categories, shared by /understanding-tmd and /conditions. */
export const categoryId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The seven categories in Dr. Droter's order, keeping only those that have guides. */
export function guidesByCategory(): { name: string; index: number; guides: ConditionGuide[] }[] {
  return conditionCategories
    .map((name, index) => ({ name, index, guides: conditionGuides.filter((g) => g.category === name) }))
    .filter((c) => c.guides.length > 0);
}
