export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/product';
import { SiteSettings } from '@/lib/models/site-settings';
import ProductDetailClient from './product-detail-client';

async function getProduct(id: string) {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}

async function getSettings() {
  await connectDB();
  const settings = await SiteSettings.findOne().lean();
  return settings ? JSON.parse(JSON.stringify(settings)) : null;
}

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = await getProduct(params?.id);
  const settings = await getSettings();
  const brand = settings?.brandName ?? 'My TPT Store';

  if (!product) {
    return { title: `Resource Not Found | ${brand}` };
  }

  const plainDesc = (product?.description ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
  const firstImage = (product?.previewImages ?? [])
    .slice()
    .sort((a: any, b: any) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0))?.[0]?.url;

  const title = `${product?.title ?? 'Resource'} | ${brand}`;

  return {
    title,
    description: plainDesc || `${product?.resourceType ?? 'Educational resource'} for ${product?.gradeLevel || 'students'}.`,
    openGraph: {
      title,
      description: plainDesc,
      type: 'website',
      images: firstImage ? [firstImage] : undefined,
    },
    twitter: {
      card: firstImage ? 'summary_large_image' : 'summary',
      title,
      description: plainDesc,
      images: firstImage ? [firstImage] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [product, settings] = await Promise.all([
    getProduct(params?.id),
    getSettings(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={product}
      brandName={settings?.brandName ?? 'My TPT Store'}
      tptStoreUrl={settings?.tptStoreUrl ?? '#'}
    />
  );
}
