import { Spinner } from "@/shared/ui/spinner";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/use-toast";
import { Input } from "@/shared/ui/input";
import { useCreateClassMutation } from "../../_vm/use-create-class";

export const CreateClassForm = () => {
  const { create, isPending: isPendingAdd } = useCreateClassMutation();

  const { toast } = useToast();

  const [className, setClassName] = useState<string>();

  const onSubmit = () => {
    if (!className) return;
    create({
      name: className,
    })
      .then(() => {
        toast({
          title: "Успешно!",
          description: "Класс был добавлен",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Ошибка!",
          description: "Не удалось добавить класс",
        });
      });
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Название класса"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <Button
        onClick={onSubmit}
        disabled={isPendingAdd || !className}
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
