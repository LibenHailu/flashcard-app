"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"

export async function createFlashcard(folderId: string, formData: FormData) {
  const front = formData.get("front")?.toString().trim()
  const back = formData.get("back")?.toString().trim()
  if (!front || !back || !folderId) return

  await prisma.flashcard.create({
    data: { front, back, folderId },
  })

  revalidatePath(`/folders/${folderId}`)
}

export async function updateFlashcard(
  flashcardId: string,
  folderId: string,
  formData: FormData
) {
  const front = formData.get("front")?.toString().trim()
  const back = formData.get("back")?.toString().trim()
  if (!front || !back || !flashcardId || !folderId) return

  await prisma.flashcard.update({
    where: { id: flashcardId, folderId },
    data: { front, back },
  })

  revalidatePath(`/folders/${folderId}`)
  revalidatePath(`/folders/${folderId}/flashcards/${flashcardId}/edit`)
}

export async function deleteFlashcard(formData: FormData) {
  const id = formData.get("id")?.toString()
  const folderId = formData.get("folderId")?.toString()
  if (!id || !folderId) return

  await prisma.flashcard.delete({
    where: { id, folderId },
  })

  revalidatePath(`/folders/${folderId}`)
}
