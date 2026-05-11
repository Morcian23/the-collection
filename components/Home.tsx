'use client'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/Nav'
import EmailCapture from '@/components/EmailCapture'
import Footer from '@/components/Footer'

/* ── Programs data ── */
const programs = [
  {
    num: '01',
    title: 'Experiential Events',
    desc: 'High-end exhibitions, immersive installations, and live performance integrations — curated experiences that connect art with the communities that create it.',
    items: ['Gallery Openings', 'Trilith Gala', 'Immersive Installations'],
  },
  {
    num: '02',
    title: 'Recurring Programming',
    desc: 'Ongoing educational and community programs that build lasting connection between artists, collectors, and the public throughout the year.',
    items: ['Figure Drawing Sessions', 'Arts × Academia Talks', 'Art & Wealth Discussions'],
  },
  {
    num: '03',
    title: 'Public Art & Mobile Gallery',
    desc: 'Bringing fine art directly into southside communities through murals, lightpost features, temporary installations, and shipping-container exhibitions.',
    items: ['Community Murals', 'Lightpost Artist Features', 'Pop-Up Exhibitions'],
  },
]

/* ── Stats ── */
const stats = [
  { num: '6', label: 'Counties Served' },
  { num: '150+', label: 'Artists Supported' },
  { num: '3', label: 'Program Pillars' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      {/* ── HERO ── */}
      <section className="bg-dark text-cream min-h-screen flex flex-col justify-between px-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center">
          {/* Eyebrow */}
          <p className="font-panamera text-xs tracking-[0.35em] uppercase text-sage mb-8 flex items-center gap-4">
            <span className="inline-block w-12 h-px bg-sage opacity-70" />
            The Collection Initiative
          </p>

          {/* Headline */}
          <h1 className="font-rasa text-6xl md:text-7xl lg:text-8xl font-light text-cream leading-[0.97] mb-10 max-w-4xl">
            Fine arts<br />
            <em className="italic text-sage">for the southside.</em>
          </h1>

          {/* Subhead */}
          <p className="font-panamera text-base md:text-lg text-cream/70 leading-relaxed max-w-2xl mb-12">
            Building a thriving, inclusive arts ecosystem across southside Atlanta —
            for artists, collectors, educators, and the communities that shape culture.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-5">
            <Link
              href="/about"
              className="font-panamera text-xs tracking-[0.3em] uppercase bg-cream text-dark px-12 py-4 hover:bg-sage transition-colors duration-300"
            >
              Explore Our Programs
            </Link>
            <Link
              href="/survey"
              className="font-panamera text-xs tracking-[0.3em] uppercase border border-sage text-sage px-12 py-4 hover:bg-sage hover:text-dark transition-colors duration-300"
            >
              Take the Survey
            </Link>
          </div>
        </div>

        {/* Hero bottom strip — counties */}
        <div className="max-w-5xl mx-auto w-full border-t border-sage/20 pt-8 mt-16">
          <p className="font-panamera text-xs tracking-[0.3em] uppercase text-sage/60 text-center">
            Clayton · South Fulton · Fayette · Coweta · Henry · Trilith
          </p>
        </div>
      </section>

      {/* ── MISSION STRIP ── */}
      <section className="bg-cream py-20 px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-6">Our Mission</p>
          <p className="font-rasa text-3xl md:text-4xl font-light text-dark leading-snug">
            To support and connect artists, curators, and collectors across the American South through{' '}
            <em className="italic text-gray-soft">community-based programming</em> and cultural initiatives.
          </p>
          <div className="w-16 h-px bg-sage mx-auto mt-10" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-dark py-16 px-10">
        <div className="max-w-5xl mx-auto grid grid-cols-3 divide-x divide-sage/20">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-8">
              <p className="font-rasa text-5xl md:text-6xl font-light text-cream mb-2">{s.num}</p>
              <p className="font-panamera text-xs tracking-[0.25em] uppercase text-sage">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="bg-cream py-24 px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-3 flex items-center gap-4">
              <span className="inline-block w-10 h-px bg-gray-soft opacity-50" />
              What We Do
            </p>
            <h2 className="font-rasa text-4xl md:text-5xl font-light text-dark leading-tight">
              Three pillars,<br /><em className="italic text-gray-soft">one ecosystem.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-sage/30">
            {programs.map((p, i) => (
              <div
                key={p.num}
                className={`py-10 ${i < programs.length - 1 ? 'md:border-r border-sage/30' : ''} md:px-8 first:pl-0 last:pr-0`}
              >
                <span className="font-panamera text-xs tracking-[0.2em] text-sage mb-5 block">{p.num}</span>
                <h3 className="font-rasa text-2xl font-light text-dark mb-4 leading-snug">{p.title}</h3>
                <p className="font-panamera text-sm text-gray-soft leading-relaxed mb-6">{p.desc}</p>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="font-panamera text-xs tracking-wide text-dark flex items-center gap-2">
                      <span className="inline-block w-3 h-px bg-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SURVEY CTA ── */}
      <section className="bg-dark py-24 px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-panamera text-xs tracking-[0.3em] uppercase text-sage mb-5 flex items-center gap-4">
              <span className="inline-block w-10 h-px bg-sage opacity-60" />
              Community Research
            </p>
            <h2 className="font-rasa text-4xl md:text-5xl font-light text-cream leading-tight mb-6">
              Help us build<br /><em className="italic text-sage">what's next.</em>
            </h2>
            <p className="font-panamera text-sm text-cream/70 leading-relaxed mb-8 max-w-lg">
              We're mapping the fine arts landscape across southside Atlanta. Your voice shapes our programming,
              gallery spaces, artist support, and community services. Every response matters.
            </p>
            <Link
              href="/survey"
              className="inline-block font-panamera text-xs tracking-[0.3em] uppercase bg-cream text-dark px-12 py-4 hover:bg-sage transition-colors duration-300"
            >
              Take the Survey →
            </Link>
            <p className="font-panamera text-xs text-sage/60 mt-5 tracking-wide">
              Takes 8–10 minutes · All responses anonymous and confidential
            </p>
          </div>

          {/* Survey topics */}
          <div className="border-l border-sage/20 pl-12">
            <p className="font-panamera text-xs tracking-[0.2em] uppercase text-sage mb-6">The survey covers</p>
            <ul className="space-y-4">
              {[
                'Your arts engagement and barriers to access',
                'Community needs and priorities',
                'The Trilith Studios creative economy',
                'Support for local artists and studios',
                'Your vision for southside fine arts',
              ].map((topic) => (
                <li key={topic} className="font-panamera text-sm text-cream/80 flex items-start gap-3 leading-snug">
                  <span className="inline-block w-3 h-px bg-sage mt-2 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY ── */}
      <section className="bg-cream py-24 px-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-panamera text-xs tracking-[0.3em] uppercase text-gray-soft mb-5 flex items-center gap-4">
              <span className="inline-block w-10 h-px bg-gray-soft opacity-50" />
              Rooted in the Southside
            </p>
            <h2 className="font-rasa text-4xl md:text-5xl font-light text-dark leading-tight mb-6">
              Where we live<br /><em className="italic text-gray-soft">and work.</em>
            </h2>
            <p className="font-panamera text-sm text-gray-soft leading-relaxed mb-6">
              The Collection Initiative is rooted in the counties and communities that form the creative backbone
              of southside Atlanta — from the Lee Street Arts District to the Fayette Arts District and beyond.
            </p>
            <p className="font-panamera text-sm text-gray-soft leading-relaxed">
              We see a powerful opportunity to bridge emerging BIPOC artists with the broader creative economy —
              including the film and entertainment industry anchored at Trilith Studios in Fayetteville, one of
              the largest production hubs in the nation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Clayton County', 'South Fulton', 'Fayette County', 'Coweta County', 'Henry County', 'Trilith / Fayetteville'].map((county) => (
              <div
                key={county}
                className="border border-sage/40 px-5 py-4 flex items-center gap-3"
              >
                <span className="inline-block w-2 h-2 bg-sage flex-shrink-0" />
                <span className="font-panamera text-sm text-dark">{county}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIST FOCUS ── */}
      <section className="bg-dark py-24 px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-panamera text-xs tracking-[0.3em] uppercase text-sage mb-6">Our Commitment</p>
          <h2 className="font-rasa text-4xl md:text-5xl font-light text-cream leading-tight mb-8 max-w-3xl mx-auto">
            Art is culture <em className="italic text-sage">and</em> livelihood.<br />
            We take both seriously.
          </h2>
          <p className="font-panamera text-sm text-cream/60 leading-relaxed max-w-2xl mx-auto mb-12">
            From gallery opportunities and artist residencies to mentorship, grant support, and collector development —
            The Collection Initiative builds the infrastructure that lets Southern artists thrive professionally.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/artists"
              className="font-panamera text-xs tracking-[0.3em] uppercase bg-cream text-dark px-12 py-4 hover:bg-sage transition-colors duration-300"
            >
              Meet the Artists
            </Link>
            <Link
              href="/about"
              className="font-panamera text-xs tracking-[0.3em] uppercase border border-sage/40 text-sage px-12 py-4 hover:border-sage transition-colors duration-300"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <EmailCapture />

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  )
}
