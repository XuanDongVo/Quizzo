import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorCardProps {
  name: string;
  avatar: string;
  color: string;
}

export function AuthorCard({ name, avatar, color }: AuthorCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-full p-1"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
      >
        <Avatar className="size-14 border-2 border-card md:size-16">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <span className="text-xs font-medium text-foreground md:text-sm">
        {name}
      </span>
    </div>
  );
}