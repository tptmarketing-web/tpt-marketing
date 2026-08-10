export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/product';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const products = await Product.find().sort({ sortOrder: 1 }).lean();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to fetch products' }, { status: 500 });
  }
}
