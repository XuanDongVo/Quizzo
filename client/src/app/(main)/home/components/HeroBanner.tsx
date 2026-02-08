import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 md:p-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl lg:text-3xl text-balance">
            Play quiz together with your friends now!
          </h2>
          <Button
            variant="secondary"
            className="mt-4 bg-white text-primary hover:bg-white/90"
          >
            Find Friends
          </Button>
        </div>
        <div className="flex items-center -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <Avatar
              key={i}
              className="size-10 border-2 border-primary md:size-12"
            >
              <AvatarImage
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt={`User ${i}`}
              />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-white/10" />
    </div>
  );
}
