import React from 'react';
import './ArticleContent.css';

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  // Parse inline text (bold, code, italics)
  const renderInline = (text: string): React.ReactNode => {
    // Regex splits by bold (**text**), inline code (`code`), or italics (*text*)
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="article-inline-code font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Split content by double newlines into blocks
  const blocks = content.split(/\n\n+/);

  return (
    <div className="article-body-content">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Subheading (### Heading)
        if (trimmed.startsWith('### ')) {
          const headingText = trimmed.replace(/^###\s+/, '').trim();
          const headingId = headingText
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');

          return (
            <h2 key={idx} id={headingId} className="article-section-h2 font-heading">
              {headingText}
            </h2>
          );
        }

        // Blockquote (> Quote)
        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.replace(/^>\s*/, '');
          return (
            <blockquote key={idx} className="article-blockquote font-body">
              {renderInline(quoteText)}
            </blockquote>
          );
        }

        // List item (- item)
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split(/\n/).map((line) => line.replace(/^[-*]\s+/, '').trim());
          return (
            <ul key={idx} className="article-unordered-list body-regular">
              {items.map((item, itemIdx) => (
                <li key={itemIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="article-paragraph body-regular">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
