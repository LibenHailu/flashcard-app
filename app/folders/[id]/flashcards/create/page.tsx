import Link from "next/link"
import { notFound } from "next/navigation"

import { FlashcardForm } from "@/components/flashcard-form"
import { prisma } from "@/lib/prisma"

export default async function CreateFlashcardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const folder = await prisma.folder.findUnique({ where: { id } })

  if (!folder) {
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
        <h1 className="text-lg font-medium">New flashcard</h1>
        <p className="text-sm text-muted-foreground">
          Add a question and answer to this folder.
        </p>
      </header>

      <FlashcardForm folderId={id} />
    </div>
  )
}
