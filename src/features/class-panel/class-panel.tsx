import { getClassesQuery } from "@/entities/class/_queries/class";
import { Spinner } from "@/shared/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import { ClassPanelContent } from "./_ui/class-panel-content";

export const ClassPanel = () => {
  const classQuery = useQuery({
    ...getClassesQuery(),
  });

  if (classQuery.isPending) {
    return <Spinner />;
  }

  if (!classQuery.data) {
    return <div>Не удалось загрузить все классы, возможно у вас нет прав</div>;
  }

  return <ClassPanelContent classesData={classQuery.data} />;
};
