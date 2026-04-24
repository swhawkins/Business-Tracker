import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { StatusBadge } from '@/components/StatusBadge';
import { CsvImport } from '@/components/CsvImport';

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const where = {
    city: params.city || undefined,
    status: params.status || undefined,
    businessType: params.businessType || undefined,
    stage: params.stage || undefined,
    confidenceScore: params.minConfidence ? { gte: Number(params.minConfidence) } : undefined,
  };

  const businesses = await prisma.business.findMany({
    where,
    orderBy: { lastUpdatedDate: 'desc' },
  });

  const [total, confirmed, highConfidence, earlySignals, rumors] = await Promise.all([
    prisma.business.count(),
    prisma.business.count({ where: { status: 'Confirmed' } }),
    prisma.business.count({ where: { status: 'High Confidence Incoming' } }),
    prisma.business.count({ where: { status: 'Early Signal' } }),
    prisma.business.count({ where: { status: 'Rumor / Monitoring' } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Business Intelligence Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/businesses/new" className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Add Business</Link>
          <a href="/api/businesses/export" className="rounded border px-4 py-2 text-sm">Export CSV</a>
        </div>
      </div>

      <CsvImport />

      <div className="grid gap-3 md:grid-cols-5">
        {[
          ['Total tracked', total],
          ['Confirmed', confirmed],
          ['High confidence', highConfidence],
          ['Early signals', earlySignals],
          ['Rumors', rumors],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded border bg-white p-4 shadow-sm">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="text-2xl font-semibold">{value}</div>
          </div>
        ))}
      </div>

      <form className="grid gap-2 rounded border bg-white p-3 md:grid-cols-6">
        <input className="rounded border p-2" name="city" placeholder="City" defaultValue={params.city} />
        <input className="rounded border p-2" name="status" placeholder="Status" defaultValue={params.status} />
        <input className="rounded border p-2" name="businessType" placeholder="Type" defaultValue={params.businessType} />
        <input className="rounded border p-2" name="stage" placeholder="Stage" defaultValue={params.stage} />
        <input className="rounded border p-2" type="number" name="minConfidence" placeholder="Min confidence" defaultValue={params.minConfidence} />
        <button className="rounded bg-slate-900 px-4 py-2 text-white">Apply Filters</button>
      </form>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Business</th>
              <th className="p-2 text-left">City</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Stage</th>
              <th className="p-2 text-left">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2 font-medium"><Link href={`/businesses/${b.id}`} className="hover:underline">{b.businessName}</Link></td>
                <td className="p-2">{b.city}</td>
                <td className="p-2">{b.businessType}</td>
                <td className="p-2"><StatusBadge status={b.status} /></td>
                <td className="p-2">{b.stage}</td>
                <td className="p-2">{b.confidenceScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
