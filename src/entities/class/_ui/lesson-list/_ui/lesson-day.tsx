import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/ui/utils";

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const LessonDay = ({
  children,
  order,
  className,
}: {
  children: React.ReactNode;
  order: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 min-w-[400px] p-4 pl-2 border rounded-md bg-white",
        className,
      )}
    >
      <div className="flex items-center pr-2 border-r-2">
        <Badge variant="outline">{DAY_NAMES[order]}</Badge>
      </div>
      <div className="flex flex-col gap-2 w-full">{children}</div>
    </div>
  );
};
