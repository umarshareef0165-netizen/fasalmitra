// FasalMitra knowledge base — agronomy figures are typical extension-service
// ranges for Punjab, Pakistan (per acre). They are advisory ranges, not guarantees.
export type Season = "Rabi" | "Kharif" | "Both";
export type WaterNeed = "Low" | "Medium" | "High";
export type SoilType = "Sandy" | "Loamy" | "Clay" | "Silt Loam";
export type Irrigation = "canal" | "tubewell" | "rainfed" | "drip";

export interface Crop {
  id: string;
  name: string;
  urdu: string;
  season: Season;
  seasonMonths: string;
  durationDays: [number, number];
  waterNeed: WaterNeed;
  soils: SoilType[];
  sowingWindow: string;
  seedRate: string;
  fertilizer: { n: number; p: number; k: number; note: string };
  irrigations: { count: string; interval: string };
  pests: string[];
  yieldKgPerAcre: [number, number];
  marketUnit: string;
  tip: string;
}

export const CROPS: Crop[] = [
  {
    id: "wheat", name: "Wheat", urdu: "Gandum", season: "Rabi",
    seasonMonths: "Nov – Apr", durationDays: [150, 160], waterNeed: "Medium",
    soils: ["Loamy", "Silt Loam", "Clay"],
    sowingWindow: "1 Nov – 15 Dec (best: 1 – 30 Nov)",
    seedRate: "50 kg / acre",
    fertilizer: { n: 46, p: 34, k: 25, note: "1 bag DAP at sowing + 2 bags urea split (tillering & booting)" },
    irrigations: { count: "4 – 5", interval: "Crown-root (21 DAS), tillering, booting, grain-fill" },
    pests: ["Aphids", "Yellow rust", "Brown rust", "Termites"],
    yieldKgPerAcre: [1400, 2000], marketUnit: "PKR / 40 kg",
    tip: "Sow on time — every week of delay after 30 Nov cuts yield by roughly 1–1.5 maunds per acre.",
  },
  {
    id: "rice", name: "Rice (Paddy)", urdu: "Chawal / Dhan", season: "Kharif",
    seasonMonths: "Jun – Oct", durationDays: [120, 140], waterNeed: "High",
    soils: ["Clay", "Silt Loam", "Loamy"],
    sowingWindow: "Nursery: 20 May – 20 Jun · Transplant: 20 Jun – 20 Jul",
    seedRate: "8 – 10 kg / acre (nursery)",
    fertilizer: { n: 55, p: 32, k: 25, note: "Full DAP at puddling + urea in 3 splits" },
    irrigations: { count: "Standing water", interval: "Keep 2–5 cm water till panicle initiation, then alternate wetting" },
    pests: ["Stem borer", "Rice blast", "Brown planthopper", "Bacterial blight"],
    yieldKgPerAcre: [1600, 2400], marketUnit: "PKR / 40 kg",
    tip: "Transplant 25–30 day old seedlings at 20 × 20 cm — older seedlings tiller poorly.",
  },
  {
    id: "cotton", name: "Cotton", urdu: "Kapas", season: "Kharif",
    seasonMonths: "Apr – Oct", durationDays: [160, 180], waterNeed: "Medium",
    soils: ["Loamy", "Sandy", "Silt Loam"],
    sowingWindow: "15 Apr – 31 May (best: late Apr – mid May)",
    seedRate: "8 – 10 kg / acre (Bt varieties)",
    fertilizer: { n: 60, p: 30, k: 25, note: "DAP at sowing + urea in 3 splits; potash improves boll size" },
    irrigations: { count: "6 – 8", interval: "First at 30 DAS, then every 12–15 days; avoid waterlogging" },
    pests: ["Bollworm (pink/ American)", "Whitefly", "Jassid", "Thrips"],
    yieldKgPerAcre: [600, 1000], marketUnit: "PKR / 40 kg (phutti)",
    tip: "Scout twice a week from flowering — spray only when pest crosses the economic threshold.",
  },
  {
    id: "maize", name: "Maize", urdu: "Makai", season: "Both",
    seasonMonths: "Feb – May · Jul – Oct", durationDays: [100, 120], waterNeed: "Medium",
    soils: ["Loamy", "Silt Loam", "Sandy"],
    sowingWindow: "Spring: 1 Feb – 15 Mar · Autumn: 20 Jul – 15 Aug",
    seedRate: "10 – 12 kg / acre (hybrid)",
    fertilizer: { n: 70, p: 40, k: 30, note: "Heavy feeder — DAP at sowing + urea in 3 splits up to tasseling" },
    irrigations: { count: "6 – 8", interval: "Critical at knee-high, tasseling & grain-fill — never stress at tasseling" },
    pests: ["Fall armyworm", "Stem borer", "Shoot fly"],
    yieldKgPerAcre: [2400, 3600], marketUnit: "PKR / 40 kg",
    tip: "Hybrid seed + timely urea at tasseling is the biggest single yield lever in maize.",
  },
  {
    id: "sugarcane", name: "Sugarcane", urdu: "Ganna", season: "Both",
    seasonMonths: "Feb – Mar · Sep – Oct", durationDays: [300, 365], waterNeed: "High",
    soils: ["Loamy", "Silt Loam", "Clay"],
    sowingWindow: "Spring: 15 Feb – 31 Mar · Autumn: 15 Sep – 15 Oct",
    seedRate: "2,500 – 3,000 kg setts / acre",
    fertilizer: { n: 80, p: 45, k: 40, note: "DAP at planting + urea in 4 splits; press-mud adds organic matter" },
    irrigations: { count: "12 – 16", interval: "Every 12–15 days in summer; reduce before harvest for sugar recovery" },
    pests: ["Sugarcane borer", "Red rot", "Pyrilla", "Termites"],
    yieldKgPerAcre: [24000, 32000], marketUnit: "PKR / 40 kg",
    tip: "Use disease-free, treated setts — red rot travels with bad seed and can wipe out a field.",
  },
  {
    id: "mustard", name: "Mustard (Sarson)", urdu: "Sarson", season: "Rabi",
    seasonMonths: "Oct – Mar", durationDays: [130, 150], waterNeed: "Low",
    soils: ["Loamy", "Sandy", "Silt Loam"],
    sowingWindow: "1 Oct – 15 Nov (best: mid Oct)",
    seedRate: "2 – 2.5 kg / acre",
    fertilizer: { n: 30, p: 20, k: 15, note: "DAP at sowing + 1 bag urea at flowering; sulphur boosts oil content" },
    irrigations: { count: "2 – 3", interval: "First at 30 DAS, second at flowering" },
    pests: ["Mustard aphid", "White rust", "Alternaria blight"],
    yieldKgPerAcre: [500, 800], marketUnit: "PKR / 40 kg",
    tip: "Low water, short duration — the best Rabi option on light soils and limited canal water.",
  },
  {
    id: "potato", name: "Potato", urdu: "Aloo", season: "Rabi",
    seasonMonths: "Oct – Jan", durationDays: [90, 110], waterNeed: "Medium",
    soils: ["Sandy", "Loamy", "Silt Loam"],
    sowingWindow: "1 Oct – 15 Nov (autumn crop)",
    seedRate: "600 – 800 kg seed tubers / acre",
    fertilizer: { n: 60, p: 40, k: 40, note: "Full P & K at planting + N in 2 splits; potash improves tuber quality" },
    irrigations: { count: "5 – 7", interval: "Light, frequent watering; stop 10 days before harvest" },
    pests: ["Early blight", "Late blight", "Aphids", "Cutworm"],
    yieldKgPerAcre: [8000, 12000], marketUnit: "PKR / 40 kg",
    tip: "Grade and store seed tubers well — seed is ~40% of potato cost, and bad seed is the costliest mistake.",
  },
  {
    id: "tomato", name: "Tomato", urdu: "Tamatar", season: "Both",
    seasonMonths: "Sep – Dec · Feb – May", durationDays: [90, 120], waterNeed: "Medium",
    soils: ["Loamy", "Silt Loam", "Sandy"],
    sowingWindow: "Nursery Aug–Sep → transplant Sep–Oct · Spring nursery Jan–Feb",
    seedRate: "100 – 150 g seed / acre (nursery)",
    fertilizer: { n: 50, p: 30, k: 30, note: "DAP at transplant + urea & potash in splits through fruiting" },
    irrigations: { count: "8 – 10", interval: "Every 7–10 days; drip saves water and cuts blight" },
    pests: ["Leaf curl virus (whitefly)", "Early blight", "Fruit borer"],
    yieldKgPerAcre: [8000, 12000], marketUnit: "PKR / 40 kg",
    tip: "Prices swing wildly — stagger transplanting by 2 weeks across beds to spread market risk.",
  },
  {
    id: "onion", name: "Onion", urdu: "Piyaz", season: "Rabi",
    seasonMonths: "Oct – Apr", durationDays: [120, 150], waterNeed: "Medium",
    soils: ["Loamy", "Silt Loam", "Sandy"],
    sowingWindow: "Nursery Oct–Nov → transplant Dec–Jan",
    seedRate: "3 – 4 kg seed / acre (nursery)",
    fertilizer: { n: 40, p: 25, k: 25, note: "DAP at transplant + urea in 2 splits; avoid fresh manure (thick necks)" },
    irrigations: { count: "8 – 12", interval: "Every 10–12 days; stop 15 days before harvest for curing" },
    pests: ["Purple blotch", "Thrips", "Downy mildew"],
    yieldKgPerAcre: [6000, 9000], marketUnit: "PKR / 40 kg",
    tip: "Cure bulbs 7–10 days in shade before storage — cured onions keep months, uncured ones rot.",
  },
];

