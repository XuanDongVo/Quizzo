"use client";

import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  fullPage?: boolean;
  className?: string;
}

export function LoadingSpinner({
  size = 40,
  fullPage = false,
  className = "",
}: LoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2
          className={`animate-spin text-gray-400 ${className}`}
          size={size}
        />
      </div>
    );
  }

  return (
    <Loader2
      className={`animate-spin text-gray-400 ${className}`}
      size={size}
    />
  );
}