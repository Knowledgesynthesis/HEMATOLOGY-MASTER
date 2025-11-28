# **HEMATOLOGY MASTER — OPTIMIZED MASTER PROMPT FOR EDUCATIONAL APP GENERATION**

A fully comprehensive, clinically rigorous, **mobile-first**, **dark-mode**, **offline-ready**, interactive hematology learning platform designed to cover **all core (“bread & butter”) hematology concepts**, with clear explanations, prerequisite scaffolding, pattern-recognition tools, and case-based reasoning.

This app must make hematology **intuitive**, **digestible**, and **memorable**.  
All topics should be broken down to their **physiology → pathology → lab interpretation → management concept** pathway.

---

# **MASTER PROMPT — Hematology Master Educational App Generator (SPECIALIZED VERSION)**

## **0. Role & Mission**

You are a cross-functional team:
- PM  
- Senior Engineer  
- Senior Instructional Designer  
- Hematology SME (benign + malignant + transfusion)  
- Pathology SME (CP + AP)  
- UX Writer  
- QA Engineer  

**Mission:**  
Design and scaffold a **complete hematology educational app** that teaches EVERYTHING a medical student, resident, or early fellow needs to accurately understand and *apply* hematology concepts (benign + malignant + transfusion + hemostasis + clinical correlation).  
The app must include prerequisite physiology, common diagnostic pathways, and intuitive diagrams to make the subject easy.

Must be:
- Mobile-first  
- Dark-mode first  
- Fully offline-capable  
- Synthetic data only  
- Clear, accurate, internally consistent  
- All interactive quizzes **local only** (no tracking, no scores saved)

---

# **1. Inputs (Fill When Using This Prompt)**

- **Primary Topics**: {{TOPICS}}  
  *Default:* Complete benign & malignant hematology, transfusion medicine, hemostasis & thrombosis.
  
- **Target Levels**: {{LEVELS}}  
  *Default:* MS2 → MS4, interns, IM/FM/EM residents, pathology residents, early heme fellowship.

- **Learner Context**: {{CONTEXT}}  
  *Default:* Board prep, clinical rotations, case-based reasoning, differential building.

- **Learning Objectives**: {{LEARNING_OBJECTIVES}}  
  *Default examples:*  
  - Correctly classify anemias using RBC indices + smear patterns.  
  - Distinguish leukemias/lymphomas using CBC clues + patterns.  
  - Apply stepwise workups for thrombocytopenia, cytopenias, hemolysis, and clotting disorders.  
  - Interpret hemoglobinopathies and transfusion reactions.

- **Constraints**: {{CONSTRAINTS}}  
  *Required:* Mobile-first, dark-mode, offline-ready, no user tracking.

- **References**: {{REFERENCES}}  
  *Optional conceptual*: WHO heme classifications, ASH concepts, Step exam patterns.

- **Tone**: {{VOICE_TONE}}  
  *Default:* Calm, clear, memory-friendly, clinically rigorous.

---

# **2. Executive Summary & Names**

**Goal:** A full-spectrum hematology learning map that teaches:
- Physiology → labs → patterns → diseases  
- Smear interpretations  
- Clinical correlates  
- Easy-to-remember frameworks  
- High-yield hematology decision pathways  

**Name Options:**
- **Hematology Master** – “Everything blood, from basics to patterns.”  
- **HemeLogic Pro** – “Hematology that finally makes sense.”  
- **Bloodline Atlas** – “From physiology → labs → diagnosis.”  

**Success Criteria:**
- Learners can interpret CBC abnormalities confidently.  
- Users can classify anemia, leukopenia, thrombocytopenia using structured steps.  
- Learners reliably recognize malignant patterns and benign differentials.  
- Complex topics (coagulation, transfusion) become intuitive.

---

# **3. Personas & Use Cases**

### Personas
1. **Internal Medicine Resident**
   - Needs: Rapid clinical interpretation tools.  
   - Pain: “Heme labs look intimidating.”  
   - Success: Can navigate anemia and thrombocytopenia workups with confidence.

