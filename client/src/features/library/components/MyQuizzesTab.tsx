import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {QuizCard} from "@/components/shared/QuizCard";

export default function MyQuizzesTab({onCreateQuiz}: {onCreateQuiz: () => void;}) {
  const quizzes = [
  {
    id: 1,
    title: "Get Smarter with Productivity Quizz...",
    author: "Titus Kitamura",
    authorAvatar: "https://i.pravatar.cc/100?img=1",
    questionCount: 16,
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Great Ideas Come from Brilliant Min...",
    author: "Athena Schuessler",
    authorAvatar: "https://i.pravatar.cc/100?img=2",
    questionCount: 10,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Master Your Time Management Skills",
    author: "David Chen",
    authorAvatar: "https://i.pravatar.cc/100?img=3",
    questionCount: 12,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Creative Thinking for Beginners",
    author: "Sarah Miller",
    authorAvatar: "https://i.pravatar.cc/100?img=4",
    questionCount: 8,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
  },
];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{quizzes.length} Quizzes</h2>
        <Button onClick={onCreateQuiz} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Quiz
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>
    </>
  );
}
