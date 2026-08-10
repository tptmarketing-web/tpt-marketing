export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Product } from '@/lib/models/product';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to create product' }, { status: 500 });
  }
}
