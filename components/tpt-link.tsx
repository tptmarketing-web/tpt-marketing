'use client';

import { ReactNode } from 'react';

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  /** Human readable label sent with the analytics event, e.g. product title */
  eventLabel?: string;
  /** Where on the site the click happened, e.g. "hero", "product_detail" */
  placement?: string;
  ariaLabel?: string;
}

/**
 * Outbound link to Teachers Pay Teachers that reports the click to Google.
 * Fires a Google Ads conversion (when a conversion label is configured in the
 * admin panel) plus a generic `tpt_click` event for GA4.
 * Opens in a new tab, so navigation is never blocked by the tracking call.
 */
export default function TptLink({ href, className, children, eventLabel, placement, ariaLabel }: Props) {
  const handleClick = () => {
    try {
      const w = window as any;
      if (typeof w?.gtag !== 'function') return;

      const sendTo = typeof w.__TPT_CONVERSION_SEND_TO__ === 'string' ? w.__TPT_CONVERSION_SEND_TO__ : '';
      if (sendTo) {
        w.gtag('event', 'conversion', { send_to: sendTo });
      }

      w.gtag('event', 'tpt_click', {
        event_category: 'outbound',
        event_label: eventLabel ?? href,
        placement: placement ?? 'unknown',
        link_url: href,
      });
    } catch {
      /* tracking must never break navigation */
    }
  };

  return (
    <a
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      data-tpt-link="true"
    >
      {children}
    </a>
  );
}
