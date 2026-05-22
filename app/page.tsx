import { Button } from "@/components/ui/button"
import { createFolder } from "@/app/actions/folders"
import { prisma } from "@/lib/prisma"
import { FolderList } from "@/components/folder-list"
import { FolderForm } from "@/components/folder-form"

export const revalidate = 10

export default async function Page() {
  const folders = await prisma.folder.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-8 p-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-lg font-bold">Folders</h1>
        <p className="text-sm text-muted-foreground">
          Organize your flashcards into folders.
        </p>
      </header>

      <section>
        <h4 className="mb-3 text-sm font-semibold">New folder</h4>
        <FolderForm />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {folders.length === 1 ? "1 folder" : `${folders.length} folders`}
        </h2>

        {folders.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            No folders yet. Create one above to get started.
          </p>
        ) : (
          <div className="w-full">
            <FolderList folders={folders} />
          </div>
        )}
      </section>
    </div>
  )
}
