import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/Icon';
import type { GroupedTimelineEntry } from '@/components/Timeline';

interface TimelineItemProps {
  item: GroupedTimelineEntry;
}

export function TimelineItem({ item }: TimelineItemProps) {
  const { name, href, logo, roles } = item;

  return (
    <div className="group relative flex gap-4">
      <div className="flex flex-col items-center">
        <a href={href} target="_blank" rel="noopener noreferrer" className="z-10">
          <Avatar className="size-12 border bg-background">
            <AvatarImage src={logo} alt={name} className="object-contain p-1" loading="eager" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </a>
        <div className="mt-2 h-full w-[1px] bg-border" />
      </div>

      <div className="flex-1 pb-8">
        {/* Company name */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold transition-colors hover:text-primary"
        >
          {name}
        </a>

        {/* Roles */}
        <div className="mt-2 flex flex-col gap-4">
          {roles.map((role, roleIndex) => (
            <div key={roleIndex}>
              {/* Title and date on same row */}
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <p className="text-sm text-muted-foreground">{role.title}</p>
                <p className="text-xs text-muted-foreground">
                  {role.start} - {role.end || 'Present'}
                </p>
              </div>

              {/* Description bullets */}
              {role.description && role.description.length > 0 && (
                <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
                  {role.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              )}

              {/* Links */}
              {role.links && role.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.links.map((link, linkIndex) => (
                    <a key={linkIndex} href={link.href} target="_blank" rel="noopener noreferrer">
                      <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                        <Icon name={link.icon} className="size-3" ariaLabel={link.name} />
                        <span className="text-xs">{link.name}</span>
                      </Badge>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
