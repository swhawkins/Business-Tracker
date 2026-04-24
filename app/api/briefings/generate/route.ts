export const runtime = 'nodejs';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function POST() {
  const [confirmed, early, rumors, debunked] = await Promise.all([
    prisma.business.findMany({ where: { status: 'Confirmed', isArchived: false } }),
    prisma.business.findMany({ where: { status: 'Early Signal', isArchived: false } }),
    prisma.business.findMany({ where: { status: { in: ['Rumor / Monitoring', 'Monitoring'] }, isArchived: false } }),
    prisma.business.findMany({ where: { status: 'Debunked / No Evidence', isArchived: false } }),
  ]);

  const date = new Date();
  const title = `Weekly Briefing - ${date.toISOString().slice(0, 10)}`;

  await prisma.briefing.create({
    data: {
      briefingDate: date,
      title,
      summary: `Tracker currently has ${confirmed.length} confirmed projects, ${early.length} early signals, and ${rumors.length} monitored rumors.`,
      confirmedUpdates: confirmed.map((b) => b.businessName).join(', ') || 'None',
      earlySignals: early.map((b) => b.businessName).join(', ') || 'None',
      rumors: rumors.map((b) => b.businessName).join(', ') || 'None',
      debunkedItems: debunked.map((b) => b.businessName).join(', ') || 'None',
      recommendedTrackerUpdates: 'Review confidence scores, update source reliability, and archive stale records.',
    },
  });

  redirect('/briefings');
}
