// English / Roman Urdu strings for the main UI.
export type Lang = "en" | "ur";

const STR: Record<string, { en: string; ur: string }> = {
  tagline: {
    en: "AI farm copilot for smallholder farmers",
    ur: "Chhote kisanon ke liye AI farm dost",
  },
  heroTitle: {
    en: "Grow smarter. Earn more.",
    ur: "Hoshiyari se ugao. Zyada kamao.",
  },
  heroSub: {
    en: "Crop advice, live weather, mandi prices, disease screening and profit planning — one free tool, built for the farmers of Punjab.",
    ur: "Fasal ki salah, live mausam, mandi ke daam, bimari ki jaanch aur munafa planning — aik muft tool, Punjab ke kisanon ke liye.",
  },
  advisor: { en: "Crop Advisor", ur: "Fasal Salahkar" },
  weather: { en: "Live Weather", ur: "Live Mausam" },
  mandi: { en: "Mandi Prices", ur: "Mandi Daam" },
  disease: { en: "Disease Check", ur: "Bimari Jaanch" },
  profit: { en: "Profit Planner", ur: "Munafa Planner" },
  getAdvice: { en: "Get my crop plan", ur: "Meri fasal plan lein" },
  district: { en: "District", ur: "Zila" },
  soil: { en: "Soil type", ur: "Mitti ki qisam" },
  season: { en: "Season", ur: "Mausam (season)" },
  sowingMonth: { en: "Sowing month", ur: "Bijai ka mahina" },
  area: { en: "Farm area (acres)", ur: "Zameen (acre)" },
  irrigation: { en: "Irrigation source", ur: "Pani ka zariya" },
  crop: { en: "Crop", ur: "Fasal" },
  dataNote: {
    en: "Advisory ranges come from standard Punjab agriculture extension guidance. They are planning estimates, not guarantees — always confirm with your local agriculture officer.",
    ur: "Salah ki had Punjab agriculture extension ki rehnumai par mabni hai. Yeh andazan hain, guarantee nahi — apne ilaqay ke agriculture officer se zaroor confirm karein.",
  },
};

export function t(lang: Lang, key: string): string {
  return STR[key]?.[lang] ?? STR[key]?.en ?? key;
}
