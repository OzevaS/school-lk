import { addClassMembersAction } from "@/entities/class/_actions/class";
import { useInvalidateClass } from "@/entities/class/class";
import { useInvalidateStudents } from "@/entities/class/student";
import { useInvalidateTeachers } from "@/entities/class/teacher";
import { useMutation } from "@tanstack/react-query";

export const useAddToClassMutation = () => {
  const invalidateClass = useInvalidateClass();
  const invalidateTeachers = useInvalidateTeachers();
  const invalidateStudents = useInvalidateStudents();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addClassMembersAction,
    onSuccess() {
      invalidateClass();
      invalidateStudents();
      invalidateTeachers();
    },
  });

  return {
    add: mutateAsync,
    isPending,
  };
};
