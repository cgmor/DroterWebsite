import { ReactNode } from "react";
import TMJLocationDiagram from "./TMJLocationDiagram";
import OsteoarthritisDiagram from "./OsteoarthritisDiagram";

export const conditionDiagrams: Record<string, ReactNode> = {
  osteoarthritis: (
    <>
      <TMJLocationDiagram />
      <OsteoarthritisDiagram />
    </>
  ),
};
