export const runtime = 'nodejs';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const businesses = await prisma.business.findMany({ orderBy: { id: 'asc' } });
  const header = [
    'id','businessName','businessType','city','county','address','parcelNumber','latitude','longitude','status','stage','confidenceScore','description','notes','firstDetectedDate','lastUpdatedDate','isArchived'
  ];
  const rows = businesses.map((b) => header.map((key) => JSON.stringify((b as any)[key] ?? '')).join(','));
  const csv = [header.join(','), ...rows].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="business-tracker-export.csv"',
    },
  });
}
