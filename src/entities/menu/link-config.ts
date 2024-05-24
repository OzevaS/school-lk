import {
  Users,
  BriefcaseIcon,
  BookIcon,
  GroupIcon,
  LucideIcon,
  Home,
  Timer,
} from "lucide-react";

export const LINK_CONFIG: Record<
  "admin" | "teacher" | "student",
  {
    label: string;
    href: string;
    variant: "ghost" | "default";
    icon: LucideIcon;
  }[]
> = {
  admin: [
    {
      label: "Главная",
      href: "/admin",
      variant: "ghost",
      icon: Home,
    },
    {
      label: "Пользователи",
      href: "/admin/users",
      variant: "ghost",
      icon: Users,
    },
    {
      label: "Классы",
      href: "/admin/classes",
      variant: "ghost",
      icon: BriefcaseIcon,
    },
    {
      label: "Предметы",
      href: "/admin/subjects",
      variant: "ghost",
      icon: BookIcon,
    },
    {
      label: "Группы",
      href: "/admin/groups",
      variant: "ghost",
      icon: GroupIcon,
    },
    {
      label: "Расписание",
      href: "/admin/schedules",
      variant: "ghost",
      icon: Timer,
    },
  ],
  teacher: [
    {
      label: "Предметы",
      href: "/teacher/subjects",
      variant: "ghost",
      icon: BookIcon,
    },
    {
      label: "Группы",
      href: "/teacher/groups",
      variant: "ghost",
      icon: GroupIcon,
    },
  ],
  student: [
    {
      label: "Предметы",
      href: "/student/subjects",
      variant: "ghost",
      icon: BookIcon,
    },
  ],
};
