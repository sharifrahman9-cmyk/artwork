// components/Navbar.jsx
import Link from 'next/link'
import Image from 'next/image'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Your Brand logo"
            width={32}
            height={32}
            priority
          />
          <span className="text-lg font-semibold text-slate-900">
            Sundarbans
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-slate-900">
              About
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:text-slate-900">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-slate-900">
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth */}

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Sign in
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700">
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </header>
  )
}
