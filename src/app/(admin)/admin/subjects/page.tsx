import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import { Headline1 } from "@/shared/ui/headlines";
import { SubjectTypePanel } from "@/widgets/subject-type-panel/subject-type-panel";

export default function Classes() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Headline1>Предметы</Headline1>
      <SubjectTypePanel />
    </div>
  );
}
