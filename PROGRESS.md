# Saver — PROGRESS / Handoff (source of truth)

> **اقرأ ده الأول (Arabic intro).** ده ملف التتبّع الرسمي لمشروع *Saver* الجديد. لو انت شات/agent جديد:
> اقرأ الملف كله قبل ما تعمل أي حاجة. كل القرارات والمهام وحالتها هنا. **متبدأش تنفّذ من غير ما تقول للمستخدم هتعمل إيه وفين الأول وتاخد موافقته.**

This document is the single source of truth for the **new Saver** project. Keep it updated after every meaningful step.

---

## 0. TL;DR for a fresh agent
- We are designing a **new version of Saver** (a calm, private personal-finance app).
- Work happens as a **design system + interactive prototype** in the **`saver-site`** repo (HTML/CSS/JS). It is the blueprint + clickable preview, **not** the shippable app.
- The shippable iOS/Android/web app will be **coded later** (React + Capacitor) reusing these tokens/components.
- **Never touch `saver-test`** (that is the OLD app, currently live for real users) unless explicitly told.
- **Process rule (hard):** before executing anything, tell the user *what* you'll do and *in which repo*, and get the go-ahead. Then build, **render-verify (puppeteer) in both themes**, show, and push.

---

## 1. Product vision & goals
- **Product:** Saver — personal finance / money tracker. Tone: **calm, private, friendly, clear.** "Clear money, calmly."
- **Status of old version:** live on the **web** with real users (the React app in `saver-test`). Do not disrupt it.
- **New version:** new design (this work). Will **not** launch until fully designed & approved with the user; test on **web first**, then ship to stores.
- **Platforms:** must be **native-ready for App Store (iOS) + Google Play (Android)** → design with safe-areas, ≥44px touch targets, device sizes, native patterns. Delivery via **React + Capacitor**.
- **Languages:** **Arabic + English** at launch; **German + French** later. → **RTL + i18n from day one.**
- **Markets:** **UK · Egypt · Gulf · Europe.** → multi-currency, multi-locale.
- **Monetization:** store version will have a **small fee** (paid app). App must be **upgradeable** (users may request more features/analytics later) → keep system modular/extensible. (Paywall/Premium screens may be needed later — pending.)
- **Visual goal:** friendlier; **calm colour palette that works in BOTH dark & light**; several **theme accent colours** (all calm, dual-theme safe) so users pick to taste.

---

## 2. Repos & where to work
| Repo | Purpose | Rule |
|---|---|---|
| **`mahmoudstate/saver-test`** | OLD app (React/Vite), **LIVE on web** | **Do NOT touch** unless explicitly asked. Reference only (features/terminology). |
| **`mahmoudstate/saver-site`** | NEW design system + prototype (this work) | All new work here. |

- **Dev branch:** `claude/file-transfer-k1kui7` (both repos).
- **GitHub Pages:** `saver-site` serves from **`main`** → https://mahmoudstate.github.io/saver-site/ . Merge branch→main **only when the user wants it live**.
- Git push: `git push -u origin <branch>`, retry on network error (2s,4s,8s,16s). Do not open PRs unless asked.

---

## 3. saver-site role (decided)
**Option chosen: "design system + interactive prototype."**
- `saver-site` = HTML/CSS/JS source of truth for look & behaviour (Foundations · Brand · Screens).
- When design is locked → build the real app in code (React) + wrap with **Capacitor** for App Store / Play. Tokens & components transfer 1:1 because everything is built on shared `ds.css` tokens.

---

## 4. Locked decisions
- **Working method:** **Hybrid** — Phase 0 repair → lock tokens & components → then screen-by-screen.
- **Icon colour model:** **fixed/neutral tile + COLOURED glyph** (tile background constant; the per-category colour is applied to the icon drawing, not a solid colour tile + white glyph). ⚠️ *Current `ds.js catTile()` still uses the OLD model (solid colour tile + white glyph) — needs updating in Phase 1.*
- **Arabic font:** **IBM Plex Sans Arabic** (was the "✓ Selected" option B on the old Foundations page). Latin stays **DM Sans**.
- **Currency:** **automatic by country** (EG→EGP, UK→GBP, EU→EUR, Gulf→SAR/AED). Prototype should show more than one currency. (Note: current screens hardcode `£`/GBP — to be tokenised.)
- **RTL:** **RTL-ready now** (CSS logical properties), full Arabic content later.
- **Accents:** curate a **calm palette** (all work in dark+light). Current set (mint/emerald/blue/violet/coral/amber) to be reviewed — coral/amber may be too loud. **Pending: final calm palette + count.**
- **Theme default:** dark + light both first-class. Mint is the signature accent.

