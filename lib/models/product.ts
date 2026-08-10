import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPreviewImage {
  url: string;
  altText: string;
  sortOrder: number;
}

export interface IAttachedFile {
  url: string;
  fileName: string;
  fileType: string;
  sortOrder: number;
}

export interface IProduct extends Document {
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
  previewImages: IPreviewImage[];
  attachedFiles: IAttachedFile[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const PreviewImageSchema = new Schema<IPreviewImage>(
  {
    url: { type: String, required: true },
    altText: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const AttachedFileSchema = new Schema<IAttachedFile>(
  {
    url: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    resourceType: { type: String, required: true, default: 'Worksheet' },
    description: { type: String, required: true },
    targetAudience: { type: String, default: '' },
    gradeLevel: { type: String, default: '' },
    whatsIncluded: { type: String, default: '' },
    fileFormat: { type: String, default: '' },
    pageCount: { type: Number, default: null },
    educationalGoal: { type: String, default: '' },
    price: { type: Number, default: null },
    tptProductUrl: { type: String, required: true },
    previewImages: { type: [PreviewImageSchema], default: [] },
    attachedFiles: { type: [AttachedFileSchema], default: [] },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models?.Product ?? mongoose.model<IProduct>('Product', ProductSchema);
