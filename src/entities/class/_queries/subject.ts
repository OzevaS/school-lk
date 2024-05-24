import { useQueryClient } from "@tanstack/react-query";
import { getClassSubjectsAction } from "../_actions/class-subject";

const baseKeys = ["subject", "class"];

export const useInvalidateClassSubjects = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: [...baseKeys],
    });
  };
};

export const getClassSubjectsQuery = (classId: number) => ({
  queryFn: () => getClassSubjectsAction(classId),
  queryKey: [...baseKeys, classId],
});
