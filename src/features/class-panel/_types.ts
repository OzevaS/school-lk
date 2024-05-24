export type ClassMember = {
  id: number;
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export type ClassData = {
  id: number;
  name: string;
  teacher?: ClassMember | null;
  students: ClassMember[];
};
