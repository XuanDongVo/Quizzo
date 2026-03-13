import { useDispatch, useSelector } from "react-redux";
import { selectCreateQuizState } from "../createQuizz.selectors";
import { useEffect, useRef, useMemo } from "react";
import debounce from "lodash/debounce";
import { useAutoSavedMutation } from "@/service/auto-saved.api";
import { toastError } from "@/lib/toast";
import { mapQuestionToRequest } from "../../mapper/question.mapper";
import { applyServerIds } from "../createQuizz.slice";

export default function useQuizAutosave() {
  const dispatch = useDispatch();
  const { quizz, dirtyQuestions, deletedQuestionIds, isDirty } = useSelector(
    selectCreateQuizState,
  );

  const [autoSaved, { isLoading, isSuccess, isError }] = useAutoSavedMutation();

  const savingRef = useRef(false);

  const saveDraft = async () => {
    if (savingRef.current) return;
    if (!quizz || !isDirty) return;

    savingRef.current = true;

    try {
      if (quizz.status === "published") {
      }

      const payload = await autoSaved({
        listCreateQuestion: {
          quizId: quizz.id,
          questionRequest:
            Object.values(dirtyQuestions).map(mapQuestionToRequest),
        },
        deletedQuestionIds: deletedQuestionIds,
      }).unwrap();

     dispatch(applyServerIds(payload.data));

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
