import { useCallback, useEffect, useRef, useState } from 'react'

/** Compte à rebours basé sur l'horloge système (ne dérive pas si l'onglet passe en arrière-plan). */
export function useCountdown(totalSec: number, opts: { autoStart?: boolean; onEnd?: () => void } = {}) {
  const [remaining, setRemaining] = useState(totalSec)
  const [running, setRunning] = useState(!!opts.autoStart)
  const endAt = useRef<number | null>(opts.autoStart ? Date.now() + totalSec * 1000 : null)
  const onEnd = useRef(opts.onEnd)
  onEnd.current = opts.onEnd

  useEffect(() => {
    if (!running) return
    const tick = () => {
      if (endAt.current === null) return
      const left = Math.max(0, (endAt.current - Date.now()) / 1000)
      setRemaining(left)
      if (left <= 0) {
        setRunning(false)
        endAt.current = null
        onEnd.current?.()
      }
    }
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [running])

  const start = useCallback(() => {
    setRemaining((r) => {
      endAt.current = Date.now() + r * 1000
      return r
    })
    setRunning(true)
  }, [])
  const pause = useCallback(() => {
    if (endAt.current !== null) setRemaining(Math.max(0, (endAt.current - Date.now()) / 1000))
    endAt.current = null
    setRunning(false)
  }, [])
  const reset = useCallback(
    (sec = totalSec, autoStart = false) => {
      setRemaining(sec)
      endAt.current = autoStart ? Date.now() + sec * 1000 : null
      setRunning(autoStart)
    },
    [totalSec],
  )
  return { remaining, running, start, pause, reset, elapsed: totalSec - remaining }
}

/** Chronomètre croissant. */
export function useStopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const startedAt = useRef<number | null>(null)
  const base = useRef(0)
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      if (startedAt.current !== null) setElapsed(base.current + (Date.now() - startedAt.current) / 1000)
    }, 250)
    return () => window.clearInterval(id)
  }, [running])
  const start = useCallback(() => {
    startedAt.current = Date.now()
    setRunning(true)
  }, [])
  const stop = useCallback(() => {
    if (startedAt.current !== null) base.current += (Date.now() - startedAt.current) / 1000
    startedAt.current = null
    setElapsed(base.current)
    setRunning(false)
  }, [])
  const reset = useCallback(() => {
    base.current = 0
    startedAt.current = null
    setElapsed(0)
    setRunning(false)
  }, [])
  return { elapsed, running, start, stop, reset }
}
