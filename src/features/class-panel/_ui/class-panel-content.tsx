import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ClassData } from "../_types";
import { SelectClass } from "./select-class";
import { ClassMembersPanel } from "./members/class-members-panel";
import { CreateClassModal } from "./create-class-modal/create-class-modal";
import { SubjectsPanel } from "./subjects/subjects-panel";
import { LessonsPanel } from "../lessons/lessons-panel";
import { JournalPanel } from "../journal/jorunal-panel";

export const ClassPanelContent = ({
  classesData,
}: {
  classesData: ClassData[];
}) => {
  const [selectedClassId, setSelectedClassId] = useState<number>();

  const selectedClassData = classesData.find((c) => c.id === selectedClassId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-start">
        <SelectClass
          data={classesData.map((c) => ({
            id: c.id,
            name: c.name,
            countStudents: c.students.length,
          }))}
          classId={selectedClassId}
          onSelect={(classId) => setSelectedClassId(classId)}
        />
        <CreateClassModal />
      </div>
      {selectedClassId && selectedClassData && (
        <Tabs defaultValue="members">
          <TabsList className="mb-4">
            <TabsTrigger value="members">Участники</TabsTrigger>
            <TabsTrigger value="subjects">Предметы</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
            <TabsTrigger value="journal">Журнал оценок</TabsTrigger>
          </TabsList>
          <TabsContent value="members">
            <ClassMembersPanel classData={selectedClassData} />
          </TabsContent>
          <TabsContent value="subjects">
            <SubjectsPanel classId={selectedClassId} />
          </TabsContent>
          <TabsContent value="schedule">
            <LessonsPanel classId={selectedClassId} />
          </TabsContent>
          <TabsContent value="journal">
            <JournalPanel classData={selectedClassData} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
