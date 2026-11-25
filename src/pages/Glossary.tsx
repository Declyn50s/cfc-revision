import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { COMP_BY_ID } from '@/data/referentiel'
import { GLOSSARY } from '@/data'
import { cn, norm } from '@/lib/utils'
import { useDocumentTitle } from '@/hooks/useApp'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { EmptyState, KindBadge, PageHeader } from '@/components/shared/bits'

const slug = (t: string) => 'g-' + norm(t).replace(/[^a-z0-9]+/g, '-')

export default function Glossary() {
  useDocumentTitle('Glossaire')
  const [params] = useSearchParams()
  const target = params.get('t')
  const [q, setQ] = useState('')
  const sorted = useMemo(() => [...GLOSSARY].sort((a, b) => a.terme.localeCompare(b.terme, 'fr')), [])
  const list = sorted.filter((g) => !q || norm(g.terme + ' ' + g.definition).includes(norm(q)))
  const letters = [...new Set(list.map((g) => norm(g.terme)[0].toUpperCase()))]

  useEffect(() => {
    if (target) document.getElementById(slug(target))?.scrollIntoView({ block: 'center' })
  }, [target])

  return (
    <>
      <PageHeader title="Glossaire" description={`${GLOSSARY.length} termes professionnels expliqués simplement, avec les compétences où ils servent.`} eyebrow={<KindBadge kind="pedagogique" />} />
      <div className="no-print relative mb-4 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden />
        <Input className="pl-9" aria-label="Chercher un terme" placeholder="Chercher un terme…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {!q && (
        <nav aria-label="Accès par lettre" className="no-print mb-6 flex flex-wrap gap-1">
          {letters.map((l) => (
            <a key={l} href={`#lettre-${l}`} onClick={(e) => { e.preventDefault(); document.getElementById(`lettre-${l}`)?.scrollIntoView({ behavior: 'smooth' }) }} className="flex size-8 items-center justify-center rounded-md border bg-card text-sm font-medium hover:bg-muted">
              {l}
            </a>
          ))}
        </nav>
      )}
      {list.length === 0 ? (
        <EmptyState icon={Search} title={`Aucun terme pour « ${q} »`} />
      ) : (
        letters.map((l) => (
          <section key={l} id={`lettre-${l}`} className="mb-6 scroll-mt-24" aria-label={`Lettre ${l}`}>
            <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{l}</h2>
            <dl className="divide-y rounded-lg border bg-card">
              {list
                .filter((g) => norm(g.terme)[0].toUpperCase() === l)
                .map((g) => (
                  <div key={g.terme} id={slug(g.terme)} className={cn('scroll-mt-24 px-4 py-3', target === g.terme && 'bg-accent/50')}>
                    <dt className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
                      {g.terme}
                      {g.comps.map((c) => (
                        <Link key={c} to={`/apprendre/${COMP_BY_ID[c].tp}/${c}`} title={COMP_BY_ID[c].titre}>
                          <Badge variant="muted" className="hover:bg-secondary">
                            {c}
                          </Badge>
                        </Link>
                      ))}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground">{g.definition}</dd>
                  </div>
                ))}
            </dl>
          </section>
        ))
      )}
    </>
  )
}