---

## 5. Tech of saver-site (how the prototype is built)
- **`ds.css`** — design tokens (2 themes, accents, hero gradient, spacing 4pt, radius, elevation, motion) + components (buttons, pills, chips, cards, list rows `.icard`, segmented `.seg`, progress `.pbar`, ring, fields, gradient `.hero`, minimal `.nav`, phone chrome, toasts/dialog/empty/sheet in screens.html local style).
- **`ds.js`** — theme+accent engine (persists to localStorage), Lucide-style **ICONS** map, **CATS** category tiles, status-bar + bottom-nav injection, count-up, scroll-reveal. Exposes `window.SaverDS = {ico, catTile, setTheme, setAccent}`.
- **Pages:** `index.html` (Foundations/Components showcase), `brand.html` (logo/brand), `screens.html` (numbered screens).
- **Logo:** `icon.png` (512×512) — the real Saver app icon (traced to crisp vector earlier; the PNG is the asset used in topbars). Logo design work is **stopped/approved as-is**.
- **Other files:** `DESIGN.md` (the full design "constitution" — still present, was shown via a Docs tab that must be restored), `DESIGN_PLAN.md`, `tokens.js`, `README.md`.
- **Rendering/verification:** use **puppeteer** (installed at `/tmp/logorender`) to screenshot pages/phones in **both themes** before showing the user. `@resvg/resvg-js` available for montages. Never show un-rendered work.

---

## 6. Process rules (must follow)
1. **Before executing:** state *what* + *which repo*, get user OK.
2. New work only in **`saver-site`**; never edit `saver-test`.
3. **Render-verify** every change (puppeteer, light + dark) before presenting.
4. Screens are **numbered**; user references changes by number.
5. Keep **this file updated** after each step.
6. Commit to dev branch; merge to `main` only when user wants it live.
7. Replies to the user are in **Arabic** (technical terms in English ok).
8. **Feature reference = OLD app code.** When the user requests a change, or says a feature is missing / was forgotten / "how does X work", **FIRST read the relevant logic in `saver-test/src/App.jsx`** (read-only) to learn exactly how that feature behaves in the live app, **THEN** re-implement it in the new design with the new visual language. `saver-test` = functional spec; `saver-site` = new look. Never assume behaviour — verify it in the old code.

---

## 7. Phased plan & status
- **Phase 0 — Repair** ✅ *done*
  - [x] Create `PROGRESS.md` (this file).
  - [x] Restore `index.html` Foundations **original ordering** (01 Colour · 02 Typography · 02b Arabic · 03 Spacing/Radius/Motion · 04 Iconography · 05 Buttons · 06 Inputs · 07 Data · 08 Hero).
  - [x] **Arabic-font section** restored; **IBM Plex Sans Arabic** locked; `ds.css` adds `:lang(ar),[dir=rtl]` font + RTL rule.
  - [x] **Docs/Constitution tab** restored (Showcase/Docs toggle) rendering `DESIGN.md` via a **tiny inline markdown renderer** (no CDN — works offline). ⚠️ Constitution *content* still reflects the OLD system → update text to new system later (Phase 1/2).
- **Phase 1 — Lock foundations** ▶️ *in progress*
  - [x] Update `ds.js catTile()` to **fixed neutral tile + coloured glyph** model (tokens `--catTile`/`--catTileBorder`); propagated to all screens.
  - [x] **Calm accent palette** locked (dark+light verified): **mint · sage · ocean · lavender · rose · honey**. Rose = soft pink (`#F1AECB`/`#C25480`) chosen to appeal to female users while staying calm. Updated `ds.js ACCENTS` + pills in index/brand + screen 24 swatches.
  - [ ] **Bank icons** system (real bank monograms/brand colours; e.g. HSBC, Banque Misr, NBE, CIB, Revolut, etc.) — define component. *(pending: which banks per market)*
  - [ ] Semantic colour usage rules (in/out/warning) documented.
  - [ ] **i18n/RTL scaffolding** (CSS logical props; Arabic font wired) + **currency tokens** (auto-by-locale, `fmt`).
  - [ ] **Native-readiness** tokens (safe-area insets, status bar, nav heights).
