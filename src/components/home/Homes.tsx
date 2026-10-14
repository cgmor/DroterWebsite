import AirwayBiteInDetail from "@/components/site/AirwayBiteInDetail";
import HowFarForward from "@/components/site/HowFarForward";
import type { VersionId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section } from "@/components/site/Section";
import AboutDroter from "./AboutDroter";
import { Advantages, AirwayBand, AirwayBridge, AppliancesBlock, TutorialSection, TutorialTeaser } from "./Airway";
import Approach from "./Approach";
import { ConditionCards, ConditionGallery, ConditionsSection } from "./Conditions";
import { DiagnosisTurn, NotOneDisease } from "./Education";
import { DeviceHero, JointHero, PortraitHero } from "./Heroes";
import Library from "./Library";
import Orientation, { founder } from "./Orientation";

/**
 * The light-touch Bowie panel that closes every home: a mist panel on a white
 * band. `flush` when the band above is also white, so the two read as one.
 */
function PracticeClose({ flush }: { flush?: boolean }) {
  return (
    <Section space="md" flush={flush ? "top" : undefined}>
      <PracticePanel />
    </Section>
  );
}

/*
 * Band rhythm, the same on every home: the hero and the device "in detail"
 * sit on porcelain (the animation's own grey); night appears once, for the
 * airway; every other band alternates white and mist, ending on a white
 * band whose mist practice panel hands over to the mist footer.
 */

/**
 * V1, Airway Bite first. One story: the device; what ArrowPath Sleep is and
 * who it is for; the Airway Bite (how far forward, in detail, the kit, the
 * tutorial); then the diagnosis behind it (TMD, the conditions, the right
 * night guard); the man, his literature, his practice.
 *
 *   porcelain · white · night · porcelain · white · mist · white · mist ·
 *   white · mist · white (+ practice) · footer mist
 */
export function HomeV1({ v }: { v: VersionId }) {
  return (
    <>
      <DeviceHero />
      <Orientation v={v} />
      <HowFarForward />
      <AirwayBiteInDetail />
      <Advantages v={v} />
      <TutorialSection v={v} />
      <DiagnosisTurn v={v} />
      <ConditionsSection>
        <ConditionCards v={v} />
      </ConditionsSection>
      <AppliancesBlock v={v} />
      <AboutDroter v={v} story={founder.slice(1, -1).join(" ")} />
      <Library v={v} />
      <PracticeClose flush />
    </>
  );
}

/**
 * V2, Dr. Droter first. The man and his thesis, with the Airway Bite in the
 * same view; his diagnostic approach (three types of pain, palpation, the
 * numbers); then the device as his technique, the tutorial, the conditions,
 * his lectures, the appliance guide, his practice.
 *
 *   porcelain · white · mist · white · night · porcelain · white · mist ·
 *   white · mist · white (+ practice) · footer mist
 */
export function HomeV2({ v }: { v: VersionId }) {
  return (
    <>
      <PortraitHero v={v} />
      <Approach v={v} />
      <AirwayBridge v={v} />
      <AirwayBiteInDetail />
      <TutorialTeaser v={v} />
      <ConditionsSection>
        <ConditionCards v={v} />
      </ConditionsSection>
      <Library v={v} featured />
      <AppliancesBlock v={v} tone="mist" />
      <PracticeClose />
    </>
  );
}

/**
 * V3, Education first. The joint, healthy and damaged, under "The Many Causes
 * of Facial Pain", with a way in for patients and for dentists; the Airway
 * Bite band within the first scroll; then "TMD is not one disease", the
 * condition guides with his slides, the device in detail, the library, the
 * man, the practice. (The signs checklist is not his wording yet, so it lives
 * on /understanding-tmd only.)
 *
 *   porcelain · night · white · mist · porcelain · white · mist ·
 *   white (+ practice) · footer mist
 */
export function HomeV3({ v }: { v: VersionId }) {
  return (
    <>
      <JointHero v={v} />
      <AirwayBand v={v} />
      <NotOneDisease v={v} />
      <ConditionsSection>
        <ConditionGallery v={v} />
      </ConditionsSection>
      <AirwayBiteInDetail />
      <Library v={v} />
      <AboutDroter v={v} />
      <PracticeClose />
    </>
  );
}
