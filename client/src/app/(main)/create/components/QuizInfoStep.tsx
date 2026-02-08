"use client"

import React from "react"

import { CATEGORIES } from "@/types/quiz/quiz-types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCallback, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectQuizz,
} from "@/stores/create-quizz/createQuizz.selectors"
import { setField } from "@/stores/create-quizz/createQuizz.slice"

export function QuizInfoStep() {
  const dispatch = useDispatch()
  const quizz = useSelector(selectQuizz)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleImageUpload = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file)
      dispatch(setField({ coverImageUrl: url }))
    },
    [dispatch]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file?.type.startsWith("image/")) {
        handleImageUpload(file)
      }
    },
    [handleImageUpload]
  )

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      {/* Cover Image */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-semibold text-foreground">Cover Image</Label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all overflow-hidden",
            "h-48 md:h-64",
            dragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
            quizz.coverImageUrl && "border-solid border-primary/30"
          )}
        >
          {quizz.coverImageUrl ? (
            <img
              src={quizz.coverImageUrl || "/placeholder.svg"}
              alt="Quiz cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <ImagePlus className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Drop an image here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          )}
          {quizz.coverImageUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-sm font-medium text-background">Change Image</p>
            </div>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleImageUpload(file)
          }}
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title" className="text-sm font-semibold text-foreground">Title</Label>
        <Input
          id="title"
          placeholder="Enter your quiz title..."
          value={quizz.title}
          onChange={(e) => dispatch(setField({ title: e.target.value }))}
          className="h-12 rounded-xl text-base"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="text-sm font-semibold text-foreground">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this quiz is about..."
          value={quizz.description}
          onChange={(e) => dispatch(setField({ description: e.target.value }))}
          className="min-h-[100px] rounded-xl text-base resize-none"
        />
      </div>

      {/* Category & Difficulty row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground">Category</Label>
          <Select
            value={quizz.category}
            onValueChange={(v) => dispatch(setField({ category: v }))}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <div className="flex flex-col gap-2">
          <Label className="text-sm font-semibold text-foreground">Difficulty</Label>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => dispatch({ type: "SET_FIELD", field: "difficulty", value: level })}
                className={cn(
                  "flex-1 rounded-xl py-3 text-sm font-medium capitalize transition-all",
                  quizz.difficulty === level
                    ? level === "easy"
                      ? "bg-answer-b text-background shadow-md"
                      : level === "medium"
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "bg-destructive text-destructive-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}
