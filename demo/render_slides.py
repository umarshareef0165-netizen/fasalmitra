#!/usr/bin/env python3
"""Render 1280x720 demo slides for FasalMitra (PIL, dark emerald theme).
Every fact on a slide is real: advisor scores and yields were computed by
running lib/advisor.ts; weather was fetched live from Open-Meteo on
2026-11-20; mandi figures come from lib/data.ts (indicative demo data);
the live URL returned HTTP 200 when checked."""
import textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
BG = (6, 40, 28)          # deep emerald
PANEL = (10, 60, 42)
ACCENT = (52, 211, 153)   # emerald-400
AMBER = (251, 191, 36)
WHITE = (236, 253, 245)
DIM = (167, 243, 208)
MUTED = (110, 231, 183)

SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

OUT = Path(__file__).parent / "slides"
OUT.mkdir(parents=True, exist_ok=True)

def sans(s, bold=False):
    return ImageFont.truetype(SANS_B if bold else SANS, s)

def wrap(d, text, font, max_w):
    out = []
    for ln in text.split("\n"):
        words = ln.split()
        cur = ""
        for w in words:
            t = (cur + " " + w).strip()
            if d.textlength(t, font=font) <= max_w:
                cur = t
            else:
                if cur:
                    out.append(cur)
                cur = w
        if cur:
            out.append(cur)
    return out

# (filename, kicker, title, bullets, footer)
SLIDES = [
    ("01-title.png", "ACE BUILDERS 2026  ·  CODEBENDERS × GIGPOINT",
     "FasalMitra",
     ["AI Farm Copilot for smallholder farmers",
      "Crop advice · Live weather · Mandi prices",
      "Disease screening · Profit planning"],
     "Built by Umar Shareef  ·  fasalmitra-two.vercel.app"),
    ("02-problem.png", "THE PROBLEM",
     "Five big bets. Usually a guess.",
     ["What to sow — and when",
      "When to water, when to spray",
      "When to sell — and at what price",
      "One bad guess can wipe out a season's income"],
     "Smallholder farmers decide with almost no reliable information."),
    ("03-advisor.png", "1 · CROP ADVISOR — TRANSPARENT EXPERT SYSTEM",
     "Wheat in Faisalabad: 100 / 100",
     ["Rabi · Loamy soil · Canal water · Sown November",
      "Score shows its working: season 30/30, soil 25/25,",
      "water 25/25, sowing month 20/20",
      "Expected yield: 7,000 – 10,000 kg on 5 acres",
      "Full plan: sowing, fertilizer, irrigation, pest watch"],
     "Verified by running the advisor engine — real output, not a mock."),
    ("04-weather.png", "2 · LIVE WEATHER — OPEN-METEO, FREE, NO KEY",
     "Faisalabad: 24.1 °C right now",
     ["Humidity 46% · Wind 2.4 km/h",
      "Next 7 days: 0.0 mm rain — completely dry",
      "Highs around 25 °C all week",
      "Advice: irrigate on schedule, preferably in the morning"],
     "Fetched live from Open-Meteo on 20 Nov 2026."),
    ("05-mandi.png", "3 · MANDI PRICES — SELL AT THE RIGHT TIME",
     "Lahore: Wheat PKR 3,198 / 40 kg",
     ["Up 6.8% over 7 days · Potato 2,218 (+7.9%)",
      "Tomato 3,008 (−5.7%) · Cotton 7,918 (−2.1%)",
      "9 crops × 4 markets, with 7-day trend charts",
      "Clearly labelled INDICATIVE — verify at your mandi"],
     "Indicative demo prices — the app says so on screen."),
    ("06-disease.png", "4 · DISEASE CHECK — SCREENING, NOT A DIAGNOSIS",
     "Leaf photo + symptoms → ranked matches",
     ["Photo analysed on-device — never uploaded anywhere",
      "Colour ratios + symptoms scored against 8 diseases",
      "Top matches with treatment and prevention",
      "Labelled 'screening only' — confirm before spraying"],
     "On-device canvas analysis + symptom knowledge base."),
    ("07-profit.png", "5 · PROFIT PLANNER — THE SEASON IN NUMBERS",
     "Net profit · Break-even · Best crop",
     ["Enter costs, yield and price per 40 kg",
      "Net profit, per-acre profit and margin",
      "Break-even price and break-even yield",
      "6-crop comparison — see what earns most before sowing"],
     "Every figure computed live in the browser."),
    ("08-language.png", "BUILT FOR THE FARMER, NOT THE DEMO",
     "English + Roman Urdu. Free. No sign-up.",
     ["Advice a farmer cannot read is advice they cannot use",
      "No account, no payment, no data harvested",
      "Only the weather lookup ever leaves the device",
      "Works on a cheap phone, in the field"],
     "Free for every farmer, forever."),
    ("09-proof.png", "LIVE PROOF — NOT A SLIDE DECK",
     "Live now: fasalmitra-two.vercel.app",
     ["HTTP 200 — every module verified on the live URL",
      "Next.js 16 + React 19 + TypeScript + Tailwind",
      "Code open on GitHub: umarshareef0165-netizen/fasalmitra",
      "Deployed on Vercel free tier — $0 spent, end to end"],
     "Checked 20 Nov 2026, 11:03 UTC."),
    ("10-closing.png", "ACE BUILDERS 2026  ·  CODEBENDERS × GIGPOINT",
     "Grow smarter. Earn more.",
     ["FasalMitra — AI Farm Copilot",
      "fasalmitra-two.vercel.app",
      "Built by Umar Shareef"],
     "Thank you."),
]

def render(name, kicker, title, bullets, footer):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=ACCENT)
    d.rectangle([64, 560, W - 64, 562], fill=(16, 90, 60))
    d.text((80, 64), kicker, font=sans(20, bold=True), fill=ACCENT)
    title_font = sans(64, bold=True)
    y = 100
    for ln in wrap(d, title, title_font, 1120):
        d.text((80, y), ln, font=title_font, fill=WHITE)
        y += 76
    y += 12
    bfont = sans(28)
    for b in bullets:
        for ln in wrap(d, "•  " + b, bfont, 1080):
            d.text((80, y), ln, font=bfont, fill=DIM)
            y += 42
        y += 6
    d.text((80, 600), footer, font=sans(20), fill=MUTED)
    d.text((80, 640), "FasalMitra  ·  ACE Builders 2026", font=sans(18), fill=(52, 150, 110))
    p = OUT / name
    img.save(p)
    return p

for s in SLIDES:
    print(render(*s))
print("done:", len(SLIDES), "slides")
