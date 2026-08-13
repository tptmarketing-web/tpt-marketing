import { toDisplayHtml } from '@/lib/html';

interface Props {
  /** Raw value from the database: rich HTML or legacy plain text. */
  html: string | null | undefined;
  className?: string;
}

/**
 * Renders admin-authored content. Handles both the new rich-text HTML and
 * older plain-text values (line breaks are preserved either way).
 */
export default function RichText({ html, className = '' }: Props) {
  const content = toDisplayHtml(html);
  if (!content) return null;
  return (
    <div
      className={`rich-text ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
