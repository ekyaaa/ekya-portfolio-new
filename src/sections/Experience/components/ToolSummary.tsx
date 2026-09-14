import { ToolboxCategory } from '../experience.types';

interface ToolSummaryProps {
  categories: ToolboxCategory[];
}

export function ToolSummary({ categories }: ToolSummaryProps) {
  return (
    <div className="tool-summary-block" data-experience-reveal>
      <div className="tool-summary-header">
        <span className="tool-summary-label font-mono">TOOLS / STACK</span>
        <span className="tool-summary-hint font-mono">TECHNOLOGIES BACKED BY PRODUCTION &amp; REAL PROJECTS</span>
      </div>

      <div className="tool-categories-grid font-mono">
        {categories.map((cat) => (
          <div key={cat.category} className="tool-cat-column">
            <div className="cat-header-row">
              <span className="cat-title">{cat.category}</span>
            </div>
            <div className="cat-primary-items">{cat.items.join(' \u00b7 ')}</div>
            {cat.supporting && cat.supporting.length > 0 && (
              <div className="cat-supporting-items">
                <span className="supporting-badge">EXT:</span> {cat.supporting.join(' \u00b7 ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
