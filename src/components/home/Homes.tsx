import { education } from "@/content/aps";
import AirwayBiteInDetail from "@/components/site/AirwayBiteInDetail";
import HowFarForward from "@/components/site/HowFarForward";
import type { VersionId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section } from "@/components/site/Section";
import AboutDroter from "./AboutDroter";
import { Advantages, AirwayBand, AirwayBridge, AppliancesBlock, TutorialSection, TutorialTeaser } from "./Airway";
import Approach from "./Approach";
import { ConditionGallery, ConditionIndex, ConditionRows, ConditionsSection } from "./Conditions";
import { DiagnosisTurn, NotOneDisease } from "./Education";
import { DeviceHero, JointHero, PortraitHero } from "./Heroes";
import Library from "./Library";
import s from "./home.module.css";

/** The light-touch Bowie panel that closes every home. `flush` when the section above is also white. */
function PracticeClose({ flush }: { flush?: boolean }) {
  return (
    <Section space="md" flush={flush ? "top" : undefined}>
      <PracticePanel />
    </Section>
  );
}

/**
 * V1, Airway Bite first. The device at product scale, the airway story, the
 * device in detail, the kit and his advantages, the tutorial. Then a decisive
 * turn to the diagnosis ("TMD and Facial Pain"): the thesis and the counts,
 * the conditions, the appliance guide, the man, his library, his practice.
 */
export function HomeV1({ v }: { v: VersionId }) {
  return (
    <>
      <DeviceHero />
      <HowFarForward />
      <AirwayBiteInDetail />
      <Advantages v={v} />
      <TutorialSection v={v} />
      <DiagnosisTurn v={v} />
      <ConditionsSection v={v}>
        <ConditionRows v={v} />
      </ConditionsSection>
      <AppliancesBlock v={v} />
      <AboutDroter v={v} />
      <Library v={v} />
      <PracticeClose flush />
    </>
  );
}

/**
 * V2, Dr. Droter first. The man and his thesis, with the Airway Bite in the
 * same view; his diagnostic approach (three types of pain, palpation, the
 * numbers); then the device as his technique, his lectures, the conditions,
 * the appliance guide, his practice.
 */
export function HomeV2({ v }: { v: VersionId }) {
  return (
    <>
      <PortraitHero v={v} />
      <Approach v={v} />
      <AirwayBridge v={v} />
      <AirwayBiteInDetail />
      <TutorialTeaser v={v} />
      <Library v={v} tone="mist" featured />
      <ConditionsSection v={v} tone="white">
        <ConditionIndex v={v} />
      </ConditionsSection>
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
 */
export function HomeV3({ v }: { v: VersionId }) {
  return (
    <>
      <JointHero v={v} />
      <AirwayBand v={v} />
      <NotOneDisease v={v} />
      <ConditionsSection v={v} after={<p className={s.patientsLine}>{education.patientsLine}</p>}>
        <ConditionGallery v={v} />
      </ConditionsSection>
      <AirwayBiteInDetail />
      <Library v={v} />
      <AboutDroter v={v} />
      <PracticeClose />
    </>
  );
}
