import { SmartInput } from "@/shared/ui/smart-input";
import { LessonDay } from "./_ui/lesson-day";
import { LessonItem } from "./_ui/lesson-item";

export const ScheduleList = () => {
  return (
    <div className="p-2 flex flex-col gap-4">
      <LessonDay order={0}>
        <LessonItem order={0}>
          <SmartInput value="Русский" />
        </LessonItem>
        <LessonItem order={1}>Русский</LessonItem>
        <LessonItem order={2}>Русский</LessonItem>
        <LessonItem order={3}>Русский</LessonItem>
        <LessonItem order={4}>Русский</LessonItem>
      </LessonDay>
      <LessonDay order={1}>
        <LessonItem order={0}>Русский</LessonItem>
        <LessonItem order={1}>Русский</LessonItem>
        <LessonItem order={2}>Русский</LessonItem>
        <LessonItem order={3}>Русский</LessonItem>
        <LessonItem order={4}>Русский</LessonItem>
      </LessonDay>
      <LessonDay order={2}>
        <LessonItem order={0}>Русский</LessonItem>
        <LessonItem order={1}>Русский</LessonItem>
        <LessonItem order={2}>Русский</LessonItem>
        <LessonItem order={3}>Русский</LessonItem>
        <LessonItem order={4}>Русский</LessonItem>
      </LessonDay>
      <LessonDay order={3}>
        <LessonItem order={0}>Русский</LessonItem>
        <LessonItem order={1}>Русский</LessonItem>
        <LessonItem order={2}>Русский</LessonItem>
        <LessonItem order={3}>Русский</LessonItem>
        <LessonItem order={4}>Русский</LessonItem>
      </LessonDay>
    </div>
  );
};