export const DISTRICTS = [
  "Faisalabad", "Lahore", "Multan", "Rawalpindi", "Sargodha", "Gujranwala",
  "Bahawalpur", "Sialkot", "Okara", "Sahiwal", "Vehari", "Khanewal",
  "Rahim Yar Khan", "Dera Ghazi Khan", "Jhang", "Kasur", "Sheikhupura",
  "Hyderabad", "Sukkur", "Larkana", "Peshawar", "Mardan", "Quetta",
];

export const SOILS: SoilType[] = ["Sandy", "Loamy", "Clay", "Silt Loam"];
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ---- Disease knowledge base ----
export interface Disease {
  id: string;
  name: string;
  crop: string;
  symptoms: string[]; // symptom keys
  colorHint: "yellow" | "brown" | "dark" | "white" | "none";
  treatment: string;
  prevention: string;
}

export const SYMPTOMS = [
  { id: "yellow-stripes", label: "Yellow stripes / streaks on leaves" },
  { id: "round-spots", label: "Round / oval spots with rings" },
  { id: "wilting", label: "Wilting despite watering" },
  { id: "curling", label: "Leaves curling / crinkling" },
  { id: "holes-bored", label: "Holes bored in bolls / fruits / stems" },
  { id: "powder", label: "White powdery coating" },
  { id: "rotting", label: "Rotting / soft bulbs, stems or roots" },
  { id: "stunted", label: "Stunted growth, small plants" },
];

