'use client';

import { useState } from 'react';
import LibraryTabs from '@/features/library/components/LibraryTabs';
import CreateQuizDialog from '@/features/library/components/CreateQuizDialog';
import CreateCollectionDialog from '@/features/library/components/CreateCollectionDialog';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('myQuizzes');
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LibraryTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCreateQuiz={() => setShowCreateQuiz(true)}
          onCreateCollection={() => setShowCreateCollection(true)}
        />
      </main>

      <CreateQuizDialog
        open={showCreateQuiz}
        onClose={setShowCreateQuiz}
      />

      <CreateCollectionDialog
        open={showCreateCollection}
        onClose={setShowCreateCollection}
      />
    </div>
  );
}