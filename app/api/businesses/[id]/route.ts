export const runtime = 'nodejs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const businessId = Number(id);
  const existing = await prisma.business.findUnique({ where: { id: businessId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const confidence = Number(body.confidenceScore);
  const updated = await prisma.business.update({
    where: { id: businessId },
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
    data: { businessId, action: 'UPDATED', oldValue: JSON.stringify(existing), newValue: JSON.stringify(updated) },
  });

  if (existing.confidenceScore !== confidence) {
    await prisma.confidenceHistory.create({
      data: { businessId, score: confidence, note: 'Updated from edit form' },
    });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const businessId = Number(id);

  await prisma.activityLog.create({ data: { businessId, action: 'DELETED' } });
  await prisma.business.delete({ where: { id: businessId } });
  return NextResponse.json({ success: true });
}