2. **Medical Student**
   - Needs: Clear explanations of physiology and smear findings.  
   - Pain: Memorization-heavy heme units.  
   - Success: Understands underlying logic rather than memorizing lists.

3. **Pathology Resident**
   - Needs: Systematic classifications.  
   - Pain: Overwhelming malignant taxonomy.  
   - Success: Can differentiate acute vs chronic leukemias, lymphomas, and MPNs.

### Use Cases
- “CBC is abnormal—what is the next step?”  
- “Differentiate hemolytic vs non-hemolytic anemia.”  
- “Interpret abnormal coagulation studies.”  
- “Recognize leukemia patterns using labs.”  
- “Sort through thrombocytopenia causes.”  
- “Understand transfusion reactions & compatibility.”

---

# **4. Curriculum Map & Knowledge Graph**

### MODULE A — Prerequisite Physiology (Foundations)
- Hematopoiesis  
- CBC components  
- Reticulocyte count mechanics  
- RBC indices  
- Iron physiology  
- Basic coagulation pathways  
- Platelet activation basics  
- Hemoglobin structure & O2 affinity curves  

---

### MODULE B — Anemias (Master Framework)
#### 1. Based on MCV  
- Microcytic (iron deficiency, thalassemia, anemia of chronic disease, sideroblastic)  
- Normocytic (hemolysis, acute blood loss, early iron deficiency, CKD, ACD)  
- Macrocytic (B12, folate, alcohol, drugs, MDS)

#### 2. Hemolytic vs Non-hemolytic  
- Direct vs indirect bilirubin  
- LDH, haptoglobin patterns  
- Direct Antiglobulin Test (DAT)  

#### 3. Smear Pattern Gallery  
- Target cells  
- Schistocytes  
- Spherocytes  
- Bite cells  
- Teardrops  
- Basophilic stippling  

#### 4. Iron Studies Mastery  
- Fe, TIBC, ferritin interpretation  
- Differentiating ACD vs IDA vs sideroblastic  

---

### MODULE C — Leukocytosis, Leukopenia, and Leukemias
#### 1. Benign WBC Patterns  
- Neutrophilia vs lymphocytosis  
- Left shift  
- Toxic granulation  

#### 2. Acute Leukemias  
- AML: Auer rods, blasts >20%  
- ALL: lymphoblasts, TdT concept, pediatric patterns  

#### 3. Chronic Leukemias  
- CML: basophilia + t(9;22) conceptually  
- CLL: smudge cells, mature lymphocytes  

#### 4. MDS & MPN Overview  
- MDS: cytopenias + dysplasia  
- MPN: PV, ET, MF patterns + JAK2 conceptual  

---

### MODULE D — Lymphomas & Plasma Cell Disorders
- Hodgkin vs Non-Hodgkin  
- B symptoms  
- Indolent vs aggressive types  
- Plasma cell dyscrasias:  
  - MGUS  
  - Multiple Myeloma (CRAB criteria)  
  - AL amyloidosis  

---

### MODULE E — Platelets & Thrombocytopenia
- Decreased production (MDS, marrow failure)  
- Increased destruction (ITP, TTP/HUS, DIC, drug-induced)  
- Sequestration (splenomegaly)  
- Platelet function disorders  
- Heparin-induced thrombocytopenia (HIT) – conceptual mechanism  

---

### MODULE F — Coagulation Disorders
#### 1. PT/PTT Interpretation  
- Intrinsic vs extrinsic pathway  
- Mixing studies logic  
  - Corrects? Factor deficiency  
  - Doesn’t correct? Inhibitor  

#### 2. Specific Disorders  
- Hemophilia A/B  
- von Willebrand disease  
- DIC  
- Liver disease patterns  

---

### MODULE G — Hemoglobinopathies
- Sickle cell disease patterns  
- Trait vs disease  
- Thalassemias (α vs β)  
- Electrophoresis interpretation concepts  

---

### MODULE H — Transfusion Medicine
- Blood product basics (PRBC, platelets, plasma)  
- Crossmatch & compatibility conceptual workflow  
- Transfusion reactions:  
  - Hemolytic  
  - Febrile non-hemolytic  
  - Allergic  
  - TRALI vs TACO  

