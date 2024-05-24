import { useAppearanceDelay } from "@/shared/lib/react";
import { Button } from "@/shared/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";

export const TypeSubjectCard = ({
  id,
  name,
  onDelete,
  isPendingDelete,
}: {
  id: number;
  name: string;
  onDelete: () => void;
  isPendingDelete: boolean;
}) => {
  const isPendingDeleteDelay = useAppearanceDelay(isPendingDelete);

  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          disabled={isPendingDelete}
          variant="destructive"
          onClick={() => onDelete()}
        >
          {isPendingDeleteDelay ? <Spinner /> : "Удалить"}
        </Button>
      </CardFooter>
    </Card>
  );
};
