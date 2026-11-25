import { cn } from '@/lib/utils'

/** Barre de progression accessible. `value` entre 0 et 1. */
export function Progress({ value, label, className, barClassName }: { value: number; label: string; className?: string; barClassName?: string }) {
  const v = Math.max(0, Math.min(1, value || 0))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
    >
      <div className={cn('h-full rounded-full bg-primary transition-[width] duration-300', barClassName)} style={{ width: `${v * 100}%` }} />
    </div>
  )
}
