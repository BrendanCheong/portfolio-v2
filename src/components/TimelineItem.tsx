import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Icon } from './Icon';

interface TimelineEntry {
  name: string;
  href: string;
  title: string;
  logo: string;
  start: string;
  end?: string;
  description?: string[];
  links?: Array<{ name: string; href: string; icon: string }>;
}

interface TimelineItemProps {
  item: TimelineEntry;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const { name, href, title, logo, start, end, description, links } = item;

  return (
    <div className="group relative flex gap-4">
      <div className="flex flex-col items-center">
        <a href={href} target="_blank" rel="noopener noreferrer" className="z-10">
          <Avatar className="size-12 border bg-background">
            <AvatarImage src={logo} alt={name} className="object-contain p-1" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </a>
        <div className="mt-2 h-full w-[1px] bg-border" />
      </div>

      <div className="flex-1 pb-8">
        <div className="flex flex-col gap-1">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-primary"
          >
            {name}
          </a>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">
            {start} — {end || 'Present'}
          </p>
        </div>

        {description && description.length > 0 && (
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        )}

        {links && links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                  <Icon name={link.icon} className="size-3" />
                  <span className="text-xs">{link.name}</span>
                </Badge>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
