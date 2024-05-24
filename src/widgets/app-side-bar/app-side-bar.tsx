"use client";

import Link from "next/link";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { LINK_CONFIG } from "../../entities/menu/link-config";
import { Package2, ChevronsRight, ChevronsLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";

export interface AppSideBarProps {
  variant: "admin" | "teacher" | "student";
}

export function AppSideBar({ variant }: AppSideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = LINK_CONFIG[variant];

  const onClick = useCallback(() => {
    console.log("CLICK");
  }, []);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    console.log(ref.current);
  }, []);

  return (
    <>
      <nav
        ref={ref}
        onClick={onClick}
        className={cn("flex flex-col gap-4 px-4 sm:py-5 w-14", {
          "w-full": !isCollapsed,
        })}
      >
        {links.map((link) => (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 h-9",
                )}
              >
                <link.icon
                  className={cn("h-5 w-5", {
                    "mr-3": !isCollapsed,
                  })}
                />
                <div>
                  {!isCollapsed && <span>{link.label}</span>}
                  <span className="sr-only">{link.label}</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className={cn({
                hidden: !isCollapsed,
              })}
            >
              {link.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full"
            >
              {isCollapsed ? (
                <ChevronsRight className="h-5 w-5" />
              ) : (
                <ChevronsLeft className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isCollapsed ? "Раскрыть" : "Свернуть"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {isCollapsed ? "Раскрыть" : "Свернуть"}
          </TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
}
