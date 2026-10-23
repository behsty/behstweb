import type { ReactNode } from 'react'

export function PageTitle({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <header className="mb-8">
      <p className="mb-3 font-pixel text-[0.6rem] tracking-widest text-ut-orange sm:text-xs">
        {kicker}
      </p>
      <h1 className="font-pixel text-xl leading-relaxed sm:text-3xl">{children}</h1>
    </header>
  )
}
