import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  globe: Globe,
  youtube: Youtube,
};

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: string;
  className?: string;
  ariaLabel?: string;
}

export function Icon({ name, className, ariaLabel, ...props }: IconProps) {
  const IconComponent = icons[name.toLowerCase()];
  if (!IconComponent) {
    return null;
  }
  return (
    <IconComponent
      className={className}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabel ? `icon-${name}` : undefined}
      aria-hidden={!ariaLabel}
      role="img"
      alt-text={ariaLabel}
      {...props}
    />
  );
}
