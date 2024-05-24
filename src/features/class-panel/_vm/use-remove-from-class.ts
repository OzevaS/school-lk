import { removeMemberAction } from "@/entities/class/_actions/class";
import { useInvalidateClass } from "@/entities/class/class";
import { useInvalidateStudents } from "@/entities/class/student";
import { useInvalidateTeachers } from "@/entities/class/teacher";
import { ROLES } from "@/entities/user/user";
import { useMutation } from "@tanstack/react-query";

export const useRemoveFromClassMutation = () => {
  const invalidateClass = useInvalidateClass();
  const invalidateTeachers = useInvalidateTeachers();
  const invalidateStudents = useInvalidateStudents();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeMemberAction,
    onSuccess({ role }) {
      invalidateClass();
      if (role === ROLES.STUDENT) {
        invalidateStudents();
      } else if (role === ROLES.TEACHER) {
        invalidateTeachers();
      }
    },
  });

  return {
    remove: mutateAsync,
    isPending,
  };
};
