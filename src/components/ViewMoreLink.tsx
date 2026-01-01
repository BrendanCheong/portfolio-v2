import { ArrowRight } from 'lucide-react';

interface ViewMoreLinkProps {
  href: string;
}

export function ViewMoreLink({ href }: ViewMoreLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <span>view more</span>
      <ArrowRight className="size-5" />
    </a>
  );
}
