import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Soul } from './Soul'
import { HpBar } from './HpBar'
import { profile } from '@/data/portfolio'
import { sfx } from '@/lib/sound'

const ITEMS = [
  { to: '/', label: 'Home', icon: '✦' },
  { to: '/work', label: 'Work', icon: '◆' },
  { to: '/skills', label: 'Skills', icon: '✚' },
  { to: '/fun-facts', label: 'Facts', icon: '✿' },
] as const

/**
 * Bottom "battle menu" navigation. Left/Right arrow keys move the SOUL
 * between buttons; Z or Enter selects, just like the game.
 */
export function BattleNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const refs = useRef<Array<HTMLAnchorElement | null>>([])
  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((i) => (i.to === '/' ? pathname === '/' : pathname.startsWith(i.to))),
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable="true"]')) return
      const focusedIdx = refs.current.findIndex((r) => r === document.activeElement)
      const current = focusedIdx >= 0 ? focusedIdx : activeIndex
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next =
          (current + (e.key === 'ArrowRight' ? 1 : -1) + ITEMS.length) % ITEMS.length
        sfx.move()
        refs.current[next]?.focus()
      } else if ((e.key === 'z' || e.key === 'Z') && !e.metaKey && !e.ctrlKey) {
        sfx.select()
        navigate({ to: ITEMS[current].to })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, navigate])

  return (
    <nav
      aria-label="Main"
      className="sticky bottom-0 z-40 border-t-2 border-white/10 bg-black/95 backdrop-blur"
    >
      <div className="mx-auto max-w-5xl px-3 pb-3 pt-2 sm:px-6">
        <div className="mb-2 flex items-center gap-3 font-pixel text-[0.6rem] sm:gap-5 sm:text-xs">
          <span>{profile.name}</span>
          <span>LV {profile.lv}</span>
          <span className="flex items-center gap-2">
            <span className="text-[0.5rem] sm:text-[0.6rem]">HP</span>
            <HpBar value={profile.hp} max={profile.maxHp} className="h-4 w-14 sm:w-24" />
            <span>
              {profile.hp} / {profile.maxHp}
            </span>
          </span>
          <span className="ml-auto hidden text-[0.5rem] text-ut-gray md:inline">
            ← → MOVE · Z SELECT
          </span>
        </div>
        <ul className="grid grid-cols-4 gap-2 sm:gap-4">
          {ITEMS.map((item, i) => {
            const active = i === activeIndex
            return (
              <li key={item.to}>
                <Link
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  to={item.to}
                  onClick={() => sfx.select()}
                  data-active={active}
                  aria-current={active ? 'page' : undefined}
                  className="ut-button group h-12 w-full text-[0.55rem] focus-visible:border-ut-yellow focus-visible:text-ut-yellow focus-visible:outline-none sm:h-14 sm:text-sm"
                >
                  {active ? (
                    <Soul className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <span aria-hidden="true" className="group-hover:hidden group-focus-visible:hidden">
                      {item.icon}
                    </span>
                  )}
                  {!active && (
                    <Soul className="hidden h-3 w-3 group-hover:inline-block group-focus-visible:inline-block sm:h-4 sm:w-4" />
                  )}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
