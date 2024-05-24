import { useQueryClient } from "@tanstack/react-query";
import { getSubjectTypesAction, getSubjectTypesForClassAction } from "../_actions/subject-type";

const baseKey = "subjectType";

export const useInvalidateSubjectTypes = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: [baseKey],
    });
  };
};

export const getSubjectTypesQuery = () => ({
  queryFn: () => getSubjectTypesAction(),
  queryKey: [baseKey],
});

export const getSubjectTypesForClassQuery = (classId: number) => ({
  queryFn: () => getSubjectTypesForClassAction(classId),
  queryKey: [baseKey],
});