- **Phase 2 — Component library completeness** ⏳
  - [ ] Inventory & document every component (anatomy/variants/states), including missing: **bank icon, toggle/switch, segmented tabs, pickers (account/category/date/colour/glyph), amount keypad, sparkline/bar/donut charts, sliders, calendar/month picker, search field, list section headers, badges, stepper, snackbar/toast (done), dialog (done), bottom sheet (done), empty (done), skeleton/loading, paywall card**.
- **Phase 3 — Full screen map** ⏳
  - [ ] Map ALL detail screens + **where each feature lives** (user said several screens/features still missing). Expand the numbered inventory. Decide placement for: spending **Groups** management, **multi-account** flows, **reports/analytics**, **backup/restore**, **currency switch**, **paywall/premium**, **search**, **month navigation**, account **low-balance** settings, goal **archive/withdraw**, etc.
- **Phase 4 — Screen-by-screen polish & sign-off** ⏳
  - [ ] Walk each numbered screen; user gives notes by number; refine.

---

## 8. Done so far (current state of saver-site)
- ✅ Shared **`ds.css` + `ds.js`** design system (v1).
- ✅ **`index.html`** rebuilt as Foundations/Components (⚠️ but lost old order + Arabic + Docs tab → Phase 0 restores).
- ✅ **`brand.html`** rebuilt (logo, clear-space, app icon, colour/accent, voice/misuse) — **user approved**.
- ✅ **`screens.html`** — **33 numbered screens** (see §9), gradient-hero language, light/dark + accents, animated, real Saver terminology (Net, Safe-to-spend, Accounts, Subscriptions+Installments, Budgets, Goals, Quick Add…).
- ✅ Theme/accent engine + count-up + reveal + phone chrome injection.
- ✅ Logo `icon.png` in repo; used in topbars.

---

## 9. Screen inventory (numbered — stable reference)
**A · Core tabs:** 01 Home · 02 Activity · 03 Budgets · 04 Goals · 05 Bills·Subscriptions · 06 Bills·Installments
**B · Add & input:** 07 Add·Expense · 08 Add·Income · 09 Add·Saving · 10 Quick Add
**C · Details/ledgers:** 11 Account ledger · 12 Budget detail · 13 Goal detail · 14 Group ledger · 15 Bill detail/Record payment · 16 Edit transaction
**D · Editors/setup:** 17 Add/Edit Account · 18 Add/Edit Category · 19 Add/Edit Goal · 20 Add/Edit Budget · 21 Quick Actions setup · 22 Customize Dashboard
**E · Settings/system:** 23 Settings · **24 Appearance (Theme & accent)** · 25 Privacy & Security · 26 Help/Manual · 27 Onboarding · 28 What's New/Install
**F · Notifications/messages:** 29 Notifications · 30 Toasts (success/warning/error) · 31 Alert/Confirm dialog · 32 Empty state · 33 Goal reached celebration

**To be added/mapped (Phase 3, not yet built):** Spending Groups manage, Reports/Analytics, Multi-currency switch, Backup & Restore, Search, Month picker, Paywall/Premium, Account low-balance settings, Coach tour overlay, Restore-backup flow, Change-currency confirm, locale/language picker.

---

## 10. Open questions / pending decisions
- Final **calm accent palette** (which colours + how many) — propose & confirm.
- **Bank set** for bank-icon component (which banks per market).
- **Monetization** detail: paid app only, or also in-app Premium tier? → affects paywall screens.
- **Analytics depth** wanted later (charts/reports scope).
- Timing for **German/French** localisation.
- When to start the **coded app** (React+Capacitor) stage & repo for it.

---

## 11. Real app reference (from saver-test — features only, NOT visual)
Tabs: dashboard, add, savings(goals), history(activity), budgets, quickactions, manual, monthly(subscriptions+installments), settings, privacy. Concepts: Total balance, **Net saved**, **Safe to spend**, Accounts (banks+cash, per-colour, low-balance alert, ledger), Categories (glyph+colour), **Spending Groups**, Budgets (per category, rollover), Savings goals (target, glyph, colour, %, spendingMode, freeze/withdraw/archive), Bills = Subscriptions + Installments (record payment), **Quick Actions** (≤4, long-press +), month selector, customizable/reorderable dashboard, PWA/offline, backup/restore, coach tour. Currencies: EGP(default), GBP, USD, EUR, SAR, AED. Semantic colours: red=out, accent(mint)=in/primary, yellow=goals, blue/purple/orange.

---

> **Reminder:** `saver-test/src/App.jsx` (~3500 lines) is the behavioural spec. Grep it for the feature, read it, then design the new version. Do not edit it.

_Last updated: 2026-06-12 · maintained by the design agent. Update this after every step._
