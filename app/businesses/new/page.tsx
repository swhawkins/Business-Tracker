import { BusinessForm } from '@/components/BusinessForm';

export default function NewBusinessPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Add Business Entry</h1>
      <BusinessForm mode="create" />
    </div>
  );
}
