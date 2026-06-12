'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const team = [
  {
    name: "Morgan McDaniel",
    title: "Founder & Chair",
    bio: "Morgan McDaniel is a quantitative scholar, artist, and data analyst from Fayetteville, GA. As the Founder and Chair of The Collection Initiative, Morgan leads the organization's strategic vision, partnerships, and programming — building a sustainable creative ecosystem in the South Atlanta metro area that connects emerging artists with collectors, curators, and cultural institutions.",
  },
  {
    name: "Atuarra McCaslin",
    title: "President",
    bio: "Atuarra McCaslin is the Associate Director of Research Engagement at Morehouse College, as well as a practicing artist and designer. She brings a unique combination of academic rigor, creative practice, and institutional leadership to her role as President of The Collection Initiative, helping shape the organization's research-informed approach to arts programming and community engagement.",
  },
  {
    name: "Natasha Edwards",
    title: "Vice President",
    bio: "Natasha Edwards is the founder of NTPR, a public relations and events firm specializing in fashion and the arts, and the creator of LVO (Luxury Vibes Only), a luxury event brand. As Vice President of The Collection Initiative, Natasha leads communications, partnerships, and the public-facing identity of the organization, bringing her deep expertise in cultural storytelling and high-end event production.",
  },
  {
    name: "Ashleigh Jones",
    title: "Secretary",
    bio: "Ashleigh Jones is the founder of Practical Purpose and Solutions Consulting LLC, bringing experience in coaching, leadership development, conflict resolution, restorative practices, and organizational effectiveness. Her diverse professional background allows her to contribute both financial expertise and people-centered leadership, helping The Collection Initiative build a strong foundation and create meaningful, lasting change.",
  },
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('')
}

export default function AboutView() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-48 pb-32 px-10 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="font-shadower text-5xl md:text-7xl lg:text-8xl text-dark max-w-4xl leading-tight"
        >
          Art that begins with a story.
        </motion.h1>
      </section>

      {/* ── Banner Image ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="h-[60vh] overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1600&q=80"
          alt="The Collection"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── About Us / Mission ── */}
      <section className="py-40 px-10 md:px-20">
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
            className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-10"
          >
            About Us
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="font-rasa text-2xl md:text-3xl text-dark leading-relaxed mb-8"
          >
            The Collection Initiative is a 501(c)(3) fine arts nonprofit rooted in
            Southside Atlanta and the Fayette Arts District.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.35 }}
            className="font-panamera text-xs text-gray-soft leading-relaxed mb-6"
          >
            Our mission is to support and connect artists, curators, and collectors across the
            American South through community-based programming, cultural initiatives, and a
            sustainable creative ecosystem that bridges grassroots creativity with high-end
            cultural experiences.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="font-rasa text-lg text-dark leading-relaxed italic"
          >
            We believe art belongs everywhere — in galleries, in homes, in workplaces,
            and in communities that have long deserved it.
          </motion.p>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-24 px-10 md:px-20 border-t border-sage/30">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="font-panamera text-xs tracking-[0.5em] uppercase text-gray-soft mb-16"
          >
            Meet the Team
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
                className="border border-sage/30 p-8 flex flex-col gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-dark text-cream flex items-center justify-center font-panamera text-xs tracking-widest shrink-0">
                    {initials(member.name)}
                  </div>
                  <div>
                    <p className="font-rasa text-lg text-dark leading-snug">{member.name}</p>
                    <p className="font-panamera text-[10px] tracking-[0.3em] uppercase text-gray-soft mt-0.5">
                      {member.title}
                    </p>
                  </div>
                </div>
                <p className="font-panamera text-xs text-gray-soft leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-10 border-t border-sage/30 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <Link
            href="/shop"
            className="font-panamera text-xs tracking-[0.5em] uppercase text-dark border-b border-gray-soft pb-1 hover:border-dark transition-colors duration-700"
          >
            Start Your Collection
          </Link>
        </motion.div>
      </section>
    </>
  )
}
