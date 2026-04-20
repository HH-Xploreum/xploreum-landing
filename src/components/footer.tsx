import { LINKS } from '@/lib/links';

export function Footer() {
  return (
    <footer id="mobile" className="bg-forest-deep text-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="font-black tracking-tight text-xl text-bone">
                XPLOREUM
              </div>
            </div>
            <p className="mt-4 text-bone/60 text-sm leading-relaxed max-w-xs">
              Your AI travel agent. One conversation, one real trip, one human when
              you land.
            </p>
            <p className="mt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-bone/40">
              Launching on iOS & Android — 2026
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: 'Chat with X', href: LINKS.chatWithX, external: true },
              { label: 'How it works', href: LINKS.howItWorks },
              { label: 'For Xperts', href: LINKS.forGuide },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'About', href: LINKS.about },
              { label: 'Contact', href: LINKS.contact },
              { label: 'Sign in', href: LINKS.signIn, external: true },
            ]}
          />
          <FooterCol
            title="Social"
            links={[
              { label: 'Instagram', href: LINKS.instagram, external: true },
              { label: 'LinkedIn', href: LINKS.linkedin, external: true },
            ]}
          />
        </div>

        <div className="mt-20 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-bone/50 font-mono tracking-wide">
          <span>© {new Date().getFullYear()} Xploreum, Inc.</span>
          <span>San Francisco · Montréal</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-bone/40 mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-bone/85 hover:text-bone text-sm transition"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