export const DISEASES: Disease[] = [
  {
    id: "yellow-rust", name: "Yellow Rust (Wheat)", crop: "wheat",
    symptoms: ["yellow-stripes", "stunted"], colorHint: "yellow",
    treatment: "Spray Propiconazole (Tilt) 0.1% or Tebuconazole at first sign; repeat after 15 days if spread continues.",
    prevention: "Grow resistant varieties; avoid late sowing; do not over-apply nitrogen.",
  },
  {
    id: "rice-blast", name: "Rice Blast", crop: "rice",
    symptoms: ["round-spots", "rotting"], colorHint: "brown",
    treatment: "Spray Tricyclazole 75 WP or Isoprothiolane; drain the field for 2–3 days to slow spread.",
    prevention: "Use healthy seed; balance nitrogen — excess urea invites blast; burn infected stubble.",
  },
  {
    id: "bollworm", name: "Cotton Bollworm", crop: "cotton",
    symptoms: ["holes-bored", "rotting"], colorHint: "dark",
    treatment: "Install pheromone traps (5/acre); spray Spinosad or Emamectin benzoate when larvae are small.",
    prevention: "Scout twice weekly from flowering; destroy damaged bolls; rotate with non-host crops.",
  },
  {
    id: "armyworm", name: "Fall Armyworm (Maize)", crop: "maize",
    symptoms: ["holes-bored", "wilting"], colorHint: "dark",
    treatment: "Apply Emamectin benzoate or Spinosad into the whorl; neem extract works on young larvae.",
    prevention: "Early sowing; intercrop with legumes; hand-pick egg masses during scouting.",
  },
  {
    id: "early-blight", name: "Early Blight (Potato / Tomato)", crop: "potato",
    symptoms: ["round-spots", "yellow-stripes"], colorHint: "brown",
    treatment: "Spray Mancozeb + Metalaxyl or Chlorothalonil at 10-day intervals from first spots.",
    prevention: "Avoid overhead watering; rotate crops; remove infected lower leaves promptly.",
  },
  {
    id: "leaf-curl", name: "Tomato Leaf Curl Virus", crop: "tomato",
    symptoms: ["curling", "stunted", "yellow-stripes"], colorHint: "yellow",
    treatment: "No cure — uproot and bury infected plants immediately to stop spread.",
    prevention: "Control whitefly with yellow sticky traps + Imidacloprid; use resistant hybrids; cover nursery with net.",
  },
  {
    id: "purple-blotch", name: "Purple Blotch (Onion)", crop: "onion",
    symptoms: ["round-spots", "wilting"], colorHint: "brown",
    treatment: "Spray Mancozeb + Metalaxyl-M; improve drainage and air flow between rows.",
    prevention: "Avoid excess nitrogen; space plants properly; do not plant onion after onion.",
  },
  {
    id: "red-rot", name: "Red Rot (Sugarcane)", crop: "sugarcane",
    symptoms: ["rotting", "wilting", "stunted"], colorHint: "dark",
    treatment: "Rogue out infected clumps; treat setts with Carbendazim before planting next season.",
    prevention: "Plant only disease-free, certified setts; grow resistant varieties; avoid waterlogging.",
  },
];

