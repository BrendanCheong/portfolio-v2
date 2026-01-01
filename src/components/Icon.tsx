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

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = icons[name.toLowerCase()];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent className={className} />;
}
