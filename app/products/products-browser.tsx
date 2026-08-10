'use client';

import { useMemo, useState } from 'react';
import ProductCard, { ProductCardData } from '@/app/_components/product-card';

type Product = ProductCardData;

interface Props {
  products: Product[];
}

const selectClass =
  'w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer';

export default function ProductsBrowser({ products }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [format, setFormat] = useState('all');
  const [sort, setSort] = useState('default');

  // Distinct categories (resourceType)
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p?.resourceType) set.add(p.resourceType.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  // Distinct formats parsed from comma-separated fileFormat
  const formats = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      (p?.fileFormat ?? '')
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean)
        .forEach((f) => set.add(f));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const visible = useMemo(() => {
    let list = products.slice();

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => (p?.title ?? '').toLowerCase().includes(q));
    }

    if (category !== 'all') {
      list = list.filter((p) => (p?.resourceType ?? '').trim() === category);
    }

    if (format !== 'all') {
      list = list.filter((p) =>
        (p?.fileFormat ?? '')
          .split(',')
          .map((f) => f.trim().toLowerCase())
          .includes(format.toLowerCase())
      );
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => (a?.price ?? Infinity) - (b?.price ?? Infinity));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (b?.price ?? -Infinity) - (a?.price ?? -Infinity));
    }

    return list;
  }, [products, search, category, format, sort]);

  const hasFilters = search.trim() !== '' || category !== 'all' || format !== 'all' || sort !== 'default';

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 mb-10">
        <div className="flex flex-col gap-1 w-full sm:w-72">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-1">Search</label>
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-1">Category</label>
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-1">Format</label>
          <select className={selectClass} value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="all">All Formats</option>
            {formats.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-1">Sort by Price</label>
          <select className={selectClass} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {hasFilters && (
          <div className="flex flex-col gap-1 justify-end">
            <label className="text-xs font-semibold text-transparent uppercase tracking-wide pl-1 hidden sm:block">Reset</label>
            <button
              onClick={() => {
                setSearch('');
                setCategory('all');
                setFormat('all');
                setSort('default');
              }}
              className="px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mb-8">
        Showing {visible.length} of {products.length} {products.length === 1 ? 'resource' : 'resources'}
      </p>

      {visible.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No resources match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
