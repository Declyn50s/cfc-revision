import type { Criterion } from '@/types'
import { SELF_SCALE } from '@/services/grading'
import { cn } from '@/lib/utils'

/** Auto-évaluation critère par critère (0 à 3 points), avec les critères et niveaux de qualité de la directive officielle. */
export function SelfEval({ criteres, values, onChange, idPrefix }: { criteres: Criterion[]; values: (number | undefined)[]; onChange: (v: (number | undefined)[]) => void; idPrefix: string }) {
  return (
    <div className="space-y-4">
      {criteres.map((c, i) => (
        <fieldset key={i} className="rounded-md border p-3">
          <legend className="px-1 text-sm font-medium leading-6">
            {c.titre ? <span className="font-semibold">{c.titre}. </span> : null}
            {c.texte}
          </legend>
          {c.plein && (
            <p className="mb-2 px-1 text-xs leading-5 text-muted-foreground">
              <span className="font-medium text-foreground">Pour 3 points :</span> {c.plein}
            </p>
          )}
          <div className="mt-1 grid gap-1.5 sm:grid-cols-4" role="radiogroup" aria-label={`Points pour le critère ${i + 1}`}>
            {SELF_SCALE.filter((s) => s.points <= c.points).map((s) => {
              const checked = values[i] === s.points
              return (
                <label
                  key={s.points}
                  htmlFor={`${idPrefix}-${i}-${s.points}`}
                  className={cn('flex cursor-pointer gap-2 rounded-md border px-2.5 py-2 text-xs leading-5', checked ? 'border-primary bg-accent text-accent-foreground' : 'hover:bg-muted')}
                >
                  <input
                    type="radio"
                    id={`${idPrefix}-${i}-${s.points}`}
                    name={`${idPrefix}-${i}`}
                    className="mt-0.5 accent-[hsl(var(--primary))]"
                    checked={checked}
                    onChange={() => {
                      const next = [...values]
                      next[i] = s.points
                      onChange(next)
                    }}
                  />
                  <span>
                    <span className="font-semibold">{s.points} pt{s.points > 1 ? 's' : ''}</span>
                    <span className="block text-muted-foreground">{s.label}</span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}

export const evalComplete = (values: (number | undefined)[], n: number) => values.length >= n && values.slice(0, n).every((v) => v !== undefined)
export const evalSum = (values: (number | undefined)[]) => values.reduce<number>((a, b) => a + (b ?? 0), 0)
