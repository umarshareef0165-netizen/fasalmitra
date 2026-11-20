"use client";
import { useEffect, useState } from "react";
import { CROPS, DISTRICTS, MONTHS, SOILS, type Irrigation, type Season, type SoilType } from "@/lib/data";
import { buildPlan, monthNow, type AdvisorPlan } from "@/lib/advisor";
import { t, type Lang } from "@/lib/i18n";

const IRRIGATION: { id: Irrigation; label: string }[] = [
  { id: "canal", label: "Canal" },
  { id: "tubewell", label: "Tubewell" },
  { id: "rainfed", label: "Rainfed (barani)" },
  { id: "drip", label: "Drip" },
];

export default function Advisor({ lang }: { lang: Lang }) {
  const [cropId, setCropId] = useState("wheat");
  const [district, setDistrict] = useState("Faisalabad");
  const [soil, setSoil] = useState<SoilType>("Loamy");
  const [season, setSeason] = useState<Season>("Rabi");
  const [month, setMonth] = useState("November");
  const [area, setArea] = useState(5);
  const [irrigation, setIrrigation] = useState<Irrigation>("canal");
  const [plan, setPlan] = useState<AdvisorPlan | null>(null);
  const [saved, setSaved] = useState<AdvisorPlan[]>([]);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    setMonth(monthNow());
    try {
      const raw = localStorage.getItem("fasalmitra-plans");
      if (raw) setSaved(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlan(buildPlan({ cropId, district, soil, season, sowingMonth: month, areaAcres: area, irrigation }));
    setSavedMsg("");
  };

  const savePlan = () => {
    if (!plan) return;
    const next = [plan, ...saved].slice(0, 6);
    setSaved(next);
    try { localStorage.setItem("fasalmitra-plans", JSON.stringify(next)); } catch { /* ignore */ }
    setSavedMsg(lang === "ur" ? "Plan save ho gaya." : "Plan saved on this device.");
  };

  const inputCls = "w-full rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20";
  const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900/70";

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form onSubmit={submit} className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-bold text-emerald-950">{t(lang, "advisor")}</h3>
        <p className="mb-4 text-sm text-emerald-900/60">
          {lang === "ur"
            ? "Apni fasal aur zameen ki tafseel dein — engine aap ko poora plan de ga."
            : "Tell us about your crop and land — the engine builds your full plan."}
        </p>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>{t(lang, "crop")}</label>
            <select className={inputCls} value={cropId} onChange={(e) => setCropId(e.target.value)}>
              {CROPS.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.urdu}) — {c.season}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t(lang, "district")}</label>
              <select className={inputCls} value={district} onChange={(e) => setDistrict(e.target.value)}>
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>{t(lang, "soil")}</label>
              <select className={inputCls} value={soil} onChange={(e) => setSoil(e.target.value as SoilType)}>
                {SOILS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t(lang, "season")}</label>
              <select className={inputCls} value={season} onChange={(e) => setSeason(e.target.value as Season)}>
                <option value="Rabi">Rabi (winter)</option>
                <option value="Kharif">Kharif (summer)</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>{t(lang, "sowingMonth")}</label>
              <select className={inputCls} value={month} onChange={(e) => setMonth(e.target.value)}>
                {MONTHS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t(lang, "area")}</label>
              <input type="number" min={0.5} max={500} step={0.5} className={inputCls} value={area} onChange={(e) => setArea(Number(e.target.value) || 1)} />
            </div>
            <div>
              <label className={labelCls}>{t(lang, "irrigation")}</label>
              <select className={inputCls} value={irrigation} onChange={(e) => setIrrigation(e.target.value as Irrigation)}>
                {IRRIGATION.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-emerald-800">
            {t(lang, "getAdvice")}
          </button>
          <p className="text-[11px] leading-relaxed text-emerald-900/50">{t(lang, "dataNote")}</p>
        </div>
        {saved.length > 0 && (
          <div className="mt-5 border-t border-emerald-900/10 pt-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-900/60">
              {lang === "ur" ? "Save shuda plans" : "Saved plans on this device"}
            </p>
            <ul className="space-y-1 text-sm text-emerald-900/80">
              {saved.map((p, i) => (
                <li key={i} className="flex justify-between rounded bg-emerald-50 px-2 py-1">
                  <span>{p.crop.name} · {p.score}/100</span>
                  <button type="button" className="font-semibold text-emerald-700 underline" onClick={() => setPlan(p)}>
                    {lang === "ur" ? "Dekhein" : "View"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-3">
        {!plan ? (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 text-5xl">🌾</div>
            <p className="max-w-sm text-sm text-emerald-900/60">
              {lang === "ur"
                ? "Form bharein aur plan hasil karein — suitability score, khaad aur pani ka schedule, aur matwaqa paidawar."
                : "Fill the form and get your plan — suitability score, fertilizer and irrigation schedule, and expected yield."}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-emerald-950">{plan.crop.name} <span className="text-emerald-900/50">({plan.crop.urdu})</span></h3>
                <p className="text-sm text-emerald-900/60">{district} · {season} {month} · {area} acres · {plan.crop.seasonMonths}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-emerald-700">{plan.score}<span className="text-base text-emerald-900/40">/100</span></div>
                <div className="text-xs font-semibold text-emerald-900/60">Suitability score</div>
              </div>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${plan.score}%` }} />
            </div>
            <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">{plan.verdict}</p>

            <h4 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-emerald-900/70">How the score was built</h4>
            <div className="space-y-2">
              {plan.factors.map((f) => (
                <div key={f.label} className="rounded-lg border border-emerald-900/10 px-3 py-2">
                  <div className="flex justify-between text-sm"><span className="font-semibold text-emerald-950">{f.label}</span><span className="font-bold text-emerald-700">{f.points}/{f.max}</span></div>
                  <p className="text-xs text-emerald-900/60">{f.note}</p>
                </div>
              ))}
            </div>

            {plan.warnings.length > 0 && (
              <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2">
                <p className="text-sm font-bold text-amber-800">⚠ Watch out</p>
                <ul className="list-disc pl-5 text-sm text-amber-900/80">
                  {plan.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            <h4 className="mb-2 mt-5 text-sm font-bold uppercase tracking-wide text-emerald-900/70">Your season plan</h4>
            <ol className="space-y-2">
              {plan.schedule.map((s, i) => (
                <li key={i} className="flex gap-3 rounded-lg bg-emerald-50/70 px-3 py-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">{i + 1}</span>
                  <div><p className="text-sm font-bold text-emerald-950">{s.stage}</p><p className="text-sm text-emerald-900/70">{s.detail}</p></div>
                </li>
              ))}
            </ol>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-emerald-900/10 p-3">
                <p className="text-xs font-bold uppercase text-emerald-900/60">Expected yield ({area} ac)</p>
                <p className="text-lg font-black text-emerald-800">{plan.expectedYieldKg[0].toLocaleString()} – {plan.expectedYieldKg[1].toLocaleString()} kg</p>
              </div>
              <div className="rounded-lg border border-emerald-900/10 p-3">
                <p className="text-xs font-bold uppercase text-emerald-900/60">Water</p>
                <p className="text-sm text-emerald-900/80">{plan.waterNote}</p>
              </div>
              <div className="rounded-lg border border-emerald-900/10 p-3">
                <p className="text-xs font-bold uppercase text-emerald-900/60">Farmer tip</p>
                <p className="text-sm text-emerald-900/80">{plan.crop.tip}</p>
              </div>
            </div>

            <button onClick={savePlan} className="mt-4 rounded-lg border border-emerald-700 px-4 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-50">
              {lang === "ur" ? "Plan save karein" : "Save this plan"}
            </button>
            {savedMsg && <span className="ml-3 text-sm font-semibold text-emerald-700">{savedMsg}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
