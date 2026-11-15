import { Show, SignUpButton } from '@clerk/nextjs'
import { Bricolage_Grotesque } from 'next/font/google'
import Link from 'next/link'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600'],
})

export interface PlanItem {
  name: string
  blurb: string
  monthly: number
  yearly: number
  fee: string
  features: string[]
  cta: string
  href?: string
  featured?: boolean
}

interface PlanProps {
  plan: PlanItem
  yearly?: boolean
}

export function PlanCard({ plan, yearly = false }: PlanProps) {
  const price = yearly ? plan.yearly : plan.monthly
  const buttonStyles = `w-full rounded-full px-6 py-3 font-medium transition text-center block ${
    plan.featured
      ? 'bg-white text-[#3b2bff] hover:bg-[#eef0f7]'
      : 'bg-[#14142b] text-white hover:bg-[#2a2a4a]'
  }`

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-6 ${
        plan.featured
          ? 'bg-[#3b2bff] text-white shadow-xl md:-translate-y-2'
          : 'bg-white shadow-sm'
      }`}
    >
      <div>
        <h2 className={`${display.className} text-xl font-semibold`}>
          {plan.name}
        </h2>
        <p
          className={`mt-1 text-xs ${
            plan.featured ? 'text-white/80' : 'text-[#14142b]/60'
          }`}
        >
          {plan.blurb}
        </p>

        <div className="mt-4 flex items-baseline gap-1">
          <span className={`${display.className} text-3xl font-extrabold`}>
            ${price}
          </span>
          <span
            className={`text-xs ${plan.featured ? 'text-white/80' : 'text-[#14142b]/60'}`}
          >
            /month
          </span>
        </div>
        <p
          className={`mt-0.5 text-xs ${
            plan.featured ? 'text-white/70' : 'text-[#14142b]/50'
          }`}
        >
          {plan.fee}
          {yearly && plan.yearly > 0 ? ' • billed yearly' : ''}
        </p>

        <ul className="mt-5 space-y-2 text-xs">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Show when="signed-out">
          <SignUpButton mode="modal">
            <button className={buttonStyles}>{plan.cta}</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <Link href={plan.href ?? '/upload'} className={buttonStyles}>
            {plan.cta}
          </Link>
        </Show>
      </div>
    </div>
  )
}

interface PricingGridProps {
  plans: PlanItem[]
  yearly?: boolean
}

export default function PricingGrid({
  plans,
  yearly = false,
}: PricingGridProps) {
  return (
    <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard key={plan.name} plan={plan} yearly={yearly} />
      ))}
    </div>
  )
}
