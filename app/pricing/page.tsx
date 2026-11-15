'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bricolage_Grotesque } from 'next/font/google'
import { Show, SignUpButton } from '@clerk/nextjs'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
})

const plans = [
  {
    name: 'Starter',
    blurb: 'For artists trying out the marketplace.',
    monthly: 0,
    yearly: 0,
    fee: '15% sales fee',
    features: [
      'Up to 10 artworks',
      'Standard storefront page',
      'Email support',
    ],
    cta: 'Start for free',
  },
  {
    name: 'Pro',
    blurb: 'For artists selling regularly.',
    monthly: 12,
    yearly: 9,
    fee: '8% sales fee',
    features: [
      'Unlimited artworks',
      'Custom storefront URL',
      'Commission requests',
      'Sales analytics',
      'Priority support',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Studio',
    blurb: 'For teams and collectives.',
    monthly: 39,
    yearly: 32,
    fee: '4% sales fee',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Bulk upload',
      'Licensing tools',
      'Dedicated account manager',
    ],
    cta: 'Start a studio',
  },
]

const faqs = [
  {
    q: 'Can I change plans later?',
    a: 'Yes. Upgrade or downgrade at any time. Changes apply from your next billing date.',
  },
  {
    q: 'When do I get paid?',
    a: 'Earnings are paid out every week once your balance reaches $20, minus the sales fee for your plan.',
  },
  {
    q: 'Do I keep the rights to my artwork?',
    a: 'Always. You only grant buyers the license you choose when you list a piece.',
  },
  {
    q: 'What happens if I go over 10 artworks on Starter?',
    a: "Your existing work stays live. You'll need to upgrade to Pro to publish more.",
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(true)

  return (
    <main className="min-h-screen bg-[#eef0f7] px-4 py-16 text-[#14142b]">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h1
            className={`${display.className} text-4xl font-extrabold tracking-tight md:text-6xl`}
          >
            Pick the plan that fits how you sell
          </h1>
          <p className="mt-4 text-lg text-[#14142b]/70">
            Buyers always browse for free. Artists pay only for the tools they
            use.
          </p>

          {/* Billing toggle */}
          <div
            role="group"
            aria-label="Billing period"
            className="mt-8 inline-flex rounded-full bg-white p-1 shadow-sm"
          >
            <button
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                !yearly ? 'bg-[#14142b] text-white' : 'text-[#14142b]/70'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                yearly ? 'bg-[#14142b] text-white' : 'text-[#14142b]/70'
              }`}
            >
              Yearly (save 25%)
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`flex flex-col rounded-2xl p-8 ${
                p.featured
                  ? 'bg-[#3b2bff] text-white shadow-xl md:-translate-y-3'
                  : 'bg-white shadow-sm'
              }`}
            >
              <h2 className={`${display.className} text-2xl font-semibold`}>
                {p.name}
              </h2>
              <p
                className={`mt-1 text-sm ${p.featured ? 'text-white/80' : 'text-[#14142b]/60'}`}
              >
                {p.blurb}
              </p>

              <p className="mt-6 flex items-baseline gap-1">
                <span
                  className={`${display.className} text-5xl font-extrabold`}
                >
                  ${yearly ? p.yearly : p.monthly}
                </span>
                <span
                  className={p.featured ? 'text-white/80' : 'text-[#14142b]/60'}
                >
                  /month
                </span>
              </p>
              <p
                className={`mt-1 text-sm ${p.featured ? 'text-white/80' : 'text-[#14142b]/60'}`}
              >
                {p.fee}
                {yearly && p.yearly > 0 ? ', billed yearly' : ''}
              </p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden="true">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Show when="signed-out">
                  <SignUpButton mode="modal">
                    <button
                      className={`w-full rounded-full px-6 py-3 font-medium transition ${
                        p.featured
                          ? 'bg-white text-[#3b2bff] hover:bg-[#eef0f7]'
                          : 'bg-[#14142b] text-white hover:bg-[#2a2a4a]'
                      }`}
                    >
                      {p.cta}
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/upload"
                    className={`block w-full rounded-full px-6 py-3 text-center font-medium transition ${
                      p.featured
                        ? 'bg-white text-[#3b2bff] hover:bg-[#eef0f7]'
                        : 'bg-[#14142b] text-white hover:bg-[#2a2a4a]'
                    }`}
                  >
                    {p.cta}
                  </Link>
                </Show>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mx-auto mt-24 max-w-3xl">
          <h2
            className={`${display.className} text-3xl font-semibold md:text-4xl`}
          >
            Questions about pricing
          </h2>
          <div className="mt-8 divide-y divide-[#14142b]/10 rounded-2xl bg-white shadow-sm">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium focus-visible:outline focus-visible:outline-[#3b2bff]">
                  {f.q}
                  <span
                    className="ml-4 transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[#14142b]/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <p className="mt-16 text-center text-[#14142b]/70">
          Need something custom for a large team?{' '}
          <Link
            href="/contact"
            className="font-medium text-[#3b2bff] hover:underline"
          >
            Talk to us
          </Link>
        </p>
      </div>
    </main>
  )
}
