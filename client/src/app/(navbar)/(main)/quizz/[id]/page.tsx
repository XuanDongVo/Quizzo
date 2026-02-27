import { QuizCreator } from "@/app/(navbar)/(main)/quizz/components/QuizCreator";
import { selectQuizz } from "@/stores/create-quizz/createQuizz.selectors";
import { useSelector } from "react-redux";


export default function CreateQuizPage() {
  const quiz = useSelector(selectQuizz);
  if (!quiz) {
    return;
  }

  return <QuizCreator quiz={quiz} />;
}
