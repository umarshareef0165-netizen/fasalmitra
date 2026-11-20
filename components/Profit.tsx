"use client";
import { useMemo, useState } from "react";
import { CROPS, MANDI } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";

interface Costs { seed: number; fertilizer: number; pesticide: number; irrigation: number; labour: number; other: number; }

function indicativePrice(cropName: string): number {
  const row = MANDI.find((m) => m.market === "Lahore" && m.crop.toLowerCase().startsWith(cropName.toLowerCase().split(" ")[0]));
  return row ? row.price : 2500;
}

export default function Profit({ lang }: { lang: Lang }) {
  const [cropId, setCropId] = useState("wheat");
  const [area, setArea] = useState(5);
  const [yieldPerAcre, setYieldPerAcre] = useState(1700);
  const [price, setPrice] = useState(2950);
  const [costs, setCosts] = useState<Costs>({ seed: 6500, fertilizer: 18000, pesticide: 4000, irrigation: 8000, labour: 12000, other: 3000 });
  const crop = CROPS.find((c) => c.id === cropId)!;

  const pickCrop = (id: string) => {
    setCropId(id);
    const c = CROPS.find((x) => x.id === id)!;
    setYieldPerAcre(Math.round((c.yieldKgPerAcre[0] + c.yieldKgPerAcre[1]) / 2));
    setPrice(indicativePrice(c.name));
  };

  const calc = useMemo(() => {
    const totalYield = yieldPerAcre * area;
    const maunds = totalYield / 40;
    const revenue = maunds * price;
    const totalCost = Object.values(costs).reduce((s, v) => s + v, 0) * area;
    const profit = revenue - totalCost;
    return {
      totalYield, maunds, revenue, totalCost, profit,
      perAcre: profit / area,
      breakEvenPrice: maunds > 0 ? totalCost / maunds : 0,
      breakEvenYield: price > 0 ? (totalCost / price) * 40 / area : 0,
      margin: revenue > 0 ? (profit / revenue) * 100 : 0,
    };
  }, [yieldPerAcre, area, price, costs]);

  const setCost = (k: keyof Costs, v: number) => setCosts((c) => ({ ...c, [k]: v }));
  const num = "w-full rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600";
  const lbl = "mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900/70";
  const costFields: { k: keyof Costs; label: string }[] = [
    { k: "seed", label: "Seed" }, { k: "fertilizer", label: "Fertilizer" },
    { k: "pesticide", label: "Pesticide / spray" }, { k: "irrigation", label: "Irrigation" },
    { k: "labour", label: "Labour" }, { k: "other", label: "Other" },
  ];

  const compare = CROPS.slice(0, 6).map((c) => {
    const y = (c.yieldKgPerAcre[0] + c.yieldKgPerAcre[1]) / 2;
    const p = indicativePrice(c.name);
    const rev = ((y * area) / 40) * p;
    const cost = 51500 * area; // typical mid-range seasonal cost per acre (PKR) — see note below
    return { name: c.name, yield: y, price: p, profit: Math.round(rev - cost) };
  }).sort((a, b) => b.profit - a.profit);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-bold text-emerald-950">{t(lang, "profit")}</h3>
        <p className="mb-4 text-sm text-emerald-900/60">
          {lang === "ur" ? "Kharch aur matwaqa paidawar likhein — munafa, break-even aur behtareen fasal ka mawazna mile ga." : "Enter costs and expected yield — get profit, break-even and a crop comparison."}
        </p>
        <div className="space-y-3">
          <div>
            <label className={lbl}>{t(lang, "crop")}</label>
            <select value={cropId} onChange={(e) => pickCrop(e.target.value)} className={num}>
              {CROPS.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.urdu})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={lbl}>Area (ac)</label><input type="number" min={0.5} step={0.5} className={num} value={area} onChange={(e) => setArea(Number(e.target.value) || 1)} /></div>
            <div><label className={lbl}>Yield kg/ac</label><input type="number" min={0} step={50} className={num} value={yieldPerAcre} onChange={(e) => setYieldPerAcre(Number(e.target.value) || 0)} /></div>
            <div><label className={lbl}>Price / 40kg</label><input type="number" min={0} step={50} className={num} value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} /></div>
          </div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-900/60">Costs — PKR per acre</p>
          <div className="grid grid-cols-2 gap-3">
            {costFields.map((f) => (
              <div key={f.k}>
                <label className={lbl}>{f.label}</label>
                <input type="number" min={0} step={100} className={num} value={costs[f.k]} onChange={(e) => setCost(f.k, Number(e.target.value) || 0)} />
              </div>
            ))}
          </div>
          <p className="text-[11px] leading-relaxed text-emerald-900/50">
            {lang === "ur"
              ? "Qeematein indicative hain — apne asal kharch likhein. Mawazna table mein PKR 51,500/acre ka aam kharch istemal hua hai."
              : "Prices are indicative — enter your real costs. The comparison table uses a typical PKR 51,500/acre seasonal cost."}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className={`rounded-xl p-4 ${calc.profit >= 0 ? "bg-emerald-700 text-white" : "bg-red-600 text-white"}`}>
            <p className="text-xs font-bold uppercase opacity-80">Net profit · {area} acres</p>
            <p className="text-3xl font-black">PKR {Math.round(calc.profit).toLocaleString()}</p>
            <p className="text-sm opacity-90">PKR {Math.round(calc.perAcre).toLocaleString()} per acre · margin {calc.margin.toFixed(1)}%</p>
          </div>
          <div className="rounded-xl border border-emerald-900/10 p-4">
            <p className="text-xs font-bold uppercase text-emerald-900/60">Revenue vs cost</p>
            <p className="text-xl font-black text-emerald-800">PKR {Math.round(calc.revenue).toLocaleString()} <span className="text-sm font-semibold text-emerald-900/50">revenue</span></p>
            <p className="text-sm text-emerald-900/70">PKR {Math.round(calc.totalCost).toLocaleString()} total cost · {Math.round(calc.totalYield).toLocaleString()} kg ({Math.round(calc.maunds).toLocaleString()} × 40 kg)</p>
          </div>
          <div className="rounded-xl border border-emerald-900/10 p-4">
            <p className="text-xs font-bold uppercase text-emerald-900/60">Break-even price</p>
            <p className="text-2xl font-black text-emerald-800">PKR {Math.round(calc.breakEvenPrice).toLocaleString()} / 40 kg</p>
            <p className="text-sm text-emerald-900/70">Sell above this and the crop pays for itself.</p>
          </div>
          <div className="rounded-xl border border-emerald-900/10 p-4">
            <p className="text-xs font-bold uppercase text-emerald-900/60">Break-even yield</p>
            <p className="text-2xl font-black text-emerald-800">{Math.round(calc.breakEvenYield).toLocaleString()} kg / acre</p>
            <p className="text-sm text-emerald-900/70">Below this yield at your price, the season loses money.</p>
          </div>
        </div>

        <h4 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-emerald-900/70">Which crop earns most? ({area} acres, typical yield & indicative Lahore price)</h4>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-emerald-900/10 text-left text-xs uppercase text-emerald-900/60">
                <th className="py-2">Crop</th><th>Typical yield</th><th>Price / 40kg</th><th>Profit</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((c, i) => (
                <tr key={c.name} className={`border-b border-emerald-900/5 ${i === 0 ? "bg-emerald-50/70 font-semibold" : ""} text-emerald-950`}>
                  <td className="py-2">{i === 0 ? "🏆 " : ""}{c.name}</td>
                  <td>{c.yield.toLocaleString()} kg/ac</td>
                  <td>PKR {c.price.toLocaleString()}</td>
                  <td className={`font-black ${c.profit >= 0 ? "text-emerald-700" : "text-red-600"}`}>PKR {c.profit.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-emerald-900/50">Comparison is indicative only — it uses mid-range typical yields and the demo mandi prices above.</p>
      </div>
    </div>
  );
}
