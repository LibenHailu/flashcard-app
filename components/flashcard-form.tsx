"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, Save } from "lucide-react"

import {
  createFlashcard,
  updateFlashcard,
} from "@/app/actions/flashcards"

export type FlashcardFormValues = {
  id: string
  front: string
  back: string
}

interface FlashcardFormProps {
  folderId: string
  flashcard?: FlashcardFormValues
}

export function FlashcardForm({ folderId, flashcard }: FlashcardFormProps) {
  const isEditing = Boolean(flashcard)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  async function handleAction(formData: FormData) {
    if (flashcard) {
      await updateFlashcard(flashcard.id, folderId, formData)
    } else {
      await createFlashcard(folderId, formData)
    }

    formRef.current?.reset()
    router.push(`/folders/${folderId}`)
  }

  return (
    <form
      key={flashcard?.id ?? "create"}
      ref={formRef}
      action={handleAction}
      className="space-y-3"
    >
      <div>
        <label
          htmlFor="front"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Question / Front
        </label>
        <textarea
          id="front"
          name="front"
          defaultValue={flashcard?.front}
          placeholder="Enter the question or prompt..."
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
          rows={3}
          required
        />
      </div>

      <div>
        <label
          htmlFor="back"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Answer / Back
        </label>
        <textarea
          id="back"
          name="back"
          defaultValue={flashcard?.back}
          placeholder="Enter the answer or response..."
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
          rows={3}
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save changes
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add card
            </>
          )}
        </button>
        <Link
          href={`/folders/${folderId}`}
          className="rounded-lg border border-border px-4 py-2 transition-colors hover:bg-secondary"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}
