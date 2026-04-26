import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // If respondent provided email, also subscribe them to Klaviyo
    if (data.contact_email) {
      const publicKey = process.env.KLAVIYO_PUBLIC_KEY
      const listId = process.env.KLAVIYO_LIST_ID

      if (publicKey && listId) {
        await fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'revision': '2024-02-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                profile: {
                  data: {
                    type: 'profile',
                    attributes: { email: data.contact_email },
                  },
                },
              },
              relationships: {
                list: { data: { type: 'list', id: listId } },
              },
            },
          }),
        }).catch(() => {})
      }
    }

    // TODO: Connect to your preferred data destination:
    // Option A — Airtable, Notion, Google Sheets via their APIs
    // Option B — Email via SendGrid / Resend: send full JSON to your inbox
    // Option C — Formspree: https://formspree.io
    console.log('Survey response received:', JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
