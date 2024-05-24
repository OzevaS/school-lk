export type Lesson = {
  dayOfWeek: number;
  lessonNumber: number;
  subject: {
    id: number;
    name: string;
  };
};
