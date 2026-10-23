import { createFileRoute } from '@tanstack/react-router'
import { DialogueBox } from '@/components/DialogueBox'
import { HpBar } from '@/components/HpBar'
import { PageTitle } from '@/components/PageTitle'
import { SaveStar, Soul } from '@/components/Soul'
import { plans, profile, skillGroups } from '@/data/portfolio'
import type { Plan } from '@/data/portfolio'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/skills')({
  head: () => ({ meta: [{ title: 'My skills and plans' }] }),
  component: Skills,
})

const GROUP_COLOR: Record<string, string> = {
  ATTACK: 'text-ut-orange',
  DEFENSE: 'text-ut-blue',
  MAGIC: 'text-ut-purple',
}

const STATUS: Record<Plan['status'], { label: string; className: string }> = {
  done: { label: 'SAVED', className: 'text-ut-yellow' },
  active: { label: 'IN PROGRESS', className: 'text-ut-green' },
  locked: { label: 'LOCKED', className: 'text-ut-gray' },
}

function Skills() {
  const totalExp = skillGroups.flatMap((g) => g.skills).reduce((sum, s) => sum + s.level, 0)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
      <PageTitle kicker="STAT">* My skills and plans</PageTitle>

      <DialogueBox
        lines={[
          `* You check ${profile.name}'s stats.`,
          `* Total EXP: ${totalExp}. Next LV: whenever the next bug is squashed.`,
        ]}
      />

      {/* Stat sheet */}
      <section className="mt-10" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Skills
        </h2>
        <div className="ut-box p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap gap-x-10 gap-y-2 font-pixel text-xs sm:text-sm">
            <span>"{profile.name}"</span>
            <span>LV {profile.lv}</span>
            <span>
              HP {profile.hp} / {profile.maxHp}
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3
                  className={cn(
                    'mb-4 font-pixel text-[0.65rem] tracking-widest',
                    GROUP_COLOR[group.label] ?? 'text-white',
                  )}
                >
                  {group.label}
                </h3>
                <ul className="space-y-4">
                  {group.skills.map((skill) => (
                    <li key={skill.name}>
                      <div className="flex items-baseline justify-between gap-2 text-2xl">
                        <span>{skill.name}</span>
                        <span className="font-pixel text-[0.55rem] text-white/70">
                          {skill.level}/100
                        </span>
                      </div>
                      <HpBar value={skill.level} className="mt-1 h-4" />
                      <p className="mt-1 text-lg text-white/60">* {skill.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quest log */}
      <section className="mt-14" aria-labelledby="plans-heading">
        <h2
          id="plans-heading"
          className="mb-2 font-pixel text-sm leading-relaxed text-ut-yellow sm:text-base"
        >
          QUEST LOG
        </h2>
        <p className="mb-6 text-2xl text-white/75">
          * The road ahead is long. Knowing that fills you with DETERMINATION.
        </p>
        <ol className="relative space-y-4 border-l-4 border-dashed border-white/25 pl-6 sm:pl-8">
          {plans.map((plan) => {
            const status = STATUS[plan.status]
            return (
              <li key={plan.quest} className="relative">
                <span className="absolute -left-[2.1rem] top-4 sm:-left-[2.6rem]">
                  {plan.status === 'done' ? (
                    <SaveStar className="h-5 w-5" />
                  ) : (
                    <Soul
                      className="h-4 w-4"
                      color={plan.status === 'active' ? 'var(--color-ut-red)' : '#555'}
                    />
                  )}
                </span>
                <div
                  className={cn(
                    'ut-box flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6',
                    plan.status === 'locked' && 'border-white/40',
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        'font-pixel text-[0.65rem] leading-relaxed sm:text-xs',
                        plan.status === 'locked' && 'text-white/60',
                      )}
                    >
                      {plan.quest}
                    </p>
                    <p
                      className={cn(
                        'mt-1 text-2xl',
                        plan.status === 'locked' ? 'text-white/50' : 'text-white/85',
                      )}
                    >
                      {plan.detail}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 font-pixel text-[0.55rem]',
                      status.className,
                    )}
                  >
                    [{status.label}]
                  </span>
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
