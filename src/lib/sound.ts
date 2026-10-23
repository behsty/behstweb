import { useSyncExternalStore } from 'react'

// Tiny chiptune-style sound effects generated with WebAudio, so no audio
// files are shipped. Sound is off until the visitor turns it on.

const STORAGE_KEY = 'ut-sound'
let enabled = true
let ctx: AudioContext | null = null
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  enabled = window.localStorage.getItem(STORAGE_KEY) !== 'off'
}

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  return ctx
}

function tone(freq: number, duration: number, volume = 0.04) {
  if (!enabled) return
  const audio = getCtx()
  if (!audio) return
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'square'
  osc.frequency.value = freq
  gain.gain.value = volume
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + duration)
}

export const sfx = {
  blip: () => tone(220 + Math.random() * 30, 0.04, 0.025),
  move: () => tone(660, 0.05),
  select: () => {
    tone(880, 0.06)
    setTimeout(() => tone(1320, 0.08), 60)
  },
  save: () => {
    tone(523, 0.08)
    setTimeout(() => tone(784, 0.08), 90)
    setTimeout(() => tone(1046, 0.14), 180)
  },
}

export function setSoundEnabled(value: boolean) {
  enabled = value
  window.localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off')
  if (value) getCtx()?.resume()
  listeners.forEach((l) => l())
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => enabled,
    () => false,
  )
}
