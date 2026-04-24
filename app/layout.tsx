import './globals.css';
import { Nav } from '@/components/Nav';

export const metadata = {
  title: 'Pottawatomie County Business Intelligence Tracker',
  description: 'Track incoming, rumored, and confirmed businesses across Pottawatomie County, Oklahoma.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container-padded">{children}</main>
      </body>
    </html>
  );
}
