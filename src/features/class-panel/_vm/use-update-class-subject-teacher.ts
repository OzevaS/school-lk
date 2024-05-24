import { useMutation } from "@tanstack/react-query";
import { useInvalidateClass } from "@/entities/class/class";
import { useInvalidateClassSubjects } from "@/entities/class/_queries/subject";
import { updateClassSubjectTeacherAction } from "@/entities/class/_actions/class-subject";

export const useUpdateClassSubjectTeacherMutation = () => {
  const invalidateClass = useInvalidateClass();
  const invalidateClassSubjects = useInvalidateClassSubjects();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: updateClassSubjectTeacherAction,
    async onSuccess() {
      await invalidateClass();
      await invalidateClassSubjects();
    },
  });

  return {
    update: mutateAsync,
    isPending,
    isError,
  };
};
