import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { DialogueBox } from '@/components/DialogueBox'
import { SaveStar, Soul } from '@/components/Soul'
import { profile } from '@/data/portfolio'
import { sfx } from '@/lib/sound'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

type Act = 'check' | 'talk' | 'hire' | 'spare'

const ACTS: Array<{ id: Act; label: string; lines: Array<string> }> = [
  { id: 'check', label: 'Check', lines: [profile.check] },
  {
    id: 'talk',
    label: 'Talk',
    lines: [
      `* You say hello to ${profile.name}.`,
      `* ${profile.name} says hello back and starts talking about side projects.`,
      '* ...For a while.',
      '* She seems happy to have a visitor.',
    ],
  },
  {
    id: 'hire',
    label: 'Hire',
    lines: [
      `* You offer ${profile.name} an exciting opportunity.`,
      `* ${profile.name}'s eyes light up. She's open to new quests!`,
    ],
  },
  {
    id: 'spare',
    label: 'Spare',
    lines: [`* You spared ${profile.name}.`, '* You won! You earned 0 EXP and a new friend.'],
  },
]

const SAVE_POINTS = [
  {
    to: '/work',
    title: 'Check out my work!',
    text: '* (A collection of projects. They glimmer with effort.)',
  },
  {
    to: '/skills',
    title: 'My skills and plans',
    text: '* (Your stats, and the long road ahead.)',
  },
  {
    to: '/fun-facts',
    title: 'Fun Facts',
    text: '* (I usually can\'t think of any at icebreakers.)',
  },
] as const

function Home() {
  const [act, setAct] = useState<Act | null>(null)
  const current = ACTS.find((a) => a.id === act)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
      {/* Encounter */}
      <section className="flex flex-col items-center text-center">
        <p className="mb-6 font-pixel text-[0.6rem] tracking-[0.3em] text-ut-gray sm:text-xs">
          A PORTFOLIO APPEARS
        </p>
        <div className="ut-float mb-8">
          <Soul className="h-16 w-16 sm:h-20 sm:w-20" />
        </div>
        <h1 className="font-pixel text-4xl leading-tight sm:text-6xl">{profile.name}</h1>
        <p className="mt-4 font-pixel text-xs text-ut-orange sm:text-sm">{profile.title}</p>
        <p className="mt-3 text-xl text-ut-gray">{profile.location}</p>
      </section>

      <section className="mt-12" aria-label="Encounter">
        <DialogueBox
          lines={current ? current.lines : profile.intro}
          footer={
            act === 'hire' ? (
              <a
                href={`mailto:${profile.email}`}
                className="ut-button px-4 py-3 text-[0.65rem]"
                onClick={() => sfx.select()}
              >
                <Soul className="h-3 w-3" /> Send an email
              </a>
            ) : act === 'spare' ? (
              <Link to="/work" className="ut-button px-4 py-3 text-[0.65rem]">
                <Soul className="h-3 w-3" /> Continue to my work
              </Link>
            ) : null
          }
        />

        <div className="mt-5">
          <p className="mb-3 font-pixel text-[0.6rem] text-ut-gray">* ACT</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {ACTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onMouseEnter={() => sfx.move()}
                onClick={() => {
                  sfx.select()
                  setAct(a.id)
                }}
                className={cn(
                  'group flex items-center gap-3 py-1 text-left text-3xl hover:text-ut-yellow',
                  act === a.id && 'text-ut-yellow',
                )}
              >
                <Soul
                  className={cn(
                    'h-4 w-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                    act === a.id && 'opacity-100',
                  )}
                />
                * {a.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SAVE points to the other pages */}
      <section className="mt-16" aria-labelledby="save-heading">
        <h2 id="save-heading" className="mb-6 font-pixel text-xs text-ut-yellow sm:text-sm">
          SAVE POINTS
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {SAVE_POINTS.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              onClick={() => sfx.save()}
              className="ut-box group flex flex-col gap-4 p-5 transition-colors hover:border-ut-yellow focus-visible:border-ut-yellow"
            >
              <SaveStar className="ut-twinkle h-8 w-8" />
              <span className="font-pixel text-[0.7rem] leading-relaxed group-hover:text-ut-yellow sm:text-xs">
                * {p.title}
              </span>
              <span className="text-xl text-white/75">{p.text}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
