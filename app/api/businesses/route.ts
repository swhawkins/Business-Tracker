import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const confidence = Number(body.confidenceScore);

  const business = await prisma.business.create({
    data: {
      businessName: body.businessName,
      businessType: body.businessType,
      city: body.city,
      county: body.county || 'Pottawatomie',
      address: body.address || null,
      parcelNumber: body.parcelNumber || null,
      latitude: body.latitude ? Number(body.latitude) : null,
      longitude: body.longitude ? Number(body.longitude) : null,
      status: body.status,
      stage: body.stage,
      confidenceScore: confidence,
      description: body.description || null,
      notes: body.notes || null,
      isArchived: body.isArchived === 'on',
    },
  });

  await prisma.activityLog.create({
    data: { businessId: business.id, action: 'CREATED', newValue: JSON.stringify(business) },
  });

  await prisma.confidenceHistory.create({
    data: { businessId: business.id, score: confidence, note: 'Initial creation score' },
  });

  return NextResponse.json(business);
}
