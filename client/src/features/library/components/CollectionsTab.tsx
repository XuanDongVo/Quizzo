import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CollectionCard from './CollectionCard';

const collections = [
  { id: 1, title: 'General Knowledge', image: 'bg-purple-400', count: 8 },
];

export default function CollectionsTab({
  onCreateCollection,
}: {
  onCreateCollection: () => void;
}) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{collections.length} Collections</h2>
        <Button onClick={onCreateCollection} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Collection
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>
    </>
  );
}