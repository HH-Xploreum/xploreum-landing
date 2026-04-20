import Image from 'next/image';

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Xploreum"
        width={32}
        height={32}
        priority
        className="w-8 h-8"
      />
      <span className="font-bold tracking-[-0.02em] text-lg text-forest">
        XPLOREUM
      </span>
    </a>
  );
}
