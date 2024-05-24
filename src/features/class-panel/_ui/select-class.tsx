import { Badge } from "@/shared/ui/badge";
import { Combobox } from "@/shared/ui/combobox";

export const SelectClass = ({
  data,
  onSelect,
  classId
}: {
  data: {
    id: number;
    name: string;
    countStudents: number;
  }[];
  onSelect: (classId: number) => void;
  classId?: number
}) => {
  return (
    <Combobox
      className="w-[300px] min-h-[50px] h-auto"
      options={data.map((c) => ({ value: c.id, label: c.name }))}
      value={classId}
      placeholder="Выберите класс"
      onChange={onSelect}
      renderOption={({ value: classId }) => {
        const c = data.find((c) => c.id === classId);
        return (
          <div className="w-[300px] pr-6 flex flex-col gap-2">
            <div className="flex">
              <Badge variant="secondary">Название класса:</Badge>
              <div className="ml-auto">{c?.name}</div>
            </div>
            <div className="flex">
              <Badge variant="secondary">Кол-во учеников:</Badge>
              <div className="ml-auto">{c?.countStudents}</div>
            </div>
          </div>
        );
      }}
    />
  );
};
