import { useMutation } from "@tanstack/react-query";
import { useInvalidateUser } from "@/entities/class/user";
import { Role, ROLES } from "@/entities/user/user";
import { createTeacherAction } from "@/entities/class/teacher";
import { createStudentAction } from "@/entities/class/student";

const ACTION_CONFIG = {
  [ROLES.TEACHER]: createTeacherAction,
  [ROLES.STUDENT]: createStudentAction,
};

export const useCreateUserMutation = (role: Role) => {
  const invalidateUser = useInvalidateUser();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: ACTION_CONFIG[role],
    async onSuccess({ id }) {
      await invalidateUser(id);
    },
  });

  return {
    create: mutateAsync,
    isPending,
    isError,
  };
};
