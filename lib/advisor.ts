// FasalMitra advisory engine — a transparent, deterministic expert system.
// No hidden model, no invented data: every recommendation is computed from the
// crop knowledge base in lib/data.ts and the farmer's own inputs, and the
// suitability score shows exactly which factors produced it.
import { CROPS, MONTHS, type Crop, type Irrigation, type Season, type SoilType } from "./data";

export interface AdvisorInput {
  cropId: string;
  district: string;
  soil: SoilType;
  season: Season;
  sowingMonth: string; // month name
  areaAcres: number;
  irrigation: Irrigation;
}

export interface Factor { label: string; points: number; max: number; note: string; }
export interface AdvisorPlan {
  crop: Crop;
  score: number;
  verdict: string;
  factors: Factor[];
  warnings: string[];
  schedule: { stage: string; detail: string }[];
  expectedYieldKg: [number, number];
  waterNote: string;
  fertilizerNote: string;
}

const RABI = ["October", "November", "December", "January", "February", "March"];
const KHARIF = ["April", "May", "June", "July", "August", "September", "October"];

function seasonMonths(season: Season): string[] {
  if (season === "Rabi") return RABI;
  if (season === "Kharif") return KHARIF;
  return [...new Set([...RABI, ...KHARIF])];
}

export function buildPlan(input: AdvisorInput): AdvisorPlan {
  const crop = CROPS.find((c) => c.id === input.cropId) ?? CROPS[0];
  const factors: Factor[] = [];
  const warnings: string[] = [];

  // 1. Season fit (30)
  const cropSeasons = crop.season === "Both" ? ["Rabi", "Kharif"] : [crop.season];
  const seasonOk = cropSeasons.includes(input.season);
  factors.push({
    label: "Season fit", max: 30,
    points: seasonOk ? 30 : 8,
    note: seasonOk
      ? `${crop.name} is a ${crop.season} crop — ${input.season} season matches.`
      : `${crop.name} is a ${crop.season} crop; ${input.season} season is a poor match.`,
  });
  if (!seasonOk) warnings.push(`${crop.name} is normally grown in ${crop.season} season, not ${input.season}. Yields and pest pressure will suffer.`);

  // 2. Soil fit (25)
  const soilOk = crop.soils.includes(input.soil);
  factors.push({
    label: "Soil fit", max: 25,
    points: soilOk ? 25 : 10,
    note: soilOk
      ? `${input.soil} soil suits ${crop.name}.`
      : `${crop.name} prefers ${crop.soils.join(" / ")}; ${input.soil} soil needs extra care.`,
  });
  if (!soilOk) warnings.push(`${input.soil} soil is not ideal for ${crop.name}. Add farmyard manure / compost to improve structure.`);

  // 3. Water fit (25)
  const waterMap: Record<Irrigation, "Low" | "Medium" | "High"> = {
    canal: "Medium", tubewell: "High", rainfed: "Low", drip: "Medium",
  };
  const supply = waterMap[input.irrigation];
  const needRank = { Low: 1, Medium: 2, High: 3 } as const;
  const waterOk = needRank[supply] >= needRank[crop.waterNeed];
  const waterPoints = waterOk ? 25 : supply === "Low" && crop.waterNeed === "High" ? 5 : 12;
  factors.push({
    label: "Water availability", max: 25,
    points: waterPoints,
    note: waterOk
      ? `${input.irrigation} irrigation can meet ${crop.name}'s ${crop.waterNeed.toLowerCase()} water need.`
      : `${crop.name} needs ${crop.waterNeed.toLowerCase()} water, but ${input.irrigation} supply is limited.`,
  });
  if (!waterOk) {
    warnings.push(
      input.irrigation === "rainfed"
        ? `Rainfed farming is risky for ${crop.name} — consider a low-water crop such as Mustard, or arrange at least 2–3 supplemental irrigations.`
        : `${crop.name} needs ${crop.waterNeed.toLowerCase()} water; with ${input.irrigation} supply, plan irrigations carefully and mulch to hold moisture.`
    );
  }

  // 4. Sowing timing (20)
  const sowingOk = seasonMonths(input.season).includes(input.sowingMonth);
  factors.push({
    label: "Sowing month", max: 20,
    points: sowingOk ? 20 : 6,
    note: sowingOk
      ? `${input.sowingMonth} falls inside the ${input.season} sowing window (${crop.sowingWindow}).`
      : `${input.sowingMonth} is outside the usual ${input.season} window. Recommended: ${crop.sowingWindow}.`,
  });
  if (!sowingOk) warnings.push(`Sowing in ${input.sowingMonth} is off-window for ${crop.name}. Recommended window: ${crop.sowingWindow}.`);

  const score = factors.reduce((s, f) => s + f.points, 0);
  const verdict =
    score >= 85 ? "Excellent match — go ahead with this plan."
    : score >= 65 ? "Good match — workable with the cautions below."
    : score >= 45 ? "Risky match — only proceed if you can fix the flagged issues."
    : "Poor match — strongly consider a different crop or season.";

  const [yLo, yHi] = crop.yieldKgPerAcre;
  const adj = score >= 85 ? 1 : score >= 65 ? 0.85 : score >= 45 ? 0.65 : 0.45;
  const expectedYieldKg: [number, number] = [
    Math.round(yLo * adj * input.areaAcres),
    Math.round(yHi * adj * input.areaAcres),
  ];

  const schedule = [
    { stage: "Sowing", detail: `${crop.sowingWindow}. Seed rate: ${crop.seedRate}.` },
    { stage: "Fertilizer", detail: `N ${crop.fertilizer.n} · P ${crop.fertilizer.p} · K ${crop.fertilizer.k} kg/acre. ${crop.fertilizer.note}.` },
    { stage: "Irrigation", detail: `${crop.irrigations.count} irrigations — ${crop.irrigations.interval}.` },
    { stage: "Pest watch", detail: `Scout weekly for: ${crop.pests.join(", ")}. Spray only above the economic threshold.` },
    { stage: "Harvest", detail: `Crop duration ${crop.durationDays[0]}–${crop.durationDays[1]} days. Typical yield ${crop.yieldKgPerAcre[0].toLocaleString()}–${crop.yieldKgPerAcre[1].toLocaleString()} kg/acre.` },
  ];

  const waterNote =
    crop.waterNeed === "High"
      ? "High water need — secure canal turns or tubewell hours before sowing; standing water matters for this crop."
      : crop.waterNeed === "Medium"
      ? "Medium water need — schedule irrigations at the critical stages listed above; mulching helps."
      : "Low water need — this crop tolerates dry spells and suits limited-water farms.";

  return {
    crop, score, verdict, factors, warnings, schedule,
    expectedYieldKg,
    waterNote,
    fertilizerNote: `Apply ${crop.fertilizer.n} kg N, ${crop.fertilizer.p} kg P and ${crop.fertilizer.k} kg K per acre. ${crop.fertilizer.note}.`,
  };
}

export function monthNow(): string {
  return MONTHS[new Date().getMonth()];
}
