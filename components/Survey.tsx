'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Survey() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data: Record<string, string | string[]> = {}
    const fields = form.elements as HTMLFormControlsCollection

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      if (!field.name || field.tagName === 'BUTTON') continue
      if ((field as HTMLInputElement).type === 'checkbox') {
        const cb = field as HTMLInputElement
        if (!data[cb.name]) data[cb.name] = []
        if (cb.checked) (data[cb.name] as string[]).push(cb.value)
      } else if ((field as HTMLInputElement).type === 'radio') {
        const rb = field as HTMLInputElement
        if (rb.checked) data[rb.name] = rb.value
      } else {
        if (field.value.trim()) data[field.name] = field.value.trim()
      }
    }

    try {
      await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {}

    setLoading(false)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-5">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-dark text-cream text-center px-8 py-12 rounded-t-xl">
          <Image
            src="/logo-wordmark.png"
            alt="The Collection"
            width={280}
            height={80}
            className="w-[200px] h-auto object-contain mx-auto mb-8 brightness-0 invert"
            priority
          />
          <p className="font-panamera text-xs tracking-[0.3em] uppercase text-sage mb-3">Community Survey</p>
          <h1 className="font-rasa text-3xl md:text-4xl font-light text-cream leading-snug mb-2">
            Southside Atlanta<br />
            <span className="text-sage">Fine Arts Development</span>
          </h1>
          <p className="font-panamera text-xs text-cream/60 tracking-widest mt-4">
            Clayton · South Fulton · Fayette · Coweta · Henry · Trilith
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white border-l-4 border-sage px-7 py-6 mb-8">
          <p className="font-panamera text-sm text-dark/80 leading-relaxed">
            We are a fine arts nonprofit committed to building a thriving, inclusive arts ecosystem across the southside Atlanta region. Whether you are an artist, collector, film industry professional, educator, business owner, or simply someone who loves the arts — your voice matters.
          </p>
          <p className="font-panamera text-sm text-dark/80 leading-relaxed mt-3">
            Your responses will directly shape our programs, gallery spaces, partnerships, and services.
          </p>
          <p className="font-panamera text-xs text-gray-soft italic mt-4">
            This survey takes approximately 8–10 minutes. All responses are anonymous and confidential.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-b-xl px-10 py-20 text-center">
            <Image src="/logo-symbol.png" alt="" width={56} height={56} className="w-14 h-14 object-contain mx-auto mb-6" />
            <h2 className="font-rasa text-3xl text-dark mb-4">Thank You</h2>
            <p className="font-panamera text-sm text-gray-soft leading-relaxed max-w-sm mx-auto">
              Your voice shapes what we build. We are deeply grateful for your time and your commitment to the arts in our region.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-b-xl px-8 md:px-10 py-10">

            {/* ── SECTION 1 ── */}
            <SectionHeader number="SECTION 1" title="About You" />

            <Question num="1" label="Which county or community do you primarily live or work in?" sub="Select all that apply">
              {['Clayton County','South Fulton / West End','Fayette County','Coweta County','Henry County','Trilith / Fayetteville area'].map(v => (
                <Checkbox key={v} name="q1" value={v} label={v} />
              ))}
              <OtherCheckbox name="q1" otherName="q1_other" />
            </Question>

            <Question num="2" label="What is your ZIP code?">
              <TextInput name="q2_zip" placeholder="e.g. 30214" style={{ maxWidth: 180 }} maxLength={10} />
            </Question>

            <Question num="3" label="How do you primarily identify your relationship to the arts?" sub="Select all that apply">
              {[
                ['Visual artist','Visual artist (painter, sculptor, photographer, printmaker, etc.)'],
                ['Film / TV / entertainment professional','Film / TV / entertainment industry professional'],
                ['Art collector or buyer','Art collector or buyer'],
                ['Arts educator or academic','Arts educator or academic'],
                ['Creative entrepreneur / designer / maker','Creative entrepreneur / designer / maker'],
                ['Arts enthusiast / community supporter','Arts enthusiast / community supporter'],
                ['Business owner interested in arts partnerships','Business owner interested in arts partnerships'],
                ['Parent / guardian of arts-interested student','Parent / guardian of a student interested in the arts'],
                ['No current connection','No current connection — interested in learning more'],
              ].map(([v, l]) => <Checkbox key={v} name="q3" value={v} label={l} />)}
              <OtherCheckbox name="q3" otherName="q3_other" />
            </Question>

            <Question num="4" label="What is your age range?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Under 18','18–24','25–34','35–44','45–54','55–64','65+','Prefer not to say'].map(v => (
                  <Radio key={v} name="q4" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Divider />

            {/* ── SECTION 2 ── */}
            <SectionHeader number="SECTION 2" title="Your Current Arts Engagement" />

            <Question num="5" label="How often do you currently engage with fine arts activities (galleries, exhibitions, art fairs, studio events, etc.)?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Weekly','Monthly','A few times a year','Rarely','Never'].map(v => (
                  <Radio key={v} name="q5" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="6" label="Where do you currently go to experience fine art?" sub="Select all that apply">
              {[
                ['Midtown Atlanta','Midtown Atlanta (High Museum, galleries, etc.)'],
                ['West Midtown / Westside Arts District','West Midtown / Westside Arts District'],
                ['Decatur','Decatur'],
                ['Within my southside community','Within my own southside community'],
                ['Online / virtual','Online / virtual exhibitions'],
                ['Out of state or international','Out of state or international'],
                ["I don't seek out fine art","I don't currently seek out fine art"],
              ].map(([v, l]) => <Checkbox key={v} name="q6" value={v} label={l} />)}
              <OtherCheckbox name="q6" otherName="q6_other" />
            </Question>

            <Question num="7" label="What prevents you from engaging more with fine arts on the southside?" sub="Select all that apply">
              {[
                ['Not enough galleries or exhibition spaces nearby','Not enough galleries or exhibition spaces nearby'],
                ['Events and venues are hard to find or discover','Events and venues are hard to find or discover'],
                ['Transportation / distance','Transportation / distance is a barrier'],
                ['Cost of tickets, memberships, or classes','Cost of tickets, memberships, or classes'],
                ['Programming does not reflect my community or interests','Programming does not reflect my community or interests'],
                ['Lack of awareness','Lack of awareness — I did not know events existed'],
                ['Nothing prevents me','Nothing prevents me — I am well engaged'],
              ].map(([v, l]) => <Checkbox key={v} name="q7" value={v} label={l} />)}
              <OtherCheckbox name="q7" otherName="q7_other" />
            </Question>

            <Question num="8" label="In the past 12 months, have you purchased any fine art (original works, prints, photography, sculpture, etc.)?">
              {[
                ['Yes — regularly (3+ times)','Yes — regularly (3 or more times)'],
                ['Yes — once or twice','Yes — once or twice'],
                ['No, but I am interested','No, but I am interested'],
                ['No, and I am not interested','No, and I am not currently interested'],
              ].map(([v, l]) => <Radio key={v} name="q8" value={v} label={l} />)}
            </Question>

            <Question num="9" label="If you have purchased art, what was your typical price range per piece?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Under $100','$100–$500','$500–$1,000','$1,000–$5,000','Over $5,000','N/A'].map(v => (
                  <Radio key={v} name="q9" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Divider />

            {/* ── SECTION 3 ── */}
            <SectionHeader number="SECTION 3" title="The Trilith Community & Creative Economy" />

            <SectionNote>
              Trilith Studios and the Trilith community in Fayetteville represent one of the largest film and entertainment production hubs in the nation. We see a powerful opportunity to bridge the fine arts community with the broader creative economy of this region.
            </SectionNote>

            <Question num="10" label="Do you have a connection to Trilith Studios or the Trilith community?">
              {[
                ['Work at Trilith Studios or a production company there','I work at Trilith Studios or for a production company based there'],
                ['Live in Trilith residential community','I live in the Trilith residential community'],
                ['Vendor / contractor / service provider','I am a vendor, contractor, or service provider to the Trilith ecosystem'],
                ['Attended events at Trilith','I have attended events at Trilith'],
                ['No direct connection but aware','No direct connection, but I am aware of it'],
                ['Not familiar with Trilith','I am not familiar with Trilith'],
              ].map(([v, l]) => <Checkbox key={v} name="q10" value={v} label={l} />)}
            </Question>

            <Question num="11" label="How interested would you be in programming that bridges fine arts and the film / entertainment industry?" sub="e.g., concept art exhibitions, production design showcases, costume and set design galleries, artist-filmmaker collaborations">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Very interested','Somewhat interested','Neutral','Not interested','Not sure'].map(v => (
                  <Radio key={v} name="q11" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="12" label="Should a fine arts nonprofit actively partner with Trilith Studios and production companies to create opportunities for local artists?">
              {[
                ['Yes — critical opportunity','Yes — this is a critical opportunity for local artists'],
                ['Yes — but keep programs distinct','Yes — but fine arts and film should remain distinct programs'],
                ['Neutral — depends on approach','Neutral — it depends on how it is done'],
                ['No — fine arts should remain independent','No — fine arts should remain independent of the entertainment industry'],
              ].map(([v, l]) => <Radio key={v} name="q12" value={v} label={l} />)}
            </Question>

            <Question num="13" label="What types of crossover programming interest you most?" sub="Select all that apply">
              {[
                ['Exhibitions featuring concept art / production design from films','Exhibitions featuring concept art, storyboards, or production design from films'],
                ['Artist residencies sponsored by production studios','Artist residencies sponsored by production studios'],
                ['Networking events connecting fine artists with film creatives','Networking events connecting fine artists with film industry creatives'],
                ['Workshops on commercial art careers','Workshops on commercial art careers (concept art, production design, VFX, costume)'],
                ['Public art inspired by Trilith productions','Public art installations inspired by or commissioned through Trilith productions'],
                ['Youth programs connecting art education to film careers','Youth programs connecting art education to film careers'],
                ['None','None of these'],
              ].map(([v, l]) => <Checkbox key={v} name="q13" value={v} label={l} />)}
              <OtherCheckbox name="q13" otherName="q13_other" />
            </Question>

            <Divider />

            {/* ── SECTION 4 ── */}
            <SectionHeader number="SECTION 4" title="Community Needs & Priorities" />

            <Question num="14" label="Which of the following do you feel are most needed in the southside Atlanta region?" sub="Rank your top 3 using the dropdowns — 1 (most needed), 2, or 3">
              <p className="font-panamera text-xs text-gray-soft italic mb-4">Select 1 (most needed), 2, or 3 — or leave blank if not applicable.</p>
              <div className="flex flex-col gap-3">
                {[
                  ['q14_gallery','A professional fine art gallery with rotating exhibitions'],
                  ['q14_studio','Affordable studio space for working artists'],
                  ['q14_workshops','Art classes and workshops for adults'],
                  ['q14_youth','Youth arts education programs'],
                  ['q14_mentorship','Artist mentorship and professional development'],
                  ['q14_grants','Grant writing and funding literacy support for artists'],
                  ['q14_artfair','An annual arts fair or outdoor market'],
                  ['q14_publicart','Public murals and place-based art installations'],
                  ['q14_collectors','A collector development program connecting buyers with local artists'],
                  ['q14_corporate','Corporate / business art consulting and placement services'],
                  ['q14_residency','Artist residency programs'],
                  ['q14_social','Community arts events and social mixers'],
                ].map(([name, label]) => (
                  <div key={name} className="flex items-center gap-3">
                    <select name={name} aria-label={`Rank: ${label}`} className="w-16 border border-sage/60 rounded px-2 py-1.5 font-panamera text-sm text-dark bg-cream focus:outline-none focus:border-dark">
                      <option value="">—</option>
                      <option>1</option><option>2</option><option>3</option>
                    </select>
                    <label className="font-panamera text-sm text-dark">{label}</label>
                  </div>
                ))}
              </div>
            </Question>

            <Question num="15" label="If a professional fine art gallery opened in your area, how likely would you be to visit regularly?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Very likely','Somewhat likely','Not sure','Unlikely'].map(v => (
                  <Radio key={v} name="q15" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="16" label="How important is it to you that a local arts organization reflects the full diversity of the southside Atlanta community — including its many cultures, backgrounds, and creative industries?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Extremely important','Very important','Somewhat important','Not important'].map(v => (
                  <Radio key={v} name="q16" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="17" label="Do you believe the arts can play a meaningful role in the economic development of the southside Atlanta region?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Yes, absolutely','Yes, with the right approach','Somewhat','No','Not sure'].map(v => (
                  <Radio key={v} name="q17" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="18" label="What location would be most convenient for you to access arts programming?" sub="Select all that apply">
              {['East Point / College Park / Hapeville','Jonesboro / Morrow / Riverdale','Fayetteville / Trilith area','Newnan / Peachtree City','McDonough / Stockbridge','Online / virtual is fine for me'].map(v => (
                <Checkbox key={v} name="q18" value={v} label={v} />
              ))}
            </Question>

            <Divider />

            {/* ── SECTION 5 ── */}
            <SectionHeader number="SECTION 5" title="For Artists & Creative Professionals" />
            <SectionNote>If you are not an artist or creative professional, feel free to skip to Section 6.</SectionNote>

            <Question num="19" label="What is your primary art medium or creative discipline?">
              {['Painting','Sculpture','Photography','Printmaking','Digital / Mixed Media','Drawing / Illustration','Ceramics / Fiber / Textile','Concept Art / Illustration for Film','Production Design / Set Design','Costume / Fashion Design'].map(v => (
                <Checkbox key={v} name="q19" value={v} label={v} />
              ))}
              <OtherCheckbox name="q19" otherName="q19_other" />
            </Question>

            <Question num="20" label="Do you currently have adequate studio space to create your work?">
              {[
                ['Yes — own dedicated space','Yes — I have my own dedicated space'],
                ['Yes — rent or share a studio','Yes — I rent or share a studio'],
                ['No — work at home but not ideal','No — I work at home but it is not ideal'],
                ['No — no suitable workspace','No — I have no suitable workspace'],
              ].map(([v, l]) => <Radio key={v} name="q20" value={v} label={l} />)}
            </Question>

            <Question num="21" label="What is the biggest challenge you face as an artist in this region?" sub="Select your top 2">
              {[
                ['Affordable studio or workspace','Affordable studio or workspace'],
                ['Access to exhibition opportunities','Access to exhibition opportunities'],
                ['Building a collector / buyer base','Building a collector / buyer base'],
                ['Business skills — pricing, contracts, sales, marketing','Business skills — pricing, contracts, sales, marketing'],
                ['Access to grants and funding','Access to grants and funding'],
                ['Mentorship and professional network','Mentorship and professional network'],
                ['Visibility in my community','Visibility — people in my community do not know my work exists'],
                ['Opportunities with film / entertainment industry','Opportunities to collaborate with the film / entertainment industry'],
              ].map(([v, l]) => <Checkbox key={v} name="q21" value={v} label={l} />)}
              <OtherCheckbox name="q21" otherName="q21_other" />
            </Question>

            <Question num="22" label="Would you be interested in participating in a regional open studio event that showcases southside Atlanta artists to collectors, industry professionals, and the broader public?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Yes, definitely','Yes, if my work is a good fit','Maybe','No'].map(v => (
                  <Radio key={v} name="q22" value={v} label={v} />
                ))}
              </div>
            </Question>

            <Question num="23" label="What annual income do you currently earn from your art practice?">
              {[
                ['$0 — personal passion only','$0 — art is a personal passion, not a revenue source'],
                ['Under $5,000','Under $5,000'],
                ['$5,000–$20,000','$5,000–$20,000'],
                ['$20,000–$50,000','$20,000–$50,000'],
                ['Over $50,000','Over $50,000'],
                ['Prefer not to say','Prefer not to say'],
              ].map(([v, l]) => <Radio key={v} name="q23" value={v} label={l} />)}
            </Question>

            <Divider />

            {/* ── SECTION 6 ── */}
            <SectionHeader number="SECTION 6" title="Support & Engagement" />

            <Question num="24" label="How would you most like to support or engage with a fine arts nonprofit in your community?" sub="Select all that apply">
              {[
                'Attend exhibitions, events, and programs',
                'Purchase artwork directly from the gallery or organization',
                'Become a member or patron',
                'Volunteer time and skills',
                'Make a financial donation',
                'Sponsor a specific program or event as a business',
                'Partner as a collaborating organization',
                'Share and promote on social media',
                'Refer artists or community members to programs',
              ].map(v => <Checkbox key={v} name="q24" value={v} label={v} />)}
              <OtherCheckbox name="q24" otherName="q24_other" />
            </Question>

            <Question num="25" label="Would you be willing to pay an annual membership fee to support a local fine arts nonprofit and receive benefits such as event access, exhibition previews, and artist discounts?">
              {[
                'Yes — $25–$50 per year',
                'Yes — $50–$100 per year',
                'Yes — $100–$250 per year',
                'Yes — over $250 per year',
                'No',
              ].map(v => <Radio key={v} name="q25" value={v} label={v} />)}
            </Question>

            <Question num="26" label="Are you aware of any existing fine arts organizations currently serving the southside Atlanta region?">
              <Radio name="q26" value="No, not aware of any" label="No, I am not aware of any" />
              <Radio name="q26" value="Yes" label="Yes — please list them below" />
              <TextInput name="q26_list" placeholder="Organization names (if yes)" className="mt-3" />
            </Question>

            <Question num="27" label="How did you hear about this survey?">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Social media','Email','Friend or colleague','Community event','Flyer or poster'].map(v => (
                  <Radio key={v} name="q27" value={v} label={v} />
                ))}
              </div>
              <OtherRadio name="q27" otherName="q27_other" />
            </Question>

            <Divider />

            {/* ── SECTION 7 ── */}
            <SectionHeader number="SECTION 7" title="Open-Ended Feedback" />

            <Question num="28" label="In your own words, what does a thriving fine arts community look like in the southside Atlanta region? What would make you proud to call this an arts destination?">
              <Textarea name="q28" placeholder="Share your vision..." />
            </Question>

            <Question num="29" label="What is one program, event, or service that does not currently exist in this region that you wish someone would create?">
              <Textarea name="q29" placeholder="Your idea..." />
            </Question>

            <Question num="30" label="Is there anything else you would like us to know as we plan our programs and services?">
              <Textarea name="q30" placeholder="Any additional thoughts..." />
            </Question>

            <Divider />

            {/* ── SECTION 8 ── */}
            <SectionHeader number="SECTION 8" title="Stay Connected" optional />
            <SectionNote>
              If you would like to be notified about our launch, upcoming programs, or opportunities, please share your contact information below. This is entirely optional and will never be shared with third parties.
            </SectionNote>

            <Question label={<>Name <span className="font-normal text-gray-soft">(optional)</span></>}>
              <TextInput name="contact_name" placeholder="Your name" autoComplete="name" />
            </Question>

            <Question label="Email address">
              <TextInput name="contact_email" placeholder="you@example.com" type="email" autoComplete="email" />
            </Question>

            <Question label={<>Phone <span className="font-normal text-gray-soft">(optional)</span></>}>
              <TextInput name="contact_phone" placeholder="(000) 000-0000" type="tel" autoComplete="tel" style={{ maxWidth: 220 }} />
            </Question>

            <Question label={<>I would like to be contacted about: <span className="font-normal text-gray-soft">(Select all that apply)</span></>}>
              {[
                'General updates and launch announcements',
                'Exhibition and event invitations',
                'Artist membership and studio opportunities',
                'Volunteer opportunities',
                'Sponsorship and business partnership opportunities',
                'Collector and patron programs',
                'Youth and education programs',
              ].map(v => <Checkbox key={v} name="contact_interest" value={v} label={v} />)}
            </Question>

            <Question label="Preferred method of contact">
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {['Email','Phone / Text','Either'].map(v => (
                  <Radio key={v} name="contact_method" value={v} label={v} />
                ))}
              </div>
            </Question>

            {/* Submit */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                disabled={loading}
                className="font-panamera text-xs tracking-[0.3em] uppercase bg-dark text-cream px-14 py-4 hover:bg-gray-soft transition-colors duration-300 cursor-pointer disabled:opacity-40"
              >
                {loading ? 'Submitting...' : 'Submit Survey'}
              </button>
            </div>

          </form>
        )}

        {/* Footer */}
        <div className="text-center mt-10">
          <Image src="/logo-symbol.png" alt="" width={32} height={32} className="w-8 h-8 object-contain mx-auto mb-4 opacity-40" />
          <p className="font-panamera text-xs text-gray-soft tracking-widest">
            Clayton · South Fulton · Fayette · Coweta · Henry · Trilith
          </p>
          <p className="font-panamera text-xs text-gray-soft mt-2">
            © {new Date().getFullYear()} The Collection Studios. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  )
}

