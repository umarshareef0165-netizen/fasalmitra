"use client";
import { useRef, useState } from "react";
import { CROPS, DISEASES, SYMPTOMS } from "@/lib/data";
import { t, type Lang } from "@/lib/i18n";

interface ColorStats { green: number; yellow: number; brown: number; dark: number; }
interface Match { id: string; name: string; crop: string; score: number; treatment: string; prevention: string; }

function analyzeImage(img: HTMLImageElement): ColorStats {
  const canvas = document.createElement("canvas");
  const size = 160;
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, size, size);
  const d = ctx.getImageData(0, 0, size, size).data;
  let green = 0, yellow = 0, brown = 0, dark = 0, total = 0;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    total++;
    if (r < 70 && g < 70 && b < 70) dark++;
    else if (g > r + 12 && g > b + 12) green++;
    else if (r > 150 && g > 120 && b < 110) yellow++;
    else if (r > 90 && r < 200 && g > 50 && g < 130 && b < 70) brown++;
  }
  const pct = (n: number) => Math.round((n / total) * 1000) / 10;
  return { green: pct(green), yellow: pct(yellow), brown: pct(brown), dark: pct(dark) };
}

export default function Disease({ lang }: { lang: Lang }) {
  const [cropId, setCropId] = useState("wheat");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [stats, setStats] = useState<ColorStats | null>(null);
  const [photoName, setPhotoName] = useState("");
  const [preview, setPreview] = useState("");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleSymptom = (id: string) =>
    setSymptoms((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onPhoto = (f: File | undefined) => {
    if (!f) return;
    setPhotoName(f.name);
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setPreview(url);
      const img = new Image();
      img.onload = () => setStats(analyzeImage(img));
      img.src = url;
    };
    reader.readAsDataURL(f);
  };

  const diagnose = () => {
    const dominant =
      stats && stats.yellow >= 12 ? "yellow"
      : stats && stats.brown >= 12 ? "brown"
      : stats && stats.dark >= 25 ? "dark"
      : "none";
    const scored = DISEASES.filter((d) => d.crop === cropId || symptoms.some((s) => d.symptoms.includes(s))).map((d) => {
      let pts = 0;
      let max = d.symptoms.length * 3 + 2;
      d.symptoms.forEach((s) => { if (symptoms.includes(s)) pts += 3; });
      if (dominant !== "none" && d.colorHint === dominant) pts += 2;
      return { id: d.id, name: d.name, crop: d.crop, score: Math.round((pts / max) * 100), treatment: d.treatment, prevention: d.prevention };
    });
    scored.sort((a, b) => b.score - a.score);
    setMatches(scored.slice(0, 3));
  };

  const canDiagnose = symptoms.length > 0 || stats !== null;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-bold text-emerald-950">{t(lang, "disease")}</h3>
        <p className="mb-4 text-sm text-emerald-900/60">
          {lang === "ur"
            ? "Patte ki tasveer aur alamat dein — screening aap ko mumkinah bimariyan aur ilaaj bataye gi."
            : "Add a leaf photo and symptoms — the screening lists likely problems and treatment."}
        </p>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900/70">{t(lang, "crop")}</label>
        <select value={cropId} onChange={(e) => setCropId(e.target.value)} className="mb-4 w-full rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-600">
          {CROPS.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.urdu})</option>)}
        </select>

        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-900/70">
          {lang === "ur" ? "Patte ki tasveer (ikhtiyari)" : "Leaf photo (optional)"}
        </label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
        <button type="button" onClick={() => fileRef.current?.click()} className="w-full rounded-lg border-2 border-dashed border-emerald-700/40 bg-emerald-50/50 px-3 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50">
          📷 {photoName || (lang === "ur" ? "Tasveer muntakhib karein" : "Choose a leaf photo")}
        </button>
        {preview && (
          <div className="mt-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Uploaded leaf" className="max-h-44 rounded-lg border border-emerald-900/10 object-contain" />
            {stats && (
              <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded bg-emerald-50 p-2"><p className="font-black text-emerald-800">{stats.green}%</p><p>Green</p></div>
                <div className="rounded bg-yellow-50 p-2"><p className="font-black text-yellow-700">{stats.yellow}%</p><p>Yellow</p></div>
                <div className="rounded bg-amber-50 p-2"><p className="font-black text-amber-800">{stats.brown}%</p><p>Brown</p></div>
                <div className="rounded bg-zinc-100 p-2"><p className="font-black text-zinc-700">{stats.dark}%</p><p>Dark</p></div>
              </div>
            )}
            <p className="mt-1 text-[11px] text-emerald-900/50">Photo is analysed on your device only — it is never uploaded to any server.</p>
          </div>
        )}

        <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-900/70">
          {lang === "ur" ? "Alamat muntakhib karein" : "Select symptoms"}
        </p>
        <div className="space-y-2">
          {SYMPTOMS.map((s) => (
            <label key={s.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-emerald-900/10 px-3 py-2 text-sm text-emerald-950 hover:bg-emerald-50/50">
              <input type="checkbox" checked={symptoms.includes(s.id)} onChange={() => toggleSymptom(s.id)} className="mt-0.5 accent-emerald-700" />
              {s.label}
            </label>
          ))}
        </div>
        <button onClick={diagnose} disabled={!canDiagnose} className="mt-4 w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-40">
          {lang === "ur" ? "Jaanch karein" : "Run screening"}
        </button>
      </div>

      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm lg:col-span-3">
        {!matches ? (
          <div className="flex h-full flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 text-5xl">🔬</div>
            <p className="max-w-sm text-sm text-emerald-900/60">
              {lang === "ur"
                ? "Alamat ya tasveer dein — mumkinah bimariyan, ilaaj aur bachao yahan nazar aayein ge."
                : "Add symptoms or a photo — likely problems, treatment and prevention will appear here."}
            </p>
          </div>
        ) : matches.length === 0 || matches[0].score === 0 ? (
          <div className="py-14 text-center">
            <p className="text-lg font-bold text-emerald-950">No strong match found</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-emerald-900/60">Add more symptoms or a clearer leaf photo. If the problem spreads fast, take a sample to your local agriculture office.</p>
          </div>
        ) : (
          <div>
            <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <strong>Screening only — not a diagnosis.</strong> Scores are estimates from your symptoms and leaf colours. Confirm with an agriculture officer before spraying.
            </div>
            <div className="mt-4 space-y-4">
              {matches.map((m, i) => (
                <div key={m.id} className="rounded-xl border border-emerald-900/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-900/50">Match #{i + 1}</p>
                      <h4 className="text-lg font-bold text-emerald-950">{m.name}</h4>
                    </div>
                    <span className="rounded-full bg-emerald-700 px-3 py-1 text-sm font-black text-white">{m.score}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${m.score}%` }} />
                  </div>
                  <p className="mt-3 text-sm"><strong className="text-emerald-900">Treatment: </strong><span className="text-emerald-900/80">{m.treatment}</span></p>
                  <p className="mt-1 text-sm"><strong className="text-emerald-900">Prevention: </strong><span className="text-emerald-900/80">{m.prevention}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
