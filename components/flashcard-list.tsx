"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react"

import { deleteFlashcard } from "@/app/actions/flashcards"
import { Flashcard } from "@/components/flashcard"

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
  const [currentIndex, setCurrentIndex] = useState(0)

  if (flashcards.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
        No flashcards yet. Add one to get started.
      </p>
    )
  }

  const currentCard = flashcards[currentIndex]
  const total = flashcards.length

  function goToPrevious() {
    setCurrentIndex((index) => (index === 0 ? total - 1 : index - 1))
  }

  function goToNext() {
    setCurrentIndex((index) => (index === total - 1 ? 0 : index + 1))
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Card {currentIndex + 1} of {total}
          </span>
          <span className="text-xs">Study mode</span>
        </div>

        <Flashcard
          key={currentCard.id}
          front={currentCard.front}
          back={currentCard.back}
        />

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goToPrevious}
            className="rounded-lg border border-border p-2 transition-colors hover:bg-secondary"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="rounded-lg border border-border p-2 transition-colors hover:bg-secondary"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          All cards
        </h3>
        {flashcards.map((card, index) => (
          <div
            key={card.id}
            className={`flex w-full items-center justify-between gap-4 rounded-lg border p-4 transition-colors ${
              index === currentIndex
                ? "border-accent bg-secondary"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            <button
              type="button"
              className="min-w-0 flex-1 text-left"
              onClick={() => setCurrentIndex(index)}
            >
              <p className="truncate font-medium text-foreground">
                {card.front}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {card.back}
              </p>
            </button>

            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/folders/${folderId}/flashcards/${card.id}/edit`}
                className="rounded p-2 transition-colors hover:bg-muted"
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
        ))}
      </div>
    </div>
  )
}
