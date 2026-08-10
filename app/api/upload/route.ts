export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const resourceType = (formData.get('resourceType') as string) ?? 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const folder = resourceType === 'image' ? 'tpt-landing/images' : 'tpt-landing/files';

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType === 'raw' ? 'raw' : 'image',
          folder,
        },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: result?.secure_url ?? result?.url ?? '',
      publicId: result?.public_id ?? '',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Upload failed' }, { status: 500 });
  }
}
