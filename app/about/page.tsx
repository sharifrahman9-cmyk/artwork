'use client'
import Link from 'next/link'
import { Bricolage_Grotesque } from 'next/font/google'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
})

type Artist = {
  name: string
  role: string
  location: string
  bio: string
  bg: string
  image?: string
}

const artists: Artist[] = [
  {
    name: 'Nila Rahman',
    role: 'Illustrator',
    location: 'Dhaka',
    bio: 'Paints dreamy, colour-soaked scenes inspired by monsoon skies.',
    bg: 'linear-gradient(160deg,#3b2bff,#ff6fb1 60%,#ffd1a1)',
    // image: "/artists/nila.jpg",
  },
  {
    name: 'Arif Hossain',
    role: '3D Artist',
    location: 'Chattogram',
    bio: 'Builds quiet, glitchy digital gardens out of light and geometry.',
    bg: 'linear-gradient(120deg,#0f2b46,#1fa38a 70%,#d8f36a)',
  },
  {
    name: 'Sadia Islam',
    role: 'Concept Artist',
    location: 'Sylhet',
    bio: 'Designs night markets and cities that only exist after dark.',
    bg: 'linear-gradient(200deg,#14142b,#6a2cff 55%,#ff8a5b)',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Pixel Artist',
    location: 'Mymensingh',
    bio: 'Turns everyday village scenes into tiny, detailed pixel worlds.',
    bg: 'linear-gradient(180deg,#ffd1a1,#ff6f6f 50%,#7a1fa2)',
  },
]

function Avatar({
  artist,
  size = 'h-40 w-40',
}: {
  artist: Artist
  size?: string
}) {
  const initials = artist.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  if (artist.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={artist.image}
        alt={`Portrait of ${artist.name}`}
        className={`${size} rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`Placeholder portrait of ${artist.name}`}
      className={`${size} flex items-center justify-center rounded-full text-4xl font-semibold text-white`}
      style={{ background: artist.bg }}
    >
      {initials}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="bg-[#eef0f7] text-[#14142b]">
      {/* Intro */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
        <h1
          className={`${display.className} leading-[1.05] font-extrabold tracking-tight md:text-7xl`}
        >
          A home for artists who work in pixels.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#14142b]/70">
          YourBrand started with a simple problem: talented digital artists had
          nowhere fair to sell their work. We built a marketplace where artists
          set their own prices, keep their rights, and get paid every week.
        </p>
      </section>

      {/* Story + numbers */}
      <section className="mx-auto grid max-w-4xl gap-10 px-4 pb-16 md:grid-cols-2">
        <div className="space-y-4 leading-relaxed text-[#14142b]/80">
          <h2
            className={`${display.className} text-3xl font-semibold text-[#14142b]`}
          >
            Our story
          </h2>
          <p>
            We began in 2024 with a handful of friends sharing their work in a
            group chat. Buyers kept asking where they could purchase it, so we
            made a place to do exactly that.
          </p>
          <p>
            Today the gallery holds thousands of original pieces, from
            illustrations to 3D renders, all made by independent artists.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-4">
          {[
            ['1,200+', 'Artworks listed'],
            ['340', 'Independent artists'],
            ['42', 'Countries reached'],
            ['Weekly', 'Artist payouts'],
          ].map(([num, label]) => (
            <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
              <dt className="text-sm text-[#14142b]/60">{label}</dt>
              <dd
                className={`${display.className} mt-1 text-3xl font-extrabold`}
              >
                {num}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Artists */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2
          className={`${display.className} text-3xl font-semibold md:text-4xl`}
        >
          Meet some of our artists
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((a) => (
            <article
              key={a.name}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <Avatar artist={a} />
              <h3 className="mt-5 text-lg font-semibold">{a.name}</h3>
              <p className="text-sm text-[#14142b]/60">
                {a.role}, {a.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#14142b]/80">
                {a.bio}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#14142b] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
          <div>
            <h2
              className={`${display.className} text-3xl font-semibold md:text-4xl`}
            >
              Want to join them?
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Open a free store and list your first artwork in a few minutes.
            </p>
          </div>
          <Link
            href="/pricing"
            className="rounded-full bg-white px-6 py-3 font-medium text-[#14142b] hover:bg-[#eef0f7]"
          >
            See pricing
          </Link>
        </div>
      </section>
    </main>
  )
}
