'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function CreateCollectionDialog({ open, onClose }: any) {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return;
    console.log('Create collection:', title);
    setTitle('');
    onClose(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              placeholder="Enter collection title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleCreate}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}