import { setSoundEnabled, useSoundEnabled } from '@/lib/sound'
import { Soul } from './Soul'

export function SiteFooter() {
  const sound = useSoundEnabled()
  return (
    <footer className="mx-auto max-w-5xl px-4 pb-10 pt-16 sm:px-6">
      <div className="border-t-2 border-dashed border-white/25 pt-8 text-center">
        <p className="mb-3 flex items-center justify-center gap-2 font-pixel text-[0.6rem] text-ut-yellow sm:text-xs">
          <Soul className="h-3 w-3" /> CREDITS <Soul className="h-3 w-3" />
        </p>
        <p className="mx-auto max-w-2xl text-xl text-white/85">
          This portfolio is a fan-made tribute to{' '}
          <a
            href="https://undertale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ut-yellow underline decoration-dotted underline-offset-4 hover:text-white"
          >
            UNDERTALE
          </a>
          , created by <strong className="text-white">Toby Fox</strong>. UNDERTALE, its
          characters, music, and visual style belong to Toby Fox. This site is not
          affiliated with or endorsed by him. If you haven't played it yet,{' '}
          <a
            href="https://undertale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ut-yellow underline decoration-dotted underline-offset-4 hover:text-white"
          >
            go support the creator
          </a>
          !
        </p>
        <p className="mt-3 text-lg text-ut-gray">
          Fonts: Press Start 2P by CodeMan38 · VT323 by Peter Hull (via Google Fonts)
        </p>
        <button
          type="button"
          onClick={() => setSoundEnabled(!sound)}
          aria-pressed={sound}
          className="mt-5 font-pixel text-[0.6rem] text-ut-gray hover:text-ut-yellow"
        >
          * SOUND: {sound ? 'ON' : 'OFF'}
        </button>
      </div>
    </footer>
  )
}
