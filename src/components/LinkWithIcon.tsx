import type { ReactNode } from 'react';

interface LinkWithIconProps {
  href: string;
  text: string;
  icon: ReactNode;
  position?: 'left' | 'right';
}

export function LinkWithIcon({ href, text, icon, position = 'right' }: LinkWithIconProps) {
  return (
    <a
      href={href}
      className="link flex items-center gap-1 text-sm font-medium transition-colors"
    >
      {position === 'left' && icon}
      <span>{text}</span>
      {position === 'right' && icon}
    </a>
  );
}
