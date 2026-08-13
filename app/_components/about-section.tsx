'use client';

import RichText from '@/components/rich-text';
import TptLink from '@/components/tpt-link';

interface Props {
  sellerName: string;
  sellerBio: string;
  sellerAvatarUrl: string | null;
  tptStoreUrl: string;
}

export default function AboutSection({ sellerName, sellerBio, sellerAvatarUrl, tptStoreUrl }: Props) {
  return (
    <section id="about" className="py-12 bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">About the Seller</h2>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          {sellerAvatarUrl ? (
            <img
              src={sellerAvatarUrl}
              alt={sellerName ?? 'Seller'}
              className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-yellow-200 shadow-md"
            />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto mb-6 bg-gradient-to-br from-yellow-200 to-blue-200 flex items-center justify-center text-4xl border-4 border-yellow-200">
              👩‍🏫
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-800 mb-3">{sellerName ?? 'Your Name'}</h3>
          <RichText html={sellerBio} className="text-gray-600 mb-6 leading-relaxed" />
          <TptLink
            href={tptStoreUrl ?? '#'}
            placement="about"
            eventLabel="Visit My TPT Store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-xl transition-colors"
          >
            Visit My TPT Store
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </TptLink>
        </div>
      </div>
    </section>
  );
}
