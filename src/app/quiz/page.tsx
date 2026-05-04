"use client";

import { useCallback, useEffect, useState } from "react";

interface Question {
  id: string;
  section: string;
  text: string;
  type: "yn" | "yna" | "choice" | "range";
  options?: string[];
}

const QUESTIONS: Question[] = [
  { id: "headaches", section: "Presenting Complaints", text: "Headaches", type: "yn" },
  { id: "neck_pain", section: "Presenting Complaints", text: "Neck Pain", type: "yn" },
  { id: "jaw_pain", section: "Presenting Complaints", text: "Jaw Pain", type: "yn" },
  { id: "ear_pain", section: "Presenting Complaints", text: "Ear Pain", type: "yn" },
  { id: "facial_pain", section: "Presenting Complaints", text: "Facial Pain", type: "yn" },
  { id: "bite_problems", section: "Presenting Complaints", text: "Bite Problems", type: "yn" },
  { id: "damaged_teeth", section: "Presenting Complaints", text: "Damaged Teeth", type: "yn" },
  { id: "sleep_problem", section: "Presenting Complaints", text: "Sleep Problem", type: "yn" },

  { id: "pain_freq", section: "Pain Profile", text: "Pain-free days per month", type: "range", options: ["0–5", "6–15", "16–25", "26–30"] },
  { id: "pain_duration", section: "Pain Profile", text: "How long have you had this pain?", type: "range", options: ["< 1 month", "1–6 months", "6–12 months", "> 1 year"] },
  { id: "pain_constant", section: "Pain Profile", text: "Is the pain constant?", type: "yn" },
  { id: "pain_aching", section: "Pain Profile", text: "Pain character: Aching", type: "yn" },
  { id: "pain_burning", section: "Pain Profile", text: "Pain character: Burning", type: "yn" },
  { id: "pain_stabbing", section: "Pain Profile", text: "Pain character: Stabbing", type: "yn" },
  { id: "pain_sharp", section: "Pain Profile", text: "Pain character: Sharp", type: "yn" },
  { id: "pain_dull", section: "Pain Profile", text: "Pain character: Dull", type: "yn" },
  { id: "worse_morning", section: "Pain Profile", text: "Worse in morning", type: "yn" },
  { id: "worse_afternoon", section: "Pain Profile", text: "Worse in afternoon", type: "yn" },
  { id: "worse_evening", section: "Pain Profile", text: "Worse in evening", type: "yn" },
  { id: "worse_night", section: "Pain Profile", text: "Worse at night", type: "yn" },
  { id: "pain_severity", section: "Pain Profile", text: "Pain severity", type: "range", options: ["Mild (1–3)", "Moderate (4–6)", "Severe (7–9)", "Worst (10)"] },

  { id: "discomfort_chew", section: "Jaw Function", text: "Discomfort when chewing", type: "yn" },
  { id: "chew_side", section: "Jaw Function", text: "Favored chewing side", type: "choice", options: ["Right", "Left", "Both"] },
  { id: "painful_swallow", section: "Jaw Function", text: "Difficult/painful to swallow", type: "yn" },
  { id: "discomfort_move_jaw", section: "Jaw Function", text: "Discomfort moving jaw", type: "yn" },
  { id: "discomfort_hard_food", section: "Jaw Function", text: "Discomfort chewing hard foods", type: "yn" },
  { id: "jaw_muscles_tired", section: "Jaw Function", text: "Jaw muscles get tired from chewing", type: "yn" },
  { id: "hurts_open_wide", section: "Jaw Function", text: "Hurts to open wide", type: "yn" },
  { id: "clicking_r", section: "Jaw Function", text: "Clicking/popping noise — Right", type: "yn" },
  { id: "clicking_l", section: "Jaw Function", text: "Clicking/popping noise — Left", type: "yn" },
  { id: "other_noises_r", section: "Jaw Function", text: "Other jaw noises — Right", type: "yn" },
  { id: "other_noises_l", section: "Jaw Function", text: "Other jaw noises — Left", type: "yn" },
  { id: "noise_changes", section: "Jaw Function", text: "Changes in noises/clicking over time", type: "yn" },

  { id: "cant_open_full", section: "Range of Motion", text: "Ever unable to open jaw fully", type: "yn" },
  { id: "wiggle_to_open", section: "Range of Motion", text: "Ever had to wiggle jaw to open", type: "yn" },
  { id: "stuck_open", section: "Range of Motion", text: "Jaw ever stuck open", type: "yn" },

  { id: "speech_changed", section: "Occlusal Changes", text: "Speech changed", type: "yn" },
  { id: "bite_changed", section: "Occlusal Changes", text: "Change in way teeth come together", type: "yn" },
  { id: "teeth_shifting", section: "Occlusal Changes", text: "Teeth shifting", type: "yn" },
  { id: "face_shape_changed", section: "Occlusal Changes", text: "Shape of face changed", type: "yn" },
  { id: "chin_shifted", section: "Occlusal Changes", text: "Chin shifted to one side", type: "yn" },

  { id: "hypersensitive_bite", section: "Bite", text: "Hyper-sensitive bite", type: "yn" },
  { id: "bite_uncomfortable", section: "Bite", text: "Bite uncomfortable", type: "yn" },
  { id: "search_bite_position", section: "Bite", text: "Have to search for comfortable bite position", type: "yn" },

  { id: "teeth_sore", section: "Parafunction", text: "Teeth sore or sensitive", type: "yn" },
  { id: "clench", section: "Parafunction", text: "Clench teeth", type: "yn" },
  { id: "grind", section: "Parafunction", text: "Grind teeth", type: "yn" },
  { id: "grind_timing", section: "Parafunction", text: "Grind/clench timing", type: "choice", options: ["Day", "Night", "Both", "Neither"] },

  { id: "trauma_jaw", section: "Trauma", text: "Trauma/injury to jaw", type: "yn" },
  { id: "trauma_head", section: "Trauma", text: "Trauma/injury to head", type: "yn" },
  { id: "trauma_neck", section: "Trauma", text: "Trauma/injury to neck / whiplash", type: "yn" },
  { id: "stitches_chin", section: "Trauma", text: "Stitches to chin", type: "yn" },

  { id: "get_headaches", section: "Headaches", text: "Gets headaches", type: "yn" },
  { id: "headache_freq", section: "Headaches", text: "Headache frequency", type: "range", options: ["Rarely", "Monthly", "Weekly", "Daily"] },

  { id: "vision_changes", section: "ENT", text: "Changes in vision", type: "yn" },
  { id: "visual_with_headache", section: "ENT", text: "Visual disturbances with headaches", type: "yn" },
  { id: "ear_problems", section: "ENT", text: "Ear problems", type: "yn" },
  { id: "dizziness", section: "ENT", text: "Dizziness", type: "yn" },
  { id: "ringing", section: "ENT", text: "Ringing in ears", type: "yn" },
  { id: "hearing_issues", section: "ENT", text: "Hearing issues", type: "yn" },
  { id: "lumps", section: "ENT", text: "Lumps in face/throat/neck", type: "yn" },
  { id: "mouth_breather", section: "ENT", text: "Mouth breather", type: "yn" },
  { id: "sinus_problems", section: "ENT", text: "Sinus problems", type: "yn" },

  { id: "trouble_sleeping", section: "Sleep", text: "Trouble sleeping", type: "yn" },
  { id: "feel_rested", section: "Sleep", text: "Feel rested on waking", type: "yn" },

  { id: "arthritis", section: "Systemic", text: "Has/had arthritis", type: "yn" },
  { id: "family_arthritis", section: "Systemic", text: "Family history of arthritis", type: "yn" },
  { id: "fingers_sore", section: "Systemic", text: "Fingers sore or stiff", type: "yn" },
  { id: "dry_skin", section: "Systemic", text: "Dry skin patches", type: "yn" },
  { id: "skin_rashes", section: "Systemic", text: "Skin rashes", type: "yn" },
  { id: "other_pain_condition", section: "Systemic", text: "Treated for other painful condition in last 3 years", type: "yn" },

  { id: "prior_tmj_tx", section: "Prior TMJ Treatment", text: "Any prior TMJ treatment", type: "yn" },
  { id: "prior_splint", section: "Prior TMJ Treatment", text: "Prior splint/appliance", type: "yn" },
  { id: "splint_helped", section: "Prior TMJ Treatment", text: "Splint helped", type: "yna" },
  { id: "prior_nightguard", section: "Prior TMJ Treatment", text: "Prior night guard", type: "yn" },
  { id: "nightguard_helped", section: "Prior TMJ Treatment", text: "Night guard helped", type: "yna" },
  { id: "prior_bite_adj", section: "Prior TMJ Treatment", text: "Prior bite adjustment", type: "yn" },
  { id: "bite_adj_helped", section: "Prior TMJ Treatment", text: "Bite adjustment helped", type: "yna" },
  { id: "prior_ortho", section: "Prior TMJ Treatment", text: "Prior orthodontics for TMJ", type: "yn" },
  { id: "ortho_helped", section: "Prior TMJ Treatment", text: "Orthodontics helped", type: "yna" },

  { id: "tooth_extracted", section: "Dental History", text: "Tooth extracted", type: "yn" },
  { id: "tooth_broken", section: "Dental History", text: "Split or broken a tooth", type: "yn" },
];

