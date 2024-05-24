import { getStudentsQuery } from "@/entities/class/_queries/student";
import SmartMultiSelect from "@/shared/ui/smart-multi-select";
import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useAddToClassMutation } from "../../../_vm/use-add-to-class";
import { Alert } from "@/shared/ui/alert";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { ROLES } from "@/entities/user/user";
import { useToast } from "@/shared/ui/use-toast";

export const AddStudentToClassForm = ({ classId }: { classId: number }) => {
  const { isPending: isStudentsPending, data: students } = useQuery({
    ...getStudentsQuery(false),
    retry: 0,
  });

  const { add, isPending: isPendingAdd } = useAddToClassMutation();

  const { toast } = useToast();

  const [studentsIds, setStudentsIds] = useState<number[]>([]);

  if (isStudentsPending) {
    return <Spinner />;
  }

  if (!students) {
    return <Alert variant="destructive">Студенты не найдены</Alert>;
  }

  const onSubmit = () => {
    add({
      classId,
      memberIds: studentsIds,
      role: ROLES.STUDENT,
    })
      .then(() => {
        toast({
          title: "Успешно!",
          description: "Студенты были добавлены",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: "Не удалось добавить студентов",
        });
      });
  };

  return (
    <div className="flex items-center gap-4">
      <SmartMultiSelect
        options={students.map(({ id, user }) => ({
          label: user.name,
          value: id,
        }))}
        value={studentsIds}
        onChange={setStudentsIds}
      />
      <Button
        onClick={onSubmit}
        disabled={isPendingAdd || !studentsIds.length}
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
