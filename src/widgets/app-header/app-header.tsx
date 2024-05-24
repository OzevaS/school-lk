import { ToggleTheme } from "@/features/theme/toggle-theme";
import { Profile } from "./_ui/profile";
import { Button } from "@/shared/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/shared/ui/sheet";
import { PanelLeft, Package2, Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { LINK_CONFIG } from "@/entities/menu/link-config";

export const AppHeader = ({
  variant,
}: {
  variant: "auth" | "admin" | "teacher" | "student";
  menuLinks?: { label: string; href: string; icon: React.ReactNode }[];
}) => {
  const isProfile = variant !== "auth";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      {variant in LINK_CONFIG && (
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {LINK_CONFIG[variant as keyof typeof LINK_CONFIG].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      )}
      {isProfile && (
        <div className="relative mr-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
      )}
      <ToggleTheme />
      {isProfile && <Profile />}
    </header>
  );
};
