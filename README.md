# FasalMitra — AI Farm Copilot 🌾

**Built by Umar Shareef for ACE Builders 2026 (Codebenders × GigPoint), 21–22 Nov 2026 — Global Online Hackathon, solo entry.**

One free tool for smallholder farmers in Punjab: crop advice, live weather, mandi
prices, disease screening and profit planning — no account, no payment.

## Live demo

- **App:** https://fasalmitra-two.vercel.app (deployed on Vercel free tier)
- **Repo:** https://github.com/umarshareef0165-netizen/fasalmitra
- **Demo video:** see `demo/` (≤ 3 min)

## The problem

Smallholder farmers decide what to sow, when to irrigate, when to spray and when
to sell with almost no reliable information. Wrong crop + wrong season + a missed
spray window can wipe out a season's income. Existing advice is scattered across
extension offices, WhatsApp groups and mandi gossip — none of it in one place,
none of it in the farmer's own language.

## What FasalMitra does (all working, no sign-up)

1. **Crop Advisor** — pick crop, district, soil, season, sowing month, area and
   irrigation source. A transparent expert system scores suitability 0–100 and
   shows exactly how the score was built (season / soil / water / timing), plus
   warnings, a full season plan (sowing, fertilizer NPK, irrigation schedule,
   pest watch, harvest), expected yield range and a farmer tip. Plans can be
   saved on-device (localStorage).
2. **Live Weather** — real 7-day forecast for any of 24 Punjab districts via the
   free Open-Meteo API (no key), with rain-based irrigation advice.
3. **Mandi Prices** — indicative prices (PKR / 40 kg) for 9 crops across 4
   markets (Lahore, Faisalabad, Multan, Rawalpindi) with 7-day trend sparklines.
   **Clearly labelled as indicative demo data — always verify at the local mandi.**
4. **Disease Check** — upload a leaf photo (analysed on-device in the browser
   via canvas pixel analysis — never uploaded) + tick symptoms. A screening
   engine ranks likely diseases from an 8-disease knowledge base with
   treatment and prevention. Labelled "screening only, not a diagnosis".
5. **Profit Planner** — enter costs and expected yield/price for net profit,
   per-acre profit, margin, break-even price and break-even yield, plus a
   6-crop earnings comparison.
6. **English / Roman Urdu toggle** across the whole UI.

## Honesty notes (what the app does NOT claim)

- Advisory ranges follow standard Punjab agriculture extension guidance; they
  are planning estimates, not guarantees.
- Mandi prices are indicative demo values, not live market rates.
- Disease screening is a heuristic estimate, not a diagnosis and not ML —
  the photo analysis is a transparent colour-ratio heuristic.
- The advisory engine is a deterministic expert system (no LLM, no paid API).
  The only live external data is Open-Meteo weather.
- No user counts, revenue or pilot claims are made anywhere.

## Tech

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- Zero backend, zero database — static export-friendly; weather via Open-Meteo
- Deployed on Vercel (free tier); `$0` spend

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Project structure

```
app/            Next.js App Router (page.tsx, layout.tsx)
components/     Advisor, Weather, Mandi, Disease, Profit
lib/            data.ts (crop/disease/mandi knowledge base)
                advisor.ts (transparent expert-system engine)
                i18n.ts (English / Roman Urdu)
demo/           demo video + narration script
```

## Author

**Umar Shareef** — final-year BSCS, University of Agriculture Faisalabad
(Sep 2023 – Jun 2027) · Full-stack & AI agentic developer

- GitHub: https://github.com/umarshareef0165-netizen
- LinkedIn: https://www.linkedin.com/in/umar-shareef-94b1aa318
- Other live products: [HireReady Agent](https://hireready-agent.onrender.com) ·
  [FasalShift](https://fasalshift.vercel.app/) · [AgriYield Advisor](https://agriyield-advisor.vercel.app/) ·
  [FrankenLedger](https://frankenledger-21fh.vercel.app)
