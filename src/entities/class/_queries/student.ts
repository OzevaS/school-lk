import { useQueryClient } from "@tanstack/react-query";
import { getStudentsAction } from "../_actions/student";

const baseKey = "student";

export const getStudentsQuery = (hasOwnClass?: boolean) => ({
  queryFn: () => getStudentsAction({ hasOwnClass }),
  queryKey: [baseKey],
});

export const useInvalidateStudents = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: [baseKey],
    });
  };
};

