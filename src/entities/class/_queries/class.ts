import { useQueryClient } from "@tanstack/react-query";
import { getClassesAction } from "../_actions/class";
import { getSubjectGradesAndLessonsAction } from "../_actions/grade";

const baseKeys = ["class"];

export const useInvalidateClass = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [...baseKeys],
    });
};

export const getClassesQuery = () => ({
  queryFn: () => getClassesAction(),
  queryKey: [...baseKeys],
});

export const getSubjectGradesAndLessonsQuery = (
  classId: number,
  subjectId: number,
  quarter: number,
) => ({
  queryFn: () =>
    getSubjectGradesAndLessonsAction({ classId, subjectId, quarter }),
  queryKey: [...baseKeys, "grade", classId, subjectId, quarter],
});
