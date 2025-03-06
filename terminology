
---

## 🔗 **Clinical Ontology vs Terminology - Summary**

### 📚 Key Definitions
- **Terminology:** A standardized **list of codes and terms** (e.g., SNOMED CT, ICD-10, LOINC, RxNorm) created by external standards bodies.
- **Ontology:** A **structured model** that defines **concepts, relationships, and meaning** within a clinical or business domain. It’s more than just a list — it’s a **knowledge graph**.
- **Custom Ontology Model (COM):** A **homegrown, internal ontology** created by an organization to act as its **single source of truth** for clinical concepts, linking to external terminologies as needed.

---

### 🔄 **Mapping**
Mapping = translation between terminologies or between a terminology and your custom ontology.
- Example: **SNOMED "Type 2 diabetes" maps to ICD-10 "E11.9".**
- Mappings can be:
    - **1-to-1** (clean match)
    - **1-to-many** (more than one valid target, requiring logic to choose)
    - **Many-to-1** (several detailed concepts collapse into one code)
    - **No match** (gap requiring manual handling)

---

### 🔥 Why COM is Powerful
✅ Acts as a **neutral hub** connecting all incoming data (claims, EHR, public health feeds, etc.) into a single **canonical representation**.
✅ Allows you to store **clinical relationships** — e.g., diabetes → needs retinal exam, diabetes → treated by metformin.
✅ Handles **non-1-to-1 mappings** gracefully by attaching **business rules** to decide how to translate.
✅ Supports **both clinical and financial needs** (quality, risk adjustment, care management, etc.).
✅ Supports **multi-domain coverage** — conditions, medications, procedures, labs, allergies, immunizations, and more.

---

### 🗂️ External Terminologies — What Each One Covers

| Domain | Common Terminologies |
|---|---|
| **Conditions (diagnoses)** | SNOMED CT (clinical), ICD-10 (billing) |
| **Medications** | RxNorm (prescribed), NDC (dispensed) |
| **Labs & Vitals** | LOINC |
| **Procedures** | CPT (billing), SNOMED CT (clinical) |
| **Immunizations** | CVX |
| **Allergies** | RxNorm (drugs), SNOMED (non-drug allergens) |
| **Social History, Family History** | SNOMED CT (often) |

---

### 🔄 Data Flow Example
```text
Incoming Data (Claims, CCDs, HIE, Labs, etc.)
     ⬇️
Map to COM (each source maps to a canonical concept in your COM)
     ⬇️
Store in Patient Record (conditions, meds, labs, procedures, allergies all in COM)
     ⬇️
Use for:
   ✅ Care management
   ✅ Risk adjustment
   ✅ Quality reporting
   ✅ Analytics & population health
   ✅ Reporting to external partners (map back to ICD, CPT, etc. when needed)
```

---

### 🔥 Example Relationship in COM (Diabetes)
```json
{
    "relationshipType": "linked_screening",
    "source": "DIAB_TYPE2",
    "target": "RETINAL_EXAM",
    "frequency": "annual",
    "guideline_source": "ADA"
}
```

### Relationships your COM can encode for each condition
| Type | Example for Type 2 Diabetes |
|---|---|
| **Diagnosed By** | HbA1c test |
| **Monitored By** | HbA1c, BMP, Lipid Panel |
| **Linked Screening** | Retinal Exam |
| **Treated By** | Metformin, GLP-1, Insulin |
| **Complications** | Retinopathy, Neuropathy, Nephropathy |

---

### 📊 Example Relationship Table
| Source Concept | Relationship Type | Target Concept |
|---|---|---|
| DIAB_TYPE2 | linked_screening | RETINAL_EXAM |
| HYPERTENSION | linked_screening | RETINAL_EXAM |
| DIAB_TYPE2 | treated_by | METFORMIN |
| DIAB_TYPE2 | may_lead_to | DIABETIC_RETINOPATHY |

---

### 🔥 Key Distinctions
| Aspect | Terminology Management | COM Management |
|---|---|---|
| **Scope** | External standards only | Internal custom model |
| **Focus** | Keeping codes up to date | Defining relationships, groupers, care pathways, business logic |
| **Mapping** | SNOMED → ICD, LOINC → local codes | All incoming sources map to COM; COM maps out to external terminologies |
| **Relationships** | Rare | Fully explicit (conditions → screenings, meds, procedures, labs, complications) |
| **Use Case** | Data quality & compliance | Analytics, decision support, cohorting, care gaps, pathway modeling |

---

### ✅ When to Use What

| Goal | Recommended Approach |
|---|---|
| Short-term payer analytics (claims focus) | ICD-only (simple but limited) |
| EHR integration (clinical focus) | SNOMED-only (better for clinical) |
| Comprehensive longitudinal patient profile (multi-source, multi-purpose) | **COM (recommended)** |

---