// ---- Mandi prices: INDICATIVE demo data (PKR / 40 kg), Nov 2026 ----
// Clearly labelled in the UI as indicative — always verify at the local mandi.
export interface MandiRow { crop: string; market: string; price: number; change: number; trend: number[]; }
function walk(seed: number, base: number, n = 7): number[] {
  let v = base; const out: number[] = []; let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    v = Math.max(50, Math.round(v + ((s % 201) - 100) / 100 * base * 0.03));
    out.push(v);
  }
  return out;
}
const M: MandiRow[] = [];
const CROPS_PRICE: [string, number, number][] = [
  ["Wheat", 2950, 11], ["Rice (Basmati paddy)", 4650, 23], ["Cotton (Phutti)", 7950, 37],
  ["Maize", 2400, 51], ["Sugarcane", 470, 67], ["Mustard", 5900, 83],
  ["Potato", 2100, 97], ["Tomato", 3200, 113], ["Onion", 2450, 131],
];
const MARKETS = ["Lahore", "Faisalabad", "Multan", "Rawalpindi"];
CROPS_PRICE.forEach(([crop, base, seed], ci) => {
  MARKETS.forEach((market, mi) => {
    const trend = walk(seed + mi * 7 + ci, base);
    const price = trend[trend.length - 1];
    const change = Math.round(((price - trend[0]) / trend[0]) * 1000) / 10;
    M.push({ crop, market, price, change, trend });
  });
});
export const MANDI: MandiRow[] = M;
