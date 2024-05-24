export type Journal = {
  scheduleDates: {
    dayOfWeek: number;
  }[];
  students: {
    name: string;
    grades: {
      grade?: number | null;
      date?: Date | null;
    }[];
  }[];
};
