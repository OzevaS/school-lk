import { useMutation } from "@tanstack/react-query";
import { createClassAction, useInvalidateClass } from "@/entities/class/class";
import { useInvalidateTeachers } from "@/entities/class/teacher";
import { useInvalidateStudents } from "@/entities/class/student";

export const useCreateClassMutation = () => {
  const invalidateTeachers = useInvalidateTeachers();
  const invalidateStudents = useInvalidateStudents();
  const invalidateClass = useInvalidateClass();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createClassAction,
    async onSuccess() {
      await invalidateTeachers();
      await invalidateStudents();
      await invalidateClass();
    },
  });

  return {
    create: mutateAsync,
    isPending,
    isError,
  };
};
