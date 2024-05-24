import { Badge } from "@/shared/ui/badge";
import { Clock } from "lucide-react";

const LESSON_TIMES = [
  "9:00-10:30",
  "10:30-12:00",
  "12:00-13:30",
  "13:30-15:00",
  "15:00-16:30",
  "16:30-18:00",
];

export const LessonItem = ({
  children,
  order,
}: {
  children: React.ReactNode;
  order: number;
}) => {
  return (
    <div className="flex row items-center">
      <Badge className="mr-2 max-h-[26px]" variant="secondary">
        {order + 1} урок
      </Badge>
      {children}
      <Badge className="ml-auto pl-2 max-h-[26px]" variant="secondary">
        {LESSON_TIMES[order]}
        <Clock className="ml-2" size="20" />
      </Badge>
    </div>
  );
};
