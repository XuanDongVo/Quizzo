import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  title: string;
  author: string;
  authorAvatar: string;
  questionCount: number;
  image: string;
  className?: string;
}

export function QuizCard({
  title,
  author,
  authorAvatar,
  questionCount,
  image,
  className,
}: QuizCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl bg-card transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          {questionCount} Qs
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground md:text-base">
          {title}
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <Avatar className="size-6">
            <AvatarImage src={authorAvatar || "/placeholder.svg"} alt={author} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{author}</span>
        </div>
      </div>
    </div>
  );
}
