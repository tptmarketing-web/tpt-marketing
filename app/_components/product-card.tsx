'use client';

import { useState } from 'react';
import Link from 'next/link';
import { htmlToPlainText } from '@/lib/html';

export interface ProductCardData {
  _id: string;
  title: string;
  resourceType?: string;
  description?: string;
  whatsIncluded?: string;
  fileFormat?: string;
  pageCount?: number | null;
  price?: number | null;
  previewImages?: { url: string; altText: string; sortOrder: number }[];
}

export default function ProductCard({ product, className }: { product: ProductCardData; className?: string }) {
  const images = (product?.previewImages ?? [])
    .slice()
    .sort((a: any, b: any) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));
  const [current, setCurrent] = useState(0);
  const hasMultiple = images.length > 1;

  const go = (e: React.MouseEvent, dir: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((prev) => ((prev + dir) % images.length + images.length) % images.length);
  };

  const goTo = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent(idx);
  };

  return (
    <Link
      href={`/products/${product?._id}`}
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1 flex flex-col ${className ?? ''}`}
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-100 to-yellow-100 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[current]?.url}
            alt={images[current]?.altText ?? product?.title ?? 'Product'}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">📝</div>
        )}

        <span className="absolute top-3 left-3 px-3 py-1 bg-sky-400 text-white text-xs font-bold rounded-full uppercase tracking-wide z-10">
          {product?.resourceType ?? 'Resource'}
        </span>

        {hasMultiple && (
          <>
            <button
              onClick={(e) => go(e, -1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => go(e, 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => goTo(e, idx)}
                  className={`w-2 h-2 rounded-full transition-all ${idx === current ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'}`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product?.title ?? 'Untitled'}</h3>
        {product?.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{htmlToPlainText(product.description)}</p>
        )}
        {product?.whatsIncluded && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            <span className="font-semibold text-gray-700">What&apos;s included: </span>
            {htmlToPlainText(product.whatsIncluded)}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-3">
            {product?.fileFormat && (
              <span><span className="font-semibold text-gray-700">Format:</span> {product.fileFormat}</span>
            )}
            {product?.pageCount != null && (
              <span><span className="font-semibold text-gray-700">Pages:</span> {product.pageCount}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            {product?.price != null ? (
              <span className="text-xl font-bold text-green-600">${Number(product.price).toFixed(2)}</span>
            ) : (
              <span className="text-sm text-gray-400">See on TPT</span>
            )}
            <span className="px-4 py-2 bg-yellow-400 group-hover:bg-yellow-500 text-gray-800 text-sm font-semibold rounded-xl transition-colors">
              Learn More
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
