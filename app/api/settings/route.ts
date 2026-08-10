export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SiteSettings } from '@/lib/models/site-settings';
import { getSession } from '@/lib/session';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne().lean();
    if (!settings) {
      await seedDatabase();
      settings = await SiteSettings.findOne().lean();
    }
    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const settings = await SiteSettings.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Failed to update settings' }, { status: 500 });
  }
}
