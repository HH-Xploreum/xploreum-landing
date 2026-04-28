import Link from 'next/link';
import { ReactNode } from 'react';

type LegalDoc = {
  title: string;
  slug: string;
  summary?: string;
};

type Props = {
  title: string;
  effective?: string;
  updated: string;
  summary?: string;
  currentSlug: string;
  allDocs: LegalDoc[];
  children: ReactNode;
};

const SLUG_LABELS: Record<string, string> = {
  terms: 'Xplorer Terms',
  'thrillmaster-terms': 'Thrillmaster Terms',
  privacy: 'Privacy Policy',
  'acceptable-use': 'Acceptable Use',
  'payment-terms': 'Payment Terms',
  'content-licensing': 'Content & Licensing',
  'code-of-conduct': 'Code of Conduct',
  'safety-guidelines': 'Safety Guidelines',
  cookies: 'Cookie Policy',
};

export default function LegalLayout({
  title,
  effective,
  updated,
  summary,
  currentSlug,
  allDocs,
  children,
}: Props) {
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const updatedFormatted = formatDate(updated);
  const effectiveFormatted = effective ? formatDate(effective) : null;

  return (
    <main className="min-h-screen bg-bone text-forest">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-forest/60">
              Legal
            </p>
            <nav className="flex flex-col gap-2">
              {allDocs.map((doc) => {
                const isActive = doc.slug === currentSlug;
                return (
                  <Link
                    key={doc.slug}
                    href={`/legal/${doc.slug}`}
                    className={`text-sm leading-relaxed transition-colors ${
                      isActive
                        ? 'text-forest font-medium'
                        : 'text-forest/60 hover:text-forest'
                    }`}
                  >
                    {SLUG_LABELS[doc.slug] ?? doc.title}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-forest/60 hover:text-forest transition-colors"
            >
              ← Back home
            </Link>
          </div>
        </aside>

        <article className="max-w-2xl">
          <div className="mb-8 lg:hidden">
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-forest/60">
              Legal
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {allDocs.map((doc) => {
                const isActive = doc.slug === currentSlug;
                return (
                  <Link
                    key={doc.slug}
                    href={`/legal/${doc.slug}`}
                    className={
                      isActive
                        ? 'text-forest font-medium'
                        : 'text-forest/60 hover:text-forest'
                    }
                  >
                    {SLUG_LABELS[doc.slug] ?? doc.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-forest">
              {title}
            </h1>
            <p className="mt-3 text-sm text-forest/60">
              {effectiveFormatted && (
                <>
                  Effective {effectiveFormatted}
                  <span className="mx-2">·</span>
                </>
              )}
              Last updated {updatedFormatted}
            </p>
            {summary && (
              <p className="mt-6 text-lg leading-relaxed text-forest/75">
                {summary}
              </p>
            )}
          </header>

          <div className="legal-prose">{children}</div>

          <footer className="mt-20 border-t border-line pt-8 text-sm text-forest/60">
            <p>
              Questions? Email{' '}
              <a
                href="mailto:legal@xploreum.io"
                className="underline underline-offset-4 hover:text-forest"
              >
                legal@xploreum.io
              </a>
              .
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Xploreum, Inc. · San Francisco · Montréal
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}
