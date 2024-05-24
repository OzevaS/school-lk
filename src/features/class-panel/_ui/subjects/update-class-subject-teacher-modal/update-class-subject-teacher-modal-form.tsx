import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@/shared/ui/alert";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import { getTeachersQuery } from "@/entities/class/_queries/teacher";
import SmartSelect from "@/shared/ui/smart-select";
import { useUpdateClassSubjectTeacherMutation } from "@/features/class-panel/_vm/use-update-class-subject-teacher";

export const UpdateClassSubjectTeacherForm = ({
  classSubjectId,
}: {
  classSubjectId: number;
}) => {
  const { isPending: isPendingTeacher, data: teachers } = useQuery({
    ...getTeachersQuery(),
    retry: 0,
  });

  const { update, isPending: isPendingUpdate } =
    useUpdateClassSubjectTeacherMutation();

  const { toast } = useToast();

  const [selectedTeacherId, setSelectedTeacherId] = useState<number>();

  if (isPendingTeacher) {
    return <Spinner />;
  }

  if (!teachers) {
    return <Alert variant="destructive">Учителя не найдены</Alert>;
  }

  const onSubmit = () => {
    if (!selectedTeacherId) return;
    update({
      id: classSubjectId,
      data: {
        teacher_id: selectedTeacherId,
      },
    })
      .then(() => {
        toast({
          title: "Успешно!",
          description: "Предметы были добавлены",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: "Не удалось добавить предметы",
        });
      });
  };

  return (
    <div className="flex items-center gap-4">
      <SmartSelect
        options={teachers.map(({ id, user }) => ({
          label: `${user.name} (${user.email})`,
          value: id,
        }))}
        value={selectedTeacherId}
        onChange={setSelectedTeacherId}
      />
      <Button
        onClick={onSubmit}
        disabled={isPendingUpdate || !selectedTeacherId}
        type="submit"
      >
        {isPendingUpdate && (
          <Spinner
            className="mr-2 h-4 w-4"
            aria-label="Отправка формы предмета класса"
          />
        )}
        Добавить
      </Button>
    </div>
  );
};
