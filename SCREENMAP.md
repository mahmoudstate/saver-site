# Saver — SCREEN MAP (Phase 3)

> Maps **every feature/screen from the live old app** (`saver-test/src/App.jsx`) to its **place in the new design**.
> Status legend: **✅ exists** (in `screens.html`, may need extending) · **➕ new** (build) · **▢ modal/sheet** · **◳ state/variant** · **❓ decision needed**.
> Numbers in **[NN]** refer to the numbered screen inventory in `screens.html` / PROGRESS.md §9.

---

## 0. Navigation model ✅ LOCKED
**Bottom nav = Home · Activity · [＋] · Bills · Profile.** Center **＋** = a **raised squircle (rounded-square) button** in accent gradient (matches the brand's rounded-square motif; not a plain circle). Tap ＋ = Add; long-press = Quick Add.
- **Budgets** & **Goals** reached from Home cards ("See all") / Profile, not a tab.
- **Settings** lives under the **Profile** tab.

---

## 1. CORE TAB SCREENS

### Home / Dashboard  [01] ✅ extend
Old Home is a rich, reorderable dashboard. New [01] currently = balance hero + recent. Needs these **blocks** (all ◳ sections of Home):
- ➕ Greeting (time-based) + date
- ➕ **Balance mode toggle**: Total Balance ⇄ Safe-to-Spend (swipe/segment)
- ➕ **Overview**: Income & Expenses cards w/ % vs last month → tap opens **Breakdown** ▢
- ✅ Accounts (carousel, reorderable, frozen label, low-balance warning)
- ➕ **Monthly Bills card** (paid x/total, progress, next due)
- ➕ **Installments card** (paid x/total, due this month, next)
- ✅ Budgets card (per-budget progress) — extend
- ✅ Savings goals card — extend
- ➕ **Onboarding checklist** (first-run: add account/txn/budget/goal) ◳
- ✅ Customize Dashboard entry → [22]
- ▢ Month selector (global, top)
- ▢ Hide-total (privacy eye) (global)

### History / Activity  [02] ✅ extend
- ➕ Search field · ➕ type filter chips (all/expense/income/saving/transfer) · ✅ month selector
- ✅ grouped list · ▢ tap = View Txn · swipe = Edit/Delete
- ◳ Empty state [32] · special icons for transfer/saving/goal rows

### Bills — Subscriptions  [05] ✅ extend
- ➕ Totals card (monthly / x of total paid / per-year)
- ➕ **View selector**: Timeline · Categories · History
- ✅ bill rows (logo, status Paid/Due) → ▢ Bill detail [15]

### Bills — Installments  [06] ✅ extend
- ➕ Totals (due this month / active plans / remaining)
- ➕ **status chips** (Due now/Active/Completed/All)
- ✅ rows with progress → ▢ Installment detail (➕ new, see §3)

### Budgets — Monthly  [03] ✅ extend
- ➕ hero ring (% used) + KPIs (avg/mo, total limit, on-track)
- ➕ smart insight banner · ➕ **6-month sparkbars**
- ✅ per-budget rows (progress, X left, daily safe-to-spend) → ▢ Budget ledger [12]

### Budgets — Projects  ➕ NEW tab
- Long-term cumulative budgets. rows: span label, total spent/target, progress, **Mark complete** → Archived (collapsible). → ▢ Project detail (➕)

### Settings  [23] ✅ rework into sub-sections
Old Settings has 4 sub-tabs:
- **General**: quick links (Savings, Budgets, Quick Actions) · Your name · **Backup & Restore** (➕) · footer/version/privacy link
- **Accounts**: list + add/edit → [17]
- **Categories**: Expense/Income tabs, list + add/edit → [18]
- **Preferences**: **Theme** + **Currency** → this is our **Appearance [24]** (extend to include currency)

---

## 2. ADD / INPUT
- Add · Expense  [07] ✅
- Add · Income  [08] ✅
- Add · Saving (to goal)  [09] ✅
- **Add · Transfer (between accounts)**  ➕ NEW — from/to account, note
- Quick Add sheet  [10] ✅ (amount, date, source incl. spending goals, note)
- ▢ Amount keypad (component done §10)

---

## 3. DETAIL / LEDGERS
- Account ledger  [11] ✅ — add filter tabs (all/in/out), frozen card
- Budget ledger  [12] ✅
- Goal detail / Saving ledger  [13] ✅ — add **Spending-mode toggle**, **Return to Bank** ▢, **Complete & Archive**, **Delete**
- Group ledger  [14] ✅ (legacy groups → migrating to budgets ❓keep?)
- Bill (subscription) detail  [15] ✅ — record payment / undo / **Stop/Resume** / history / delete
- **Installment detail**  ➕ NEW — progress ring, schedule grid, record month/undo, info, delete
- **Project detail**  ➕ NEW

---

## 4. EDITORS / FORMS
- Add/Edit Account  [17] ✅ — presets (CIB/NBE/Cash…), glyph, colour, low-balance
- Add/Edit Category  [18] ✅ — glyph/emoji, colour, **group** (expense)
- Add/Edit Goal  [19] ✅ — target, glyph, colour, spending-mode
- Add/Edit Budget  [20] ✅
- **Add/Edit Project**  ➕ NEW (categories multi-select, total, start month)
- Quick Actions setup  [21] ✅ (2×2 grid + config modal)
- **Subscription picker** (service logos grid + search + custom)  ➕ NEW ▢
- **Subscription form** (name/type/amount/account/due/reminder/note)  ➕ NEW
- **Installment add — 3-step wizard** (item&company → numbers/deposit → schedule&account)  ➕ NEW

---

## 5. SYSTEM / ONBOARDING / HELP
- Onboarding / Welcome  [27] ✅ (+ first-run checklist on Home ◳)
- **Story Tour** (60-sec, 14 slides, swipe)  ➕ NEW
- **Coach Tour** (on-dashboard highlighted tooltips)  ➕ NEW (uses coachmark component)
- What's New (v2.3)  [28] ✅ ▢
- **PWA Install** (iOS/Android steps)  [28]/➕ ▢
- Privacy & Security  [25] ✅ (4 cards: offline, zero-collection, data safety, device security)
- Help / Manual  [26] ✅ — add **FAQ accordion (≈20 Q)** + Story-tour entry + feedback
- **Backup & Restore**  ➕ NEW (backup JSON / restore + reminder banner)

---

## 6. NOTIFICATIONS / MESSAGES / MODALS
- Notifications inbox  [29] ✅ (bills due, goal reached, low balance, backup reminder)
- Toasts (success/warning/error)  [30] ✅
- Alert / Confirm dialog  [31] ✅ (Delete?, Restore?, Change currency?, Stop?, Undo?, Mark complete?)
- Empty state  [32] ✅
- Goal reached celebration  [33] ✅
- **Income/Expense Breakdown**  ➕ NEW ▢ (top categories bar + highest txn)
- **Return to Bank**  ▢ (under [13])
- **Backup reminder banner**  ◳ (every 3 days)

---

## 7. GLOBAL CAPABILITIES (behaviours, not screens)
Month selector · Hide-total privacy · Balance mode (Total/Safe) · Reorder + hide dashboard sections (dnd) · Search · Low-balance alerts (visual) · Spending-mode goals as expense source · Split transactions (multi-bank goal withdraw) · Haptics · 6 currencies (+KWD/QAR added) · Theme + accent · localStorage persistence · offline/PWA.

---

## 8. DATA MODEL (entities — for the coded app)
txn(type: expense|income|saving|transfer|goal_withdraw|goal_return) · bank(lowBalanceThreshold) · expCat(group) · incCat · group(legacy) · saving(goal,status,spendingMode) · budget(kind: monthly|project, repeat, startMonth, status) · bill(dueDay,reminderDays,payments[],startMonth,stoppedMonth) · installment(total/monthly/count, downPayment, payments[], status) · quickAction.

---

## 9. DECISIONS (locked with user)
1. ✅ **Nav** = Home · Activity · [＋ squircle] · Bills · Profile (Settings under Profile). (§0)
2. ✅ **Projects** in Budgets — **include now**.
3. ✅ **Groups** (legacy) — **fold into Budgets** (don't build as separate).
4. ✅ **Transfer** — **keep Add segmented at 3** (Expense/Income/Saving); Transfer is a **separate screen [34]** opened from an account's **"Move"** action (not a 4th segment).
5. ✅ **Scope** = **core v1 first**, defer the rest to v2 (tag screens). Core = daily loop + essential setup (see PROGRESS). v2 = Story Tour, Coach Tour, PWA-install help, full FAQ, long installment wizard, detailed service picker.
6. ⏳ Story vs Coach tour, subscription/installment depth → v2.

---

## 10. NEW NUMBERED SCREENS (building)
**Built ✅ (batch G):** 34 Add·Transfer · 35 Breakdown · 36 Budgets·Projects · 37 Installment detail · 38 Subscription picker · 39 Backup & Restore.
**Next ➕:** 40 Installment add (3-step wizard) · 41 Subscription form · 42 Project detail/editor · 43 Settings·Accounts list · 44 Settings·Categories list · 45 Help/FAQ (full) · 46 Story Tour (60-sec) · 47 Coach Tour overlay · 48 PWA Install sheet · 49 Bills view-selector states · 50 Return-to-Bank / Spending-mode (goal detail extend).

**Default decisions taken (reversible, per "continue"):** nav kept as Home·Activity·Budget·You for now (§0 still open); Transfer + Projects **included**; legacy Groups → folding into Budgets (kept [14] as reference). Adjust anytime.

---
_Generated Phase 3 · 2026-06-13 · review & lock with the user, then expand `screens.html`._
