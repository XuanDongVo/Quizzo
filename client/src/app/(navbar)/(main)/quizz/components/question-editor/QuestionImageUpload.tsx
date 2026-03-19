"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionImageUploadProps {
  imageUrl?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function QuestionImageUpload({
  imageUrl,
  onUpload,
  onRemove,
}: QuestionImageUploadProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        type="button"
        onClick={() => imageInputRef.current?.click()}
        className={cn(
          "w-full overflow-hidden rounded-2xl border-2 border-dashed transition-all",
          imageUrl
            ? "h-40 border-primary/20 md:h-52"
            : "h-32 border-border hover:border-primary/40 md:h-40",
        )}
      >
        {imageUrl ? (
          <div className="group relative h-full w-full">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Question"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-sm font-medium text-background">
                Change Image
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute right-2 top-2 rounded-lg bg-foreground/60 p-1.5 text-background transition-colors hover:bg-foreground/80"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">Add question image (optional)</span>
          </div>
        )}
      </button>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </div>
  );
}
