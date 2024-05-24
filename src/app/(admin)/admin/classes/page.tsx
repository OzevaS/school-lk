"use client";

import { ClassPanel } from "@/features/class-panel/class-panel";
import { Headline1 } from "@/shared/ui/headlines";

export default function Classes() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Headline1>Классы</Headline1>
      <ClassPanel />
    </div>
  );
}
