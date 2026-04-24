import { prisma } from '@/lib/prisma';
import Papa from 'papaparse';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { csv } = await req.json();
  const parsed = Papa.parse<Record<string, string>>(csv, { header: true, skipEmptyLines: true });

  for (const row of parsed.data) {
    if (!row.businessName) continue;
    const created = await prisma.business.create({
      data: {
        businessName: row.businessName,
        businessType: row.businessType || 'Unknown',
        city: row.city || 'Shawnee',
        county: row.county || 'Pottawatomie',
        address: row.address || null,
        parcelNumber: row.parcelNumber || null,
        latitude: row.latitude ? Number(row.latitude) : null,
        longitude: row.longitude ? Number(row.longitude) : null,
        status: row.status || 'Early Signal',
        stage: row.stage || 'Land Identified',
        confidenceScore: row.confidenceScore ? Number(row.confidenceScore) : 50,
        description: row.description || null,
        notes: row.notes || null,
        isArchived: row.isArchived === 'true',
      },
    });
    await prisma.activityLog.create({ data: { businessId: created.id, action: 'IMPORTED_CSV', newValue: JSON.stringify(row) } });
  }

  return NextResponse.json({ imported: parsed.data.length });
}
