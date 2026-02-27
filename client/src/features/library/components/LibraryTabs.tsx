import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyQuizzesTab from './MyQuizzesTab';
import FavoritesTab from './FavoritesTab';
import CollectionsTab from './CollectionsTab';

interface Props {
  activeTab: string;
  onTabChange: (value: string) => void;
  onCreateQuiz: () => void;
  onCreateCollection: () => void;
}

export default function LibraryTabs({
  activeTab,
  onTabChange,
  onCreateQuiz,
  onCreateCollection,
}: Props) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="myQuizzes">My Quizzes</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
        <TabsTrigger value="collections">Collections</TabsTrigger>
      </TabsList>

      <TabsContent value="myQuizzes">
        <MyQuizzesTab onCreateQuiz={onCreateQuiz} />
      </TabsContent>

      <TabsContent value="favorites">
        <FavoritesTab />
      </TabsContent>

      <TabsContent value="collections">
        <CollectionsTab onCreateCollection={onCreateCollection} />
      </TabsContent>
    </Tabs>
  );
}