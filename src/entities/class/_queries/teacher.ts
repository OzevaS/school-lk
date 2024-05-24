import { useQueryClient } from "@tanstack/react-query";
import { getTeachersAction } from "../_actions/teacher";

const baseKey = "teacher";

export const getTeachersQuery = (hasOwnClass?: boolean) => ({
  queryFn: () => getTeachersAction({ hasOwnClass }),
  queryKey: [baseKey],
});

export const useInvalidateTeachers = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: [baseKey],
    });
  };
};
