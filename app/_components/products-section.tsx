'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ProductCard, { ProductCardData } from './product-card';

interface Props {
  products: ProductCardData[];
}

export default function ProductsSection({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products?.length) {
    return (
      <section id="products" className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Resources</h2>
          <p className="text-gray-500">New resources coming soon! Check back later.</p>
        </div>
      </section>
    );
  }

  const useSlider = products.length >= 4;

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const step = el.clientWidth * 0.85;
    if (dir > 0 && el.scrollLeft >= maxScroll - 10) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (dir < 0 && el.scrollLeft <= 10) {
      el.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: dir * step, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-12 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">My Resources</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Browse our collection of teacher-created educational materials</p>
        </div>

        {useSlider ? (
          <div className="relative">
            {/* Prev button */}
            <button
              onClick={() => scrollBy(-1)}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous products"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1"
              style={{ scrollbarWidth: 'thin' }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => scrollBy(1)}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next products"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-400 hover:bg-sky-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
