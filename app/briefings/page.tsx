import { prisma } from '@/lib/prisma';

export default async function BriefingsPage() {
  const briefings = await prisma.briefing.findMany({ orderBy: { briefingDate: 'desc' } });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Weekly Intelligence Briefings</h1>
        <div className="flex gap-2">
          <form action="/api/briefings/generate" method="post">
            <button className="rounded bg-slate-900 px-4 py-2 text-sm text-white">Generate This Week</button>
          </form>
          <a className="rounded border px-4 py-2 text-sm" href="/api/briefings/pdf">Export PDF</a>
        </div>
      </div>
      <div className="space-y-3">
        {briefings.map((briefing) => (
          <article key={briefing.id} className="rounded border bg-white p-4">
            <h2 className="text-lg font-semibold">{briefing.title}</h2>
            <p className="text-xs text-slate-500">{briefing.briefingDate.toISOString().slice(0, 10)}</p>
            <p className="mt-2">{briefing.summary}</p>
            <ul className="mt-3 list-disc pl-6 text-sm">
              <li><strong>Confirmed updates:</strong> {briefing.confirmedUpdates}</li>
              <li><strong>Early signals:</strong> {briefing.earlySignals}</li>
              <li><strong>Rumors:</strong> {briefing.rumors}</li>
              <li><strong>Debunked:</strong> {briefing.debunkedItems}</li>
              <li><strong>Recommended updates:</strong> {briefing.recommendedTrackerUpdates}</li>
            </ul>
          </article>
        ))}
        {briefings.length === 0 && <p>No briefings yet. Generate one for this week.</p>}
      </div>
    </div>
  );
}
