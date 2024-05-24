"use client";

import { Alert } from "@/shared/ui/alert";
import { Spinner } from "@/shared/ui/spinner";
import { cn } from "@/shared/ui/utils";
import { useQuery } from "@tanstack/react-query";
import { Headline3 } from "@/shared/ui/headlines";
import { LessonsForm } from "./_ui/lessons-day-form";
import { getClassLessonsQuery } from "@/entities/class/_queries/lesson";
import { getClassSubjectsQuery } from "@/entities/class/_queries/subject";

export const LessonsPanel = ({
  className,
  classId,
}: {
  className?: string;
  classId: number;
}) => {
  const { isPending: isPendingLessons, data: lessons } = useQuery({
    ...getClassLessonsQuery(classId),
  });

  const { data: subjects, isPending: isSubjectsPending } = useQuery({
    ...getClassSubjectsQuery(classId),
  });

  if (isPendingLessons) {
    return <Spinner />;
  }

  if (!lessons) {
    return <Alert variant="destructive">Расписание не найдены</Alert>;
  }

  console.log("LESSONS", lessons);

  return (
    <div className={cn(className)}>
      <div className="mb-4">
        <Headline3>Расписание класса</Headline3>
      </div>
      <div>
        <LessonsForm classId={classId} lessons={lessons} subjects={subjects} />
      </div>
    </div>
  );
};
