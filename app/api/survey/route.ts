import { NextResponse } from 'next/server'

const SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbwzM2tAdOa0tcl_WJU8dGt7vPvjg4W4LibA1GERWjyC0LxMOjADYw3CXxcr_-cQJicw/exec'

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

    // Save full response to Google Sheets via Apps Script
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})

    console.log('Survey response received:', JSON.stringify(data, null, 2))

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
