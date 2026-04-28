import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'legal');

type Frontmatter = {
  title: string;
  slug: string;
  effective?: string;
  updated: string;
  summary?: string;
};

const SLUG_ORDER = [
  'terms',
  'thrillmaster-terms',
  'privacy',
  'acceptable-use',
  'payment-terms',
  'content-licensing',
  'code-of-conduct',
  'safety-guidelines',
  'cookies',
];

function getAllDocs(): Frontmatter[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  const docs = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { data } = matter(raw);
    return data as Frontmatter;
  });

  return docs.sort((a, b) => {
    const aIdx = SLUG_ORDER.indexOf(a.slug);
    const bIdx = SLUG_ORDER.indexOf(b.slug);
    if (aIdx === -1 && bIdx === -1) return a.title.localeCompare(b.title);
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx - bIdx;
  });
}

export const metadata = {
  title: 'Legal · Xploreum',
  description: 'Terms, privacy policy, and other legal documents for Xploreum.',
};

export default function LegalIndex() {
  const docs = getAllDocs();

  return (
    <main className="min-h-screen bg-bone text-forest">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-forest/60 hover:text-forest transition-colors"
        >
          ← Back home
        </Link>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-forest/60">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-forest">
          The fine print, in plain English.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-forest/70">
          Everything that governs how Xploreum works — the agreement between us,
          how we handle your data, what we expect from the community, and how
          payments and refunds flow.
        </p>

        <ul className="mt-12 divide-y divide-line border-t border-b border-line">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link
                href={`/legal/${doc.slug}`}
                className="group flex items-baseline justify-between py-5 hover:text-forest"
              >
                <div>
                  <h2 className="text-xl font-medium text-forest">{doc.title}</h2>
                  {doc.summary && (
                    <p className="mt-1 text-sm text-forest/65">{doc.summary}</p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="ml-6 text-forest/50 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
