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

    const body = await req.json();
    const { publicId, resourceType } = body ?? {};

    if (!publicId) {
      return NextResponse.json({ error: 'No publicId provided' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType === 'raw' ? 'raw' : 'image',
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Delete failed' }, { status: 500 });
  }
}