const SECTIONS = Array.from(new Set(QUESTIONS.map((q) => q.section)));

interface DiagnosisOption {
  id: string;
  label: string;
}

const DIAGNOSES: DiagnosisOption[] = [
  { id: "clenching", label: "Clenching" },
  { id: "sleep-grinding", label: "Sleep Grinding (Bruxism)" },
  { id: "occlusal-muscle-disharmony", label: "Occlusal Muscle Disharmony" },
  { id: "osteoarthritis", label: "Osteoarthritis of the TMJ" },
  { id: "sprain-discal-ligament", label: "Sprain of the Discal Ligament" },
  { id: "acute-closed-lock", label: "Acute Closed Lock" },
  { id: "anterior-open-bite", label: "Anterior Open Bite" },
  { id: "sleep-breathing-disorders", label: "Sleep Breathing Disorders" },
  { id: "neck-pain", label: "Tight and Sore Neck Muscles" },
];

const CUSTOM = "custom";

const labelFor = (id: string) =>
  id === CUSTOM ? "Custom" : DIAGNOSES.find((d) => d.id === id)?.label ?? id;

interface QuizCase {
  id: string;
  primary: string;
  primaryCustom?: string;
  secondaries: string[];
  secondaryCustom?: string;
  answers: Record<string, string>;
  notes?: string;
  timestamp: string;
}

