import type { ConditionData } from "@/components/ConditionLayout";

export const conditions: Record<string, ConditionData> = {
  "osteoarthritis": {
    slug: "osteoarthritis",
    title: "Osteoarthritis of the TMJ",
    subtitle: "Common Condition",
    heroDescription:
      "Osteoarthritis is the most common of the 40 different diseases that affect joints — including the temporomandibular joint. Understanding it is the first step toward effective treatment.",
    overview: [
      "There are 40 different diseases that affect joints, whether it is the temporomandibular joint or your wrist. Osteoarthritis is the most common of these 40 diseases.",
      "Osteoarthritis occurs when you have damaged the cartilage in a joint, most likely from past trauma. Damaged joints have friction — friction causes wear. A healthy joint has no friction and will not wear out. In theory, you could move a healthy joint for a thousand years and there would be no wear.",
      "Once a joint is damaged it will have friction that leads to wear. Osteoarthritis is a progressive wearing out of the joint. As a joint wears out it will progress from early to severe. A CBCT (ConeBeam CT scan) is the best way to determine where you are in the disease process.",
    ],
    pullQuote: "A healthy joint has no friction and will not wear out. In theory, you could move a healthy joint for a thousand years and there would be no wear.",
    symptoms: {
      primary: [
        "Soreness of the TMJ itself",
        "Ear pain (the ear and TMJ sit right next to each other)",
        "Limited jaw opening",
        "Difficulty chewing",
        "Sore jaw muscles",
      ],
      secondary: [
        "Headaches",
        "Eye pain",
        "TMJ clicking",
        "Jaw locking",
        "Difficulty opening or closing jaw",
        "Anterior open bite",
      ],
    },
    diagnosis: [
      "Physical palpation of the TMJ to determine if the joint is sore. In some cases it can be difficult for a person to tell if their joint is sore — you have to press in the correct spot.",
      "If the TMJ is sore, a CBCT (ConeBeam CT scan) of the joint is required to confirm the diagnosis of osteoarthritis and determine the severity.",
      "The CBCT reveals condyle bone wear patterns and allows classification from early to severe osteoarthritis.",
    ],
    treatments: [
      {
        category: "Minimize Parafunction",
        items: [
          "Night guard (D-PAS, Brux-PAS) to minimize sleep bruxing",
          "Behavioral modification to reduce daytime clenching",
        ],
      },
      {
        category: "Anti-Inflammatory Therapies",
        items: [
          "Ice therapy",
          "Topical CBD balm",
          "Jaw motion exercises",
          "Anti-inflammatory medications (NSAIDs)",
          "Cold laser therapy (MLS Laser — 6 sessions over 4 weeks)",
        ],
      },
      {
        category: "Supplements",
        items: [
          "Glucosamine 1500mg / Chondroitin 600mg per day",
          "Bromelain with green coffee extract as an alternative to NSAIDs",
        ],
      },
      {
        category: "Advanced Options",
        items: [
          "Meloxicam 15mg for 6–12 weeks (requires bloodwork prior)",
          "Platelet Rich Plasma (PRP) arthrocentesis if still inflamed",
          "Cold laser combined with topical CBD, ice, and jaw exercises",
        ],
      },
    ],
    importantNotes: [
      "Osteoarthritis is a progressive condition — early diagnosis allows for more conservative treatment approaches.",
      "Cold laser therapy combined with topical CBD, ice, jaw motion exercises, and bromelain with green coffee extract has been found to be very effective with fewer risks than standard NSAID medications.",
      "A proper CBCT scan is essential to confirm the diagnosis and determine severity before beginning any treatment plan.",
    ],
  },

  "clenching": {
    slug: "clenching",
    title: "Clenching",
    subtitle: "Common Condition",
    heroDescription:
      "Habitual jaw clenching — whether during the day or at night — is one of the most common contributors to TMJ pain and muscle fatigue.",
    overview: [
      "Clenching is the sustained, forceful contact of the upper and lower teeth. Unlike grinding, clenching involves holding the jaw tight without lateral movement. It can occur during the day (often unconsciously during stress or concentration) or during sleep.",
      "Chronic clenching places enormous pressure on the TMJ, jaw muscles, and teeth. Over time, this can lead to muscle fatigue, joint inflammation, headaches, and accelerated wear on the joint structures.",
      "Many people are unaware they clench because it often happens during sleep or during periods of focused concentration. The first sign is often morning jaw soreness or tension headaches.",
    ],
    pullQuote: "Many people don't realize they clench. It often happens during sleep or deep concentration — the first clue is waking up with a sore jaw.",
    symptoms: {
      primary: [
        "Morning jaw soreness or stiffness",
        "Tension headaches, especially upon waking",
        "Facial muscle fatigue",
        "Tooth sensitivity or pain",
        "Tightness in the temples or cheeks",
      ],
      secondary: [
        "Neck and shoulder tension",
        "Ear fullness or pain",
        "Difficulty opening the mouth wide in the morning",
        "Tooth wear or fractures",
      ],
    },
    treatments: [
      {
        category: "Behavioral Modification",
        items: [
          "Awareness training — recognizing daytime clenching triggers",
          "Stress management techniques",
          "Jaw relaxation exercises",
          "Posture correction",
        ],
      },
      {
        category: "Protective Appliances",
        items: [
          "Custom night guard to protect teeth and reduce muscle strain",
          "Daytime awareness appliance for habitual clenchers",
        ],
      },
      {
        category: "Therapeutic Interventions",
        items: [
          "Physical therapy for jaw and facial muscles",
          "Anti-inflammatory medications as needed",
          "Cold laser therapy",
          "Muscle relaxation techniques",
        ],
      },
    ],
    importantNotes: [
      "Clenching is one of the most common contributors to TMJ disorders and is often the first thing that needs to be addressed in a treatment plan.",
      "Stress is a major trigger — many patients see improvement with stress management alongside dental interventions.",
    ],
  },

  "sleep-grinding": {
    slug: "sleep-grinding",
    title: "Sleep Grinding (Bruxism)",
    subtitle: "Common Condition",
    heroDescription:
      "Rhythmic grinding of the teeth during sleep can cause significant wear, chronic pain, and progressive damage to the temporomandibular joint.",
    overview: [
      "Sleep bruxism is the involuntary, rhythmic grinding or clenching of teeth during sleep. Unlike daytime clenching, sleep grinding involves lateral jaw movements that create significant friction on both the teeth and the TMJ.",
      "The forces generated during sleep grinding can be many times greater than normal chewing forces. Over time, this leads to tooth wear, muscle soreness, joint damage, and disrupted sleep — both for the patient and their sleep partner.",
      "Sleep bruxism is often linked to sleep-disordered breathing, stress, and certain medications. A proper diagnosis involves understanding the underlying cause, not just treating the symptoms.",
    ],
    symptoms: {
      primary: [
        "Audible grinding sounds during sleep (often reported by a partner)",
        "Morning jaw pain and stiffness",
        "Worn, flattened, or chipped teeth",
        "Headaches upon waking",
        "TMJ soreness",
      ],
      secondary: [
        "Disrupted sleep",
        "Increased tooth sensitivity",
        "Facial muscle hypertrophy (enlarged jaw muscles)",
        "Neck pain and tension",
        "Ear pain",
      ],
    },
    treatments: [
      {
        category: "Protective Appliances",
        items: [
          "Custom night guard designed to reduce grinding forces",
          "Brux-PAS or D-PAS appliance",
        ],
      },
      {
        category: "Addressing Root Causes",
        items: [
          "Sleep study evaluation if sleep-disordered breathing is suspected",
          "Medication review (certain medications can trigger bruxism)",
          "Stress and anxiety management",
        ],
      },
      {
        category: "Supportive Therapies",
        items: [
          "Anti-inflammatory therapy for joint and muscle soreness",
          "Jaw exercises to restore range of motion",
          "Cold laser therapy for muscle recovery",
        ],
      },
    ],
    importantNotes: [
      "Sleep grinding can be a sign of sleep-disordered breathing. If you grind your teeth at night, a sleep evaluation may be recommended.",
      "The damage from sleep grinding is cumulative — early intervention protects both your teeth and your joints.",
    ],
  },

  "occlusal-muscle-disharmony": {
    slug: "occlusal-muscle-disharmony",
    title: "Occlusal Muscle Disharmony",
    subtitle: "Common Condition",
    heroDescription:
      "When the bite and jaw muscles are not working in harmony, the result is chronic strain, pain, and dysfunction that can mimic many other conditions.",
    overview: [
      "Occlusal Muscle Disharmony (OMD) occurs when there is a mismatch between how the teeth come together (the bite) and how the jaw muscles want to position the jaw. This conflict creates chronic strain on the muscles, joints, and teeth.",
      "The jaw muscles are programmed to close the jaw into a position that is most comfortable for the joint. But if the teeth don't fit together well in that position, the muscles must deflect the jaw to make the teeth mesh. This constant compensation leads to muscle fatigue, spasm, and pain.",
      "OMD is one of the most underdiagnosed TMJ conditions because its symptoms overlap with headaches, migraines, ear problems, and neck pain. A thorough orthopedic examination of the bite, muscles, and joint is essential for accurate diagnosis.",
    ],
    pullQuote: "The muscles want to close the jaw one way. The teeth force it another. That constant tug-of-war is what causes the pain.",
    symptoms: {
      primary: [
        "Chronic jaw muscle soreness and fatigue",
        "Headaches (often misdiagnosed as tension headaches or migraines)",
        "Bite that feels \"off\" or uncomfortable",
        "Clicking or popping in the TMJ",
        "Pain with chewing",
      ],
      secondary: [
        "Neck and shoulder pain",
        "Ear symptoms (fullness, ringing, pain)",
        "Facial asymmetry",
        "Tooth sensitivity from uneven forces",
        "Morning jaw stiffness",
      ],
    },
    diagnosis: [
      "Comprehensive evaluation of how the teeth come together (occlusal analysis).",
      "EMG (electromyography) to measure jaw muscle activity and identify imbalances.",
      "Computerized jaw tracking to assess how the jaw moves and where it wants to rest.",
      "CBCT imaging if joint involvement is suspected.",
    ],
    treatments: [
      {
        category: "Orthotic Therapy",
        items: [
          "Custom orthotic appliance to establish a harmonious bite position",
          "Gradual adjustment to allow muscles to deprogramm",
        ],
      },
      {
        category: "Muscle Therapy",
        items: [
          "Physical therapy for jaw and facial muscles",
          "Trigger point therapy",
          "Cold laser therapy for muscle recovery",
          "Jaw exercises and stretches",
        ],
      },
      {
        category: "Long-Term Correction",
        items: [
          "Occlusal equilibration (selective reshaping of tooth surfaces)",
          "Restorative dentistry to rebuild a harmonious bite",
          "Orthodontic treatment in select cases",
        ],
      },
    ],
    importantNotes: [
      "OMD is frequently the underlying cause of chronic headaches that don't respond to typical headache treatments.",
      "Specialized diagnostic tools like EMG and computerized jaw tracking are essential for identifying this condition accurately.",
    ],
  },

  "sprain-discal-ligament": {
    slug: "sprain-discal-ligament",
    title: "Sprain of the Discal Ligament",
    subtitle: "Common Condition",
    heroDescription:
      "An acute injury to the disc attachment in the TMJ causing sudden pain, clicking, and changes in jaw movement.",
    overview: [
      "The TMJ contains a small disc (similar to a knee meniscus) that sits between the jawbone and the skull. This disc is held in place by ligaments. A sprain of the discal ligament is an acute injury to these attachments.",
      "This sprain can occur from trauma (a blow to the jaw), excessive opening (dental procedures, yawning), or cumulative strain from clenching and grinding. When the ligament is sprained, the disc can shift out of position, causing clicking, pain, and altered jaw movement.",
      "Like any ligament sprain in the body, discal ligament sprains range from mild stretching to partial or complete tears. The severity determines the treatment approach and prognosis.",
    ],
    symptoms: {
      primary: [
        "Sudden onset of TMJ clicking or popping",
        "Pain in or around the jaw joint",
        "Change in how the jaw opens or closes",
        "Pain when chewing",
        "A feeling that the bite has shifted",
      ],
      secondary: [
        "Swelling around the joint",
        "Limited jaw opening",
        "Ear pain on the affected side",
        "Headache on the affected side",
      ],
    },
    treatments: [
      {
        category: "Acute Phase",
        items: [
          "Rest the jaw — soft diet",
          "Ice therapy to reduce inflammation",
          "Anti-inflammatory medications",
          "Avoid wide opening (yawning, biting large foods)",
        ],
      },
      {
        category: "Stabilization",
        items: [
          "Custom orthotic appliance to stabilize the joint",
          "Physical therapy for controlled jaw movement",
          "Cold laser therapy to promote healing",
        ],
      },
      {
        category: "Long-Term Management",
        items: [
          "Night guard to prevent further strain from sleep bruxing",
          "Jaw exercises to restore range of motion",
          "Ongoing monitoring of disc position",
        ],
      },
    ],
    importantNotes: [
      "Early treatment of a discal ligament sprain can prevent progression to a more serious disc displacement or closed lock.",
      "If you experience sudden clicking in your jaw — especially after trauma or a dental procedure — seek evaluation promptly.",
    ],
  },

  "acute-closed-lock": {
    slug: "acute-closed-lock",
    title: "Acute Closed Lock",
    subtitle: "Common Condition",
    heroDescription:
      "When the disc in the TMJ displaces and the jaw cannot fully open — often sudden, alarming, and requiring prompt diagnosis.",
    overview: [
      "An acute closed lock occurs when the disc in the temporomandibular joint displaces forward and does not return to its normal position when the mouth opens. This physically blocks the jaw from opening fully.",
      "The condition often follows a history of TMJ clicking. The clicking represents the disc popping back into place during opening. When the disc finally displaces completely and no longer recaptures, the clicking stops — but the jaw locks.",
      "This is often a frightening experience for patients. The jaw suddenly can't open more than 25–30mm (normal is 45–55mm). It may happen gradually over a few days or suddenly overnight.",
    ],
    pullQuote: "The clicking stops — and that's actually the bad sign. It means the disc has displaced and isn't coming back on its own.",
    symptoms: {
      primary: [
        "Sudden inability to fully open the mouth",
        "Previous history of jaw clicking that has stopped",
        "Pain in the TMJ area",
        "A feeling of the jaw being \"stuck\"",
        "Deviation of the jaw to the affected side when opening",
      ],
      secondary: [
        "Difficulty eating",
        "Ear pain or fullness",
        "Facial asymmetry during jaw movement",
        "Muscle spasm and guarding",
      ],
    },
    diagnosis: [
      "Physical examination revealing limited jaw opening (typically less than 30mm).",
      "Assessment of jaw movement patterns — deflection toward the affected side.",
      "MRI of the TMJ to confirm disc position.",
      "CBCT to rule out bony pathology or osteoarthritis.",
    ],
    treatments: [
      {
        category: "Immediate Intervention",
        items: [
          "Manual disc recapture techniques when possible",
          "Anti-inflammatory medications",
          "Muscle relaxants to reduce guarding",
          "Soft diet",
        ],
      },
      {
        category: "Rehabilitative Therapy",
        items: [
          "Custom orthotic appliance to maintain disc position",
          "Guided jaw exercises to restore range of motion",
          "Physical therapy",
          "Cold laser therapy",
        ],
      },
      {
        category: "Ongoing Management",
        items: [
          "Night guard to prevent recurrence",
          "Monitoring of disc position and jaw function",
          "Anti-inflammatory protocol as needed",
        ],
      },
    ],
    importantNotes: [
      "If your jaw suddenly locks and you cannot open fully, seek evaluation as soon as possible. Early intervention significantly improves outcomes.",
      "A history of jaw clicking that suddenly stops is a warning sign — the disc may have displaced permanently.",
    ],
  },

  "anterior-open-bite": {
    slug: "anterior-open-bite",
    title: "Anterior Open Bite",
    subtitle: "Common Condition",
    heroDescription:
      "When the front teeth no longer come together, it affects chewing, speech, and can signal underlying TMJ changes that require careful diagnosis.",
    overview: [
      "An anterior open bite occurs when the back teeth touch but the front teeth cannot make contact. Patients notice they can no longer bite into foods with their front teeth, and speech may be affected.",
      "In the context of TMJ disorders, an anterior open bite often develops gradually as a result of changes within the jaw joint itself — particularly loss of joint height from conditions like osteoarthritis. As the joint structures change, the bite shifts.",
      "This is an important clinical sign because it often indicates progressive joint changes that need to be addressed. The open bite itself is the symptom — the underlying joint condition is the cause.",
    ],
    symptoms: {
      primary: [
        "Front teeth that no longer touch when biting down",
        "Difficulty biting into foods (sandwiches, apples, etc.)",
        "Changes in speech",
        "A feeling that only the back teeth touch",
        "Progressive worsening of the bite over time",
      ],
      secondary: [
        "TMJ pain or soreness",
        "Jaw fatigue from compensating with back teeth",
        "Headaches",
        "Changes in facial appearance",
      ],
    },
    diagnosis: [
      "Clinical examination of the bite and tooth contact patterns.",
      "CBCT imaging to evaluate the TMJ for osteoarthritis or other joint changes.",
      "Assessment of condylar height and symmetry.",
      "Evaluation of the history — when did the bite change begin?",
    ],
    treatments: [
      {
        category: "Address the Underlying Cause",
        items: [
          "Treatment of TMJ osteoarthritis or other joint pathology",
          "Anti-inflammatory therapies for active joint disease",
          "Stabilization of the joint before addressing the bite",
        ],
      },
      {
        category: "Bite Management",
        items: [
          "Orthotic appliance to stabilize the bite during treatment",
          "Monitoring of bite changes to ensure stability",
        ],
      },
      {
        category: "Definitive Correction",
        items: [
          "Restorative dentistry to rebuild proper tooth contact",
          "Orthodontic treatment in select cases",
          "Occlusal reconstruction once the joint is stable",
        ],
      },
    ],
    importantNotes: [
      "An anterior open bite that develops in adulthood should always be evaluated for TMJ pathology — it is rarely just a dental problem.",
      "Treatment of the bite without addressing the underlying joint condition will likely fail.",
    ],
  },

  "sleep-breathing-disorders": {
    slug: "sleep-breathing-disorders",
    title: "Sleep Breathing Disorders",
    subtitle: "Related Condition",
    heroDescription:
      "Airway-related conditions including snoring and obstructive sleep apnea are closely linked to jaw position, TMJ disorders, and overall orofacial health.",
    overview: [
      "Sleep breathing disorders encompass a spectrum from simple snoring to obstructive sleep apnea (OSA). These conditions involve partial or complete collapse of the airway during sleep, leading to disrupted breathing and poor sleep quality.",
      "The connection between sleep breathing disorders and TMJ is significant. The position and size of the jaw directly influence airway size. Additionally, the body may clench and grind during sleep as a subconscious attempt to open the airway — making bruxism both a symptom and a complicating factor.",
      "Patients with TMJ disorders frequently have undiagnosed sleep breathing issues, and vice versa. A comprehensive evaluation considers both the joint and the airway as part of an interconnected system.",
    ],
    symptoms: {
      primary: [
        "Snoring",
        "Witnessed breathing pauses during sleep",
        "Waking with a dry mouth or sore throat",
        "Morning headaches",
        "Excessive daytime sleepiness or fatigue",
      ],
      secondary: [
        "Sleep bruxism (grinding)",
        "TMJ pain and clicking",
        "Difficulty concentrating",
        "Irritability and mood changes",
        "High blood pressure",
      ],
    },
    treatments: [
      {
        category: "Diagnosis & Evaluation",
        items: [
          "Sleep study (home or in-lab) to determine severity",
          "Airway evaluation as part of TMJ examination",
          "Assessment of jaw position and its relationship to airway",
        ],
      },
      {
        category: "Oral Appliance Therapy",
        items: [
          "Mandibular advancement device to hold the jaw forward during sleep",
          "Combined TMJ-airway appliance when both conditions are present",
        ],
      },
      {
        category: "Complementary Approaches",
        items: [
          "CPAP therapy for moderate to severe OSA",
          "Positional therapy",
          "Weight management when applicable",
          "Myofunctional therapy for tongue and airway muscle tone",
        ],
      },
    ],
    importantNotes: [
      "If you grind your teeth at night and experience daytime fatigue, a sleep breathing disorder may be the underlying cause.",
      "Treating sleep breathing disorders often improves TMJ symptoms, and treating TMJ disorders can improve airway function.",
    ],
  },

  "neck-pain": {
    slug: "neck-pain",
    title: "Tight and Sore Neck Muscles",
    subtitle: "Related Condition",
    heroDescription:
      "Chronic neck tension and pain are frequently connected to jaw dysfunction — the muscles of the jaw and neck work as an integrated system.",
    overview: [
      "The muscles of the jaw and neck are intimately connected through shared nerve pathways, fascial planes, and functional relationships. When the jaw is not functioning properly, the neck muscles compensate — and when neck muscles are strained, jaw function is affected.",
      "Many patients with TMJ disorders present with chronic neck pain and stiffness as one of their primary complaints. This is not coincidental — the trigeminal nerve (which controls jaw function) and the cervical nerves (which control the neck) converge in the brainstem, creating a direct neurological connection.",
      "Effective treatment must address both the jaw and the neck as parts of a single system. Treating one without considering the other often leads to incomplete relief.",
    ],
    pullQuote: "If your neck pain hasn't responded to years of treatment, the answer might be in your jaw. The two systems are inseparable.",
    symptoms: {
      primary: [
        "Chronic neck stiffness and soreness",
        "Tension radiating from the jaw into the neck",
        "Headaches originating from the base of the skull",
        "Pain or tightness in the upper trapezius and sternocleidomastoid muscles",
        "Reduced range of neck motion",
      ],
      secondary: [
        "Jaw pain or TMJ clicking",
        "Shoulder tension",
        "Postural changes (forward head posture)",
        "Dizziness in some cases",
        "Pain that worsens with prolonged sitting or computer work",
      ],
    },
    treatments: [
      {
        category: "TMJ-Directed Therapy",
        items: [
          "Orthotic appliance to improve jaw position and reduce muscle strain",
          "Treatment of underlying TMJ disorder (clenching, OMD, etc.)",
          "Night guard to reduce sleep bruxing",
        ],
      },
      {
        category: "Physical Therapy",
        items: [
          "Targeted exercises for jaw and cervical muscles",
          "Postural correction and ergonomic guidance",
          "Manual therapy and trigger point release",
          "Cold laser therapy",
        ],
      },
      {
        category: "Supportive Measures",
        items: [
          "Anti-inflammatory therapies",
          "Stress management and relaxation techniques",
          "Ergonomic workplace modifications",
        ],
      },
    ],
    importantNotes: [
      "If you have chronic neck pain that hasn't responded to traditional treatments, a TMJ evaluation may reveal the missing piece.",
      "The jaw and neck must be treated as an integrated system for lasting relief.",
    ],
  },
};

export const conditionSlugs = Object.keys(conditions);
