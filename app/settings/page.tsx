import { prisma } from '@/lib/prisma';

export default async function SettingsPage() {
  const settings = await prisma.appSetting.findMany({ orderBy: { key: 'asc' } });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Settings</h1>
      <div className="rounded border bg-white p-4">
        <p className="mb-3 text-sm text-slate-600">Simple configuration values used by the tracker.</p>
        <ul className="space-y-2 text-sm">
          {settings.map((setting) => (
            <li key={setting.id} className="rounded border p-2">
              <strong>{setting.key}:</strong> {setting.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
