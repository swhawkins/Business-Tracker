'use client';

import { CITIES, STAGE_OPTIONS, STATUS_OPTIONS } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BusinessFormProps = {
  initial?: Record<string, any>;
  mode: 'create' | 'edit';
};

export function BusinessForm({ initial, mode }: BusinessFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = Object.fromEntries(formData.entries());
    const method = mode === 'create' ? 'POST' : 'PUT';
    const url = mode === 'create' ? '/api/businesses' : `/api/businesses/${initial?.id}`;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      alert('Failed to save business entry.');
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-2">
      <input type="text" name="businessName" required defaultValue={initial?.businessName} placeholder="Business name" className="rounded border p-2" />
      <input type="text" name="businessType" required defaultValue={initial?.businessType} placeholder="Business type" className="rounded border p-2" />

      <select name="city" required defaultValue={initial?.city ?? 'Shawnee'} className="rounded border p-2">
        {CITIES.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <input type="text" name="county" defaultValue={initial?.county ?? 'Pottawatomie'} className="rounded border p-2" />

      <select name="status" required defaultValue={initial?.status ?? 'Early Signal'} className="rounded border p-2">
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <select name="stage" required defaultValue={initial?.stage ?? 'Land Identified'} className="rounded border p-2">
        {STAGE_OPTIONS.map((stage) => (
          <option key={stage} value={stage}>{stage}</option>
        ))}
      </select>

      <input type="number" name="confidenceScore" min={0} max={100} required defaultValue={initial?.confidenceScore ?? 50} className="rounded border p-2" />
      <input type="text" name="address" defaultValue={initial?.address ?? ''} placeholder="Address" className="rounded border p-2" />
      <input type="text" name="parcelNumber" defaultValue={initial?.parcelNumber ?? ''} placeholder="Parcel number" className="rounded border p-2" />
      <input type="number" step="any" name="latitude" defaultValue={initial?.latitude ?? ''} placeholder="Latitude" className="rounded border p-2" />
      <input type="number" step="any" name="longitude" defaultValue={initial?.longitude ?? ''} placeholder="Longitude" className="rounded border p-2" />
      <textarea name="description" defaultValue={initial?.description ?? ''} placeholder="Description" className="rounded border p-2 md:col-span-2" />
      <textarea name="notes" defaultValue={initial?.notes ?? ''} placeholder="Investigative notes" className="rounded border p-2 md:col-span-2" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isArchived" defaultChecked={initial?.isArchived ?? false} /> Archive entry
      </label>
      <button type="submit" disabled={loading} className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2">
        {loading ? 'Saving...' : mode === 'create' ? 'Add Business' : 'Update Business'}
      </button>
    </form>
  );
}
