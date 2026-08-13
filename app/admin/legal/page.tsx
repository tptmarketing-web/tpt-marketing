'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import RichTextEditor from '@/components/rich-text-editor';

export default function AdminLegalPage() {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setForm({
          privacyPolicy: data?.privacyPolicy ?? '',
          termsOfService: data?.termsOfService ?? '',
          refundPolicy: data?.refundPolicy ?? '',
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Legal pages saved!');
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

  const sections = [
    { key: 'privacyPolicy', label: 'Privacy Policy' },
    { key: 'termsOfService', label: 'Terms of Service' },
    { key: 'refundPolicy', label: 'Refund Policy' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Legal Pages</h1>
      <div className="space-y-6">
        {sections.map(s => (
          <div key={s.key} className="bg-white rounded-2xl shadow-sm p-6">
            <label className="block text-lg font-bold text-gray-800 mb-3">{s.label}</label>
            <RichTextEditor
              value={form?.[s.key] ?? ''}
              onChange={html => setForm((prev: any) => ({ ...(prev ?? {}), [s.key]: html }))}
              minHeight={320}
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Legal Pages'}
        </button>
      </div>
    </div>
  );
}
