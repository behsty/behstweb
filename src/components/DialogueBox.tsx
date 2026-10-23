import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { sfx } from '@/lib/sound'

const CHAR_DELAY = 28

/**
 * Typewriter dialogue box. Pass several `lines` to page through them; the
 * visitor clicks the box (or presses Space) to finish a line or advance.
 */
export function DialogueBox({
  lines,
  className,
  portrait,
  footer,
  onDone,
}: {
  lines: Array<string>
  className?: string
  portrait?: ReactNode
  footer?: ReactNode
  onDone?: () => void
}) {
  const [page, setPage] = useState(0)
  const [shown, setShown] = useState(0)
  const key = lines.join('\u0000')

  // Restart when new text comes in.
  useEffect(() => {
    setPage(0)
    setShown(0)
  }, [key])

  const text = lines[page] ?? ''
  const complete = shown >= text.length
  const lastPage = page >= lines.length - 1

  useEffect(() => {
    if (complete) {
      if (lastPage) onDone?.()
      return
    }
    const ch = text[shown]
    // Pause a little on punctuation, like the game does.
    const delay = /[.,!?]/.test(ch) ? CHAR_DELAY * 5 : CHAR_DELAY
    const t = setTimeout(() => {
      if (ch.trim()) sfx.blip()
      setShown((s) => s + 1)
    }, delay)
    return () => clearTimeout(t)
  }, [shown, text, complete, lastPage])

  const advance = useCallback(() => {
    if (!complete) {
      setShown(text.length)
    } else if (!lastPage) {
      sfx.move()
      setPage((p) => p + 1)
      setShown(0)
    }
  }, [complete, lastPage, text.length])

  return (
    <div className={cn('ut-box relative', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={advance}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            advance()
          }
        }}
        className="select-none px-5 py-4 sm:px-7 sm:py-5"
      >
        <div className="flex gap-5">
          {portrait && <div className="hidden shrink-0 sm:block">{portrait}</div>}
          <div className="min-h-[5.5em] flex-1">
            {/* Full text kept for screen readers; the typed version is visual only. */}
            <p className="sr-only">{text}</p>
            <p
              aria-hidden="true"
              className={cn(
                'whitespace-pre-line text-2xl leading-snug sm:text-[1.7rem]',
                !complete && 'ut-caret',
              )}
            >
              {text.slice(0, shown)}
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-1.5 right-3 font-pixel text-[0.55rem] text-ut-gray">
          {complete && !lastPage ? '▼ NEXT' : !complete ? 'SKIP' : ''}
        </div>
      </div>
      {footer && complete && lastPage && (
        <div className="px-5 pb-5 sm:px-7">{footer}</div>
      )}
    </div>
  )
}
