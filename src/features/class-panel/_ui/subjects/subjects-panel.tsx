"use client";

import { getClassSubjectsQuery } from "@/entities/class/_queries/subject";
import { Alert } from "@/shared/ui/alert";
import { Spinner } from "@/shared/ui/spinner";
import { cn } from "@/shared/ui/utils";
import { useQuery } from "@tanstack/react-query";
import { CreateClassSubjectsModal } from "./create-class-subjects-modal/create-class-subjects-modal";
import { Headline2, Headline3 } from "@/shared/ui/headlines";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useRemoveClassSubjectMutation } from "../../_vm/use-remove-class-subject";
import { useUpdateClassSubjectTeacherMutation } from "../../_vm/use-update-class-subject-teacher";
import { UpdateClassSubjectTeacherModal } from "./update-class-subject-teacher-modal/update-class-subject-teacher-modal";

export const SubjectsPanel = ({
  className,
  classId,
}: {
  className?: string;
  classId: number;
}) => {
  const { isPending, data: classSubjects } = useQuery({
    ...getClassSubjectsQuery(classId),
  });

  const { remove, isPending: isPendingRemove } =
    useRemoveClassSubjectMutation();
  const { update, isPending: isPendingUpdate } =
    useUpdateClassSubjectTeacherMutation();

  if (isPending) {
    return <Spinner />;
  }

  if (!classSubjects) {
    return <Alert variant="destructive">Предметы не найдены</Alert>;
  }

  return (
    <div className={cn(className)}>
      <div className="flex gap-2 mb-4 items-center">
        <Headline3>Предметы класса</Headline3>
        <CreateClassSubjectsModal classId={classId} />
      </div>
      <div className="flex flex-col gap-4">
        {classSubjects.map((s) => (
          <div
            key={s.id}
            className={cn("flex rounded-2xl border bg-card p-4 items-center")}
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Badge variant="secondary">Предмет:</Badge>
                <div>{s.name}</div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">Учитель:</Badge>
                {s.teacher ? (
                  <>
                    <div>{s?.teacher?.name}</div>
                    <div>{s?.teacher?.email}</div>
                  </>
                ) : (
                  <div>Не назначен</div>
                )}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <UpdateClassSubjectTeacherModal
                classSubjectId={s.id}
                trigger={<Button className="text-sm">Назначить учителя</Button>}
              />
              <Button
                variant="destructive"
                disabled={isPendingRemove}
                onClick={() => remove({ id: s.id })}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
