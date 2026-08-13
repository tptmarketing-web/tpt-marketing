'use client';

import Script from 'next/script';

interface Props {
  /** One or more Google tag IDs, comma separated. e.g. "G-XXXXXXX, AW-123456789" */
  tagId?: string | null;
  /** Google Ads conversion send_to value. e.g. "AW-123456789/AbC-D_efGhIjK" */
  conversionLabel?: string | null;
}

/**
 * Injects the Google tag (gtag.js) site-wide when a tag ID is configured in
 * the admin panel. Also exposes the Google Ads conversion target on
 * window.__TPT_CONVERSION_SEND_TO__ so outbound TPT buttons can fire it.
 */
export default function GoogleTag({ tagId, conversionLabel }: Props) {
  const ids = (tagId ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) return null;

  const primary = ids[0];
  const configLines = ids.map((id) => `gtag('config', ${JSON.stringify(id)});`).join('\n');

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configLines}
window.__TPT_CONVERSION_SEND_TO__ = ${JSON.stringify((conversionLabel ?? '').trim())};
`,
        }}
      />
    </>
  );
}
