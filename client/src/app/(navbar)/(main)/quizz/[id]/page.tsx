"use client";

import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectQuizz } from "@/features/quizz/create-quizz/createQuizz.selectors";
import { setQuizz } from "@/features/quizz/create-quizz/createQuizz.slice";

import { useGetQuizzByIdQuery } from "../../../../../service/quizz.api";
import { QuizCreator } from "@/app/(navbar)/(main)/quizz/components/QuizCreator";
import { mapQuizzResponseToState } from "@/features/quizz/mapper/quizz.mapper";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import useQuizAutosave from "@/features/quizz/create-quizz/useQuizAutosave/useQuizAutosave";

export default function EditQuizPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const reduxQuiz = useSelector(selectQuizz);

  const { data, isLoading, isError } = useGetQuizzByIdQuery(id, {
    skip: !!reduxQuiz.id,
  });

  useEffect(() => {
    if (data?.data && !reduxQuiz.id) {
      const mapped = mapQuizzResponseToState(data.data);
      dispatch(setQuizz(mapped));
    }
  }, [data, reduxQuiz, dispatch]);

  useQuizAutosave();

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (isError) {
    return <div>Quiz not found</div>;
  }

  if (!reduxQuiz) return null;

  return <QuizCreator quizz={reduxQuiz} />;
}
