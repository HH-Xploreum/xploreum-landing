import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import LegalLayout from '../_components/LegalLayout';
import '../_components/legal.css';

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

function getDoc(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data as Frontmatter, content };
}

export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.frontmatter.title} · Xploreum`,
    description: doc.frontmatter.summary,
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const allDocs = getAllDocs();

  return (
    <LegalLayout
      title={doc.frontmatter.title}
      effective={doc.frontmatter.effective}
      updated={doc.frontmatter.updated}
      summary={doc.frontmatter.summary}
      currentSlug={doc.frontmatter.slug}
      allDocs={allDocs}
    >
      <MDXRemote
        source={doc.content}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </LegalLayout>
  );
}
