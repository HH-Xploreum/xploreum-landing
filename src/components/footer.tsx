import { LINKS } from '@/lib/links';
import { TrackedLink } from '@/components/ui/tracked-link';
import { WaitlistForm } from '@/components/ui/waitlist-form';
import { Wordmark } from '@/components/ui/wordmark';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="mobile"
      className="relative isolate overflow-hidden bg-forest-deep text-forest"
    >
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Footer card */}
        <div className="relative z-10 rounded-[28px] md:rounded-[32px] bg-bone border border-line/60 shadow-[0_30px_80px_-40px_rgba(15,36,23,0.35)]">
          <div className="px-5 md:px-16 pt-10 md:pt-14 pb-8 md:pb-10">
            <div className="grid lg:grid-cols-[1.4fr_auto] gap-10 md:gap-20">
              {/* Brand column */}
              <div>
                <Wordmark tone="dark" />

                <p className="mt-6 text-forest/70 text-sm md:text-[15px] leading-relaxed max-w-sm">
                  Xploreum empowers travelers to plan a real adventure in one
                  conversation, then hands the ground game to certified local
                  Xperts.
                </p>

                <div className="mt-8 flex items-center gap-2.5 flex-wrap">
                  <SocialIcon href={LINKS.x} label="X" cta="x_twitter">
                    <XGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.threads}
                    label="Threads"
                    cta="threads"
                  >
                    <ThreadsGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.instagram}
                    label="Instagram"
                    cta="instagram"
                  >
                    <InstagramGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.facebook}
                    label="Facebook"
                    cta="facebook"
                  >
                    <FacebookGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.linkedin}
                    label="LinkedIn"
                    cta="linkedin"
                  >
                    <LinkedInGlyph />
                  </SocialIcon>
                  <SocialIcon
                    href={LINKS.bluesky}
                    label="Bluesky"
                    cta="bluesky"
                  >
                    <BlueskyGlyph />
                  </SocialIcon>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-x-14">
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
            </div>

            {/* Launch waitlist CTA — promotes the launching tag into an active capture */}
            <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-line/60 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
              <div className="max-w-md">
                <div className="font-semibold text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-forest/60 mb-2">
                  Launching iOS &amp; Android · 2026
                </div>
                <p className="font-bold text-forest text-[1.125rem] md:text-[1.375rem] tracking-tight leading-tight">
                  Be the first to know when we launch.
                </p>
              </div>
              <WaitlistForm source="footer" />
            </div>

            {/* Divider + bottom row inside the card */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-line/60 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 text-[12px] md:text-[13px] text-forest/55 tracking-wide">
              <span>
                © {year} Xploreum, Inc. · San Francisco · Montréal
              </span>
              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                <TrackedLink
                  href={LINKS.terms}
                  cta="terms"
                  location="footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest transition"
                >
                  Terms &amp; Conditions
                </TrackedLink>
                <TrackedLink
                  href={LINKS.acceptableUse}
                  cta="acceptable_use"
                  location="footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest transition"
                >
                  Acceptable Use
                </TrackedLink>
                <TrackedLink
                  href={LINKS.paymentTerms}
                  cta="payment_terms"
                  location="footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-forest transition"
                >
                  Payment Terms
                </TrackedLink>
              </nav>
            </div>
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
      <div className="font-bold text-[13px] md:text-[14px] tracking-tight text-forest mb-5 whitespace-nowrap">
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
              className="text-forest/65 hover:text-forest text-[13px] md:text-[14px] transition whitespace-nowrap"
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

function ThreadsGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[16px] w-[16px]"
      aria-hidden
    >
      <path d="M17.46 11.13c-.08-.04-.17-.08-.25-.11-.15-2.78-1.67-4.37-4.22-4.39h-.04c-1.53 0-2.8.65-3.59 1.84l1.4.96c.59-.89 1.51-1.08 2.19-1.08h.03c.84.01 1.48.25 1.89.73.3.34.5.82.6 1.42-.76-.13-1.58-.17-2.46-.12-2.48.14-4.07 1.59-3.96 3.6.05.99.55 1.85 1.39 2.41.71.48 1.62.71 2.57.66 1.25-.07 2.23-.55 2.91-1.42.52-.66.85-1.51 1-2.59.61.37 1.06.86 1.31 1.45.43 1 .45 2.65-.89 3.99-1.18 1.18-2.59 1.69-4.73 1.7-2.37-.02-4.16-.78-5.32-2.26-1.09-1.39-1.65-3.39-1.67-5.95.02-2.56.58-4.56 1.67-5.94 1.16-1.49 2.95-2.25 5.32-2.27 2.39.02 4.21.78 5.41 2.27.59.73 1.03 1.66 1.32 2.74l1.62-.43c-.36-1.34-.93-2.5-1.69-3.45C16.41 1.07 14.21.13 11.43.11h-.01c-2.78.02-4.96.96-6.47 2.81C3.61 4.51 2.92 6.83 2.9 9.7v.01c.02 2.87.71 5.19 2.05 6.85 1.51 1.85 3.69 2.79 6.47 2.81h.01c2.47-.02 4.21-.66 5.65-2.1 1.88-1.88 1.82-4.24 1.2-5.69-.45-1.04-1.3-1.89-2.46-2.45zm-4.39 4.21c-1.05.06-2.14-.41-2.2-1.42-.04-.75.53-1.59 2.27-1.69.2-.01.39-.02.58-.02.63 0 1.22.06 1.76.18-.2 2.51-1.39 2.89-2.41 2.95z" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[16px] w-[16px]"
      aria-hidden
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03h-2.54v-2.91h2.54v-2.21c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.87h2.78l-.45 2.91h-2.34V22c4.78-.76 8.45-4.92 8.45-9.94z" />
    </svg>
  );
}

function BlueskyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[16px] w-[16px]"
      aria-hidden
    >
      <path d="M6.34 4.5c2.93 2.2 6.08 6.65 7.24 9.04 1.16-2.39 4.31-6.84 7.24-9.04 2.11-1.59 5.53-2.81 5.53 1.1 0 .78-.45 6.55-.71 7.49-.91 3.26-4.23 4.09-7.18 3.59 5.16.88 6.47 3.79 3.64 6.7-5.38 5.52-7.73-1.39-8.33-3.16-.11-.33-.16-.48-.16-.35 0-.13-.05.02-.16.35-.6 1.77-2.95 8.68-8.33 3.16-2.83-2.91-1.52-5.82 3.64-6.7-2.95.5-6.27-.33-7.18-3.59-.26-.94-.71-6.71-.71-7.49 0-3.91 3.42-2.69 5.51-1.1z" />
    </svg>
  );
}
