'use client'

import { createPortal } from 'react-dom'

import * as React from 'react'

import { cn } from '@/lib/utils'

type FullscreenModalProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  /** Click on backdrop closes modal (default true) */
  closeOnOverlayClick?: boolean
  /** Pressing ESC closes modal (default true) */
  enableEsc?: boolean
}

export function FullscreenModal({
  open,
  onOpenChange,
  children,
  className,
  closeOnOverlayClick = true,
  enableEsc = true,
}: FullscreenModalProps) {
  const [mounted, setMounted] = React.useState(false)
  const overlayRef = React.useRef<HTMLDivElement | null>(null)
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Body scroll lock and focus management
  React.useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    const handleKeyDown = (e: KeyboardEvent) => {
      if (enableEsc && e.key === 'Escape') {
        onOpenChange?.(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedRef.current?.focus()
    }
  }, [open, enableEsc, onOpenChange])

  const content = open ? (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50"
        onClick={(e) => {
          if (!closeOnOverlayClick) return
          if (e.target === overlayRef.current) {
            onOpenChange?.(false)
          }
        }}
      />
      <div
        className={cn(
          'bg-background absolute inset-0 h-full w-full',
          className
        )}
      >
        {children}
      </div>
    </div>
  ) : null

  if (!mounted) return null
  return createPortal(content, document.body)
}

export default FullscreenModal
