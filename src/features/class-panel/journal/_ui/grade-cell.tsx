import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/ui/utils";
import { useState } from "react";

export const Grade = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={cn("w-full", className)}>
      {edit ? (
        <Input
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={() => setEdit(false)}
        />
      ) : (
        <div
          onDoubleClick={() => setEdit(true)}
          className="w-full flex justify-center select-none"
        >
          {value ?? "-"}
        </div>
      )}
    </div>
  );
};
