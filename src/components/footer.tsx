import { LINKS } from '@/lib/links';
import { TrackedLink } from '@/components/ui/tracked-link';

export function Footer() {
  return (
    <footer id="mobile" className="bg-forest-deep text-bone">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 md:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="font-black tracking-tight text-xl text-bone">
                XPLOREUM
              </div>
            </div>
            <p className="mt-4 text-bone/60 text-sm leading-relaxed max-w-xs">
              Xavier, your AI agent companion. One conversation, one real trip,
              one human Xpert when you land.
            </p>
            <p className="mt-8 font-semibold text-[10px] tracking-[0.2em] uppercase text-bone/40">
              Launching on iOS & Android, 2026
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: 'Chat with Xavier', href: LINKS.chatWithX, external: true, cta: 'chat_with_xavier' },
              { label: 'How it works', href: LINKS.howItWorks, cta: 'how_it_works' },
              { label: 'For Xperts', href: LINKS.forGuide, cta: 'for_guide' },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'About', href: LINKS.about, cta: 'about' },
              { label: 'Contact', href: LINKS.contact, cta: 'contact' },
              { label: 'Sign in', href: LINKS.signIn, external: true, cta: 'sign_in' },
            ]}
          />
          <FooterCol
            title="Social"
            links={[
              { label: 'Instagram', href: LINKS.instagram, external: true, cta: 'instagram' },
              { label: 'LinkedIn', href: LINKS.linkedin, external: true, cta: 'linkedin' },
            ]}
          />
        </div>

        <div className="mt-20 pt-8 border-t border-bone/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-bone/50 tracking-wide">
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
  links: { label: string; href: string; cta: string; external?: boolean }[];
}) {
  return (
    <div>
      <div className="font-semibold text-[10px] tracking-[0.25em] uppercase text-bone/40 mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <TrackedLink
              href={l.href}
              cta={l.cta}
              location="footer"
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-bone/85 hover:text-bone text-sm transition"
            >
              {l.label}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
