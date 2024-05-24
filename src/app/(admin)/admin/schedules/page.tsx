import { ScheduleList } from "@/entities/class/_ui/lesson-list/schedule-list";
import { Headline1 } from "@/shared/ui/headlines";

export default function Classes() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Headline1>Расписание</Headline1>
      <ScheduleList />
    </div>
  );
}
