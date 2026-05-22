"use client"

import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"

import { deleteFlashcard } from "@/app/actions/flashcards"

export type FlashcardListItem = {
  id: string
  front: string
  back: string
  createdAt: Date
}

interface FlashcardListProps {
  folderId: string
  flashcards: FlashcardListItem[]
}

export function FlashcardList({ folderId, flashcards }: FlashcardListProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {flashcards.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
          No flashcards yet. Add one to get started.
        </p>
      ) : (
        flashcards.map((card) => (
          <div
            key={card.id}
            className="flex w-full items-start justify-between gap-4 rounded-lg border border-border bg-card p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{card.front}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {card.back}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {new Date(card.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/folders/${folderId}/flashcards/${card.id}/edit`}
                className="rounded p-2 transition-colors hover:bg-secondary"
                title="Edit flashcard"
              >
                <Pencil className="h-4 w-4" />
              </Link>

              <form action={deleteFlashcard}>
                <input type="hidden" name="id" value={card.id} />
                <input type="hidden" name="folderId" value={folderId} />
                <button
                  type="submit"
                  className="rounded p-2 transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  title="Delete flashcard"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
