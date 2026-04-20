import Image from 'next/image';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center ${className}`} aria-label="Xploreum">
      <Image
        src="/logo.png"
        alt="Xploreum"
        width={1001}
        height={342}
        priority
        className="h-8 w-auto"
      />
    </a>
  );
}
