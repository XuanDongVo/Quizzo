"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Globe, Shuffle, BarChart3, Target } from "lucide-react";
import { useDispatch } from "react-redux";
import { setField } from "@/features/quizz/create-quizz/createQuizz.slice";
import { QuizzData } from "@/types/quiz/quiz-types";

export function QuizSettings({ quizz }: { quizz: QuizzData }) {
  const dispatch = useDispatch();
  const [passingScoreDraft, setPassingScoreDraft] = useState(quizz.passingScore);

  useEffect(() => {
    setPassingScoreDraft(quizz.passingScore);
  }, [quizz.passingScore]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold font-display text-foreground">
          Quiz Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Configure how your quiz behaves when taken.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Public toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Public Quiz
              </Label>
              <p className="text-xs text-muted-foreground">
                Anyone with the link can take this quiz
              </p>
            </div>
          </div>
          <Switch
            checked={quizz.isPublic}
            onCheckedChange={(v) => dispatch(setField({ isPublic: v }))}
          />
        </div>

        {/* Shuffle toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Shuffle className="h-5 w-5 text-accent" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Shuffle Questions
              </Label>
              <p className="text-xs text-muted-foreground">
                Randomize the order of questions
              </p>
            </div>
          </div>
          <Switch
            checked={quizz.shuffleQuestions}
            onCheckedChange={(v) => dispatch(setField({ shuffleQuestions: v }))}
          />
        </div>

        {/* Show results toggle */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-answer-b/10">
              <BarChart3 className="h-5 w-5 text-answer-b" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-foreground">
                Show Results
              </Label>
              <p className="text-xs text-muted-foreground">
                Show correct answers after completion
              </p>
            </div>
          </div>
          <Switch
            checked={quizz.showResults}
            onCheckedChange={(v) => dispatch(setField({ showResults: v }))}
          />
        </div>

        {/* Passing score slider */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-answer-a/10">
              <Target className="h-5 w-5 text-answer-a" />
            </div>
            <div className="flex-1">
              <Label className="text-sm font-semibold text-foreground">
                Passing Score
              </Label>
              <p className="text-xs text-muted-foreground">
                Minimum score to pass the quiz
              </p>
            </div>
            <span className="text-lg font-bold text-primary">
              {passingScoreDraft}%
            </span>
          </div>
          <Slider
            value={[passingScoreDraft]}
            onValueChange={([v]) => setPassingScoreDraft(v)}
            onValueCommit={([v]) => dispatch(setField({ passingScore: v }))}
            min={0}
            max={100}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
