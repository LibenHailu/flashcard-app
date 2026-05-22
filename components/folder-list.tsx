"use client"

import { deleteFolder } from "@/app/actions/folders"
import { Folder } from "@/generated/prisma/client"
import { Trash2, FolderOpen } from "lucide-react"
import { useRouter } from "next/navigation"

interface FolderListProps {
  folders: Folder[]
}

export function FolderList({ folders }: FolderListProps) {
  const router = useRouter()
  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-2 lg:grid-cols-2">
      {folders.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No folders yet. Create one to get started.
        </p>
      ) : (
        folders.map((folder) => (
          <div
            key={folder.id}
            className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-accent bg-secondary p-4 transition-colors"
            onClick={() => router.push(`/folders/${folder.id}`)}
          >
            <div className="flex items-center gap-3">
              <FolderOpen className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-foreground">{folder.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(folder.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <form action={deleteFolder}>
              <input type="hidden" name="id" value={folder.id} />

              <button
                onClick={(e) => e.stopPropagation()}
                type="submit"
                className="hover:text-destructive-foreground rounded p-2 transition-colors hover:bg-destructive"
                title="Delete folder"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </form>
          </div>
        ))
      )}
    </div>
  )
}
