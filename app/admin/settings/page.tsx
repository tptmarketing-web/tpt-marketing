'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => { setForm(data ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...(prev ?? {}), [field]: value }));
  };

  const faqs: { question: string; answer: string }[] = Array.isArray(form?.faqs) ? form.faqs : [];

  const updateFaq = (index: number, key: 'question' | 'answer', value: string) => {
    setForm((prev: any) => {
      const list = Array.isArray(prev?.faqs) ? [...prev.faqs] : [];
      list[index] = { ...(list[index] ?? { question: '', answer: '' }), [key]: value };
      return { ...(prev ?? {}), faqs: list };
    });
  };

  const addFaq = () => {
    setForm((prev: any) => {
      const list = Array.isArray(prev?.faqs) ? [...prev.faqs] : [];
      list.push({ question: '', answer: '' });
      return { ...(prev ?? {}), faqs: list };
    });
  };

  const removeFaq = (index: number) => {
    setForm((prev: any) => {
      const list = Array.isArray(prev?.faqs) ? [...prev.faqs] : [];
      list.splice(index, 1);
      return { ...(prev ?? {}), faqs: list };
    });
  };

  const moveFaq = (index: number, dir: -1 | 1) => {
    setForm((prev: any) => {
      const list = Array.isArray(prev?.faqs) ? [...prev.faqs] : [];
      const target = index + dir;
      if (target < 0 || target >= list.length) return prev;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...(prev ?? {}), faqs: list };
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('resourceType', 'image');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data?.url) {
        handleChange('sellerAvatarUrl', data.url);
        toast.success('Avatar uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Settings saved!');
      } else {
        toast.error('Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-4 border-yellow-400 border-t-transparent" /></div>;
  }

  const fields = [
    { key: 'brandName', label: 'Brand Name', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'aboutText', label: 'About Text', type: 'textarea' },
    { key: 'sellerName', label: 'Seller Name', type: 'text' },
    { key: 'sellerBio', label: 'Seller Bio', type: 'textarea' },
    { key: 'tptStoreUrl', label: 'TPT Store URL', type: 'text' },
    { key: 'contactEmail', label: 'Contact Email', type: 'text' },
    { key: 'contactPhone', label: 'Contact Phone (optional)', type: 'text' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Settings</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Seller Avatar</label>
          <div className="flex items-center gap-4">
            {form?.sellerAvatarUrl ? (
              <img src={form.sellerAvatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-yellow-200" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-3xl">👤</div>
            )}
            <div>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="text-sm" />
              {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
            </div>
          </div>
        </div>

        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                value={form?.[f.key] ?? ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              />
            ) : (
              <input
                type="text"
                value={form?.[f.key] ?? ''}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
              />
            )}
          </div>
        ))}

        {/* FAQ Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">FAQ Section</h2>
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-1 px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-700 text-sm font-semibold rounded-xl transition-colors"
            >
              + Add FAQ
            </button>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Section Title</label>
            <input
              type="text"
              value={form?.faqTitle ?? ''}
              onChange={(e) => handleChange('faqTitle', e.target.value)}
              placeholder="Frequently Asked Questions"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
            />
          </div>

          {faqs.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No FAQs yet. Click "Add FAQ" to create one.</p>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Question {i + 1}</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => moveFaq(i, -1)} disabled={i === 0} className="px-2 py-1 text-gray-500 hover:text-gray-800 disabled:opacity-30" title="Move up">↑</button>
                      <button type="button" onClick={() => moveFaq(i, 1)} disabled={i === faqs.length - 1} className="px-2 py-1 text-gray-500 hover:text-gray-800 disabled:opacity-30" title="Move down">↓</button>
                      <button type="button" onClick={() => removeFaq(i)} className="px-2 py-1 text-red-500 hover:text-red-700" title="Remove">✕</button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={faq?.question ?? ''}
                    onChange={(e) => updateFaq(i, 'question', e.target.value)}
                    placeholder="Question"
                    className="w-full px-4 py-2.5 mb-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                  />
                  <textarea
                    value={faq?.answer ?? ''}
                    onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                    placeholder="Answer"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
