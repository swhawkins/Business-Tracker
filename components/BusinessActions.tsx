'use client';

import { useRouter } from 'next/navigation';

export function DeleteBusinessButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <button
      className="rounded bg-red-600 px-3 py-1 text-xs text-white"
      onClick={async () => {
        if (!confirm('Delete this business entry?')) return;
        await fetch(`/api/businesses/${id}`, { method: 'DELETE' });
        router.push('/');
        router.refresh();
      }}
    >
      Delete
    </button>
  );
}
