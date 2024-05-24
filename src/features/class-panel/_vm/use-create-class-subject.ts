import { useMutation } from "@tanstack/react-query";
import { useInvalidateClass } from "@/entities/class/class";
import { useInvalidateClassSubjects } from "@/entities/class/_queries/subject";
import { createClassSubjectsAction } from "@/entities/class/_actions/class-subject";

export const useCreateClassSubjectsMutation = () => {
  const invalidateClass = useInvalidateClass();
  const invalidateClassSubjects = useInvalidateClassSubjects();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createClassSubjectsAction,
    async onSuccess() {
      await invalidateClass();
      await invalidateClassSubjects();
    },
  });

  return {
    create: mutateAsync,
    isPending,
    isError,
  };
};