const EMPTY_ANSWERS = (): Record<string, string> =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, ""]));

function YNToggle({
  value,
  onChange,
  includeNA,
}: {
  value: string;
  onChange: (v: string) => void;
  includeNA?: boolean;
}) {
  const opts = includeNA ? ["Y", "N", "N/A"] : ["Y", "N"];
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(value === o ? "" : o)}
          style={{
            padding: "3px 10px",
            fontSize: 12,
            fontWeight: 600,
            border: "1px solid #d1d5db",
            borderRadius: 4,
            cursor: "pointer",
            background:
              value === o
                ? o === "Y"
                  ? "#166534"
                  : o === "N"
                  ? "#991b1b"
                  : "#6b7280"
                : "#fff",
            color: value === o ? "#fff" : "#9ca3af",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function ChoiceToggle({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(value === o ? "" : o)}
          style={{
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 500,
            border: "1px solid #d1d5db",
            borderRadius: 4,
            cursor: "pointer",
            background: value === o ? "#1e40af" : "#fff",
            color: value === o ? "#fff" : "#9ca3af",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function QuizCollectorPage() {
  const [cases, setCases] = useState<QuizCase[]>([]);
  const [view, setView] = useState<"entry" | "table" | "tree">("entry");
  const [answers, setAnswers] = useState<Record<string, string>>(EMPTY_ANSWERS());
  const [primary, setPrimary] = useState<string>("");
  const [primaryCustom, setPrimaryCustom] = useState<string>("");
  const [secondaries, setSecondaries] = useState<string[]>([]);
  const [secondaryCustom, setSecondaryCustom] = useState<string>("");
  const [caseNotes, setCaseNotes] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [backend, setBackend] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/tmd-cases", { cache: "no-store" });
      const data = await r.json();
      setCases(data.cases ?? []);
      setBackend(data.backend ?? "");
    } catch {
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const setAnswer = (id: string, val: string) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const resetForm = () => {
    setAnswers(EMPTY_ANSWERS());
    setPrimary("");
    setPrimaryCustom("");
    setSecondaries([]);
    setSecondaryCustom("");
    setCaseNotes("");
    setEditingId(null);
  };

  const submitCase = async () => {
    if (!primary) {
      alert("Please pick a primary diagnosis.");
      return;
    }
    if (primary === CUSTOM && !primaryCustom.trim()) {
      alert("Please enter the custom primary diagnosis.");
      return;
    }
    if (secondaries.includes(CUSTOM) && !secondaryCustom.trim()) {
      alert("Please enter the custom secondary diagnosis.");
      return;
    }
    const filled = Object.values(answers).filter((v) => v).length;
    if (filled < 5) {
      alert("Please answer at least a few questions.");
      return;
    }

    const payload = {
      primary,
      primaryCustom: primary === CUSTOM ? primaryCustom.trim() : undefined,
      secondaries,
      secondaryCustom: secondaries.includes(CUSTOM) ? secondaryCustom.trim() : undefined,
      answers,
      notes: caseNotes,
    };

    setSubmitting(true);
    try {
      const url = editingId ? `/api/tmd-cases/${editingId}` : "/api/tmd-cases";
      const method = editingId ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        alert(`Save failed: ${err.error ?? r.statusText}`);
        return;
      }
      await fetchCases();
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const loadCase = (id: string) => {
    const c = cases.find((x) => x.id === id);
    if (!c) return;
    setAnswers({ ...EMPTY_ANSWERS(), ...c.answers });
    setPrimary(c.primary);
    setPrimaryCustom(c.primaryCustom ?? "");
    setSecondaries(c.secondaries ?? []);
    setSecondaryCustom(c.secondaryCustom ?? "");
    setCaseNotes(c.notes ?? "");
    setEditingId(id);
    setView("entry");
    window.scrollTo({ top: 0 });
  };

  const deleteCaseById = async (id: string) => {
    if (!confirm("Delete this case?")) return;
    const r = await fetch(`/api/tmd-cases/${id}`, { method: "DELETE" });
    if (!r.ok) {
      alert("Delete failed.");
      return;
    }
    fetchCases();
  };

  const toggleSection = (s: string) =>
    setCollapsedSections((prev) => ({ ...prev, [s]: !prev[s] }));

  const toggleSecondary = (id: string) => {
    setSecondaries((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(cases, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tmd-cases.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = [
      "id",
      "primary",
      "primary_custom",
      "secondaries",
      "secondary_custom",
      "notes",
      "timestamp",
      ...QUESTIONS.map((q) => q.id),
    ];
    const rows = cases.map((c) => [
      c.id,
      JSON.stringify(c.primary),
      JSON.stringify(c.primaryCustom ?? ""),
      JSON.stringify((c.secondaries ?? []).join("|")),
      JSON.stringify(c.secondaryCustom ?? ""),
      JSON.stringify(c.notes ?? ""),
      c.timestamp,
      ...QUESTIONS.map((q) => c.answers[q.id] ?? ""),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tmd-cases.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPatterns = () => {
    if (cases.length < 2) return null;
    const groups: Record<string, QuizCase[]> = {};
    cases.forEach((c) => {
      const key = c.primary === CUSTOM ? `Custom: ${c.primaryCustom ?? ""}` : labelFor(c.primary);
      (groups[key] ||= []).push(c);
    });
    type PatternEntry = {
      count: number;
      common: Record<string, { value: string; pct: number; text: string }>;
      secondaryFreq: Record<string, { count: number; pct: number; label: string }>;
    };
    const patterns: Record<string, PatternEntry> = {};
    Object.entries(groups).forEach(([dx, group]) => {
      const common: PatternEntry["common"] = {};
      QUESTIONS.forEach((q) => {
        const vals = group.map((c) => c.answers[q.id]).filter(Boolean);
        if (vals.length === 0) return;
        const counts: Record<string, number> = {};
        vals.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
        const pct = Math.round((top[1] / group.length) * 100);
        if (pct >= 70 && top[0]) {
          common[q.id] = { value: top[0], pct, text: q.text };
        }
      });
      const secondaryFreq: PatternEntry["secondaryFreq"] = {};
      group.forEach((c) => {
        (c.secondaries ?? []).forEach((s) => {
          const lbl = s === CUSTOM ? `Custom: ${c.secondaryCustom ?? ""}` : labelFor(s);
          if (!secondaryFreq[lbl]) {
            secondaryFreq[lbl] = { count: 0, pct: 0, label: lbl };
          }
          secondaryFreq[lbl].count += 1;
        });
      });
      Object.values(secondaryFreq).forEach((entry) => {
        entry.pct = Math.round((entry.count / group.length) * 100);
      });
      patterns[dx] = { count: group.length, common, secondaryFreq };
    });
    return patterns;
  };

  const answeredCount = Object.values(answers).filter((v) => v).length;

  const S = {
    page: {
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#fafaf9",
      minHeight: "100vh",
      color: "#1c1917",
    } as const,
    header: {
      background: "#fff",
      borderBottom: "1px solid #e7e5e4",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    } as const,
    tab: (active: boolean) => ({
      padding: "7px 16px",
      fontSize: 13,
      fontWeight: 600,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      background: active ? "#1c1917" : "transparent",
      color: active ? "#fff" : "#78716c",
    }),
    badge: {
      background: "#dc2626",
      color: "#fff",
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 10,
      padding: "1px 7px",
      marginLeft: 6,
    } as const,
    section: {
      background: "#fff",
      borderRadius: 8,
      border: "1px solid #e7e5e4",
      margin: "12px 20px",
      overflow: "hidden",
    } as const,
    sectionHead: {
      padding: "10px 16px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      userSelect: "none",
    } as const,
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "7px 16px",
      borderTop: "1px solid #f5f5f4",
      gap: 12,
    } as const,
    qText: { fontSize: 13, color: "#44403c", flex: 1 } as const,
    input: {
      padding: "7px 10px",
      fontSize: 13,
      border: "1px solid #d6d3d1",
      borderRadius: 6,
      width: "100%",
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
    } as const,
    btn: (variant?: "primary" | "danger") => ({
      padding: "8px 16px",
      fontSize: 13,
      fontWeight: 600,
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      background:
        variant === "primary" ? "#1c1917" : variant === "danger" ? "#dc2626" : "#e7e5e4",
      color: variant === "primary" || variant === "danger" ? "#fff" : "#44403c",
    }),
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button style={S.tab(view === "entry")} onClick={() => setView("entry")}>
            {editingId ? "Editing Case" : "New Case"}
          </button>
          <button style={S.tab(view === "table")} onClick={() => setView("table")}>
            All Cases<span style={S.badge}>{cases.length}</span>
          </button>
          <button style={S.tab(view === "tree")} onClick={() => setView("tree")}>
            Patterns
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#a8a29e" }}>
            backend: <strong>{backend || "…"}</strong>
          </span>
          <button style={S.btn()} onClick={exportCSV}>
            Export CSV
          </button>
          <button style={S.btn()} onClick={exportJSON}>
            Export JSON
          </button>
        </div>
      </div>

      {/* ============ ENTRY VIEW ============ */}
      {view === "entry" && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "8px 0 80px" }}>
          {editingId && (
            <div
              style={{
                margin: "12px 20px",
                padding: "10px 16px",
                background: "#fef3c7",
                border: "1px solid #fbbf24",
                borderRadius: 8,
                fontSize: 13,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Editing case</span>
              <button
                onClick={resetForm}
                style={{ ...S.btn(), padding: "4px 12px", fontSize: 12 }}
              >
                Cancel Edit
              </button>
            </div>
          )}

          <div style={{ margin: "12px 20px", fontSize: 12, color: "#a8a29e" }}>
            {answeredCount} of {QUESTIONS.length} questions answered
          </div>

          {SECTIONS.map((section) => (
            <div key={section} style={S.section}>
              <div style={S.sectionHead} onClick={() => toggleSection(section)}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#1c1917" }}>{section}</span>
                <span style={{ fontSize: 12, color: "#a8a29e" }}>
                  {collapsedSections[section] ? "▸" : "▾"}
                </span>
              </div>
              {!collapsedSections[section] &&
                QUESTIONS.filter((q) => q.section === section).map((q) => (
                  <div key={q.id} style={S.row}>
                    <span style={S.qText}>{q.text}</span>
                    {q.type === "yn" && (
                      <YNToggle value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
                    )}
                    {q.type === "yna" && (
                      <YNToggle
                        value={answers[q.id]}
                        onChange={(v) => setAnswer(q.id, v)}
                        includeNA
                      />
                    )}
                    {(q.type === "choice" || q.type === "range") && (
                      <ChoiceToggle
                        value={answers[q.id]}
                        onChange={(v) => setAnswer(q.id, v)}
                        options={q.options ?? []}
                      />
                    )}
                  </div>
                ))}
            </div>
          ))}

          {/* Diagnosis assignment */}
          <div style={{ ...S.section, border: "2px solid #1c1917" }}>
            <div style={{ padding: "12px 16px", background: "#1c1917", color: "#fff" }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>Assign Diagnosis</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#44403c", marginBottom: 8 }}>
                Primary diagnosis (pick one)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {[...DIAGNOSES, { id: CUSTOM, label: "Custom…" }].map((d) => {
                  const active = primary === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setPrimary(d.id);
                        if (d.id !== CUSTOM) setPrimaryCustom("");
                        setSecondaries((prev) => prev.filter((s) => s !== d.id));
                      }}
                      style={{
                        padding: "5px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 16,
                        border: "1px solid",
                        borderColor: active ? "#1c1917" : "#d6d3d1",
                        background: active ? "#1c1917" : "#fff",
                        color: active ? "#fff" : "#44403c",
                        cursor: "pointer",
                      }}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
              {primary === CUSTOM && (
                <input
                  value={primaryCustom}
                  onChange={(e) => setPrimaryCustom(e.target.value)}
                  placeholder="Custom primary diagnosis"
                  style={{ ...S.input, marginBottom: 16 }}
                />
              )}

              <div style={{ fontSize: 12, fontWeight: 700, color: "#44403c", marginBottom: 8 }}>
                Secondary diagnoses (zero or more)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {[...DIAGNOSES, { id: CUSTOM, label: "Custom…" }].map((d) => {
                  const active = secondaries.includes(d.id);
                  const disabled = primary === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleSecondary(d.id)}
                      style={{
                        padding: "5px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                        borderRadius: 16,
                        border: "1px solid",
                        borderColor: active ? "#1e40af" : "#d6d3d1",
                        background: disabled
                          ? "#f5f5f4"
                          : active
                          ? "#1e40af"
                          : "#fff",
                        color: disabled ? "#a8a29e" : active ? "#fff" : "#44403c",
                        cursor: disabled ? "not-allowed" : "pointer",
                      }}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
              {secondaries.includes(CUSTOM) && (
                <input
                  value={secondaryCustom}
                  onChange={(e) => setSecondaryCustom(e.target.value)}
                  placeholder="Custom secondary diagnosis"
                  style={{ ...S.input, marginBottom: 16 }}
                />
              )}

              <div style={{ fontSize: 12, color: "#a8a29e", marginBottom: 6 }}>
                Case notes (optional):
              </div>
              <textarea
                value={caseNotes}
                onChange={(e) => setCaseNotes(e.target.value)}
                rows={3}
                placeholder="Any extra context about this case pattern..."
                style={{ ...S.input, resize: "vertical" }}
              />
            </div>
            <div style={{ padding: "0 16px 16px" }}>
              <button
                disabled={submitting}
                onClick={submitCase}
                style={{
                  ...S.btn("primary"),
                  width: "100%",
                  padding: 12,
                  fontSize: 14,
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting
                  ? "Saving…"
                  : editingId
                  ? "Update Case"
                  : `Save Case #${cases.length + 1}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ TABLE VIEW ============ */}
      {view === "table" && (
        <div style={{ padding: 20 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#a8a29e" }}>Loading…</div>
          ) : cases.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#a8a29e" }}>
              <p style={{ fontSize: 15 }}>
                No cases yet. Fill out the questionnaire and assign a diagnosis to create your
                first case.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 12,
                  background: "#fff",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr style={{ background: "#1c1917", color: "#fff" }}>
                    <th
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 600,
                        position: "sticky",
                        left: 0,
                        background: "#1c1917",
                        zIndex: 2,
                        minWidth: 40,
                      }}
                    >
                      #
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 600,
                        background: "#1c1917",
                        minWidth: 180,
                      }}
                    >
                      Primary
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 600,
                        background: "#1c1917",
                        minWidth: 200,
                      }}
                    >
                      Secondaries
                    </th>
                    {QUESTIONS.map((q) => (
                      <th
                        key={q.id}
                        style={{
                          padding: "8px 6px",
                          textAlign: "center",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          fontSize: 10,
                          maxWidth: 60,
                        }}
                        title={q.text}
                      >
                        {q.text.length > 12 ? q.text.slice(0, 12) + "…" : q.text}
                      </th>
                    ))}
                    <th style={{ padding: "8px 10px", minWidth: 80 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #f5f5f4" }}>
                      <td
                        style={{
                          padding: "6px 10px",
                          fontWeight: 600,
                          color: "#a8a29e",
                          position: "sticky",
                          left: 0,
                          background: "#fff",
                          zIndex: 1,
                        }}
                      >
                        {i + 1}
                      </td>
                      <td style={{ padding: "6px 10px", fontWeight: 600 }}>
                        {c.primary === CUSTOM
                          ? `Custom: ${c.primaryCustom ?? ""}`
                          : labelFor(c.primary)}
                      </td>
                      <td style={{ padding: "6px 10px", color: "#44403c" }}>
                        {(c.secondaries ?? [])
                          .map((s) =>
                            s === CUSTOM
                              ? `Custom: ${c.secondaryCustom ?? ""}`
                              : labelFor(s)
                          )
                          .join(", ") || "—"}
                      </td>
                      {QUESTIONS.map((q) => {
                        const v = c.answers[q.id] || "";
                        const bg =
                          v === "Y"
                            ? "#dcfce7"
                            : v === "N"
                            ? "#fee2e2"
                            : v
                            ? "#dbeafe"
                            : "transparent";
                        const col =
                          v === "Y"
                            ? "#166534"
                            : v === "N"
                            ? "#991b1b"
                            : v
                            ? "#1e40af"
                            : "#e7e5e4";
                        return (
                          <td key={q.id} style={{ padding: "4px 2px", textAlign: "center" }}>
                            {v && (
                              <span
                                style={{
                                  background: bg,
                                  color: col,
                                  fontSize: 10,
                                  fontWeight: 600,
                                  padding: "2px 5px",
                                  borderRadius: 3,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {v}
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td style={{ padding: "4px 8px" }}>
                        <button
                          onClick={() => loadCase(c.id)}
                          style={{
                            fontSize: 11,
                            padding: "3px 8px",
                            border: "1px solid #d6d3d1",
                            borderRadius: 4,
                            background: "#fff",
                            cursor: "pointer",
                            marginRight: 4,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCaseById(c.id)}
                          style={{
                            fontSize: 11,
                            padding: "3px 8px",
                            border: "1px solid #fca5a5",
                            borderRadius: 4,
                            background: "#fff",
                            color: "#dc2626",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============ PATTERNS VIEW ============ */}
      {view === "tree" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              Emerging Patterns
            </h2>
            <p style={{ fontSize: 13, color: "#78716c" }}>
              Patterns are grouped by primary diagnosis. Question-level patterns show responses
              that appeared in ≥70% of cases. Secondary co-occurrence is shown below each group.
              {cases.length < 3 && " Enter at least 3 cases to start seeing patterns."}
            </p>
          </div>

          {cases.length < 2 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#a8a29e" }}>
              <p>
                Need more cases to show patterns. Currently: {cases.length} case
                {cases.length !== 1 ? "s" : ""}.
              </p>
            </div>
          ) : (
            (() => {
              const patterns = getPatterns();
              if (!patterns) return null;
              return Object.entries(patterns)
                .sort((a, b) => b[1].count - a[1].count)
                .map(([dx, data]) => (
                  <div key={dx} style={S.section}>
                    <div
                      style={{
                        padding: "12px 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{dx}</span>
                      <span style={{ fontSize: 12, color: "#a8a29e" }}>
                        {data.count} case{data.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    {Object.keys(data.common).length > 0 ? (
                      Object.entries(data.common)
                        .sort((a, b) => b[1].pct - a[1].pct)
                        .map(([qid, info]) => (
                          <div key={qid} style={{ ...S.row, borderTop: "1px solid #f5f5f4" }}>
                            <span style={S.qText}>{info.text}</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "2px 8px",
                                  borderRadius: 4,
                                  background:
                                    info.value === "Y"
                                      ? "#dcfce7"
                                      : info.value === "N"
                                      ? "#fee2e2"
                                      : "#dbeafe",
                                  color:
                                    info.value === "Y"
                                      ? "#166534"
                                      : info.value === "N"
                                      ? "#991b1b"
                                      : "#1e40af",
                                }}
                              >
                                {info.value}
                              </span>
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "#a8a29e",
                                  minWidth: 36,
                                  textAlign: "right",
                                }}
                              >
                                {info.pct}%
                              </span>
                              <div
                                style={{
                                  width: 60,
                                  height: 6,
                                  background: "#f5f5f4",
                                  borderRadius: 3,
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${info.pct}%`,
                                    height: "100%",
                                    background: "#1c1917",
                                    borderRadius: 3,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div
                        style={{
                          padding: "12px 16px",
                          fontSize: 12,
                          color: "#a8a29e",
                        }}
                      >
                        Not enough consistent answers yet to identify a pattern.
                      </div>
                    )}
                    {Object.keys(data.secondaryFreq).length > 0 && (
                      <div style={{ borderTop: "1px solid #f5f5f4", padding: "10px 16px" }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#78716c",
                            marginBottom: 6,
                          }}
                        >
                          Secondary diagnoses seen alongside
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {Object.values(data.secondaryFreq)
                            .sort((a, b) => b.count - a.count)
                            .map((s) => (
                              <span
                                key={s.label}
                                style={{
                                  fontSize: 11,
                                  padding: "3px 8px",
                                  borderRadius: 12,
                                  background: "#eef2ff",
                                  color: "#1e40af",
                                  fontWeight: 600,
                                }}
                              >
                                {s.label} · {s.count} ({s.pct}%)
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                ));
            })()
          )}
        </div>
      )}
    </div>
  );
}
