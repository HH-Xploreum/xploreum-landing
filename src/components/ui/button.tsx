import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'link';

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const base =
    'inline-flex items-center gap-2 font-semibold tracking-tight transition group';

  const styles: Record<Variant, string> = {
    primary:
      'bg-forest text-bone hover:bg-forest-deep rounded-full px-6 py-3.5',
    ghost:
      'bg-transparent border border-forest/20 text-forest hover:bg-forest/5 rounded-full px-6 py-3.5',
    link: 'text-forest hover:text-forest-deep',
  };

  const content = <span>{children}</span>;

  const cls = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
