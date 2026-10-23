import { cn } from '@/lib/utils'

// Pixel-art heart drawn on a 9x8 grid.
const HEART = [
  '.XX...XX.',
  'XXXX.XXXX',
  'XXXXXXXXX',
  'XXXXXXXXX',
  '.XXXXXXX.',
  '..XXXXX..',
  '...XXX...',
  '....X....',
]

export function Soul({
  className,
  color = 'var(--color-ut-red)',
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 9 8"
      className={cn('inline-block h-4 w-4 shrink-0', className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {HEART.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === 'X' ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
          ) : null,
        ),
      )}
    </svg>
  )
}

// Yellow four-point SAVE star.
export function SaveStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 9"
      className={cn('inline-block h-6 w-6 shrink-0', className)}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path
        d="M4 0h1v2h1v1h1v1h2v1H7v1H6v1H5v2H4V7H3V6H2V5H0V4h2V3h1V2h1z"
        fill="var(--color-ut-yellow)"
      />
    </svg>
  )
}
