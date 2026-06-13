# Saver — Locked Logic & Message Catalog
Extracted verbatim from the old app (`saver-test/src/App.jsx`). **The maths/logic below must NOT change** — any edit breaks balances. New design reuses these exactly. To change anything here, ASK FIRST.

## 1. Core formulas (LOCKED)
Transaction types: `income`, `expense`, `saving`, `goal_withdraw`, `goal_return`, `transfer`.

- **bankBalance(bank)** = Σ txns: `income` +amt · `expense` −amt · `goal_withdraw` −amt · `transfer` in(+toBank) · `transfer` out(−fromBank/bank).
- **goalSaved(goal)** = max(0, Σ: `saving` +amt · `goal_withdraw` −amt · `goal_return` −amt).
- **frozenForBank(bank)** = max(0, Σ per bank: `saving` +amt · `goal_withdraw` −amt · `goal_return` −amt).
- **safeToSpend(bank)** = bankBalance(bank) − frozenForBank(bank).
- **totalBalance** = Σ bankBalance(allBanks).  **Safe total** = totalBalance − Σ frozen.

Design mapping: Home top toggle = **Total** (totalBalance) ⇆ **Safe to spend** (Safe total). "Frozen in goals" = Σ frozen. Goal vault "spending mode" = goal usable as a payment source; vault appears in source picker only when `spendingMode` on. Money stays physically frozen inside its banks (no double count).

Validation rule for spending: `expense` from a bank blocked when `amt > safeToSpend(bank)`. Saving blocked when `amt > safeToSpend(bank)`. Goal spend/withdraw blocked when `amt > goalSaved`.

## 2. AlertModal — errors & blocks (title · message · colour)
- Insufficient Balance · "Available balance is {x}. Not enough." · red
- Insufficient Balance · "Available balance is {x}. Not enough to save." · red
- Insufficient Goal Balance · "Goal only has {x}." · red
- Insufficient Funds · "Available: {x}" · red
- Insufficient Balance · "Not enough balance for this modification." · red
- Insufficient Balance · "Available balance is {x}. Not enough to increase this saving." · red
- Insufficient Balance · ""{bank}" only has {x} available." · red
- Invalid Amount · "Please enter a valid amount." · red
- No Goal · "Please select a savings goal." · red
- Error · "Cannot transfer to same account" · red
- Error · "Goal not found." · red
- Action Blocked · "Cannot delete this saving deposit because the funds have already been spent or returned." · red
- Action Blocked · "Cannot reduce this amount. Funds have already been spent." · red
- Split Transaction · "This transaction is split across multiple banks. Please delete and recreate it." · yellow
- Linked Transaction · "Cannot edit a split transaction. Please delete and recreate it." · yellow
- Action Not Allowed · "Goal spending and returns cannot be edited directly. Please delete and recreate." · orange
- Action Not Allowed · "Transfers cannot be edited directly. Please delete and recreate." · blue
- Historical Lock · "This goal is closed or deleted. Its transactions are locked." · orange
- Cannot Delete Directly · "This goal contains funds or transaction history. Please tap on the goal card to withdraw funds, archive it, or delete it safely from the control panel." · yellow
- Cannot Delete · "{bank delete error}" · red
- Too many installments · "You entered {n} already-paid installments, but this plan only has {c}. Please enter {c} or less." · yellow
- Already Complete · "All installments have been paid." · accent
- Already Paid · "An installment is already recorded for {Month}." · yellow
- Installment Complete! · ""{label}" has been fully paid off!" · accent
- Restore Successful · "Backup restored successfully!" · accent
- Restore Failed · "Invalid or corrupted backup file." · red
- Import Error · "Failed parsing JSON file." · red
- Backup Complete · "Backup saved directly to your device." · accent
- Profile Updated · "Name updated!" · accent

## 3. ConfirmModal — confirmations (title · message · confirm colour)
- Not Enough in Goal · "Goal has {x}.\nShortfall: {y}\nRemaining will be taken from "{bank}". Continue?" · yellow
- Change Currency? · "Switching from {a} to {b} only changes how amounts are displayed. Your actual numbers will NOT be converted.\n\nContinue?" · blue
- Delete Transaction? · "This will permanently remove the record and update all balances instantly." · red
- Delete Linked Transactions? · "This transaction is split. Deleting it will remove ALL linked parts." · red
- Start Spending Mode? · "This will make the goal available as a payment source.\n\nYou can spend directly from this goal's balance." · accent
- Stop Spending Mode? · "This will remove the goal from the payment sources list.\n\nYour saved balance stays safe." · orange
- Complete & Archive Goal? · "This will close "{name}".\n\nThe remaining {x} will be returned to your accounts.\n\nThe goal will move to the Archived tab." · accent
- Delete Goal? · "This will permanently delete "{name}".\n\nThe remaining {x} will be safely returned to your accounts first.\n\nAll linked transactions will remain in your history." · red
- Reactivate Goal? · "This will move the goal back to your Active list." · accent
- Delete Budget? · "This removes the limit tracking without deleting any transactions." · red
- Delete Project? · "This removes the project. None of your transactions are deleted." · red
- Mark project complete? · ""{name}" will move to Completed. Its total stays saved and you can reopen it anytime." · accent
- Delete Subscription? · "This removes it everywhere, including past months. Past payment transactions stay in your history." · red
- Stop subscription? · "It won't appear in this month or future months anymore, but its past payments stay in your history. You can resume it any time." · yellow
- Undo Payment? · "This marks "{name}" as unpaid for {Month} and removes the transaction." · yellow
- Delete Installment? · "This removes the plan. Past payment transactions stay in your history." · red

## 4. GoalToast — encouragement (full-screen, our icon, "Keep Going!" button). NO EMOJI.
Tier by % saved after a deposit:
- ≤25% · "Great start! Every bit counts" / "Nice! You're building momentum" · icon **sparkles**
- 26–49% · "Keep going, you're on the right track!" / "Your goal is getting closer!" · icon **sparkles**
- =50% · "Halfway there! The hard part is behind you" · icon **trendUp**
- 51–89% · "Past the midpoint — almost there!" / "So close now! Just a few steps left" · icon **trendUp**
- 90–99% · "Almost done! One final push" · icon **trendUp**
- 100% · "Goal reached! Time to enjoy your hard work" · icon **trophy**

## 5. EmptyState messages (glyph · message)
- receipt · "No transactions yet." / "No transactions found."
- target · "No active goals yet." / "No projects yet. A project adds up the total cost of something across however many months it runs — like papers, a trip, or a repair."
- archive · "No archived goals."
- layers · "No monthly budgets yet. Tap Add budget to set a monthly spending limit."
- clock · "No active budgets for this month."
- search · "No services match your search. Use Custom above."
- zap · "This subscription was removed."

## 6. Message UI in old app
All messages are **centre modals**, not bottom toasts:
- **AlertModal**: icon + title + message + single coloured "OK"/Confirm button.
- **ConfirmModal**: title + message + Cancel / Confirm(coloured).
- **GoalToast**: centred celebratory card, icon tile + message + "Keep Going!".
No emoji anywhere — icons come from our `Ico` set.
