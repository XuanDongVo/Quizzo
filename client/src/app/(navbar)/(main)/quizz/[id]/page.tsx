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

export default function EditQuizPage() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const reduxQuiz = useSelector(selectQuizz);

  const { data, isLoading, isError } = useGetQuizzByIdQuery(id, {
    skip: !!reduxQuiz,
  });

  useEffect(() => {
    console.log("Fetched quiz data:", data);
    if (data?.data && !reduxQuiz) {
      const mapped = mapQuizzResponseToState(data.data);
      
      dispatch(setQuizz(mapped));
    }
  }, [data, reduxQuiz, dispatch]);

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (isError) {
    return <div>Quiz not found</div>;
  }

  if (!reduxQuiz) return null;

  return <QuizCreator quizz={reduxQuiz} />;
}