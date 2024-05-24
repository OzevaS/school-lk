import { Button } from "@/shared/ui/button";
import { DialogHeader, DialogFooter } from "@/shared/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/shared/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { UpdateClassSubjectTeacherForm } from "./update-class-subject-teacher-modal-form";
import { cn } from "@/shared/ui/utils";

export const UpdateClassSubjectTeacherModal = ({
  classSubjectId,
  className,
  trigger,
}: {
  classSubjectId: number;
  className?: string;
  trigger?: React.ReactNode;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className={cn("p-0", className)} variant="link">
            <PlusCircle />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить предмет для класса</DialogTitle>
          <DialogDescription>
            Выберите предмет из списка, который вы хотите добавтиь для класса
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {isOpened && (
              <UpdateClassSubjectTeacherForm classSubjectId={classSubjectId} />
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