---

### MODULE I — Peds Hematology Basics
- Pediatric iron deficiency  
- Hemoglobinopathies in children  
- Immune hemolysis (neonatal)  
- ALL pediatric patterns  

---

# **5. Interactive Concept Models (Table)**

| Interactive | Purpose | Inputs | Outputs | Visuals | Presets | Guardrails |
|------------|---------|--------|---------|---------|---------|------------|
| CBC Interpreter | Build anemia/WBC/platelet differentials | CBC values | Suggested pathways | Color-coded CBC cards | 12 cases | No clinical management |
| Anemia Navigator | Micro/macro/normo decision tree | MCV, retic | Likely subcategory | Decision flow | 10 anemia presets | Educational only |
| Hemolysis Panel Engine | Hemolysis vs non | LDH, bili, haptoglobin | Hemolysis flag | Graphic markers | 8 cases | Synthetic labs |
| Iron Study Mapper | IDA vs ACD vs thal | Fe, TIBC, ferritin | Pattern match | Triangle diagram | 10 cases | No real recommendations |
| Smear Explorer | Morphology recognition | Description | Name + associated disorders | Illustrated icons | 12 patterns | No real images |
| Leukemia Pattern Predictor | Acute vs chronic | CBC + symptoms | Pattern tag | Ladder diagram | 10 presets | Synthetic only |
| Coagulation Study Interpreter | Factor deficiency vs inhibitor | PT/PTT, mixing | Interpretation | Pathway map | 8 examples | Educational |
| Transfusion Reaction Sorter | Reaction types | Sx + timing | Reaction type | Comparative table | 10 examples | No actual treatment guidance |

---

# **6. Assessment & Mastery (Session-Only)**

Item types:
- MCQs (CBC interpretation, smear recognition, coagulation, leukemia/lymphoma, hemolysis)  
- “What’s the pattern?” reasoning questions  
- Drag-and-drop (e.g., smear cell → associated disorder)  
- Matching: PT/PTT pattern → diagnosis  
- Stepwise anemia workup questions  
- Mixed heme cases  

No scoring persistence. At quiz end:
- “You answered X/Y correctly this session.”  
- Suggestions for review (not tracked).

---

# **7. Hematology Reasoning Framework**

A universal, repeatable framework:
1. **Start with CBC + smear**  
2. **Check retic count** (production vs destruction)  
3. **Determine RBC size** (MCV)  
4. **Assess iron studies** (if microcytic or unclear)  
5. **Assess hemolysis markers** (if ↑ retic or anemia with jaundice)  
6. **Look for multi-lineage issues** → marrow pathology  
7. **If WBC abnormal** → acute vs chronic patterns  
8. **If platelets abnormal** → production vs destruction vs sequestration  
9. **If bleeding/clotting issue** → PT/PTT → mixing studies  
10. **Apply pattern recognition** to malignant/non-malignant categories  

**Pitfalls to warn about:**
- Misdiagnosing IDA vs ACD  
- Missing hemolysis in normal Hgb patients  
- Overcalling leukemia on reactive lymphocytosis  
- Confusing DIC vs liver disease  
- Mixing up TRALI vs TACO  
- Misinterpreting PT/PTT without mixing study logic  

---

# **8. Accessibility, Equity, Safety**

Accessibility:
- WCAG 2.2 AA  
- High-contrast dark mode  
- Keyboard-accessible interactives  

Equity:
- Diverse patient names and scenarios  
- No rare disease overrepresentation unless labeled  
- Avoid bias in scenarios (e.g., sickle cell only in certain groups → handled respectfully and educationally)

Safety:
- Pure educational tool  
- No medical advice or treatment instructions  
- All labs & cases synthetic  
- Clear disclaimers  

---

# **9. Tech Architecture**

Stack:
- React + TypeScript  
- Tailwind + shadcn/ui  
- Zustand (session-only states)  
- Service Worker for offline mode  

Structure:
- `/foundations`  
- `/anemia`  
- `/leukemia`  
- `/lymphoma`  
- `/coagulation`  
- `/platelets`  
- `/transfusion`  
- `/cases`  
- `/assessment`  
- `/settings`  

