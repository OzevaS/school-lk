import { getSubjectGradesAndLessonsQuery } from "@/entities/class/_queries/class";
import { useQuery } from "@tanstack/react-query";
import { ClassData } from "../../_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Spinner } from "@/shared/ui/spinner";
import { Alert } from "@/shared/ui/alert";
import { cn } from "@/shared/ui/utils";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/input";
import { Grade } from "./grade-cell";
import { Button } from "@/shared/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatDate = (date: number) => {
  return format(new Date(date), "d MMM", { locale: ru });
};

export const JournalForm = ({
  classId,
  subjectId,
  students,
  className,
  quarter,
}: {
  classId: number;
  subjectId: number;
  students: ClassData["students"];
  className?: string;
  quarter: number;
}) => {
  const { data, isPending: isPendingGrades } = useQuery({
    ...getSubjectGradesAndLessonsQuery(classId, subjectId, quarter),
  });

  const [changedGrades, setChangedGrades] = useState<
    Record<number, Record<string, number>>
  >({});

  useEffect(() => {
    setChangedGrades({});
  }, [classId, subjectId]);

  if (isPendingGrades) {
    return <Spinner />;
  }

  if (!data) {
    return (
      <Alert variant="destructive">Произошла ошибка при загрузке журнала</Alert>
    );
  }

  const { grades, lessons } = data;

  return (
    <div className={cn("overflow-x-auto w-[1px] min-w-full", className)}>
      <Button
        className="mb-4"
        disabled={Object.keys(changedGrades).length === 0}
        onClick={() => {
          console.log(changedGrades);
        }}
      >
        Сохранить
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Студент</TableHead>
            {lessons.map((lesson, idx) => (
              <TableHead className="whitespace-nowrap" key={idx}>
                {formatDate(Number(lesson))}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.user.name}</TableCell>
              {lessons.map((lesson) => (
                <TableCell key={lesson} className="whitespace-nowrap">
                  <Grade
                    value={
                      changedGrades[student.id]?.[lesson] ??
                      grades[student.id]?.[lesson]?.grade
                    }
                    className={cn(
                      "w-10",
                      changedGrades[student.id]?.[lesson] ? "bg-gray-200" : "",
                    )}
                    onChange={(value) => {
                      setChangedGrades((prev) => ({
                        ...prev,
                        [student.id]: {
                          ...prev[student.id],
                          [lesson]: value,
                        },
                      }));
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
//grades[student.id][lesson]?.grade
