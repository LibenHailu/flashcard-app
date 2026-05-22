"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"

export async function createFolder(formData: FormData) {
  const name = formData.get("name")?.toString().trim()
  if (!name) return

  await prisma.folder.create({ data: { name } })
  revalidatePath("/")
}

export async function deleteFolder(formData: FormData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.folder.delete({
    where: { id },
  })

  revalidatePath("/")
}