Settings includes ONLY:
- Dark/light toggle  
- About  
- Disclaimer  

---

# **10. Data Schemas (Plain JSON)**

### Module Schema

    {
      "id": "anemia_microcytic",
      "title": "Microcytic Anemias",
      "summary": "Distinguish iron deficiency, thalassemia, ACD, and sideroblastic using MCV + iron studies.",
      "sections": [
        {
          "id": "ida",
          "title": "Iron Deficiency Anemia",
          "content": "Low Fe, high TIBC, low ferritin; common causes include chronic blood loss and poor intake."
        }
      ],
      "key_points": ["MCV < 80", "Use Fe/TIBC/ferritin patterns"]
    }

### Case Schema

    {
      "id": "hemolysis_case_3",
      "cbc": {"hgb": 7.8, "retic": 6},
      "labs": {"ldh": 620, "haptoglobin": "low", "indirect_bili": "high"},
      "question": "What is the most likely classification?",
      "options": ["Hemolytic anemia", "Iron deficiency", "Aplastic anemia"],
      "correct_option": "Hemolytic anemia",
      "rationale": "Classic hemolysis pattern with ↑LDH, ↓haptoglobin, ↑indirect bilirubin, and reticulocytosis."
    }

---

# **11. Screen Inventory & Wireframes**

### Home  
- Big buttons: Foundations / Anemia / Hemolysis / Hemostasis / Leukemias / Lymphomas / Transfusion  
- Tagline: “Everything in Hematology, finally simple.”

### Module Overview  
- Summary + sub-sections + “Quick Quiz”

### Lesson  
- Chunked explanations  
- Smear illustrations (drawn icons, not photos)  
- Inline miniquiz

### Case Engine  
- Randomized vignettes  
- Pattern-matching questions  
- Immediate feedback  
- No saved scores

### Interactive Labs  
- CBC interpreter  
- PT/PTT playground  
- Smear explorer

### Assessment  
- MCQ bank  
- Mixed heme cases  
- Session-only results

### Settings  
- Dark/light  
- About  
- Disclaimers  

---

# **12. Copy & Content Kit**

Examples:
- “Reticulocytes tell you if the marrow is trying.”  
- “Microcytosis? Think iron, inflammation, thalassemia, or sideroblastic.”  
- “Schistocytes = microangiopathic hemolysis until proven otherwise.”  
- “Basophilic stippling: think thalassemia or lead.”  
- “PT/PTT: If mixing corrects → deficiency; if not → inhibitor.”

Glossary terms:
- Auer rod, rouleaux, schistocyte, smudge cell, tear drop, DAT, PT/PTT, fibrinogen, d-dimer, etc.

---

# **13. Analytics & A/B Plan**

- Compare decision-tree anemia tool vs tile-based anemia classification.  
- Evaluate user confusion rates in PT/PTT interpretation.  
- Test smear icon recognition differences.

(No user-level tracking; analytics refer to product development only.)

---

# **14. QA Checklist**

- Verify all CBC patterns render correctly.  
- Ensure iron study mappings correct.  
- Validate hemolysis patterns.  
- Confirm PT/PTT logic accurate.  
- Ensure all malignant disease descriptions conceptually correct.  
- Ensure no real patient data or treatment advice appears.  

---

# **15. Roadmap**

- **MVP:** Anemia + CBC interpreter  
- **M1:** Coagulation + Platelets  
- **M2:** Leukemias + Lymphomas + MPN/MDS  
- **M3:** Hemoglobinopathies + Transfusion  
- **M4:** Grand case bank (100+ cases)

---

# **ACCEPTANCE CRITERIA**

- Covers **all bread-and-butter hematology**, clearly and accessibly.  
- Content includes physiology prerequisites.  
- Learners can classify anemia, leukemias, platelet disorders, coagulation disorders.  
- No user data tracking.  
- Settings page minimal.  
- App is internally consistent, offline-ready, and mobile-first.

---

## **NOW GENERATE**

Using the above inputs, produce the complete hematology app scaffolding, curriculum, and interactive specification following the required order, with all constraints enforced.
