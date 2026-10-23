import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DialogueBox } from '@/components/DialogueBox'
import { PageTitle } from '@/components/PageTitle'
import { Soul } from '@/components/Soul'
import { funFacts, profile } from '@/data/portfolio'
import { sfx } from '@/lib/sound'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/fun-facts')({
  head: () => ({ meta: [{ title: 'Fun Facts' }] }),
  component: FunFacts,
})

function FunFacts() {
  const [roll, setRoll] = useState<{ fun: number; index: number } | null>(null)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set())

  function rollFun() {
    sfx.select()
    setRoll((prev) => {
      let index = Math.floor(Math.random() * funFacts.length)
      if (prev && funFacts.length > 1 && index === prev.index) {
        index = (index + 1) % funFacts.length
      }
      return { fun: 1 + Math.floor(Math.random() * 100), index }
    })
  }

  function toggle(i: number) {
    sfx.move()
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const fact = roll ? funFacts[roll.index] : null
  const allRevealed = revealed.size === funFacts.length

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
      <PageTitle kicker="FUN">* Fun Facts</PageTitle>

      <section aria-label="Random fun fact">
        <DialogueBox
          lines={
            fact && roll
              ? [`* Your FUN value is ${roll.fun}.`, `* ${fact.title}.\n* ${fact.text}`]
              : [
                  `* There are ${funFacts.length} fun facts about ${profile.name} hidden here.`,
                  '* Roll your FUN value to find one... or uncover them all below.',
                ]
          }
        />
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" onClick={rollFun} className="ut-button px-5 py-4 text-xs">
            <Soul className="h-3 w-3" /> {roll ? 'Roll again' : 'Roll FUN value'}
          </button>
          {roll && (
            <span
              className={cn(
                'font-pixel text-[0.6rem]',
                roll.fun === 66 ? 'ut-shake text-ut-red' : 'text-ut-gray',
              )}
            >
              FUN = {roll.fun}
              {roll.fun === 66 && ' ...something feels strange.'}
            </span>
          )}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="facts-heading">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="facts-heading" className="font-pixel text-sm text-ut-yellow sm:text-base">
            ALL FACTS
          </h2>
          <span className="font-pixel text-[0.6rem] text-ut-gray">
            {revealed.size} / {funFacts.length} FOUND
          </span>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {funFacts.map((f, i) => {
            const open = revealed.has(i)
            return (
              <li key={f.title}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  className={cn(
                    'ut-box group flex h-full w-full flex-col gap-2 p-5 text-left transition-colors hover:border-ut-yellow',
                    open && 'border-ut-yellow',
                  )}
                >
                  <span className="flex items-center gap-3 font-pixel text-[0.65rem] leading-relaxed sm:text-xs">
                    <Soul
                      className="h-3 w-3"
                      color={open ? 'var(--color-ut-yellow)' : 'var(--color-ut-red)'}
                    />
                    {open ? f.title : `FACT #${String(i + 1).padStart(2, '0')}`}
                  </span>
                  <span className={cn('text-2xl', open ? 'text-white' : 'text-ut-gray')}>
                    {open ? `* ${f.text}` : '* (Click to check.)'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
        {allRevealed && (
          <p className="mt-8 text-center text-2xl text-ut-yellow">
            * You found every fun fact. You're filled with DETERMINATION.
          </p>
        )}
      </section>
    </div>
  )
}
