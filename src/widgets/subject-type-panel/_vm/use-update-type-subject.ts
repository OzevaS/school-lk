import { useMutation } from "@tanstack/react-query";
import { useInvalidateSubjectTypes } from "@/entities/class/_queries/subject-type";
import { updateSubjectTypeAction } from "@/entities/class/subject-type";

export const useUpdateTypeSubjectMutation = () => {
  const invalidateSubjectTypes = useInvalidateSubjectTypes();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: updateSubjectTypeAction,
    async onSuccess() {
      await invalidateSubjectTypes();
    },
  });

  return {
    update: mutateAsync,
    isPending,
    isError,
  };
};
