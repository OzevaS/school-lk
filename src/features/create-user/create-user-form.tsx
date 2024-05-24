"use client";

import { UserForm } from "@/entities/class/user";
import { useCreateUserMutation } from "./_vm/use-create-user";
import { Role, ROLES } from "@/entities/user/user";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useState } from "react";
import { useAppearanceDelay } from "@/shared/lib/react";
import { useToast } from "@/shared/ui/use-toast";

export const CreateUserForm = () => {
  const [role, setRole] = useState<Role>(ROLES.TEACHER);
  const createUser = useCreateUserMutation(role);
  const isPending = useAppearanceDelay(createUser.isPending);
  const { toast } = useToast();

  const handleSuccess = (data: {
    name: string;
    email: string;
  }) => {
    createUser
      .create({
        data,
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Произошла ошибка",
          description: "Не удалось создать пользователя",
        });
      });
  };

  return (
    <div className="flex justify-between flex-raw space-x-4 rounded-lg p-4">
      <div className="space-y-2 flex flex-col">
        <div>Роль</div>
        <Select value={role} onValueChange={(value) => setRole(value as Role)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.values(ROLES).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <UserForm onSuccess={handleSuccess} isPending={isPending} />
    </div>
  );
};
