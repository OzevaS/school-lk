import { useQueryClient } from "@tanstack/react-query";
import {
  getLessonsByClassAction,
  getLessonsBySubjectAction,
} from "../_actions/lesson";

const baseKeys = ["lesson", "class"];

export const useInvalidateLessons = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({
      queryKey: [...baseKeys],
    });
  };
};

export const getClassLessonsQuery = (classId: number) => ({
  queryFn: () => getLessonsByClassAction({ classId }),
  queryKey: [...baseKeys, classId],
});

export const getLessonsBySubjectIdQuery = (subjectId: number) => ({
  queryFn: () => getLessonsBySubjectAction({ subjectId }),
  queryKey: [...baseKeys, subjectId],
});
