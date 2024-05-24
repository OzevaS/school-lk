import SmartMultiSelect from "@/shared/ui/smart-multi-select";
import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@/shared/ui/alert";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import { useCreateClassSubjectsMutation } from "@/features/class-panel/_vm/use-create-class-subject";
import { getSubjectTypesForClassQuery } from "@/entities/class/_queries/subject-type";

export const CreateClassSubjectsForm = ({ classId }: { classId: number }) => {
  const { isPending: isStudentsPending, data: subjectTypes } = useQuery({
    ...getSubjectTypesForClassQuery(classId),
    retry: 0,
  });

  const { create, isPending: isPendingAdd } = useCreateClassSubjectsMutation();

  const { toast } = useToast();

  const [subjectTypeIds, setSubjectTypeIds] = useState<number[]>([]);

  if (isStudentsPending) {
    return <Spinner />;
  }

  if (!subjectTypes) {
    return <Alert variant="destructive">Предметы не найдены</Alert>;
  }

  const onSubmit = () => {
    create({
      data: subjectTypeIds.map((id) => ({ type_id: id, class_id: classId })),
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
      <SmartMultiSelect
        options={subjectTypes.map(({ id, name }) => ({
          label: name,
          value: id,
        }))}
        value={subjectTypeIds}
        onChange={setSubjectTypeIds}
      />
      <Button
        onClick={onSubmit}
        disabled={isPendingAdd || !subjectTypeIds.length}
        type="submit"
      >
        {isPendingAdd && (
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
