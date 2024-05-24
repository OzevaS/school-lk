"use client";

import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";
import { CreateTypeSubjectForm } from "@/features/create-type-subject/create-type-subect-form";
import { useRemoveSubjectTypeMutation } from "./_vm/use-remove-subject-type";
import { getSubjectTypesQuery } from "@/entities/class/subject-type";
import { SmartInput } from "@/shared/ui/smart-input";
import { Separator } from "@/shared/ui/separator";
import {
  CommandEmpty,
  Command,
  CommandGroup,
  CommandInput,
} from "@/shared/ui/command";
import { CommandItem } from "cmdk";

import styles from "./type-group.module.css";
import { useUpdateTypeSubjectMutation } from "./_vm/use-update-type-subject";
import { cn } from "@/shared/ui/utils";

export const SubjectTypePanel = () => {
  const subjectTypeQuery = useQuery({
    ...getSubjectTypesQuery(),
    retry: 0,
  });

  const { remove, isPending: isPendingRemove } = useRemoveSubjectTypeMutation();
  const { update, isPending: isPendingUpdate } = useUpdateTypeSubjectMutation();

  if (subjectTypeQuery.isPending) {
    return <Spinner aria-label="Загрузка типов предмета" />;
  }

  if (!subjectTypeQuery.data) {
    return (
      <div>Не удалось загрузить все предметы, возможно у вас нет прав</div>
    );
  }

  return (
    <div>
      <CreateTypeSubjectForm />
      <Separator className="mb-4" />
      {subjectTypeQuery.data.length > 0 ? (
        <Command className="p-2">
          <CommandInput placeholder="Найти предмет" />
          <CommandEmpty>Ничего не найдено :(</CommandEmpty>
          <CommandGroup className={cn(styles.cmdkGroup, "mt-2")}>
            {subjectTypeQuery.data?.map((subjectType) => (
              <CommandItem key={subjectType.id} value={subjectType.name}>
                <SmartInput
                  className=" w-fit"
                  value={subjectType.name}
                  onDelete={() => remove({ id: subjectType.id })}
                  onEdit={(value) =>
                    update({ id: subjectType.id, data: { name: value } })
                  }
                  isPending={isPendingRemove || isPendingUpdate}
                  autoWidth
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      ) : (
        <div>Нет предметов :(</div>
      )}
    </div>
  );
};
