// Single source of truth for outbound / anchor links
export const LINKS = {
  chatWithX: 'https://app.xploreum.io/chat',
  forGuide: '#xperts',
  signIn: 'https://app.xploreum.io/auth',
  contact: 'mailto:hello@xploreum.io',
  howItWorks: '#how-it-works',
  about: '#about',
  mobile: '#mobile',
  // social
  x: 'https://x.com/xploreum',
  threads: 'https://threads.net/@xploreum',
  instagram: 'https://instagram.com/xploreum',
  facebook: 'https://www.facebook.com/people/Xploreum/61572506130787/',
  linkedin: 'https://www.linkedin.com/company/106347949/',
  bluesky: 'https://bsky.app/profile/xploreum.bsky.social',
  // legal
  legal: '/legal',
  terms: '/legal/terms',
  thrillmasterTerms: '/legal/thrillmaster-terms',
  privacy: '/legal/privacy',
  acceptableUse: '/legal/acceptable-use',
  paymentTerms: '/legal/payment-terms',
  contentLicensing: '/legal/content-licensing',
  codeOfConduct: '/legal/code-of-conduct',
  safetyGuidelines: '/legal/safety-guidelines',
  cookies: '/legal/cookies',
} as const;
