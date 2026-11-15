'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bricolage_Grotesque } from 'next/font/google'
import Plan from '../components/plan'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
})

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
        <Plan
          plans={[
            {
              name: 'Starter',
              blurb: 'For new artists',
              monthly: 0,
              yearly: 0,
              fee: '5% sales fee',
              features: ['List up to 10 artworks', 'Basic analytics'],
              cta: 'Get started',
              featured: false,
            },
            {
              name: 'Mid-tier',
              blurb: 'For premimum artists',
              monthly: 10,
              yearly: 120,
              fee: '5% sales fee',
              features: ['List up to 10 artworks', 'Basic analytics'],
              cta: 'Get started',
              featured: true,
            },
            {
              name: 'Pro',
              blurb: 'For established artists',
              monthly: 25,
              yearly: 240,
              fee: '5% sales fee',
              features: ['List up to 10 artworks', 'Advanced analytics'],
              cta: 'Get started',
              featured: false,
            },
          ]}
          yearly={yearly}
        />
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