### 🚨 What You Avoid with COM
❌ Mapping spaghetti (every system mapping directly to every other system).  
❌ Rebuilding the same rules (like care gaps) in every downstream tool.  
❌ Losing clinical richness when converting between terminologies.  
❌ Hard-coding condition lists separately for risk, quality, and care management.

---

### 💡 Final Rule of Thumb
> **Terminology = clean codes. COM = smart data.**
> If you want your system to power **care management, quality, risk, analytics, AND reporting**, you need a **COM** (even if it starts small).

---




---

# 👩‍⚕️ **Physician-Patient Journey — End-to-End Coding Flow**

### 📍 Scenario:
Patient visits the doctor with symptoms. Doctor suspects diabetes, orders tests, confirms diagnosis, prescribes meds, and bills the visit to insurance.

---

## 🩺 **Step 1: Patient Visit (Complaint + Assessment)**

| Action | Coding System | Example Code |
|---|---|---|
| Document Symptoms | SNOMED CT | 267425008 (Polyuria) |
| Suspect Diagnosis | SNOMED CT | 44054006 (Diabetes Mellitus Type 2) |
| Bill the Visit | CPT | 99203 (Office visit - new patient) |

---

## 🔬 **Step 2: Order Lab Test (Confirm Diagnosis)**

| Action | Coding System | Example Code |
|---|---|---|
| Order HbA1c Test | LOINC | 4548-4 (Hemoglobin A1c) |

---

## ✅ **Step 3: Receive & Document Lab Results**

| Action | Coding System | Example Code |
|---|---|---|
| Document Lab Result | LOINC | 4548-4 (HbA1c = 9.5%) |
| Confirm Diagnosis | SNOMED CT | 44054006 (Type 2 Diabetes Mellitus) |
| Add Diagnosis to Problem List | SNOMED CT | 44054006 |

---

## 💊 **Step 4: Prescribe Medication**

| Action | Coding System | Example Code |
|---|---|---|
| Prescribe Metformin | RxNorm | 866242 (Metformin 500mg tablet) |

---

## 💰 **Step 5: Submit Claim to Insurance**

| Action | Coding System | Example Code |
|---|---|---|
| Diagnosis for Claim | ICD-10 | E11.9 (Type 2 Diabetes Mellitus without complications) |
| Procedure for Visit | CPT | 99203 (Office Visit) |
| Medications (if part of claim) | HCPCS (optional) | J8499 (Oral prescription drug, non-chemo) |

---

## 💊 **Step 6: Dispense Medication at Pharmacy**

| Action | Coding System | Example Code |
|---|---|---|
| Dispense Product | NDC | 00093-1045-01 (Teva Metformin 500mg bottle) |

---

# 🔄 **Summary Coding Systems by Step**

| Workflow Step | Primary Coding Systems Used |
|---|---|
| Symptoms & Diagnosis | SNOMED CT (clinical documentation) |
| Labs Ordered & Results | LOINC |
| Prescriptions | RxNorm (prescribed), NDC (dispensed) |
| Procedures (Visit) | CPT |
| Diagnosis (for Billing) | ICD-10 (claims) |
| Medications (for Billing) | HCPCS (sometimes, if drugs are part of claim) |

---

# 🔥 Why So Many Terminologies?
| System Type | Preferred Coding System |
|---|---|
| Clinical Documentation (EHR) | SNOMED CT |
| Lab Systems (Orders & Results) | LOINC |
| Prescribing Systems (Medication Orders) | RxNorm |
| Pharmacy Systems (Product Dispensing) | NDC |
| Billing Systems (Claims) | ICD-10 (diagnoses) + CPT/HCPCS (procedures) |
| Immunization Systems | CVX |

---

# 🔗 Example Real Flow (Visual)

```text
Patient visit → Document symptoms (SNOMED)
            → Suspect diabetes (SNOMED)
            → Order HbA1c (LOINC)
            → Confirm diabetes from result (SNOMED)
            → Prescribe Metformin (RxNorm)
            → Submit claim to payer (ICD-10 + CPT)
            → Pharmacy dispenses Metformin (NDC)
```

---

# ✅ Key Insight
- **Clinical language (EHR)** = SNOMED, LOINC, RxNorm
- **Billing language (Claims)** = ICD-10, CPT, HCPCS
- **Pharmacy language** = NDC
- **Public health language (vaccines)** = CVX
- **Labs language** = LOINC

---

# ⚠️ Why Translation (Mapping) is Required
| From | To | Why Needed |
|---|---|---|
| SNOMED (diagnosis) | ICD-10 (billing) | Payers only accept ICD codes. |
| SNOMED (diagnosis) | Quality Program Rules | Some HEDIS measures are ICD-only. |
| RxNorm (prescription) | NDC (dispensing) | Pharmacies manage inventory by NDC. |
| LOINC (lab result) | Quality Programs | Some quality rules require specific LOINC results. |

---

