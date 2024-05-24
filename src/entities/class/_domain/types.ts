import { UserEntity } from "@/entities/user/user";

export type UserId = number;

export type StudentId = number;

export type TeacherId = number;

export type WithUser<T> = T & { user: UserEntity };

export type TeacherEntity = {
  id: TeacherId;
  user_id: number;
};

export type StudentEntity = {
  id: StudentId;
  user_id: number;
  class_id?: number | null;
};

export type GradeEntity = {
  id: number;
  grade: number;
  date?: Date | null;
  teacher_comment?: string | null;
  student_comment?: string | null;
  completed_homework_file?: string | null;
  student_id: number;
  subject_id: number;
  homework_id?: number;
};

export type ClassEntity = {
  id: number;
  name: string;
  teacher_id?: number | null;
};

export type HomeworkEntity = {
  id: number;
  name: string;
  deadline: Date;
  homework_file?: string;
  description: string;
  subject_id: number;
  teacher_id: number;
  class_id: number;
};

export type LessonEntity = {
  id: number;
  day_of_week: number;
  lesson_number: number;
  teacher_id?: number;
  class_id: number;
  subject_id: number;
};

export type AnnouncementEntity = {
  id: number;
  title: string;
  message: string;
  staff_id: number;
  date_published: Date;
};

export type AnnouncementClassEntity = {
  id: number;
  class_id: number;
  announcement_id: number;
};

export type SubjectTypeEntity = {
  id: number;
  name: string;
};

export type ClassSubjectEntity = {
  id: number;
  type_id: number;
  teacher_id?: number | null;
  class_id: number;
};
