/**
 * Lightweight HTML helpers for the simple rich-text editor.
 * No external dependencies so the app stays easy to deploy anywhere.
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'b', 'strong', 'i', 'em', 'u', 's', 'strike', 'span', 'div',
  'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'a', 'font',
]);

/** Attributes we keep, per tag. Everything else is dropped. */
const ALLOWED_ATTRS: Record<string, string[]> = {
  a: ['href', 'target', 'rel'],
  span: ['style'],
  div: ['style'],
  p: ['style'],
  li: ['style'],
  h1: ['style'],
  h2: ['style'],
  h3: ['style'],
  h4: ['style'],
  font: ['color', 'size'],
};

/** Only these CSS properties survive inside a style="..." attribute. */
const ALLOWED_STYLE_PROPS = new Set([
  'color', 'background-color', 'font-size', 'font-weight', 'font-style',
  'text-decoration', 'text-align',
]);

function cleanStyle(value: string): string {
  return value
    .split(';')
    .map((decl) => decl.trim())
    .filter(Boolean)
    .filter((decl) => {
      const prop = decl.split(':')[0]?.trim().toLowerCase() ?? '';
      const val = decl.slice(decl.indexOf(':') + 1).toLowerCase();
      if (!ALLOWED_STYLE_PROPS.has(prop)) return false;
      // Block anything that could execute code or load remote content.
      return !/(expression|javascript:|url\s*\()/i.test(val);
    })
    .join('; ');
}

/**
 * Strips scripts, event handlers and unknown tags from admin-authored HTML.
 * Content is authored only by the site owner, so an allowlist pass is enough.
 */
export function sanitizeHtml(input: string | null | undefined): string {
  if (!input) return '';
  let html = String(input);

  // Remove dangerous elements entirely (including their content).
  html = html.replace(/<\s*(script|style|iframe|object|embed|link|meta)[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
  html = html.replace(/<\s*(script|style|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, '');

  // Walk every remaining tag and rebuild it from the allowlist.
  html = html.replace(/<\s*(\/?)\s*([a-zA-Z0-9]+)([^>]*)>/g, (_match, slash: string, rawName: string, rawAttrs: string) => {
    const tag = rawName.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';
    if (slash) return `</${tag}>`;

    const allowed = ALLOWED_ATTRS[tag] ?? [];
    const kept: string[] = [];

    const attrRe = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
    let m: RegExpExecArray | null;
    while ((m = attrRe.exec(rawAttrs)) !== null) {
      const name = m[1].toLowerCase();
      const value = m[3] ?? m[4] ?? '';
      if (name.startsWith('on')) continue;
      if (!allowed.includes(name)) continue;

      if (name === 'href') {
        if (!/^(https?:|mailto:|tel:|\/|#)/i.test(value.trim())) continue;
        kept.push(`href="${value.replace(/"/g, '&quot;')}"`);
        continue;
      }
      if (name === 'style') {
        const style = cleanStyle(value);
        if (style) kept.push(`style="${style.replace(/"/g, '&quot;')}"`);
        continue;
      }
      kept.push(`${name}="${value.replace(/"/g, '&quot;')}"`);
    }

    if (tag === 'a') {
      if (!kept.some((a) => a.startsWith('target='))) kept.push('target="_blank"');
      if (!kept.some((a) => a.startsWith('rel='))) kept.push('rel="noopener noreferrer"');
    }

    return `<${tag}${kept.length ? ' ' + kept.join(' ') : ''}>`;
  });

  return html;
}

/** True when the value already contains markup produced by the editor. */
export function isHtml(value: string | null | undefined): boolean {
  if (!value) return false;
  return /<\/?(p|br|b|strong|i|em|u|s|strike|span|div|ul|ol|li|h[1-4]|blockquote|a|font)\b[^>]*>/i.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Returns display-ready HTML for a field that may hold either legacy plain
 * text (with real line breaks) or rich HTML from the editor.
 */
export function toDisplayHtml(value: string | null | undefined): string {
  if (!value) return '';
  if (isHtml(value)) return sanitizeHtml(value);
  return escapeHtml(String(value)).replace(/\r?\n/g, '<br />');
}

/** Strips all markup - used for previews, cards and meta descriptions. */
export function htmlToPlainText(value: string | null | undefined): string {
  if (!value) return '';
  if (!isHtml(value)) return String(value);
  return String(value)
    .replace(/<\s*(br|\/p|\/li|\/h[1-4]|\/div)\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}
