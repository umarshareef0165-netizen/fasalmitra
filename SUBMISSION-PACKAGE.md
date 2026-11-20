# FasalMitra — Submission Package
## ACE Builders 2026 (Codebenders × GigPoint) · 21–22 Nov 2026 · Solo entry

**Status: READY TO SUBMIT — pending (a) GigPoint registration (parent browser) and
(b) the event's submission form/link, which is only revealed after registration
or at event start. Nothing else is missing.**

## Project

- **Title:** FasalMitra — AI Farm Copilot
- **Tagline:** Grow smarter. Earn more. One free tool for smallholder farmers:
  crop advice, live weather, mandi prices, disease screening and profit planning.
- **Live app:** https://fasalmitra-two.vercel.app (HTTP 200 verified 20 Nov 2026, 11:03 UTC)
- **GitHub repo:** https://github.com/umarshareef0165-netizen/fasalmitra (public)
- **Demo video (2 min 24 s, 1280×720, English voiceover):**
  - In repo: `demo/fasalmitra-demo.mp4`
  - Share link (expires 22 Nov 2026, 11:07 UTC — use repo copy after that):
    https://muse.ai/files/1301959569676199/839781619229880/c14lzo053smyxl8qolk1hpo6/fasalmitra-demo.mp4
  - Narration script: `demo/narration.txt`
- **Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 — Vercel free tier, $0 spend

## Description (paste-ready, ~120 words)

FasalMitra is a free AI farm copilot for smallholder farmers in Punjab. Its Crop
Advisor builds a full season plan — sowing window, fertilizer schedule, irrigation
plan, pest watch and expected yield — with a transparent 0–100 suitability score
that shows exactly how it was computed. Live Weather pulls a real 7-day forecast
from Open-Meteo and turns rain into irrigation advice. Mandi Prices shows
indicative rates for 9 crops across 4 markets with 7-day trends, clearly labelled
as indicative. Disease Check screens a sick crop from a leaf photo (analysed
on-device, never uploaded) plus symptoms, ranking likely problems with treatment
and prevention — labelled screening only, never a diagnosis. Profit Planner
computes net profit, break-even price and yield, and compares six crops. The whole
UI works in English and Roman Urdu, with no account and no payment.

## Honesty notes (for judges — also stated in-app and in the README)

- Advisory ranges follow standard Punjab agriculture extension guidance;
  planning estimates, not guarantees.
- Mandi prices are indicative demo values, not live market rates.
- Disease screening is a transparent heuristic (colour ratios + symptoms), not
  ML and not a diagnosis.
- The advisory engine is a deterministic expert system (no LLM, no paid API).
  The only live external data is Open-Meteo weather.
- No user counts, revenue or pilot claims are made anywhere.

## Registration package (NEEDS PARENT BROWSER — see below)

- **Registration URL:** https://gigpoint.in/codebenders-2026
  → "Register for Free" → https://gigpoint.in/signin?returnTo=%2Fcodebenders-2026
  (GigPoint account required: sign up with Gmail, then register for the event.)
- **Participant:** Umar Shareef, solo (no teammate)
- **Email:** umarshareef0165@gmail.com
- **Phone:** +92 3191548165
- **University:** University of Agriculture Faisalabad (UAF)
- **Degree:** BSCS, Sep 2023 – Jun 2027 (final year)
- **CGPA:** 3.0 / 4.0
- **Country / region:** Pakistan (Faisalabad, Punjab); home region Los Angeles, CA, USA
- **GitHub:** umarshareef0165-netizen · **Devpost:** umarshareef0165
- **LinkedIn:** https://www.linkedin.com/in/umar-shareef-94b1aa318
- **Skills to list:** React (3 yrs), Next.js, TypeScript, JavaScript, Python,
  Node.js, Express, Supabase, Vercel, React Native, Flutter, Microsoft Azure
- **Team name (if asked):** FasalMitra (solo)

### ⚠ Password — STOP, do not invent
GigPoint sign-up needs a password. **No password was generated.** The user must
supply one via the Secure Vault card (standing rule), or sign up himself.
Do NOT reuse any existing password.

### ⚠ Email verification — HIS ONLY
Any verification link/code sent to umarshareef0165@gmail.com must be clicked by
him (or via his own device). Do not complete it for him.

## Event facts (verified from the official page, 20 Nov 2026)

- Official page: https://gigpoint.in/codebenders-2026
- Event: 21–22 Nov 2026, global online, solo or duo, free
- Prize pool ₹2,00,000: 1st ₹1,00,000 · 2nd ₹50,000 · 3rd ₹30,000 · 4th ₹10,000 · 5th ₹10,000
- Top 20 teams → ACE Builders Talent Pool (career/interview opportunities)
- Top 100 teams → ACE Pro Builders community
- Free AI credits/tokens for participants (per official page)
- Countdown on the official page at 10:51 UTC, 20 Nov 2026 read 16h 38m →
  event starts ≈ 03:29 UTC / 08:59 IST, 21 Nov 2026 (≈ 19:29 PT, 20 Nov)
- **NOT published anywhere on the official page (checked 20 Nov):** specific
  problem statements/themes, judging criteria, submission method, submission
  deadline time, or a Discord/community link. The brief is open-theme
  ("real-world AI-powered solutions"). Problem statements, if any, are expected
  to be released at event start or after registration — check the GigPoint
  dashboard / registered email after registering.

## Verification log (all done 20 Nov 2026)

- `npm run build` — clean, Next.js 16.4.6, static prerender
- Advisor engine run directly: wheat/Faisalabad/Loamy/Rabi/Nov/5 ac/canal →
  100/100, expected yield 7,000–10,000 kg; adverse case (rice/rainfed/off-season)
  → 29/100 with 4 warnings
- Live URL: https://fasalmitra-two.vercel.app → HTTP 200, all 5 modules present
  (note: `fasalmitra.vercel.app` is taken by another project — canonical URL is
  `fasalmitra-two.vercel.app`)
- Open-Meteo live: Faisalabad 24.1 °C, humidity 46%, 7-day rain 0.0 mm
- Demo video: 144.0 s (≤ 3 min ✓), 1280×720 h264 + aac, 3.1 MB, ffprobe-verified;
  frame at 100 s visually checked
- GitHub: 26 files uploaded to umarshareef0165-netizen/fasalmitra
- Spend: $0 (Vercel hobby free tier, Open-Meteo free, no paid APIs)

## What still needs the parent / user (blocked items)

1. **GigPoint registration** — parent browser. Needs his password via Secure Vault
   (never generated) + his email-verification click.
2. **Submission form/link** — unknown until registered / event starts. Once known,
   submit: title, description above, live URL, repo URL, video (repo copy or
   share link). Submission itself needs his per-item approval (standing rule).
3. **Problem statements (if released at kickoff)** — if a specific statement is
   published on 21 Nov, check fit: FasalMitra fits any open/AI-for-agriculture/
   AI-for-good statement. If a statement is off-theme, flag to parent immediately.
