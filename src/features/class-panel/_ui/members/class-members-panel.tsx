import { useRemoveFromClassMutation } from "../../_vm/use-remove-from-class";
import { Headline3 } from "@/shared/ui/headlines";
import { ClassData } from "../../_types";
import { cn } from "@/shared/ui/utils";
import { UserView } from "./user-view";
import { AddStudentToClassModal } from "./add-student-to-class-modal/add-student-to-class-modal";
import { Button } from "@/shared/ui/button";
import { ROLES } from "@/entities/user/user";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { MessageCircleWarning } from "lucide-react";
import { AddTeacherToClassModal } from "./add-teacher-to-class-modal/add-teacher-to-class-modal";

export const ClassMembersPanel = ({
  classData,
  className,
}: {
  classData: ClassData;
  className?: string;
}) => {
  const { id, teacher, students } = classData;

  const { remove, isPending: isPendingRemove } = useRemoveFromClassMutation();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Headline3 className="mb-2">Классный учитель</Headline3>
      {teacher ? (
        <UserView
          className=" mb-4"
          user={teacher.user}
          actions={
            <div className="flex gap-2">
              <AddTeacherToClassModal
                classId={classData.id}
                trigger={<Button className="text-sm">Заменить</Button>}
              />
              <Button
                className="text-sm"
                variant="destructive"
                onClick={() =>
                  remove({
                    classId: id,
                    memberId: teacher.id,
                    role: ROLES.TEACHER,
                  })
                }
                disabled={isPendingRemove}
              >
                Удалить
              </Button>
            </div>
          }
        />
      ) : (
        <Alert>
          <AlertTitle>Классного учителя для этого класс нет :(</AlertTitle>
          <AlertDescription>Добавьте его по кнопке ниже</AlertDescription>
          <AddTeacherToClassModal classId={classData.id} />
        </Alert>
      )}

      <Headline3 className="mb-2 mt-2 flex items-center">
        Ученики
        <AddStudentToClassModal
          className="ml-2 w-6 h-6"
          classId={classData.id}
        />
      </Headline3>
      <div className="flex flex-col gap-3">
        {students.map((student) => (
          <UserView
            key={student.id}
            user={student.user}
            actions={
              <Button
                className="text-sm"
                variant="destructive"
                onClick={() =>
                  remove({
                    classId: id,
                    memberId: student.id,
                    role: ROLES.STUDENT,
                  })
                }
                disabled={isPendingRemove}
              >
                Удалить
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
};