/* ── Sub-components ── */

function SectionHeader({ number, title, optional }: { number: string; title: string; optional?: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-12 mb-7 pb-3 border-b border-sage/40 first:mt-0">
      <span className="font-panamera text-xs tracking-widest bg-dark text-cream px-3 py-1 whitespace-nowrap">{number}</span>
      <h2 className="font-panamera text-xs font-semibold tracking-[0.2em] uppercase text-dark">
        {title}
        {optional && <span className="font-normal text-gray-soft normal-case tracking-normal ml-2">(Optional)</span>}
      </h2>
    </div>
  )
}

function SectionNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-3 border-sage bg-cream/60 px-4 py-3 mb-7">
      <p className="font-panamera text-sm text-gray-soft italic leading-relaxed">{children}</p>
    </div>
  )
}

function Question({ num, label, sub, children }: { num?: string; label: React.ReactNode; sub?: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <span className="block font-panamera text-sm font-semibold text-dark mb-3 leading-snug">
        {num && <span className="text-sage mr-1">{num}.</span>}
        {label}
        {sub && <em className="font-normal text-gray-soft ml-1">({sub})</em>}
      </span>
      {children}
    </div>
  )
}

function Checkbox({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer font-panamera text-sm text-dark leading-snug mb-2.5">
      <input type="checkbox" name={name} value={value} className="mt-0.5 w-4 h-4 accent-dark flex-shrink-0 cursor-pointer" />
      {label}
    </label>
  )
}

