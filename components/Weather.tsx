"use client";
import { useState } from "react";
import { DISTRICTS } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";

interface Day { date: string; max: number; min: number; rain: number; prob: number; wind: number; }
interface Forecast {
  name: string; country: string;
  current: { temp: number; humidity: number; wind: number };
  days: Day[];
}

async function fetchWeather(place: string): Promise<Forecast> {
  const g = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=en&format=json`);
  if (!g.ok) throw new Error("Geocoding failed");
  const gj = await g.json();
  if (!gj.results?.length) throw new Error("Place not found");
  const r = gj.results[0];
  const f = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${r.latitude}&longitude=${r.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7`
  );
  if (!f.ok) throw new Error("Forecast failed");
  const fj = await f.json();
  const days: Day[] = fj.daily.time.map((date: string, i: number) => ({
    date, max: fj.daily.temperature_2m_max[i], min: fj.daily.temperature_2m_min[i],
    rain: fj.daily.precipitation_sum[i], prob: fj.daily.precipitation_probability_max[i] ?? 0,
    wind: fj.daily.wind_speed_10m_max[i],
  }));
  return {
    name: r.name, country: r.country ?? "",
    current: { temp: fj.current.temperature_2m, humidity: fj.current.relative_humidity_2m, wind: fj.current.wind_speed_10m },
    days,
  };
}

export default function Weather({ lang }: { lang: Lang }) {
  const [place, setPlace] = useState("Faisalabad");
  const [data, setData] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (p: string) => {
    setLoading(true); setError("");
    try { setData(await fetchWeather(p)); }
    catch (e) { setError(e instanceof Error ? e.message : "Could not load weather"); setData(null); }
    finally { setLoading(false); }
  };

  const totalRain = data ? data.days.reduce((s, d) => s + d.rain, 0) : 0;
  const advice =
    !data ? "" :
    totalRain >= 20 ? (lang === "ur" ? "Agle 7 din mein achhi barish matwaqa hai — aabpashi rok dein aur khait mein pani khara na honay dein." : "Good rain is expected over the next 7 days — hold off irrigation and avoid waterlogging.")
    : totalRain >= 5 ? (lang === "ur" ? "Halki barish matwaqa hai — aabpashi aadhi kar dein aur barish ke baad dobara jaanch lein." : "Light rain is expected — halve your irrigation and re-check after the rain.")
    : (lang === "ur" ? "Agle 7 din khushk hain — faslon ko waqt par pani dein, khaas tor par subah ke waqt." : "The next 7 days look dry — irrigate on schedule, preferably in the morning.");

  return (
    <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">{t(lang, "weather")}</h3>
          <p className="text-sm text-emerald-900/60">
            {lang === "ur" ? "Live mausam (Open-Meteo) — aabpashi ka faisla barish dekh kar karein." : "Live weather from Open-Meteo — plan irrigation around the rain."}
          </p>
        </div>
        <div className="flex gap-2">
          <select value={place} onChange={(e) => { setPlace(e.target.value); load(e.target.value); }} className="rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600">
            {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
          </select>
          <button onClick={() => load(place)} disabled={loading} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
            {loading ? "…" : lang === "ur" ? "Mausam lein" : "Get weather"}
          </button>
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}. {lang === "ur" ? "Internet check karein aur dobara koshish karein." : "Check your connection and try again."}</p>}

      {!data && !error && (
        <div className="py-14 text-center">
          <div className="mb-2 text-5xl">🌤️</div>
          <p className="text-sm text-emerald-900/60">{lang === "ur" ? "Apna zila muntakhib karein aur live mausam hasil karein." : "Pick your district to load the live 7-day forecast."}</p>
        </div>
      )}

      {data && (
        <div className="mt-5">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-emerald-700 p-4 text-white">
              <p className="text-xs font-bold uppercase opacity-80">Now · {data.name}, {data.country}</p>
              <p className="text-4xl font-black">{Math.round(data.current.temp)}°C</p>
              <p className="text-sm opacity-90">Humidity {data.current.humidity}% · Wind {data.current.wind} km/h</p>
            </div>
            <div className="rounded-xl border border-emerald-900/10 p-4">
              <p className="text-xs font-bold uppercase text-emerald-900/60">Rain · next 7 days</p>
              <p className="text-3xl font-black text-emerald-800">{totalRain.toFixed(1)} mm</p>
              <p className="text-sm text-emerald-900/60">Total expected precipitation</p>
            </div>
            <div className="rounded-xl border border-emerald-900/10 p-4 sm:col-span-2">
              <p className="text-xs font-bold uppercase text-emerald-900/60">💧 Irrigation advice</p>
              <p className="text-sm font-semibold text-emerald-900">{advice}</p>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-emerald-900/10 text-left text-xs uppercase text-emerald-900/60">
                  <th className="py-2">Day</th><th>Max</th><th>Min</th><th>Rain</th><th>Rain chance</th><th>Wind</th>
                </tr>
              </thead>
              <tbody>
                {data.days.map((d) => (
                  <tr key={d.date} className="border-b border-emerald-900/5 text-emerald-950">
                    <td className="py-2 font-semibold">{new Date(d.date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</td>
                    <td>{Math.round(d.max)}°C</td><td>{Math.round(d.min)}°C</td>
                    <td className="font-semibold text-sky-700">{d.rain} mm</td>
                    <td>{d.prob}%</td><td>{Math.round(d.wind)} km/h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[11px] text-emerald-900/50">Source: Open-Meteo (free, no key). Forecast for {data.name} — refresh any time; data is live at load.</p>
        </div>
      )}
    </div>
  );
}
