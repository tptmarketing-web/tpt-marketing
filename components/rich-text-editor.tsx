'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { isHtml, sanitizeHtml } from '@/lib/html';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Legacy plain-text values are converted to HTML the first time they load. */
function toEditorHtml(value: string): string {
  if (!value) return '';
  if (isHtml(value)) return sanitizeHtml(value);
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

const FONT_SIZES = [
  { label: 'Small', value: '2' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '5' },
  { label: 'Huge', value: '6' },
];

const COLORS = ['#1f2937', '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0284c7', '#7c3aed'];

export default function RichTextEditor({ value, onChange, placeholder, minHeight = 160 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastEmitted = useRef<string>('');
  const [showColors, setShowColors] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Sync incoming value into the editor without stealing the caret.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (value === lastEmitted.current) return;
    const html = toEditorHtml(value ?? '');
    if (el.innerHTML !== html) el.innerHTML = html;
    lastEmitted.current = value ?? '';
    setIsEmpty(!el.textContent?.trim() && !el.querySelector('img, li'));
  }, [value]);

  const emit = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const html = el.innerHTML === '<br>' ? '' : el.innerHTML;
    lastEmitted.current = html;
    setIsEmpty(!el.textContent?.trim() && !el.querySelector('img, li'));
    onChange(html);
  }, [onChange]);

  const exec = useCallback((command: string, arg?: string) => {
    ref.current?.focus();
    try {
      document.execCommand('styleWithCSS', false, 'true');
      document.execCommand(command, false, arg);
    } catch {
      /* ignore unsupported commands */
    }
    emit();
  }, [emit]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter the link URL:', 'https://');
    if (!url) return;
    exec('createLink', url);
  }, [exec]);

  // Paste as plain text so Word/Docs styling never leaks in.
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') ?? '';
    document.execCommand('insertText', false, text);
    emit();
  }, [emit]);

  const btn = 'px-2.5 py-1.5 rounded-md text-sm text-gray-700 hover:bg-white hover:shadow-sm transition-colors';

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 bg-gray-50 border-b border-gray-200 px-2 py-1.5 relative">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')} className={`${btn} font-bold`} title="Bold">B</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('italic')} className={`${btn} italic`} title="Italic">I</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('underline')} className={`${btn} underline`} title="Underline">U</button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <select
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => { exec('fontSize', e.target.value); e.target.selectedIndex = 0; }}
          className="px-2 py-1 text-sm bg-transparent text-gray-700 rounded-md hover:bg-white cursor-pointer outline-none"
          title="Text size"
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          {FONT_SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>

        <select
          onChange={(e) => { exec('formatBlock', e.target.value); e.target.selectedIndex = 0; }}
          className="px-2 py-1 text-sm bg-transparent text-gray-700 rounded-md hover:bg-white cursor-pointer outline-none"
          title="Paragraph style"
          defaultValue=""
        >
          <option value="" disabled>Style</option>
          <option value="p">Paragraph</option>
          <option value="h2">Heading</option>
          <option value="h3">Subheading</option>
          <option value="blockquote">Quote</option>
        </select>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertUnorderedList')} className={btn} title="Bullet list">• List</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('insertOrderedList')} className={btn} title="Numbered list">1. List</button>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <div className="relative">
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowColors((v) => !v)} className={btn} title="Text color">A<span className="inline-block w-3 h-1 bg-red-500 align-middle ml-0.5 rounded-sm" /></button>
          {showColors && (
            <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { exec('foreColor', c); setShowColors(false); }}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          )}
        </div>

        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={addLink} className={btn} title="Insert link">🔗</button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('removeFormat')} className={btn} title="Clear formatting">✕</button>
      </div>

      {/* Editable area */}
      <div className="relative bg-white">
        {isEmpty && placeholder && (
          <span className="absolute left-4 top-3 text-gray-400 pointer-events-none select-none">{placeholder}</span>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          onInput={emit}
          onBlur={emit}
          onPaste={handlePaste}
          className="rich-text px-4 py-3 outline-none text-gray-800 overflow-auto"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
