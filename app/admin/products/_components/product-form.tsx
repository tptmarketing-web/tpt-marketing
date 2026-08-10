'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface PreviewImage {
  url: string;
  altText: string;
  sortOrder: number;
}

interface AttachedFile {
  url: string;
  fileName: string;
  fileType: string;
  sortOrder: number;
}

interface Props {
  initialData?: any;
}

export default function ProductForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData?._id;

  const [form, setForm] = useState({
    title: initialData?.title ?? '',
    resourceType: initialData?.resourceType ?? 'Worksheet',
    description: initialData?.description ?? '',
    targetAudience: initialData?.targetAudience ?? '',
    gradeLevel: initialData?.gradeLevel ?? '',
    whatsIncluded: initialData?.whatsIncluded ?? '',
    fileFormat: initialData?.fileFormat ?? '',
    pageCount: initialData?.pageCount ?? '',
    educationalGoal: initialData?.educationalGoal ?? '',
    price: initialData?.price ?? '',
    tptProductUrl: initialData?.tptProductUrl ?? '',
    isActive: initialData?.isActive ?? true,
    sortOrder: initialData?.sortOrder ?? 0,
  });

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>(initialData?.previewImages ?? []);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>(initialData?.attachedFiles ?? []);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('resourceType', 'image');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data?.url) {
        setPreviewImages(prev => [...prev, { url: data.url, altText: '', sortOrder: prev.length }]);
        toast.success('Image uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const isImage = file.type?.startsWith('image/');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('resourceType', isImage ? 'image' : 'raw');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data?.url) {
        setAttachedFiles(prev => [...prev, {
          url: data.url,
          fileName: file.name,
          fileType: file.type ?? 'application/octet-stream',
          sortOrder: prev.length,
        }]);
        toast.success('File uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  const removeImage = (idx: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== idx));
  };

  const moveImage = (idx: number, direction: 'up' | 'down') => {
    const arr = [...previewImages];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setPreviewImages(arr.map((img, i) => ({ ...img, sortOrder: i })));
  };

  const removeFile = (idx: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const moveFile = (idx: number, direction: 'up' | 'down') => {
    const arr = [...attachedFiles];
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setAttachedFiles(arr.map((f, i) => ({ ...f, sortOrder: i })));
  };

  const handleSave = async () => {
    if (!form.title?.trim()) { toast.error('Title is required'); return; }
    if (!form.tptProductUrl?.trim()) { toast.error('TPT Product URL is required'); return; }

    setSaving(true);
    try {
      const payload = {
        ...form,
        pageCount: form.pageCount ? Number(form.pageCount) : null,
        price: form.price ? Number(form.price) : null,
        sortOrder: Number(form.sortOrder) || 0,
        previewImages,
        attachedFiles,
      };

      const url = isEdit ? `/api/products/${initialData._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEdit ? 'Product updated!' : 'Product created!');
        router.push('/admin/products');
      } else {
        const data = await res.json();
        toast.error(data?.error ?? 'Save failed');
      }
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const resourceTypes = ['Worksheet', 'Unit Plan', 'Bundle', 'Lesson Plan', 'Activity', 'Assessment', 'Game', 'Poster', 'Flashcards', 'Other'];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
          <select
            value={form.resourceType}
            onChange={e => handleChange('resourceType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none bg-white"
          >
            {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <input type="text" value={form.targetAudience} onChange={e => handleChange('targetAudience', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
          <input type="text" value={form.gradeLevel} onChange={e => handleChange('gradeLevel', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What&apos;s Included</label>
        <textarea value={form.whatsIncluded} onChange={e => handleChange('whatsIncluded', e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">File Format</label>
          <input type="text" value={form.fileFormat} onChange={e => handleChange('fileFormat', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="e.g. PDF, PPTX" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Page Count</label>
          <input type="number" value={form.pageCount} onChange={e => handleChange('pageCount', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
          <input type="number" step="0.01" value={form.price} onChange={e => handleChange('price', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Educational Goal</label>
        <textarea value={form.educationalGoal} onChange={e => handleChange('educationalGoal', e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">TPT Product URL *</label>
        <input type="url" value={form.tptProductUrl} onChange={e => handleChange('tptProductUrl', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="https://www.teacherspayteachers.com/Product/..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
          <input type="number" value={form.sortOrder} onChange={e => handleChange('sortOrder', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={e => handleChange('isActive', e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
            <span className="text-sm font-medium text-gray-700">Active (visible on landing page)</span>
          </label>
        </div>
      </div>

      {/* Preview Images */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Preview Images</h3>
        <div className="space-y-3 mb-4">
          {previewImages.map((img, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <img src={img.url} alt={img.altText ?? ''} className="w-16 h-16 object-cover rounded-lg" />
              <input
                type="text"
                value={img.altText}
                onChange={e => {
                  const updated = [...previewImages];
                  updated[idx] = { ...updated[idx], altText: e.target.value };
                  setPreviewImages(updated);
                }}
                placeholder="Alt text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button onClick={() => moveImage(idx, 'up')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move up">▲</button>
              <button onClick={() => moveImage(idx, 'down')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move down">▼</button>
              <button onClick={() => removeImage(idx)} className="p-1 hover:bg-red-100 rounded text-red-500" title="Remove">✕</button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="text-sm" />
          {uploadingImage && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>
      </div>

      {/* Attached Files */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Attached Files</h3>
        <div className="space-y-3 mb-4">
          {attachedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
              <span className="text-2xl">📁</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{file.fileName}</p>
                <p className="text-xs text-gray-500">{file.fileType}</p>
              </div>
              <button onClick={() => moveFile(idx, 'up')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move up">▲</button>
              <button onClick={() => moveFile(idx, 'down')} className="p-1 hover:bg-gray-200 rounded text-gray-500" title="Move down">▼</button>
              <button onClick={() => removeFile(idx)} className="p-1 hover:bg-red-100 rounded text-red-500" title="Remove">✕</button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <input type="file" accept=".pdf,.mp4,.mp3,.wav,.docx,.pptx,.xlsx,.png,.jpg,.jpeg" onChange={handleFileUpload} className="text-sm" />
          {uploadingFile && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>
      </div>

      <div className="border-t pt-6 flex gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button
          onClick={() => router.push('/admin/products')}
          className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
