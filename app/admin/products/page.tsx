'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  title: string;
  gradeLevel: string;
  isActive: boolean;
  sortOrder: number;
  resourceType: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products/all');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const toggleActive = async (product: Product) => {
    try {
      await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      await fetchProducts();
      toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'}`);
    } catch {
      toast.error('Update failed');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      await fetchProducts();
      toast.success('Product deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const moveProduct = async (product: Product, direction: 'up' | 'down') => {
    const sorted = [...products].sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));
    const idx = sorted.findIndex(p => p._id === product._id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    try {
      await Promise.all([
        fetch(`/api/products/${sorted[idx]?._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: sorted[swapIdx]?.sortOrder ?? 0 }),
        }),
        fetch(`/api/products/${sorted[swapIdx]?._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: sorted[idx]?.sortOrder ?? 0 }),
        }),
      ]);
      await fetchProducts();
    } catch {
      toast.error('Reorder failed');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => router.push('/admin/products/new')}
          className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl transition-colors"
        >
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-500">No products yet. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...(products ?? [])].sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0)).map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => moveProduct(product, 'up')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move up">▲</button>
                        <button onClick={() => moveProduct(product, 'down')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move down">▼</button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{product?.title ?? 'Untitled'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product?.resourceType ?? ''}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product?.gradeLevel ?? ''}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(product)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                          product?.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {product?.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => router.push(`/admin/products/${product._id}`)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
