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
import { AddStudentToClassForm } from "./add-student-to-class-form";
import { cn } from "@/shared/ui/utils";

export const AddStudentToClassModal = ({
  classId,
  className,
}: {
  classId: number;
  className?: string;
}) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button className={cn("p-0", className)} variant="link">
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить ученика</DialogTitle>
          <DialogDescription>
            Выберите ученика из списка, которого хотите добавить в класс
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {isOpened && <AddStudentToClassForm classId={classId} />}
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
