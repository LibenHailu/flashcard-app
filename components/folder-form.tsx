"use client"

import { useRef } from "react"
import { Plus } from "lucide-react"
import { createFolder } from "@/app/actions/folders"

export function FolderForm() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name")?.toString().trim()
    if (!name) return

    await createFolder(formData)
    formRef.current?.reset()
  }

  return (
    <div>

      <form ref={formRef} action={handleAction} className="flex max-w-md gap-2">
        <input
          type="text"
          name="name"
          placeholder="New folder name..."
          className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Plus className="h-4 w-4" />
          Create
        </button>
      </form>
    </div>
  )
}
