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
import { CreateClassForm } from "./create-class-form";
import { cn } from "@/shared/ui/utils";

export const CreateClassModal = ({ className }: { className?: string }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button className={cn("p-2", className)} variant="outline">
          <div className="mr-2">Создать класс</div>
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Создать класс</DialogTitle>
          <DialogDescription>
            Заполните форму ниже, чтобы создать новый класс
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {isOpened && <CreateClassForm />}
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
