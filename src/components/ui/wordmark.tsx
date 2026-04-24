import Image from 'next/image';

export function Wordmark({
  className = '',
  tone = 'dark',
}: {
  className?: string;
  tone?: 'dark' | 'light';
}) {
  return (
    <a href="/" className={`flex items-center ${className}`} aria-label="Xploreum">
      <Image
        src="/logo.png"
        alt="Xploreum"
        width={1001}
        height={342}
        priority
        className={`h-10 md:h-12 w-auto transition-[filter] duration-300 ${
          tone === 'light' ? 'brightness-0 invert' : ''
        }`}
      />
    </a>
  );
}
