import { prisma } from '@/lib/prisma';

export default async function WatchZonesPage() {
  const zones = await prisma.watchZone.findMany({ orderBy: { priorityLevel: 'asc' } });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Watch Zones</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {zones.map((zone) => (
          <article key={zone.id} className="rounded border bg-white p-4">
            <h2 className="text-lg font-semibold">{zone.zoneName}</h2>
            <p className="text-sm text-slate-500">{zone.city} · {zone.priorityLevel} priority</p>
            <p className="mt-2 text-sm">{zone.description}</p>
            {zone.notes && <p className="mt-1 text-sm">Notes: {zone.notes}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
