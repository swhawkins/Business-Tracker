import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { BusinessForm } from '@/components/BusinessForm';

export default async function EditBusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = await prisma.business.findUnique({ where: { id: Number(id) } });
  if (!business) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Edit {business.businessName}</h1>
      <BusinessForm mode="edit" initial={business} />
    </div>
  );
}
