# Technical Assessment — Answers

## 1. How to run

**Prerequisites:** Node.js 20+, npm. Native build tools may be needed for `better-sqlite3` (see README).

**Single command** (from repo root):

```bash
npm install && cp .env.example .env && npx prisma generate && npx prisma migrate deploy && npm run dev
```

**Steps in plain language:**

1. Install packages.
2. Copy `.env.example` → `.env` (sets `DATABASE_URL="file:./dev.db"`).
3. Generate the Prisma client.
4. Apply migrations to create `dev.db`.
5. Start the app at http://localhost:3000.

**Persistence test:** Create folders/cards, stop the server, run `npm run dev` again — data remains in `dev.db`.

---

## 2. Stack choice

**Chosen:** Next.js (App Router) + React + TypeScript + Prisma + SQLite (`better-sqlite3` adapter) + Tailwind CSS.

**Why this fit the task:**

- **One codebase for UI and API** — Server Components and Server Actions handle reads/writes without a separate backend repo or deployment. Good for a small CRUD + study UI mini-app.
- **SQLite** — Single file (`dev.db`), no Docker or cloud DB for reviewers. Matches “persist between runs” on a fresh machine with minimal setup.
- **Prisma** — Typed models, migrations, and safe queries with little boilerplate.
- **Web UI** — Flashcards are naturally visual; flip/study mode is easier to demo in a browser than in a CLI.

**Worse choices (for this scope):**

| Alternative | Why worse here |
|-------------|----------------|
| **Separate React SPA + Express API** | Two apps to run/configure; more moving parts for reviewers. |
| **Hosted Postgres only** | Requires external service or credentials; harder “fresh machine” story. |
| **JSON file storage** | Works, but no migrations, weaker relational guarantees (folder → cards), easier to corrupt concurrent writes. |
| **CLI only** | Meets CRUD/persistence but poor fit for flip-card study UX. |

---

## 3. One real edge case

**Case:** A user opens an edit URL for a flashcard that does not belong to the folder in the path (e.g. `/folders/folder-A/flashcards/card-from-folder-B/edit`).

**Handling:** The edit page loads the card with **both** `flashcardId` and `folderId` in the query. If no row matches, Next.js `notFound()` runs.

**Location:** `app/folders/[id]/flashcards/[flashcardId]/edit/page.tsx` — lines **19–24**:

```ts
const flashcard = await prisma.flashcard.findFirst({
  where: { id: flashcardId, folderId: id },
})
if (!flashcard) {
  notFound()
}
```

The same **folder + id** constraint is used on update/delete in `app/actions/flashcards.ts` (e.g. `where: { id: flashcardId, folderId }` on line **29**).

**Without this:** `findUnique({ where: { id: flashcardId } })` could load and edit a card from another folder while the UI still shows folder A’s name — wrong data scope and a confusing or unsafe UX.

---

## 4. AI usage

| Tool | What I asked | What it gave | What I changed |
|------|----------------|--------------|----------------|
| **Cursor (Claude)** | Fix Prisma-related 404 on home page | Pointed out wrong client import (`@prisma/client` vs generated output), missing Prisma 7 SQLite adapter, wrong model accessor (`folders` vs `folder`) | Applied fixes in `lib/prisma.ts` and `app/page.tsx`; ran `prisma generate` |
| **Cursor** | List folders + create button on home page | Server action + form pattern | Kept pattern; later refactored into `FolderForm` / `FolderList` components |
| **Cursor** | Fix flashcard form + create page | Server actions, `FlashcardForm` with `folderId`, edit route | Added `updateFlashcard`, edit page, and shared form for create/edit |
| **Cursor** | Bind folder detail page | `FlashcardList`, links to create/edit, delete actions | Integrated flip-card study UI on top of list |
| **Cursor** | Flip-card study transitions | `Flashcard` component + deck navigation in `FlashcardList` | Used `<button>` + `aria-label` for accessibility; `key={currentCard.id}` so flip state resets when changing cards; restored edit/delete wiring |

**Example change (flip card list):** AI suggested a flip component with a clickable `<div>`. I switched the flip target to a **`<button type="button">`** with an **`aria-label`** that toggles between “Show question” and “Show answer”, and remounted the card with **`key={currentCard.id}`** when navigating so the card does not stay flipped on the back when moving to the next item.

---

## 5. Honest gap

**Gap:** No automated tests (unit, integration, or e2e). Persistence and CRUD are only verified manually.

**With another day:** Add Playwright e2e tests for the assessment path: create folder → add cards → restart app (or re-open DB) → assert data exists; plus tests for `notFound` on mismatched folder/card IDs and empty-form validation on server actions.

**Secondary gap:** `npx prisma generate` is required after clone (client is gitignored). A `postinstall` script or committing a documented one-liner in CI would make fresh clones harder to misconfigure.

---

## Beyond basic CRUD (feature defense)

**Feature:** **Study mode** — 3D flip cards with previous/next navigation inside a folder.

**Why it matters:** CRUD alone is an admin panel. For flashcards, the point is **recall practice** (see question → flip → see answer). Study mode turns the app into something you’d actually use to review, not just store text pairs.

**Where:** `components/flashcard.tsx` (flip UI), `components/flashcard-list.tsx` (deck navigation + card picker).
