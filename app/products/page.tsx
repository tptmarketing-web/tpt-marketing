export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/product';
import { SiteSettings } from '@/lib/models/site-settings';
import { seedDatabase } from '@/lib/seed';
import ProductsBrowser from './products-browser';
import TptLink from '@/components/tpt-link';

async function getData() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    await seedDatabase();
    settings = await SiteSettings.findOne().lean();
  }
  const products = await Product.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
  return {
    settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    products: JSON.parse(JSON.stringify(products)),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const settings = await SiteSettings.findOne().lean();
  const brand = (settings as any)?.brandName ?? 'My TPT Store';
  const title = `Products | ${brand}`;
  const description = `Browse all educational resources from ${brand}.`;
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  };
}

export default async function ProductsPage() {
  const { settings, products } = await getData();
  const brand = settings?.brandName ?? 'My TPT Store';
  const tptStoreUrl = settings?.tptStoreUrl ?? '#';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt={`${brand} logo`} className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-gray-800">{brand}</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">All Resources</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Browse our full collection of teacher-created educational materials</p>
        </div>

        {(!products || products.length === 0) ? (
          <div className="text-center py-20">
            <p className="text-gray-500">New resources coming soon! Check back later.</p>
            <TptLink
              href={tptStoreUrl}
              placement="products_empty_state"
              eventLabel="Visit My TPT Store"
              className="inline-block mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold rounded-xl transition-colors"
            >
              Visit My TPT Store
            </TptLink>
          </div>
        ) : (
          <ProductsBrowser products={products} />
        )}
      </main>
    </div>
  );
}
