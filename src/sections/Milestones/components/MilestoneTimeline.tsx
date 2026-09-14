import { useMemo, useState } from 'react';
import { Milestone, MilestoneType } from '../milestone.types';
import { MilestoneItem } from './MilestoneItem';

interface MilestoneTimelineProps {
  items: Milestone[];
  onSelect: (item: Milestone) => void;
}

type FilterCategory = 'all' | MilestoneType;

export function MilestoneTimeline({ items, onSelect }: MilestoneTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Filter out any hidden milestones (guarantees TFS is never rendered)
  const visibleItems = useMemo(() => {
    return items.filter((item) => !item.hidden);
  }, [items]);

  // Apply active category filter if selected
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return visibleItems;
    return visibleItems.filter((item) => {
      if (item.type === activeFilter) return true;
      // Also check sub-events for grouped items (e.g. Ceriaku has showcase sub-event)
      if (item.subEvents && item.subEvents.some((sub) => sub.type === activeFilter)) {
        return true;
      }
      return false;
    });
  }, [visibleItems, activeFilter]);

  // Group milestones by year descending, and within year sort newest first
  const groupedMilestones = useMemo(() => {
    const map = new Map<number, Milestone[]>();

    filteredItems.forEach((item) => {
      const year = item.year;
      if (!map.has(year)) {
        map.set(year, []);
      }
      map.get(year)!.push(item);
    });

    // Sort items inside each year by sortDate descending
    map.forEach((list) => {
      list.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    });

    // Return years descending: 2026, 2025, 2024
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filteredItems]);

  return (
    <div className="milestone-timeline-container" data-milestone-timeline>
      {/* Category Filter Controls */}
      <div className="timeline-filter-bar font-mono" data-milestone-reveal>
        <span className="filter-label">Filter by:</span>
        <div className="filter-chips">
          <button
            type="button"
            className={`filter-chip ${activeFilter === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Experiences ({visibleItems.length})
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === 'award' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('award')}
          >
            Awards & Placements
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === 'finalist' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('finalist')}
          >
            Finalist Sprints
          </button>
          <button
            type="button"
            className={`filter-chip ${activeFilter === 'showcase' ? 'is-active' : ''}`}
            onClick={() => setActiveFilter('showcase')}
          >
            Product Showcases
          </button>
        </div>
      </div>

      {/* Thin Vertical Progress Line */}
      <div className="timeline-progress-rail" aria-hidden="true">
        <div className="progress-bar-fill" data-milestone-progress />
      </div>

      {/* Year Groups */}
      <div className="timeline-groups">
        {groupedMilestones.map(([year, yearItems]) => (
          <div key={year} className="timeline-year-group">
            {/* Left Sticky Year Rail */}
            <div className="year-rail">
              <span className="sticky-year font-mono">{year}</span>
            </div>

            {/* Right Group Content */}
            <div className="year-content-group">
              {yearItems.map((item) => (
                <MilestoneItem key={item.id} item={item} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
