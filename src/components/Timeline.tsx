'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

const INITIAL_DISPLAY_COUNT = 3;

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
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldCollapse = groupedItems.length > INITIAL_DISPLAY_COUNT;

  // When collapsed: show first INITIAL_DISPLAY_COUNT items
  // When expanded: show ALL items
  const displayItems = shouldCollapse && !isExpanded
    ? groupedItems.slice(0, INITIAL_DISPLAY_COUNT)
    : groupedItems;

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence initial={false}>
        {displayItems.map((item, index) => {
          const isExpandable = index >= INITIAL_DISPLAY_COUNT;

          return (
            <motion.div
              key={item.name}
              initial={isExpandable ? { opacity: 0, height: 0 } : undefined}
              animate={{ opacity: 1, height: 'auto' }}
              exit={isExpandable ? { opacity: 0, height: 0 } : undefined}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <TimelineItem item={item} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Toggle button */}
      {shouldCollapse && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>{isExpanded ? 'Show less' : 'Show all'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ChevronDown className="size-4" />
          </motion.div>
        </button>
      )}
    </div>
  );
}
