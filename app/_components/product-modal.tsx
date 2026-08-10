'use client';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  title: string;
  resourceType: string;
  description: string;
  targetAudience: string;
  gradeLevel: string;
  whatsIncluded: string;
  fileFormat: string;
  pageCount: number | null;
  educationalGoal: string;
  price: number | null;
  tptProductUrl: string;
  previewImages: { url: string; altText: string; sortOrder: number }[];
}

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = (product?.previewImages ?? []).sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image carousel */}
        {images?.length > 0 && (
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-yellow-100">
              <img
                src={images[currentImage]?.url ?? ''}
                alt={images[currentImage]?.altText ?? product?.title ?? ''}
                className="w-full h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex justify-center gap-2 py-3 bg-gray-50">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentImage ? 'bg-yellow-400' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <span className="px-3 py-1 bg-sky-400 text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {product?.resourceType ?? 'Resource'}
            </span>
            {product?.price != null && (
              <span className="text-2xl font-bold text-green-600">${Number(product.price).toFixed(2)}</span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">{product?.title ?? 'Untitled'}</h2>
          <p className="text-gray-600 mb-6 whitespace-pre-line">{product?.description ?? ''}</p>

          {(product?.gradeLevel || product?.targetAudience) && (
            <div className="mb-4 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-bold text-gray-700 mb-1">Who It&apos;s For</h3>
              <p className="text-gray-600">
                {[product?.gradeLevel, product?.targetAudience].filter(Boolean).join(' — ')}
              </p>
            </div>
          )}

          {product?.whatsIncluded && (
            <div className="mb-4 p-4 bg-green-50 rounded-xl">
              <h3 className="font-bold text-gray-700 mb-1">What&apos;s Included</h3>
              <p className="text-gray-600 whitespace-pre-line">{product.whatsIncluded}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            {product?.fileFormat && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Format:</span> {product.fileFormat}
              </div>
            )}
            {product?.pageCount != null && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">Pages:</span> {product.pageCount}
              </div>
            )}
          </div>

          {product?.educationalGoal && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-xl">
              <h3 className="font-bold text-gray-700 mb-1">Educational Goal</h3>
              <p className="text-gray-600">{product.educationalGoal}</p>
            </div>
          )}

          <a
            href={product?.tptProductUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-500 hover:to-green-500 text-gray-800 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          >
            View &amp; Buy on Teachers Pay Teachers →
          </a>
        </div>
      </div>
    </div>
  );
}
