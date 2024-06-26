import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";

export default function Home() {
  return (
    <main className="flex flex-col p-8">
      <h1>Courses</h1>
      <CreateCourseForm className="max-w-[300px] mb-5" revalidatePagePath="/" />
      <CoursesList revalidatePagePath="/" />
    </main>
  );
}
