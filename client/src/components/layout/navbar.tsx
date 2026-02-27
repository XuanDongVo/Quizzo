"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Home,
  Library,
  Users,
  User,
  Compass,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const pathname = usePathname();

  const navItems = isLoggedIn
    ? [
        { label: "Home", href: "/home", icon: Home },
        { label: "Library", href: "/library", icon: Library },
        { label: "Join", href: "/join", icon: Users },
        { label: "Profile", href: "/profile", icon: User },
      ]
    : [
        { label: "Home", href: "/home", icon: Home },
        { label: "Explore", href: "/explore", icon: Compass },
        { label: "Sign In", href: "/signin", icon: LogIn },
        { label: "Sign Up", href: "/signup", icon: UserPlus },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/avatar.svg"
            alt="Avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full transition-transform group-hover:scale-105"
          />
          <h1 className="-ml-4 text-xl font-semibold text-primary">Quizzo</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Search, Notifications, Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="size-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="size-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex size-12 items-center justify-">
                    <img
                      src="/avatar.svg"
                      alt="Avatar"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full transition-transform group-hover:scale-105"
                    />
                  </div>
                  <span className="-ml-4 text-xl font-semibold text-primary">
                    Quizzo
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3  px-4 py-3 text-base font-medium transition-colors",
                      pathname.startsWith(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="size-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-2 border-t pt-6">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                >
                  <Search className="size-5" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 bg-transparent"
                >
                  <Bell className="size-5" />
                  Notifications
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
