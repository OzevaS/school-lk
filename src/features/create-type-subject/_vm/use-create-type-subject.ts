import { useMutation } from "@tanstack/react-query";
import { useInvalidateSubjectTypes } from "@/entities/class/_queries/subject-type";
import { createSubjectTypeAction } from "@/entities/class/subject-type";

export const useCreateTypeSubjectMutation = () => {
  const invalidateSubjectTypes = useInvalidateSubjectTypes();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: createSubjectTypeAction,
    async onSuccess() {
      await invalidateSubjectTypes();
    },
  });

  return {
    create: mutateAsync,
    isPending,
    isError,
  };
};
