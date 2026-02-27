import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreateQuizzMutation } from "@/stores/api/quizz.api";
import { useDispatch } from "react-redux";
import { setQuizz } from "@/stores/create-quizz/createQuizz.slice";
import { mapQuizzResponseToState } from "@/features/quizz/mapper/quizz.mapper";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toastError, toastSuccess } from "@/lib/toast";

export default function CreateQuizDialog({ open, onClose }: any) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const [createQuizz, { isLoading, isSuccess, isError }] =
    useCreateQuizzMutation();
  const router = useRouter();

const handleCreate = async () => {
  if (!title.trim()) return;

  try {
    const res = await createQuizz({ title }).unwrap();
    const quizzMapper = mapQuizzResponseToState(res.data);
    
    dispatch(setQuizz(quizzMapper));

    onClose(false);
    setTitle("");

    router.push(`/quizz/${res.data.quizzId}`);
  } catch (err: any) {
    toastError(err?.data?.message || "Failed to create quiz");
  }
};

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Create New Quiz
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Enter a title to start creating your quiz.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Title</Label>
            <Input
              id="quiz-title"
              placeholder="e.g. Java Basics Test"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onClose(false);
              setTitle("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={isLoading || !title.trim()}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Quiz"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
