import Link from 'next/link'
import Image from 'next/image'
import { Bricolage_Grotesque } from 'next/font/google'
import { Show, SignUpButton } from '@clerk/nextjs'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600'],
})

// ছবি যোগ করতে gradient এর বদলে image: "/art/your-file.jpg" ব্যবহার করুন
const works = [
  {
    title: 'Tidal Bloom',
    artist: 'Nila Rahman',
    price: '$120',
    tall: true,
    bg: 'linear-gradient(160deg,#3b2bff,#ff6fb1 60%,#ffd1a1)',
    image: '/artists/p1.jpeg',
  },
  {
    title: 'Static Garden',
    artist: 'Arif Hossain',
    price: '$80',
    tall: false,
    bg: 'linear-gradient(120deg,#0f2b46,#1fa38a 70%,#d8f36a)',
    image: '/artists/p2.jpeg',
  },
  {
    title: 'Night Market 04',
    artist: 'Sadia Islam',
    price: '$150',
    tall: false,
    bg: 'linear-gradient(200deg,#14142b,#6a2cff 55%,#ff8a5b)',
    image: '/artists/p3.jpeg',
  },
  {
    title: 'Paper Sun',
    artist: 'Tanvir Ahmed',
    price: '$95',
    tall: true,
    bg: 'linear-gradient(180deg,#ffd1a1,#ff6f6f 50%,#7a1fa2)',
    image: '/artists/p4.jpeg',
  },
  {
    title: 'Low Tide Signal',
    artist: 'Mim Akter',
    price: '$110',
    tall: false,
    bg: 'linear-gradient(140deg,#cfe3ff,#6aa6ff 50%,#1b2a6b)',
    image: '/artists/p7.jpeg',
  },
  {
    title: 'Soft Machine',
    artist: 'Rafi Khan',
    price: '$70',
    tall: false,
    bg: 'linear-gradient(130deg,#f4e1ff,#c08bff 50%,#3b2bff)',
    image: '/artists/p10.jpeg',
  },
]

export default function Home() {
  return (
    <main className="bg-[#eef0f7] text-[#14142b]">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1
            className={`${display.className} lg:*text-6xl text-2xl leading-[1.05] font-extrabold tracking-tight md:text-5xl`}
          >
            Art that was never printed, only painted in HandMade Water Colors.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[#14142b]/70">
            Browse original digital artworks from independent artists. Buy a
            piece, download it in full resolution, and keep it forever.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gallery"
              className="rounded-full bg-[#6456ff] px-6 py-3 font-medium text-white transition hover:bg-[#2a1de0] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#3b2bff]"
            >
              Browse the gallery
            </Link>
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="rounded-full border border-[#14142b]/20 px-6 py-3 font-medium hover:bg-white">
                  Sell your art
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/upload"
                className="rounded-full border border-[#14142b]/20 px-6 py-3 font-medium hover:bg-white"
              >
                Upload artwork
              </Link>
            </Show>
          </div>
        </div>

        {/* Overlapping artwork collage */}
        <div className="relative mx-auto h-105 w-full max-w-md md:h-130">
          <div
            className="absolute top-6 left-0 h-64 w-48 -rotate-6 overflow-hidden rounded-2xl shadow-xl md:h-80 md:w-60"
            style={{ background: works[0].bg }}
          >
            {works[0].image && (
              <Image
                src={works[0].image}
                alt={works[0].title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div
            className="absolute top-0 right-0 h-56 w-44 rotate-3 overflow-hidden rounded-2xl shadow-xl md:h-72 md:w-56"
            style={{ background: works[2].bg }}
          >
            {works[2].image && (
              <Image
                src={works[2].image}
                alt={works[2].title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div
            className="absolute bottom-0 left-1/4 h-52 w-52 rotate-1 overflow-hidden rounded-2xl shadow-xl md:h-64 md:w-64"
            style={{ background: works[3].bg }}
          >
            {works[3].image && (
              <Image
                src={works[3].image}
                alt={works[3].title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Featured works */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <h2
            className={`${display.className} text-2xl font-semibold md:text-4xl`}
          >
            New this week
          </h2>
          <Link
            href="/gallery"
            className="text-sm font-medium text-[#3b2bff] hover:underline"
          >
            See all artworks
          </Link>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {works.map((w) => (
            <Link
              key={w.title}
              href={`/gallery/${w.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group mb-5 block break-inside-avoid"
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl ${w.tall ? 'h-96' : 'h-60'}`}
                style={{ background: w.bg }}
              >
                {w.image && (
                  <Image
                    src={w.image}
                    alt={w.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <p className="font-medium group-hover:underline">{w.title}</p>
                  <p className="text-sm text-[#14142b]/60">{w.artist}</p>
                </div>
                <p className="font-medium">{w.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Commission CTA */}
      <section className="bg-[#14142b] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
          <div>
            <h2 className={`${display.className} font-semibold text-gray-600`}>
              Need something made just for you?
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Commission an artist to create a custom piece of artwork for you.
            </p>
            <p className="mt-2 max-w-lg text-white/70">
              Send a brief to an artist in the gallery and agree on a price
              before work begins.
            </p>
          </div>
          <Link
            href="/upload"
            className="rounded-full bg-white px-6 py-3 font-medium text-[#14142b] hover:bg-[#eef0f7]"
          >
            Place a order
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-[#14142b]/60">
        <p>© 2026 YourBrand. Every artwork belongs to its artist.</p>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-[#14142b]">
            About
          </Link>
          <Link href="/licensing" className="hover:text-[#14142b]">
            Licensing
          </Link>
          <Link href="/contact" className="hover:text-[#14142b]">
            Contact
          </Link>
        </div>
      </footer>
    </main>
  )
}
