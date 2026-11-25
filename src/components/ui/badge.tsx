import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium leading-5', {
  variants: {
    variant: {
      default: 'border-transparent bg-accent text-accent-foreground',
      outline: 'bg-transparent text-muted-foreground',
      muted: 'border-transparent bg-muted text-muted-foreground',
      success: 'border-transparent bg-success/10 text-success',
      warning: 'border-transparent bg-warning/10 text-warning',
      destructive: 'border-transparent bg-destructive/10 text-destructive',
    },
  },
  defaultVariants: { variant: 'default' },
})
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
export const Badge = ({ className, variant, ...p }: BadgeProps) => <span className={cn(badgeVariants({ variant }), className)} {...p} />
