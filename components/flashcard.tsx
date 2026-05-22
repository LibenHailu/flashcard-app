"use client"

import { useState } from "react"

interface FlashcardProps {
  front: string
  back: string
}

export function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full">
      <button
        type="button"
        className="h-80 w-full cursor-pointer perspective-[1000px]"
        onClick={() => setIsFlipped((prev) => !prev)}
        aria-label={isFlipped ? "Show question" : "Show answer"}
      >
        <div
          className="relative h-full w-full transition-transform duration-500 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute flex h-full w-full items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-sm"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-center text-2xl leading-relaxed font-light text-card-foreground md:text-3xl">
              {front}
            </p>
          </div>

          <div
            className="absolute flex h-full w-full items-center justify-center rounded-2xl border border-border bg-card p-8 shadow-sm"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-center text-2xl leading-relaxed font-light md:text-3xl">
              {back}
            </p>
          </div>
        </div>
      </button>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Click to flip
      </p>
    </div>
  )
}
