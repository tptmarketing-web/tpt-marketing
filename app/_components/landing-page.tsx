'use client';

import { useState, useEffect } from 'react';
import Header from './header';
import HeroSection from './hero-section';
import ProductsSection from './products-section';
import AboutSection from './about-section';
import ContactSection from './contact-section';
import FAQSection from './faq-section';
import Footer from './footer';
import LegalModal from './legal-modal';
import BackToTop from './back-to-top';
import HomeSkeleton from './home-skeleton';

interface SiteSettingsData {
  brandName?: string;
  tagline?: string;
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string | null;
  sellerName?: string;
  sellerBio?: string;
  sellerAvatarUrl?: string | null;
  tptStoreUrl?: string;
  pinterestUrl?: string | null;
  privacyPolicy?: string;
  termsOfService?: string;
  refundPolicy?: string;
  faqTitle?: string;
  faqs?: { question: string; answer: string }[];
}

interface ProductData {
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
  attachedFiles: { url: string; fileName: string; fileType: string; sortOrder: number }[];
  isActive: boolean;
  sortOrder: number;
}

export default function LandingPage() {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [legalContent, setLegalContent] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [settingsRes, productsRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/products'),
        ]);
        const settingsData = await settingsRes.json();
        const productsData = await productsRes.json();
        setSettings(settingsData);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!settings?.brandName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-blue-50">
        <div className="bg-white rounded-2xl p-10 shadow-lg text-center max-w-md">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600 mb-6">Set up your store in the Admin Panel to get started.</p>
          <a
            href="/admin"
            className="inline-block px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-xl hover:bg-yellow-500 transition-colors"
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  const openLegal = (type: 'privacy' | 'terms' | 'refund') => {
    const titles: Record<string, string> = { privacy: 'Privacy Policy', terms: 'Terms of Service', refund: 'Refund Policy' };
    const contents: Record<string, string> = {
      privacy: settings?.privacyPolicy ?? '',
      terms: settings?.termsOfService ?? '',
      refund: settings?.refundPolicy ?? '',
    };
    setLegalContent({ title: titles[type] ?? '', content: contents[type] ?? '' });
  };

  return (
    <div className="min-h-screen">
      <Header brandName={settings?.brandName ?? 'My TPT Store'} />
      <HeroSection
        tagline={settings?.tagline ?? ''}
        aboutText={settings?.aboutText ?? ''}
        tptStoreUrl={settings?.tptStoreUrl ?? '#'}
      />
      <ProductsSection products={products} />
      <AboutSection
        sellerName={settings?.sellerName ?? ''}
        sellerBio={settings?.sellerBio ?? ''}
        sellerAvatarUrl={settings?.sellerAvatarUrl ?? null}
        tptStoreUrl={settings?.tptStoreUrl ?? '#'}
      />
      <FAQSection
        title={settings?.faqTitle ?? 'Frequently Asked Questions'}
        faqs={settings?.faqs ?? []}
      />
      <ContactSection
        contactEmail={settings?.contactEmail ?? ''}
        contactPhone={settings?.contactPhone ?? null}
      />
      <Footer
        brandName={settings?.brandName ?? 'My TPT Store'}
        sellerName={settings?.sellerName ?? ''}
        tptStoreUrl={settings?.tptStoreUrl ?? '#'}
        pinterestUrl={settings?.pinterestUrl ?? null}
        onOpenLegal={openLegal}
      />
      {legalContent && (
        <LegalModal
          title={legalContent.title}
          content={legalContent.content}
          onClose={() => setLegalContent(null)}
        />
      )}
      <BackToTop />
    </div>
  );
}
