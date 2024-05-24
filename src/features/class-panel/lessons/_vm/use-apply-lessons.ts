import { useMutation } from "@tanstack/react-query";
import { useInvalidateClass } from "@/entities/class/class";
import { applyLessonsAction } from "@/entities/class/_actions/lesson";

export const useApplyLessonsMutation = () => {
  const invalidateClass = useInvalidateClass();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: applyLessonsAction,
    async onSuccess() {
      await invalidateClass();
    },
  });

  return {
    apply: mutateAsync,
    isPending,
    isError,
  };
};
