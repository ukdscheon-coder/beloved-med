import { DRUGLIST_GENERATED } from "./druglist.generated.js";

const CORE_DRUGS = [
  {
    id: "fda-silicea",
    brand: "SILICEA",
    generic: "Silicea",
    ingredient: "Silicon dioxide",
    manufacturer: "Rxhomeo",
    strength: "2X and higher",
    form: "Pellet",
    route: "Oral",
    color: "white",
    shape: "round",
    imprint: "none",
    ndc: "15631-0404",
    source: "openFDA label sample",
    instructions: "Take by mouth. Confirm label details with a pharmacist.",
    safety: "Homeopathic claim. Not FDA evaluated for the listed use."
  },
  {
    id: "ema-ebixa",
    brand: "Ebixa",
    generic: "Memantine",
    ingredient: "Memantine hydrochloride",
    manufacturer: "H. Lundbeck A/S",
    strength: "varies",
    form: "Tablet",
    route: "Oral",
    color: "white",
    shape: "oval",
    imprint: "varies",
    ndc: "",
    source: "EMA Druglist",
    instructions: "Follow the prescribed titration schedule.",
    safety: "Used for moderate to severe Alzheimer disease under medical supervision."
  },
  {
    id: "core-ibuprofen",
    brand: "Ibuprofen",
    generic: "Ibuprofen",
    ingredient: "Ibuprofen",
    manufacturer: "Various",
    strength: "200 mg",
    form: "Tablet",
    route: "Oral",
    color: "brown or white",
    shape: "round",
    imprint: "varies",
    ndc: "",
    source: "Druglist and openFDA-ready",
    instructions: "Often taken with food. Follow the product label or prescription.",
    safety: "Avoid duplicate NSAID use. Ask a clinician if stomach, kidney, heart, or bleeding risk exists."
  },
  {
    id: "core-acetaminophen",
    brand: "Tylenol",
    generic: "Acetaminophen",
    ingredient: "Acetaminophen / Paracetamol",
    manufacturer: "Various",
    strength: "500 mg",
    form: "Tablet",
    route: "Oral",
    color: "white",
    shape: "caplet",
    imprint: "varies",
    ndc: "",
    source: "Druglist and openFDA-ready",
    instructions: "Take only as directed. Track total daily dose from all products.",
    safety: "Too much acetaminophen can cause serious liver harm."
  },
  {
    id: "core-amoxicillin",
    brand: "Amoxicillin",
    generic: "Amoxicillin",
    ingredient: "Amoxicillin",
    manufacturer: "Various",
    strength: "250 mg, 500 mg",
    form: "Capsule",
    route: "Oral",
    color: "pink and white",
    shape: "capsule",
    imprint: "varies",
    ndc: "",
    source: "Druglist and openFDA-ready",
    instructions: "Take for the full prescribed course unless a clinician tells you otherwise.",
    safety: "Do not use with penicillin allergy unless specifically cleared by a clinician."
  },
  {
    id: "core-omeprazole",
    brand: "Omeprazole",
    generic: "Omeprazole",
    ingredient: "Omeprazole",
    manufacturer: "Various",
    strength: "20 mg",
    form: "Capsule",
    route: "Oral",
    color: "pink or white",
    shape: "capsule",
    imprint: "varies",
    ndc: "",
    source: "Druglist and NHS-ready",
    instructions: "Commonly taken before food. Follow the label or prescription.",
    safety: "Ask a clinician about long-term use and new alarm symptoms."
  },
  {
    id: "core-rosuvastatin",
    brand: "Crestor",
    generic: "Rosuvastatin",
    ingredient: "Rosuvastatin",
    manufacturer: "Various",
    strength: "5 mg, 10 mg, 20 mg, 40 mg",
    form: "Tablet",
    route: "Oral",
    color: "pink",
    shape: "round",
    imprint: "varies",
    ndc: "",
    source: "Druglist and openFDA-ready",
    instructions: "Take once daily as prescribed.",
    safety: "Report unexplained muscle pain, weakness, or dark urine promptly."
  },
  {
    id: "core-multivitamin",
    brand: "Multivitamin",
    generic: "Vitamin complex",
    ingredient: "Vitamins and minerals",
    manufacturer: "Various",
    strength: "varies",
    form: "Tablet",
    route: "Oral",
    color: "varies",
    shape: "oval",
    imprint: "varies",
    ndc: "",
    source: "Druglist",
    instructions: "Usually taken with food.",
    safety: "Avoid doubling with other supplements unless advised."
  }
];

export const API_SOURCES = [
  {
    name: "openFDA",
    status: "ready",
    fields: ["brand_name", "generic_name", "manufacturer_name", "product_ndc", "route", "warnings"]
  },
  {
    name: "NHS",
    status: "planned",
    fields: ["patient-friendly guidance", "side effects", "how and when to take"]
  },
  {
    name: "Druglist offline cache",
    status: "ready",
    fields: ["medicine name", "active substance", "status", "EMA product number", "documents"]
  }
];

const seenDrugIds = new Set();
export const DRUGS = [...CORE_DRUGS, ...DRUGLIST_GENERATED].filter((drug) => {
  const key = `${drug.brand || ""}|${drug.ingredient || ""}`.toLowerCase();
  if (seenDrugIds.has(key)) return false;
  seenDrugIds.add(key);
  return true;
});
