import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('print-card rounded-lg border bg-card text-card-foreground shadow-card', className)} {...p} />
)
export const CardHeader = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('p-5 pb-3', className)} {...p} />
export const CardTitle = ({ className, as: As = 'h2', ...p }: React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h2' | 'h3' | 'h4' }) => (
  <As className={cn('text-base font-semibold leading-snug', className)} {...p} />
)
export const CardDescription = ({ className, ...p }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('mt-1 text-sm text-muted-foreground', className)} {...p} />
)
export const CardContent = ({ className, ...p }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('p-5 pt-2', className)} {...p} />
