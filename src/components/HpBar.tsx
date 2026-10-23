import { cn } from '@/lib/utils'

export function HpBar({
  value,
  max = 100,
  className,
}: {
  value: number
  max?: number
  className?: string
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className={cn('relative h-5 bg-ut-hp-red', className)}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className="absolute inset-y-0 left-0 bg-ut-yellow" style={{ width: `${pct}%` }} />
    </div>
  )
}
