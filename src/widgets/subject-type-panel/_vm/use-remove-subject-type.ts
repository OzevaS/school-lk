import {
  removeSubjectTypeAction,
  useInvalidateSubjectTypes,
} from "@/entities/class/subject-type";
import { useMutation } from "@tanstack/react-query";

export const useRemoveSubjectTypeMutation = () => {
  const invalidateSubjectTypes = useInvalidateSubjectTypes();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: removeSubjectTypeAction,
    async onSuccess() {
      await invalidateSubjectTypes();
    },
  });

  return {
    remove: mutateAsync,
    isPending,
    isError,
  };
};
