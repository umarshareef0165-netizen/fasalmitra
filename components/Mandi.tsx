"use client";
import { useMemo, useState } from "react";
import { MANDI } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const w = 110, h = 34, min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 3 - ((v - min) / range) * (h - 6)}`).join(" ");
  return (
    <svg width={w} height={h} className="shrink-0" aria-hidden>
      <polyline points={pts} fill="none" stroke={up ? "#047857" : "#b91c1c"} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function Mandi({ lang }: { lang: Lang }) {
  const markets = useMemo(() => [...new Set(MANDI.map((m) => m.market))], []);
  const [market, setMarket] = useState("Lahore");
  const [query, setQuery] = useState("");
  const rows = MANDI.filter((m) => m.market === market && m.crop.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">{t(lang, "mandi")}</h3>
          <p className="text-sm text-emerald-900/60">
            {lang === "ur" ? "Faslon ke daam aur 7-din ka rujhan — bechnay se pehle mandi se confirm karein." : "Crop prices and the 7-day trend — confirm at your mandi before selling."}
          </p>
        </div>
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "ur" ? "Fasal dhoondein…" : "Search crop…"} className="rounded-lg border border-emerald-900/20 px-3 py-2 text-sm outline-none focus:border-emerald-600" />
          <select value={market} onChange={(e) => setMarket(e.target.value)} className="rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600">
            {markets.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        <strong>⚠ Indicative demo prices (PKR / 40 kg), Nov 2026.</strong>{" "}
        {lang === "ur"
          ? "Yeh asal waqt ke daam nahi — bechnay se pehle apni maqami mandi se daam zaroor confirm karein."
          : "These are indicative demo prices, not live market rates — always confirm the rate at your local mandi before selling."}
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[620px] text-sm">
          <thead>
            <tr className="border-b border-emerald-900/10 text-left text-xs uppercase text-emerald-900/60">
              <th className="py-2">Crop</th><th>Price (PKR / 40 kg)</th><th>7-day change</th><th>Trend (7 days)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.crop + r.market} className="border-b border-emerald-900/5 text-emerald-950">
                <td className="py-2.5 font-semibold">{r.crop}</td>
                <td className="text-lg font-black text-emerald-800">{r.price.toLocaleString()}</td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${r.change >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"}`}>
                    {r.change >= 0 ? "▲" : "▼"} {Math.abs(r.change)}%
                  </span>
                </td>
                <td><Spark data={r.trend} up={r.change >= 0} /></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="py-6 text-center text-emerald-900/60">No crop matches that search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-emerald-900/50">
        {lang === "ur"
          ? "Mandi mein daam roz badalte hain. FasalMitra ka maqsad andaza dena hai, asal khareedari ka faisla hamesha mandi ke daam par karein."
          : "Mandi rates move daily. FasalMitra gives an indicative guide — the selling decision should always use the mandi's own rate."}
      </p>
    </div>
  );
}
