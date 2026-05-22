import Link from "next/link"
import { notFound } from "next/navigation"

import { FlashcardForm } from "@/components/flashcard-form"
import { prisma } from "@/lib/prisma"

export default async function EditFlashcardPage({
  params,
}: {
  params: Promise<{ id: string; flashcardId: string }>
}) {
  const { id, flashcardId } = await params

  const folder = await prisma.folder.findUnique({ where: { id } })
  if (!folder) {
    notFound()
  }

  const flashcard = await prisma.flashcard.findFirst({
    where: { id: flashcardId, folderId: id },
  })
  if (!flashcard) {
    notFound()
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-lg flex-col gap-6 p-6">
      <header className="flex flex-col gap-1">
        <Link
          href={`/folders/${id}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {folder.name}
        </Link>
        <h1 className="text-lg font-medium">Edit flashcard</h1>
        <p className="text-sm text-muted-foreground">
          Update the question and answer for this card.
        </p>
      </header>

      <FlashcardForm
        folderId={id}
        flashcard={{
          id: flashcard.id,
          front: flashcard.front,
          back: flashcard.back,
        }}
      />
    </div>
  )
}
