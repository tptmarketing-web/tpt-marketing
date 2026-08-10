import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  brandName: string;
  tagline: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string | null;
  sellerName: string;
  sellerBio: string;
  sellerAvatarUrl: string | null;
  tptStoreUrl: string;
  privacyPolicy: string;
  termsOfService: string;
  refundPolicy: string;
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    brandName: { type: String, required: true, default: 'My TPT Store' },
    tagline: { type: String, required: true, default: 'Quality Educational Resources for Every Classroom' },
    aboutText: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, default: null },
    sellerName: { type: String, required: true },
    sellerBio: { type: String, required: true },
    sellerAvatarUrl: { type: String, default: null },
    tptStoreUrl: { type: String, required: true },
    privacyPolicy: { type: String, required: true },
    termsOfService: { type: String, required: true },
    refundPolicy: { type: String, required: true },
    faqTitle: { type: String, default: 'Frequently Asked Questions' },
    faqs: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models?.SiteSettings ?? mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
