# Flashcard Study App

A small full-stack web app for organizing **folders** and **flashcards** (question/answer pairs). Data is stored in a local **SQLite** database file so folders and cards persist after you stop and restart the app.

## Features

- **CRUD folders** — create, list, open, and delete folders
- **CRUD flashcards** — create, edit, and delete cards inside a folder
- **Study mode** — 3D flip animation to reveal answers, with previous/next navigation between cards in a folder

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** (comes with Node)
- A C++ toolchain may be required once for `better-sqlite3` (native module). On macOS: Xcode Command Line Tools (`xcode-select --install`). On Windows: [windows-build-tools](https://github.com/nodejs/node-gyp#on-windows) or Visual Studio Build Tools.

## Run on a fresh machine

From the repo root:

```bash
npm install && cp .env.example .env && npx prisma generate && npx prisma migrate deploy && npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### What each step does

| Step | Purpose |
|------|---------|
| `npm install` | Install dependencies |
| `cp .env.example .env` | Set `DATABASE_URL=file:./dev.db` |
| `npx prisma generate` | Generate the Prisma client (`generated/prisma`) |
| `npx prisma migrate deploy` | Create/update `dev.db` from migrations |
| `npm run dev` | Start the Next.js dev server |

### Persistence check

1. Create a folder and add a few flashcards.
2. Stop the dev server (`Ctrl+C`).
3. Run `npm run dev` again.
4. Open the same folder — your cards should still be there (`dev.db` in the project root).

## Other commands

```bash
npm run build    # Production build
npm run start    # Run production server (after build)
npm run typecheck
npm run lint
```

## Project layout

```
app/                    # Next.js App Router pages & server actions
components/             # UI (flashcard flip, lists, forms)
lib/prisma.ts           # Prisma client (SQLite adapter)
prisma/schema.prisma    # Data models
prisma/migrations/      # SQL migrations
dev.db                  # SQLite database (created by migrate)
```

## Assessment docs

See **[ANSWERS.md](./ANSWERS.md)** for stack rationale, edge-case notes, AI usage, and known gaps.
