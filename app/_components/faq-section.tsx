'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  title: string;
  faqs: FAQ[];
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-800">{faq.question}</span>
        <span
          className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ title, faqs }: Props) {
  if (!faqs?.length) return null;

  return (
    <section id="faq" className="py-12 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">{title || 'Frequently Asked Questions'}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Everything you need to know about our resources</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
