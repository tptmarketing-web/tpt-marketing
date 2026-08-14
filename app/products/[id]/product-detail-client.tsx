'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RichText from '@/components/rich-text';
import TptLink from '@/components/tpt-link';

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
  brandName: string;
  tptStoreUrl: string;
}

export default function ProductDetailClient({ product, brandName, tptStoreUrl }: Props) {
  const images = (product?.previewImages ?? [])
    .slice()
    .sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));
  const [currentImage, setCurrentImage] = useState(0);

  // Return the visitor to exactly the listing they came from, filters included.
  // Falls back to the full catalog, then to the home page section.
  const searchParams = useSearchParams();
  const rawBack = searchParams?.get('back') ?? '';
  const backHref = rawBack.startsWith('/') ? rawBack : '/products';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-extrabold text-gray-800 hover:text-yellow-500 transition-colors">
            {brandName}
          </Link>
          <Link
            href={backHref}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            &larr; Back to all resources
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={backHref} className="hover:text-gray-600">Resources</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product?.title}</span>
        </nav>

        <article className="bg-white rounded-3xl shadow-lg overflow-hidden">
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
                <div className="flex justify-center flex-wrap gap-2 py-4 bg-gray-50">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImage ? 'border-yellow-400' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={img?.url} alt={img?.altText ?? ''} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-sky-400 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                {product?.resourceType ?? 'Resource'}
              </span>
              {product?.price != null && (
                <span className="text-2xl font-bold text-green-600">${Number(product.price).toFixed(2)}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-5">{product?.title ?? 'Untitled'}</h1>
            <RichText html={product?.description} className="text-gray-600 text-lg leading-relaxed mb-8" />

            {(product?.gradeLevel || product?.targetAudience) && (
              <section className="mb-4 p-5 bg-blue-50 rounded-2xl">
                <h2 className="font-bold text-gray-700 mb-1">Who It&apos;s For</h2>
                <p className="text-gray-600">
                  {[product?.gradeLevel, product?.targetAudience].filter(Boolean).join(' — ')}
                </p>
              </section>
            )}

            {product?.whatsIncluded && (
              <section className="mb-4 p-5 bg-green-50 rounded-2xl">
                <h2 className="font-bold text-gray-700 mb-1">What&apos;s Included</h2>
                <RichText html={product.whatsIncluded} className="text-gray-600" />
              </section>
            )}

            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
              {product?.fileFormat && (
                <div><span className="font-semibold">Format:</span> {product.fileFormat}</div>
              )}
              {product?.pageCount != null && (
                <div><span className="font-semibold">Pages:</span> {product.pageCount}</div>
              )}
            </div>

            {product?.educationalGoal && (
              <section className="mb-8 p-5 bg-yellow-50 rounded-2xl">
                <h2 className="font-bold text-gray-700 mb-1">Educational Goal</h2>
                <RichText html={product.educationalGoal} className="text-gray-600" />
              </section>
            )}

            <TptLink
              href={product?.tptProductUrl ?? '#'}
              placement="product_detail"
              eventLabel={product?.title ?? 'Product'}
              className="block w-full text-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-500 hover:to-green-500 text-gray-800 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              View &amp; Buy on Teachers Pay Teachers &rarr;
            </TptLink>
          </div>
        </article>

        <div className="text-center mt-10">
          <TptLink
            href={tptStoreUrl}
            placement="product_detail_store"
            eventLabel="Browse more resources"
            className="text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            Browse more resources in my TPT store &rarr;
          </TptLink>
        </div>
      </main>
    </div>
  );
}
