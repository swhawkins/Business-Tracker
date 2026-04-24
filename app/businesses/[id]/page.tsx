import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DeleteBusinessButton } from '@/components/BusinessActions';
import { StatusBadge } from '@/components/StatusBadge';

export default async function BusinessDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = await prisma.business.findUnique({
    where: { id: Number(id) },
    include: {
      sources: { orderBy: { dateFound: 'desc' } },
      activities: { orderBy: { timestamp: 'desc' } },
      confidenceHistory: { orderBy: { recordedAt: 'desc' } },
    },
  });

  if (!business) notFound();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{business.businessName}</h1>
          <div className="mt-1"><StatusBadge status={business.status} /></div>
        </div>
        <div className="flex gap-2">
          <Link href={`/businesses/${business.id}/edit`} className="rounded border px-3 py-1 text-sm">Edit</Link>
          <DeleteBusinessButton id={business.id} />
        </div>
      </div>

      <div className="grid gap-3 rounded border bg-white p-4 md:grid-cols-2">
        <p><strong>City:</strong> {business.city}</p>
        <p><strong>Type:</strong> {business.businessType}</p>
        <p><strong>Stage:</strong> {business.stage}</p>
        <p><strong>Confidence:</strong> {business.confidenceScore}%</p>
        <p><strong>Address:</strong> {business.address ?? 'N/A'}</p>
        <p><strong>Parcel:</strong> {business.parcelNumber ?? 'N/A'}</p>
        <p><strong>Latitude:</strong> {business.latitude ?? 'N/A'}</p>
        <p><strong>Longitude:</strong> {business.longitude ?? 'N/A'}</p>
        <p className="md:col-span-2"><strong>Description:</strong> {business.description ?? 'N/A'}</p>
        <p className="md:col-span-2"><strong>Notes:</strong> {business.notes ?? 'N/A'}</p>
      </div>

      <section className="rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Sources</h2>
        <ul className="space-y-2 text-sm">
          {business.sources.map((s) => (
            <li key={s.id} className="rounded border p-2">
              <div className="font-medium">{s.sourceName} ({s.sourceType})</div>
              <div>Reliability: {s.reliabilityScore}%</div>
              <div>{s.summary}</div>
            </li>
          ))}
          {business.sources.length === 0 && <li>No sources logged yet.</li>}
        </ul>
      </section>

      <section className="rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Confidence History</h2>
        <ul className="space-y-1 text-sm">
          {business.confidenceHistory.map((item) => (
            <li key={item.id}>{item.recordedAt.toISOString().slice(0, 10)} — {item.score}% ({item.note ?? 'N/A'})</li>
          ))}
        </ul>
      </section>

      <section className="rounded border bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Activity Log</h2>
        <ul className="space-y-2 text-sm">
          {business.activities.map((a) => (
            <li key={a.id} className="rounded border p-2">
              <div className="font-medium">{a.action}</div>
              <div>{a.timestamp.toISOString()}</div>
              {a.userNote && <div>Note: {a.userNote}</div>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
