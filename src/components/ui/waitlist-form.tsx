'use client';

import { useState, type FormEvent } from 'react';
import posthog from 'posthog-js';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function WaitlistForm({ source = 'footer' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    setError(null);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      posthog.capture('waitlist_signup', { source });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'success') {
    return (
      <p
        role="status"
        className="text-sm md:text-[15px] text-forest font-medium"
      >
        ✓ You&apos;re on the list. We&apos;ll email you the moment we ship.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={error ? 'waitlist-error' : undefined}
          className="flex-1 min-w-0 rounded-full border border-line bg-bone px-5 py-3 text-sm md:text-[15px] text-forest placeholder:text-forest/40 focus:border-forest focus:outline-none transition disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center rounded-full bg-forest text-bone px-6 py-3 text-sm md:text-[15px] font-semibold tracking-tight hover:bg-forest-deep transition disabled:opacity-60 whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending…' : 'Notify me'}
        </button>
      </div>
      {error && (
        <p
          id="waitlist-error"
          role="alert"
          className="mt-2 text-[12px] md:text-[13px] text-[#a05a16]"
        >
          {error}
        </p>
      )}
    </form>
  );
}
