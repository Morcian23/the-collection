import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const publicKey = process.env.KLAVIYO_PUBLIC_KEY
  const listId = process.env.KLAVIYO_LIST_ID

  if (!publicKey || !listId) {
    console.error('Klaviyo env vars missing')
    return NextResponse.json({ error: 'Klaviyo not configured' }, { status: 500 })
  }

  const body = {
    data: {
      type: 'subscription',
      attributes: {
        profile: {
          data: {
            type: 'profile',
            attributes: { email },
          },
        },
      },
      relationships: {
        list: {
          data: { type: 'list', id: listId },
        },
      },
    },
  }

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        revision: '2024-02-15',
      },
      body: JSON.stringify(body),
    }
  )

  // Klaviyo returns 202 on success (accepted), not 200
  if (res.status === 202) {
    return NextResponse.json({ success: true })
  }

  const errorText = await res.text()
  console.error('Klaviyo error:', res.status, errorText)
  return NextResponse.json(
    { error: 'Subscription failed', detail: errorText },
    { status: 500 }
  )
}
