"use client";

import { useToast } from "@/shared/ui/use-toast";
import { useCreateTypeSubjectMutation } from "./_vm/use-create-type-subject";
import { SubjectTypeForm } from "./_ui/type-subject-form";
import { useUpdateTypeSubjectMutation } from "../../widgets/subject-type-panel/_vm/use-update-type-subject";

export const CreateTypeSubjectForm = () => {
  const { create, isPending } = useCreateTypeSubjectMutation();
  const { toast } = useToast();

  const handleSuccess = (data: { name: string }) => {
    create({
      data,
    }).catch(() => {
      toast({
        variant: "destructive",
        title: "Произошла ошибка",
        description: "Не удалось создать новый предмет",
      });
    });
  };

  return (
    <>
      <div className="flex justify-between flex-raw space-x-4 rounded-lg p-4">
        <SubjectTypeForm
          submitText="Добавить"
          onSuccess={handleSuccess}
          isPending={isPending}
        />
      </div>
    </>
  );
};
