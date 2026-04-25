import { LINKS } from '@/lib/links';
import { TrackedLink } from '@/components/ui/tracked-link';
import { Wordmark } from '@/components/ui/wordmark';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="mobile"
      className="relative overflow-hidden bg-bone-soft text-forest"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-0">
        {/* Footer card */}
        <div className="relative z-10 rounded-[28px] md:rounded-[32px] bg-bone border border-line/60 shadow-[0_30px_80px_-40px_rgba(15,36,23,0.18)]">
          <div className="px-6 md:px-12 pt-10 md:pt-14 pb-8 md:pb-10">
            <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-12">
              {/* Brand column */}
              <div>
                <Wordmark tone="dark" />

                <p className="mt-6 text-forest/70 text-sm md:text-[15px] leading-relaxed max-w-sm">
                  Xploreum empowers travelers to plan a real adventure in one
                  conversation, then hands the ground game to certified local
                  Xperts.
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <SocialIcon
                    href={LINKS.instagram}
                    label="Instagram"
                    cta="instagram"
                  >
                    <InstagramGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.linkedin}
                    label="LinkedIn"
                    cta="linkedin"
                  >
                    <LinkedInGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={`https://x.com/xploreum`}
                    label="X (Twitter)"
                    cta="x_twitter"
                  >
                    <XGlyph />
                  </SocialIcon>
                </div>
              </div>

              <FooterCol
                title="Product"
                links={[
                  {
                    label: 'Chat with Xavier',
                    href: LINKS.chatWithX,
                    external: true,
                    cta: 'chat_with_xavier',
                  },
                  {
                    label: 'How it works',
                    href: LINKS.howItWorks,
                    cta: 'how_it_works',
                  },
                  {
                    label: 'Meet the Xperts',
                    href: '#xperts',
                    cta: 'meet_xperts',
                  },
                ]}
              />
              <FooterCol
                title="For Xperts"
                links={[
                  {
                    label: 'Become an Xpert',
                    href: LINKS.forGuide,
                    cta: 'become_xpert',
                  },
                  {
                    label: 'Sign in',
                    href: LINKS.signIn,
                    external: true,
                    cta: 'sign_in',
                  },
                ]}
              />
              <FooterCol
                title="Company"
                links={[
                  { label: 'About', href: LINKS.about, cta: 'about' },
                  {
                    label: 'Contact',
                    href: LINKS.contact,
                    cta: 'contact',
                  },
                ]}
              />
            </div>

            {/* Divider + bottom row inside the card */}
            <div className="mt-10 md:mt-14 pt-6 md:pt-7 border-t border-line/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] md:text-[13px] text-forest/55 tracking-wide">
              <span>
                © {year} Xploreum, Inc. · San Francisco · Montréal
              </span>
              <div className="flex items-center gap-6">
                <span className="font-semibold text-[10px] tracking-[0.22em] uppercase text-forest/50">
                  Launching iOS &amp; Android · 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant watermark wordmark — anchors the page end */}
        <div
          aria-hidden
          className="pointer-events-none select-none relative -mt-6 md:-mt-10"
        >
          <div className="text-center font-black tracking-[-0.04em] leading-[0.85] text-[18vw] md:text-[16vw] text-outline-soft">
            XPLOREUM
          </div>
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
      <div className="font-bold text-[13px] md:text-[14px] tracking-tight text-forest mb-5">
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
              className="text-forest/65 hover:text-forest text-[13px] md:text-[14px] transition"
            >
              {l.label}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  cta,
  children,
}: {
  href: string;
  label: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <TrackedLink
      href={href}
      cta={cta}
      location="footer"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-forest text-bone hover:bg-forest-soft transition"
    >
      {children}
    </TrackedLink>
  );
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[16px] w-[16px]"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[16px] w-[16px]"
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8h4.6v14H.2V8zm7.6 0h4.4v1.92h.06c.62-1.16 2.12-2.38 4.36-2.38 4.66 0 5.52 3.06 5.52 7.04V22h-4.6v-6.2c0-1.48-.02-3.4-2.06-3.4-2.06 0-2.38 1.6-2.38 3.28V22H7.8V8z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[14px] w-[14px]"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}
