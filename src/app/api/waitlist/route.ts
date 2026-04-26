import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { email, source } = (payload ?? {}) as {
    email?: unknown;
    source?: unknown;
  };

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  const record = {
    email: email.trim().toLowerCase(),
    source: typeof source === 'string' ? source : 'unknown',
    submittedAt: new Date().toISOString(),
  };

  if (!webhook) {
    console.warn('[waitlist] WAITLIST_WEBHOOK_URL not set — logging only:', record);
    return NextResponse.json({ ok: true });
  }

  try {
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!upstream.ok) {
      console.error('[waitlist] webhook responded', upstream.status);
      return NextResponse.json(
        { error: 'We could not save that right now. Please try again.' },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error('[waitlist] webhook error', err);
    return NextResponse.json(
      { error: 'We could not save that right now. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