function Radio({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer font-panamera text-sm text-dark leading-snug mb-2.5">
      <input type="radio" name={name} value={value} className="mt-0.5 w-4 h-4 accent-dark flex-shrink-0 cursor-pointer" />
      {label}
    </label>
  )
}

function OtherCheckbox({ name, otherName }: { name: string; otherName: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer font-panamera text-sm text-dark mb-2.5">
      <input type="checkbox" name={name} value="Other" className="w-4 h-4 accent-dark flex-shrink-0 cursor-pointer" />
      <span>Other:</span>
      <TextInput name={otherName} placeholder="Please specify" className="flex-1" />
    </label>
  )
}

function OtherRadio({ name, otherName }: { name: string; otherName: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer font-panamera text-sm text-dark mt-2.5">
      <input type="radio" name={name} value="Other" className="w-4 h-4 accent-dark flex-shrink-0 cursor-pointer" />
      <span>Other:</span>
      <TextInput name={otherName} placeholder="Please specify" className="flex-1" />
    </label>
  )
}

function TextInput({ name, placeholder, className = '', style, type = 'text', maxLength, autoComplete }: {
  name: string; placeholder?: string; className?: string; style?: React.CSSProperties;
  type?: string; maxLength?: number; autoComplete?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autoComplete}
      style={style}
      className={`w-full border border-sage/60 rounded-none px-3 py-2.5 font-panamera text-sm text-dark bg-cream/40 placeholder-gray-soft focus:outline-none focus:border-dark transition-colors ${className}`}
    />
  )
}

function Textarea({ name, placeholder }: { name: string; placeholder?: string }) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={4}
      className="w-full border border-sage/60 rounded-none px-3 py-2.5 font-panamera text-sm text-dark bg-cream/40 placeholder-gray-soft focus:outline-none focus:border-dark transition-colors resize-y"
    />
  )
}

function Divider() {
  return <hr className="border-none border-t border-sage/30 my-10" />
}
