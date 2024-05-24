import { LessonDay } from "@/entities/class/_ui/lesson-list/_ui/lesson-day";
import { Lesson } from "../_types";
import { LessonItem } from "@/entities/class/_ui/lesson-list/_ui/lesson-item";
import { Button } from "@/shared/ui/button";
import { PlusCircle } from "lucide-react";
import SmartSelect from "@/shared/ui/smart-select";
import { useEffect, useState } from "react";
import { useApplyLessonsMutation } from "../_vm/use-apply-lessons";
import { useToast } from "@/shared/ui/use-toast";

const SCHEDULE_DAYS = [0, 1, 2, 3, 4, 5];

export const LessonsForm = ({
  classId,
  lessons,
  subjects,
}: {
  lessons: Record<string, Lesson[] | undefined>;
  subjects?: { id: number; name: string }[];
  classId: number;
}) => {
  const { apply, isPending: isPendingApply } = useApplyLessonsMutation();
  const { toast } = useToast();

  const [currentLessons, setCurrentLessons] = useState(lessons);
  const [newLessonSubjectIds, setNewLessonSubjectIds] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    setCurrentLessons(lessons);
  }, [lessons]);

  const onChange = (day: number, lessons: Lesson[]) => {
    setCurrentLessons((prev) => ({ ...prev, [day]: lessons }));
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {SCHEDULE_DAYS.map((day) => (
          <LessonDay
            key={day}
            order={day}
            className="min-w-[610px] max-w-[700px] min-h-[314px]"
          >
            {currentLessons[day]?.map((lesson, lessonIdx) => (
              <LessonItem key={lesson.lessonNumber} order={lesson.lessonNumber}>
                <SmartSelect
                  value={lesson.subject.id}
                  onChange={(subjectId) => {
                    const temp = currentLessons[day] ?? [];
                    onChange(day, [
                      ...temp.slice(0, lessonIdx),
                      {
                        ...lesson,
                        subject: {
                          id: subjectId,
                          name:
                            subjects?.find((s) => s.id === subjectId)?.name ??
                            "",
                        },
                      },
                      ...temp.slice(lessonIdx + 1),
                    ]);
                  }}
                  options={
                    subjects?.map((subject) => ({
                      value: subject.id,
                      label: subject.name,
                    })) ?? []
                  }
                />
                {lessonIdx + 1 === currentLessons[day]?.length && (
                  <Button
                    variant="link"
                    onClick={() => {
                      const temp = currentLessons[day] ?? [];
                      onChange(day, [...temp.slice(0, lessonIdx)]);
                    }}
                  >
                    Удалить
                  </Button>
                )}
              </LessonItem>
            ))}
            <div className="flex">
              <SmartSelect
                value={newLessonSubjectIds[day]}
                onChange={(subjectId) => {
                  setNewLessonSubjectIds((prev) => ({
                    ...prev,
                    [day]: subjectId,
                  }));
                }}
                options={
                  subjects?.map((subject) => ({
                    value: subject.id,
                    label: subject.name,
                  })) ?? []
                }
              />
              <Button
                variant='link'
                disabled={!newLessonSubjectIds[day]}
                onClick={() => {
                  if (!newLessonSubjectIds[day]) return;
                  const temp = currentLessons[day] ?? [];
                  onChange(day, [
                    ...temp,
                    {
                      dayOfWeek: day,
                      lessonNumber: currentLessons[day]?.length ?? 0,
                      subject: {
                        id: newLessonSubjectIds[day],
                        name:
                          subjects?.find(
                            (s) => s.id === newLessonSubjectIds[day],
                          )?.name ?? "",
                      },
                    },
                  ]);
                }}
              >
                <PlusCircle />
              </Button>
            </div>
          </LessonDay>
        ))}
      </div>

      <Button
        className="mt-4 w-[200px]"
        disabled={
          isPendingApply || Object.values(currentLessons).flat().length === 0
        }
        onClick={() => {
          const flatLessons = Object.values(currentLessons)
            .flat()
            .filter(Boolean) as Lesson[];

          apply({
            data: flatLessons.map((lesson) => ({
              day_of_week: lesson?.dayOfWeek,
              lesson_number: lesson?.lessonNumber,
              subject_id: lesson?.subject.id,
            })),
            class_id: classId,
          })
            .then(() => {
              toast({ title: "Успешно!", description: "Расписание сохранено" });
            })
            .catch(() => {
              toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Не удалось сохранить расписание",
              });
            });
        }}
      >
        Сохранить
      </Button>
    </>
  );
};
