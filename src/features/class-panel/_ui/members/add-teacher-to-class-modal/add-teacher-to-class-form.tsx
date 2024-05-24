import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useAddToClassMutation } from "../../../_vm/use-add-to-class";
import { Alert } from "@/shared/ui/alert";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { ROLES } from "@/entities/user/user";
import { useToast } from "@/shared/ui/use-toast";
import { getTeachersQuery } from "@/entities/class/_queries/teacher";
import { SmartSelect } from "@/shared/ui/smart-select";

export const AddTeacherToClassForm = ({ classId }: { classId: number }) => {
  const { isPending: isStudentsPending, data: students } = useQuery({
    ...getTeachersQuery(false),
    retry: 0,
  });

  const { add, isPending: isPendingAdd } = useAddToClassMutation();

  const { toast } = useToast();

  const [studentId, setTeacherId] = useState<number>();

  if (isStudentsPending) {
    return <Spinner />;
  }

  if (!students) {
    return <Alert variant="destructive">Учителя не найдены</Alert>;
  }

  const onSubmit = () => {
    if (!studentId) return;
    add({
      classId,
      memberIds: [studentId],
      role: ROLES.TEACHER,
    })
      .then(() => {
        toast({
          title: "Успешно!",
          description: "Учитель был добавлен",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: "Не удалось добавить учителя",
        });
      });
  };

  return (
    <div className="flex items-center gap-4">
      <SmartSelect
        options={students.map(({ id, user }) => ({
          label: user.name,
          value: id,
        }))}
        value={studentId}
        onChange={setTeacherId}
      />
      <Button
        onClick={onSubmit}
        disabled={isPendingAdd || !studentId}
        type="submit"
      >
        {isPendingAdd && (
          <Spinner
            className="mr-2 h-4 w-4"
            aria-label="Отправка формы класса"
          />
        )}
        Добавить
      </Button>
    </div>
  );
};
