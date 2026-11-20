"use client";
import { useState } from "react";
import Advisor from "@/components/Advisor";
import Weather from "@/components/Weather";
import Mandi from "@/components/Mandi";
import Disease from "@/components/Disease";
import Profit from "@/components/Profit";
import { t, type Lang } from "@/lib/i18n";

type Tab = "advisor" | "weather" | "mandi" | "disease" | "profit";

const TABS: { id: Tab; icon: string }[] = [
  { id: "advisor", icon: "🌾" },
  { id: "weather", icon: "🌤️" },
  { id: "mandi", icon: "🏷️" },
  { id: "disease", icon: "🔬" },
  { id: "profit", icon: "💰" },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("advisor");
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="min-h-screen bg-emerald-50/60 font-sans text-emerald-950">
      {/* Header */}
      <header className="border-b border-emerald-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-xl">🌾</span>
            <div>
              <p className="text-lg font-black leading-none tracking-tight">FasalMitra</p>
              <p className="text-xs text-emerald-900/60">فصل مترا · AI Farm Copilot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 sm:inline">
              ACE Builders 2026 · Codebenders × GigPoint
            </span>
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="rounded-full border border-emerald-700 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
            >
              {lang === "en" ? "اردو / Roman Urdu" : "English"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-emerald-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">{t(lang, "tagline")}</p>
          <h1 className="mt-2 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">{t(lang, "heroTitle")}</h1>
          <p className="mt-3 max-w-2xl text-base text-emerald-100/90 sm:text-lg">{t(lang, "heroSub")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { n: "9", l: lang === "ur" ? "Faslon ka ilm" : "Crops in knowledge base" },
              { n: "8", l: lang === "ur" ? "Bimariyan" : "Diseases screened" },
              { n: "4", l: lang === "ur" ? "Mandiyan" : "Mandi markets" },
              { n: "24", l: lang === "ur" ? "Azlaa" : "Districts covered" },
              { n: "100%", l: lang === "ur" ? "Muft" : "Free, no sign-up" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/10 px-4 py-2.5">
                <p className="text-xl font-black leading-none">{s.n}</p>
                <p className="mt-1 text-xs text-emerald-100/80">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => setTab("advisor")} className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-emerald-900 hover:bg-emerald-50">
              {lang === "ur" ? "Meri fasal ka plan banayein →" : "Build my crop plan →"}
            </button>
            <button onClick={() => setTab("weather")} className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10">
              {lang === "ur" ? "Live mausam dekhein" : "Check live weather"}
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                tab === tb.id ? "bg-emerald-700 text-white shadow" : "border border-emerald-900/15 bg-white text-emerald-900/70 hover:border-emerald-700/50"
              }`}
            >
              <span>{tb.icon}</span> {t(lang, tb.id)}
            </button>
          ))}
        </div>

        {tab === "advisor" && <Advisor lang={lang} />}
        {tab === "weather" && <Weather lang={lang} />}
        {tab === "mandi" && <Mandi lang={lang} />}
        {tab === "disease" && <Disease lang={lang} />}
        {tab === "profit" && <Profit lang={lang} />}

        {/* How it works */}
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { icon: "🧠", title: lang === "ur" ? "Shaffaf expert system" : "Transparent expert system", body: lang === "ur" ? "Har sifarish Punjab extension rehnumai aur aap ke apne inputs se banti hai — score ki wajuhat dikhai jati hain." : "Every recommendation is computed from Punjab extension guidance and your own inputs — the score shows its reasons." },
            { icon: "🌦️", title: lang === "ur" ? "Live mausam, asli data" : "Live weather, real data", body: lang === "ur" ? "Open-Meteo se 7-din ki paishgoi — koi key nahi, koi kharch nahi, seedha aap ke zila ka mausam." : "7-day forecast from Open-Meteo — no key, no cost, straight for your district." },
            { icon: "🔒", title: lang === "ur" ? "Aap ki tasveer, aap ke paas" : "Your photo stays yours", body: lang === "ur" ? "Bimari ki tasveer sirf aap ke browser mein analyse hoti hai — kahin upload nahi hoti." : "Disease photos are analysed in your browser only — never uploaded anywhere." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
              <p className="text-2xl">{c.icon}</p>
              <h3 className="mt-2 font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-emerald-900/70">{c.body}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-emerald-900/70">
          <p className="font-bold text-emerald-950">FasalMitra — built by Umar Shareef for ACE Builders 2026 (Codebenders × GigPoint), 21–22 Nov 2026.</p>
          <p className="mt-1">
            Advisory ranges follow standard Punjab agriculture extension guidance; mandi prices shown are indicative demo values — always verify at your local mandi.
            Weather: Open-Meteo. No account, no payment, no data leaves your device except the weather lookup.
          </p>
          <p className="mt-2">
            <a className="font-semibold text-emerald-700 underline" href="https://github.com/umarshareef0165-netizen">GitHub</a>
            {" · "}
            <a className="font-semibold text-emerald-700 underline" href="https://www.linkedin.com/in/umar-shareef-94b1aa318">LinkedIn</a>
            {" · "}
            <a className="font-semibold text-emerald-700 underline" href="https://agriyield-advisor.vercel.app/">AgriYield Advisor</a>
            {" · "}
            <a className="font-semibold text-emerald-700 underline" href="https://fasalshift.vercel.app/">FasalShift</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
