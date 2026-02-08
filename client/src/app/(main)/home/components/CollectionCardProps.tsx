import { cn } from "@/lib/utils";

interface CollectionCardProps {
  title: string;
  image: string;
  className?: string;
}

export function CollectionCard({ title, image, className }: CollectionCardProps) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl",
        className
      )}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-lg font-bold text-white md:text-xl">{title}</span>
        </div>
      </div>
    </div>
  );
}