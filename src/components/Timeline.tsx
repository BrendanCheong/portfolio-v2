import { TimelineItem } from '@/components/TimelineItem';

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

export interface GroupedTimelineEntry {
  name: string;
  href: string;
  logo: string;
  roles: Array<{
    title: string;
    start: string;
    end?: string;
    description?: string[];
    links?: Array<{ name: string; href: string; icon: string }>;
  }>;
}

interface TimelineProps {
  items: TimelineEntry[];
}

function groupByCompany(items: TimelineEntry[]): GroupedTimelineEntry[] {
  const grouped: GroupedTimelineEntry[] = [];

  for (const item of items) {
    const existing = grouped.find((g) => g.name === item.name);
    const role = {
      title: item.title,
      start: item.start,
      end: item.end,
      description: item.description,
      links: item.links,
    };

    if (existing) {
      existing.roles.push(role);
    } else {
      grouped.push({
        name: item.name,
        href: item.href,
        logo: item.logo,
        roles: [role],
      });
    }
  }

  return grouped;
}

export function Timeline({ items }: TimelineProps) {
  const groupedItems = groupByCompany(items);

  return (
    <div className="flex flex-col gap-6">
      {groupedItems.map((item, index) => (
        <TimelineItem key={index} item={item} />
      ))}
    </div>
  );
}
