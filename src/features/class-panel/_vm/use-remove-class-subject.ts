import { removeClassSubjectAction } from "@/entities/class/_actions/class-subject";
import { useInvalidateClassSubjects } from "@/entities/class/_queries/subject";
import { useMutation } from "@tanstack/react-query";

export const useRemoveClassSubjectMutation = () => {
  const invalidateClassSubjects = useInvalidateClassSubjects();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeClassSubjectAction,
    onSuccess() {
      invalidateClassSubjects();
    },
  });

  return {
    remove: mutateAsync,
    isPending,
  };
};
