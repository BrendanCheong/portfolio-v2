import { TimelineItem } from './TimelineItem';

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

interface TimelineProps {
  items: TimelineEntry[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <TimelineItem key={index} item={item} />
      ))}
    </div>
  );
}
