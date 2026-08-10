'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardData {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  lastUpdated: string | null;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [productsRes, settingsRes] = await Promise.all([
          fetch('/api/products/all'),
          fetch('/api/settings'),
        ]);
        const products = await productsRes.json();
        const settings = await settingsRes.json();
        const productList = Array.isArray(products) ? products : [];
        setData({
          totalProducts: productList.length,
          activeProducts: productList.filter((p: any) => p?.isActive).length,
          inactiveProducts: productList.filter((p: any) => !p?.isActive).length,
          lastUpdated: settings?.updatedAt ?? null,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent" /></div>;
  }

  const cards = [
    { label: 'Total Products', value: data?.totalProducts ?? 0, color: 'bg-blue-50 text-blue-600', icon: '📦' },
    { label: 'Active', value: data?.activeProducts ?? 0, color: 'bg-green-50 text-green-600', icon: '✅' },
    { label: 'Inactive', value: data?.inactiveProducts ?? 0, color: 'bg-orange-50 text-orange-600', icon: '⏸️' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className={`${card.color} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-sm font-medium opacity-80">{card.label}</span>
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
          </div>
        ))}
      </div>

      {data?.lastUpdated && (
        <p className="text-sm text-gray-500 mb-8" suppressHydrationWarning>
          Site settings last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', { timeZone: 'UTC' })}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => router.push('/admin/settings')} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left">
          <span className="text-2xl mb-2 block">⚙️</span>
          <span className="font-bold text-gray-800">Site Settings</span>
          <p className="text-sm text-gray-500 mt-1">Update brand name, tagline, seller info</p>
        </button>
        <button onClick={() => router.push('/admin/products')} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left">
          <span className="text-2xl mb-2 block">📦</span>
          <span className="font-bold text-gray-800">Products</span>
          <p className="text-sm text-gray-500 mt-1">Manage your educational resources</p>
        </button>
        <button onClick={() => router.push('/admin/legal')} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left">
          <span className="text-2xl mb-2 block">📄</span>
          <span className="font-bold text-gray-800">Legal Pages</span>
          <p className="text-sm text-gray-500 mt-1">Edit privacy, terms, refund policies</p>
        </button>
        <a href="/" target="_blank" rel="noopener noreferrer" className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left">
          <span className="text-2xl mb-2 block">👁️</span>
          <span className="font-bold text-gray-800">View Site</span>
          <p className="text-sm text-gray-500 mt-1">See your live landing page</p>
        </a>
      </div>
    </div>
  );
}
