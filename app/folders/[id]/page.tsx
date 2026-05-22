import Link from "next/link"
import { notFound } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"

import { deleteFolder } from "@/app/actions/folders"
import { FlashcardList } from "@/components/flashcard-list"
import { prisma } from "@/lib/prisma"

export const revalidate = 10

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const folder = await prisma.folder.findUnique({
    where: { id },
    include: {
      cards: {
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!folder) {
    notFound()
  }

  const cardCount = folder.cards.length

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← All folders
          </Link>
          <h1 className="text-lg font-bold">{folder.name}</h1>
          <p className="text-sm text-muted-foreground">
            {cardCount === 1 ? "1 flashcard" : `${cardCount} flashcards`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/folders/${id}/flashcards/create`}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            Add flashcard
          </Link>

          <form action={deleteFolder}>
            <input type="hidden" name="id" value={folder.id} />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
              title="Delete folder"
            >
              <Trash2 className="h-4 w-4" />
              Delete folder
            </button>
          </form>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Flashcards</h2>
        <FlashcardList folderId={id} flashcards={folder.cards} />
      </section>
    </div>
  )
}
