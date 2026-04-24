'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CsvImport() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const input = (e.currentTarget.elements.namedItem('file') as HTMLInputElement);
        if (!input.files?.length) return;
        const file = input.files[0];
        const text = await file.text();
        setBusy(true);
        const res = await fetch('/api/businesses/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ csv: text }),
        });
        setBusy(false);
        if (!res.ok) return alert('Import failed');
        router.refresh();
      }}
    >
      <input type="file" name="file" accept=".csv" className="text-sm" />
      <button type="submit" disabled={busy} className="rounded border px-3 py-1 text-sm">{busy ? 'Importing...' : 'Import CSV'}</button>
    </form>
  );
}
