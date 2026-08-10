'use client';

interface HeroProps {
  tagline: string;
  aboutText: string;
  tptStoreUrl: string;
}

export default function HeroSection({ tagline, aboutText, tptStoreUrl }: HeroProps) {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50" />
      {/* Decorative elements - positioned at the exact points marked by the user */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Dot 1 - top center */}
        <div className="absolute text-5xl opacity-25 animate-bounce -translate-x-1/2 -translate-y-1/2" style={{ top: '12%', left: '55%', animationDuration: '3s' }}>⭐</div>
        {/* Dot 2 - left, mid-height */}
        <div className="absolute text-5xl opacity-20 animate-bounce -translate-x-1/2 -translate-y-1/2" style={{ top: '44%', left: '7%', animationDuration: '5s' }}>📚</div>
        {/* Dot 3 - right, mid-height */}
        <div className="absolute text-4xl opacity-25 animate-bounce -translate-x-1/2 -translate-y-1/2" style={{ top: '52%', left: '92%', animationDuration: '4s' }}>✏️</div>
        {/* Dot 4 - lower left of button */}
        <div className="absolute text-4xl opacity-20 animate-bounce -translate-x-1/2 -translate-y-1/2" style={{ top: '79%', left: '25%', animationDuration: '3.5s' }}>🌟</div>
        {/* Dot 5 - bottom center-right */}
        <div className="absolute text-5xl opacity-25 animate-bounce -translate-x-1/2 -translate-y-1/2" style={{ top: '90%', left: '82%', animationDuration: '4.5s' }}>🎨</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          {tagline ?? 'Quality Educational Resources'}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {aboutText ?? ''}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={tptStoreUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Browse My TPT Store
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 hover:bg-white text-gray-800 font-bold text-lg rounded-2xl shadow-md hover:shadow-lg border border-gray-200 transition-all transform hover:scale-105"
          >
            View Resources
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
