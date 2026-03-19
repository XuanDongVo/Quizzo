"use client";

import { Clock, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface QuestionSettingsProps {
  timeLimit: number;
  score: number;
  onTimeLimitChange: (value: number) => void;
  onScoreChange: (value: number) => void;
}

export function QuestionSettings({
  timeLimit,
  score,
  onTimeLimitChange,
  onScoreChange,
}: QuestionSettingsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <Label className="text-xs font-semibold text-foreground">Time Limit</Label>
        </div>
        <Slider
          value={[timeLimit]}
          onValueChange={([v]) => onTimeLimitChange(v)}
          min={5}
          max={60}
          step={5}
        />
        <span className="text-sm font-semibold text-primary">{timeLimit}s</span>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          <Label className="text-xs font-semibold text-foreground">Points</Label>
        </div>
        <Slider
          value={[score]}
          onValueChange={([v]) => onScoreChange(v)}
          min={5}
          max={50}
          step={5}
        />
        <span className="text-sm font-semibold text-accent">{score}pts</span>
      </div>
    </div>
  );
}
