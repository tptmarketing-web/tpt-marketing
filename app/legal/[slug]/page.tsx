export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/mongodb';
import { SiteSettings } from '@/lib/models/site-settings';
import { seedDatabase } from '@/lib/seed';
import RichText from '@/components/rich-text';

const slugMap: Record<string, string> = {
  'privacy-policy': 'privacyPolicy',
  'terms-of-service': 'termsOfService',
  'refund-policy': 'refundPolicy',
};

const titleMap: Record<string, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'refund-policy': 'Refund Policy',
};

async function getSettings() {
  await connectDB();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    await seedDatabase();
    settings = await SiteSettings.findOne().lean();
  }
  return settings ? JSON.parse(JSON.stringify(settings)) : null;
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const settings = await getSettings();
  const brand = settings?.brandName ?? 'My TPT Store';
  const title = titleMap[params?.slug ?? ''] ?? 'Legal';
  return {
    title: `${title} | ${brand}`,
    description: `${title} for ${brand}.`,
    openGraph: {
      title: `${title} | ${brand}`,
      description: `${title} for ${brand}.`,
      type: 'website',
    },
  };
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug ?? '';
  const field = slugMap[slug];
  const title = titleMap[slug];

  if (!field || !title) {
    notFound();
  }

  const settings = await getSettings();
  const content = settings?.[field] ?? 'Content not available.';
  const brand = settings?.brandName ?? 'My TPT Store';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-extrabold text-gray-800 hover:text-yellow-500 transition-colors">
            {brand}
          </Link>
          <Link href="/" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
          <RichText html={content} className="max-w-none text-gray-700 leading-relaxed" />
        </article>
      </main>
    </div>
  );
}
