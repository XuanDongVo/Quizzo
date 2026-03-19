import { useDispatch, useSelector } from "react-redux";
import { selectCreateQuizState } from "../createQuizz.selectors";
import { useEffect, useRef, useMemo } from "react";
// import debounce from "lodash.debounce";
import { useAutoSavedMutation } from "@/service/auto-saved.api";
import { toastError } from "@/lib/toast";
import { mapQuestionToRequest } from "../../mapper/question.mapper";
import { mapQuizzInfoToRequest } from "../../mapper/quizz.mapper";
import { applyServerIds, clearDirty } from "../createQuizz.slice";
import { useUpdateQuizzMutation } from "@/service/quizz.api";

type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): DebouncedFunction<T> {
  let timer: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  debounced.flush = () => {
    if (timer) {
      clearTimeout(timer);
      fn();
      timer = null;
    }
  };

  return debounced as DebouncedFunction<T>;
}

export default function useQuizAutosave() {
  const dispatch = useDispatch();
  const { quizz, dirtyQuestions, deletedQuestionIds, isDirty } = useSelector(
    selectCreateQuizState,
  );

  const [autoSaved, { isLoading, isSuccess, isError }] = useAutoSavedMutation();
  const [updateQuizz, { isLoading: isUpdating }] = useUpdateQuizzMutation();

  const savingRef = useRef(false);

  const saveDraft = async () => {
    if (savingRef.current) return;
    if (!quizz) return;

    savingRef.current = true;
    try {
      if (quizz.status === "draft") {
        await updateQuizz({
          quizzId: quizz.id,
          quizzInfoRequest: mapQuizzInfoToRequest(quizz),
        });
      }

      if (isDirty) {
        const payload = await autoSaved({
          listCreateQuestion: {
            quizId: quizz.id,
            questionRequest:
              Object.values(dirtyQuestions).map(mapQuestionToRequest),
          },
          deletedQuestionIds: deletedQuestionIds,
        }).unwrap();

        dispatch(applyServerIds(payload.data));
      }

      dispatch(clearDirty());
    } catch (err) {
      toastError("Failed to auto-save quiz");
    }
    savingRef.current = false;
  };

  useEffect(() => {
    if (isError) {
      toastError("Failed to auto-save quiz");
    }
  }, [isError]);

  const debouncedSave = useMemo(() => debounce(saveDraft, 2000), [saveDraft]);

  useEffect(() => {
    if (!isDirty) return;
    debouncedSave();

    return () => debouncedSave.cancel();
  }, [dirtyQuestions, deletedQuestionIds, isDirty]);

  useEffect(() => {
    const handleLeave = () => {
      saveDraft();
    };
    window.addEventListener("beforeunload", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [quizz, dirtyQuestions, deletedQuestionIds, isDirty]);
}
