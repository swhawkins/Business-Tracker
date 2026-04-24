import { statusColorMap } from '@/lib/utils';

export function StatusBadge({ status }: { status: string }) {
  const classes = statusColorMap[status] ?? 'bg-slate-100 text-slate-700';
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${classes}`}>{status}</span>;
}
