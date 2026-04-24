import Link from 'next/link';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/briefings', label: 'Weekly Briefings' },
  { href: '/watch-zones', label: 'Watch Zones' },
  { href: '/settings', label: 'Admin Settings' },
];

export function Nav() {
  return (
    <header className="border-b bg-white">
      <div className="container-padded flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Pottawatomie County Business Intelligence Tracker
        </Link>
        <nav className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-600 hover:text-slate-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
