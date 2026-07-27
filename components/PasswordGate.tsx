'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

import { enterSite, type GateState } from '@/app/actions/auth'

const initialState: GateState = { error: null }

function EnterButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-xl bg-accent py-3.5 text-lg font-semibold text-white transition-colors hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? 'Opening…' : 'Enter'}
    </button>
  )
}

export function PasswordGate() {
  const [state, formAction] = useActionState(enterSite, initialState)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.error) {
      inputRef.current?.select()
      inputRef.current?.focus()
    }
  }, [state.error])

  return (
    <form action={formAction} className="w-full max-w-sm">
      <div
        key={state.error ?? 'clean'}
        className={`card p-7 ${state.error ? 'animate-[shake_420ms_ease-in-out]' : ''}`}
      >
        <label htmlFor="password" className="mb-2 block text-base font-medium text-dim">
          Passphrase
        </label>
        <input
          ref={inputRef}
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          aria-describedby={state.error ? 'gate-error' : undefined}
          className="w-full rounded-xl border border-line bg-[var(--panel-2)] px-4 py-3 text-lg text-ink outline-none transition-colors placeholder:text-dim focus:border-[var(--line-2)]"
          placeholder="Enter your passphrase"
        />
        <EnterButton />
      </div>

      <p id="gate-error" role="status" aria-live="polite" className="mt-4 min-h-[1.5rem] text-center text-base text-[#ff9b8a]">
        {state.error}
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(2px); }
        }
      `}</style>
    </form>
  )
}
