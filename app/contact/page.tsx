// app/contact/page.jsx
'use client'

import { useState } from 'react'
import { Bricolage_Grotesque } from 'next/font/google'
import { useUser } from '@clerk/nextjs'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
})

const topics = [
  'Selling my art',
  'Buying an artwork',
  'Studio or team plan',
  'Commission request',
  'Something else',
]

const channels = [
  {
    label: 'Email',
    value: 'hello@yourbrand.com',
    href: 'mailto:hello@yourbrand.com',
  },
  { label: 'Support hours', value: 'Sun-Thu, 10am-6pm (GMT+6)' },
  { label: 'Reply time', value: 'Within one business day' },
]

export default function ContactPage() {
  const { user } = useUser()
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [error, setError] = useState('')

  async function onSubmit(e: {
    preventDefault: () => void
    currentTarget: any
  }) {
    e.preventDefault()
    setError('')
    setStatus('sending')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok)
        throw new Error((await res.json()).error || 'Message not sent.')
      form.reset()
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Message not sent.')
      setStatus('idle')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-[#14142b]/20 px-3 py-2 focus:border-[#3b2bff] focus:outline-none'

  return (
    <main className="min-h-screen bg-[#eef0f7] px-4 py-16 text-[#14142b]">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-5">
        {/* Left: intro */}
        <div className="md:col-span-2">
          <h1
            className={`${display.className} text-4xl font-extrabold tracking-tight md:text-6xl`}
          >
            Talk to us
          </h1>
          <p className="mt-4 text-lg text-[#14142b]/70">
            Questions about plans, payouts or a custom studio setup? Send a
            message and a real person will reply.
          </p>

          <dl className="mt-8 space-y-5">
            {channels.map((c) => (
              <div key={c.label}>
                <dt className="text-sm text-[#14142b]/60">{c.label}</dt>
                <dd className="font-medium">
                  {c.href ? (
                    <a href={c.href} className="text-[#3b2bff] hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: form */}
        <div className="md:col-span-3">
          {status === 'sent' ? (
            <div role="status" className="rounded-2xl bg-white p-8 shadow-sm">
              <h2 className={`${display.className} text-2xl font-semibold`}>
                Message sent
              </h2>
              <p className="mt-2 text-[#14142b]/70">
                Thanks for reaching out. We'll reply to your email within one
                business day.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 rounded-full border border-[#14142b]/20 px-5 py-2 text-sm font-medium hover:bg-[#eef0f7]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="mb-1 block text-sm font-medium">Name</span>
                  <input
                    name="name"
                    required
                    maxLength={80}
                    defaultValue={user?.fullName ?? ''}
                    key={user?.id ?? 'guest-name'}
                    autoComplete="name"
                    className={inputClass}
                  />
                </label>
                <label>
                  <span className="mb-1 block text-sm font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={user?.primaryEmailAddress?.emailAddress ?? ''}
                    key={user?.id ?? 'guest-email'}
                    autoComplete="email"
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">
                  What is this about?
                </span>
                <select name="topic" className={`${inputClass} bg-white`}>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  minLength={10}
                  maxLength={2000}
                  className={inputClass}
                />
              </label>

              {/* Honeypot: hidden from people, bots tend to fill it */}
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="rounded-full bg-[#3b2bff] px-8 py-3 font-medium text-white transition hover:bg-[#2a1de0] disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
