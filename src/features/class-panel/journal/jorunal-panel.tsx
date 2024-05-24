"use client";

import { Alert } from "@/shared/ui/alert";
import { Spinner } from "@/shared/ui/spinner";
import { cn } from "@/shared/ui/utils";
import { useQuery } from "@tanstack/react-query";
import { Headline3 } from "@/shared/ui/headlines";
import { getClassSubjectsQuery } from "@/entities/class/_queries/subject";
import { ClassData } from "../_types";
import { JournalForm } from "./_ui/journal-form";
import SmartSelect from "@/shared/ui/smart-select";
import { useState } from "react";
import SmartMultiSelect from "@/shared/ui/smart-multi-select";

export const JournalPanel = ({
  className,
  classData,
}: {
  className?: string;
  classData: ClassData;
}) => {
  const { data: subjects, isPending: isSubjectsPending } = useQuery({
    ...getClassSubjectsQuery(classData.id),
    retry: 0,
  });
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [quarter, setQuarter] = useState<number>(1);

  if (isSubjectsPending) {
    return <Spinner />;
  }

  if (!subjects) {
    return (
      <Alert variant="destructive">Предметы для этого класса не найдены</Alert>
    );
  }

  return (
    <div className={cn(className)}>
      <div className="mb-4">
        <Headline3 className="mb-2">Журнал оценок</Headline3>
        <div className="flex gap-4">
          <SmartSelect
            value={selectedSubjectId}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
            onChange={setSelectedSubjectId}
          />
          {selectedSubjectId && (
            <SmartSelect
              onChange={setQuarter}
              value={quarter}
              options={[
                { value: 1, label: "1 четверть" },
                { value: 2, label: "2 четверть" },
                { value: 3, label: "3 четверть" },
                { value: 4, label: "4 четверть" },
              ]}
            />
          )}
        </div>
      </div>
      <div>
        {selectedSubjectId && quarter && (
          <JournalForm
            students={classData.students}
            classId={classData.id}
            subjectId={selectedSubjectId}
            quarter={quarter}
          />
        )}
      </div>
    </div>
  );
};
