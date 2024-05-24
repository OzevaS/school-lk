"use client";

import { Check, CircleX, Edit, Trash2 } from "lucide-react";
import { Input } from "./input";
import { cn } from "./utils";
import { Separator } from "./separator";
import { Button } from "./button";
import { useEffect, useState } from "react";

const getInputSpace = (actionCount: number) => {
  if (actionCount === 1) return "pr-14";
  else if (actionCount === 2) return "pr-16";

  return undefined;
};

export const SmartInput = ({
  className,
  label,
  placeholder,
  value,
  onEdit,
  onDelete,
  isPending,
  autoWidth,
}: {
  className?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onEdit?: (value: string) => void;
  onDelete?: () => void;
  isPending?: boolean;
  autoWidth?: boolean;
}) => {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const readonly = !onEdit;

  const actionCount = onEdit && onDelete ? 2 : onEdit || onDelete ? 1 : 0;

  return (
    <div className={cn("relative", className, { "animate-pulse": isPending })}>
      <Input
        className={cn("w-fit", getInputSpace(actionCount))}
        value={isEditing ? editValue : value}
        placeholder={placeholder}
        readOnly={readonly}
        onChange={onChange}
        size={autoWidth ? value.length : undefined}
      />
      <div className="flex gap-2 absolute text-muted-foreground right-4 top-[calc(50%-10px)]">
        {!readonly && <Separator className="h-5" orientation="vertical" />}
        {isEditing && (
          <>
            <Button
              disabled={isPending}
              onClick={() => {
                onEdit?.(editValue);
                setIsEditing(false);
                setEditValue(value);
              }}
              className="p-0 h-min"
              variant="link"
            >
              <Check className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                setIsEditing(false);
                setEditValue(value);
              }}
              className="p-0 h-min"
              variant="link"
            >
              <CircleX className="h-5 w-5 text-muted-foreground" />
            </Button>
          </>
        )}
        {!isEditing && onEdit && (
          <Button
            onClick={() => setIsEditing(true)}
            disabled={isPending}
            className="p-0 h-min"
            variant="link"
          >
            <Edit className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
        {!isEditing && onDelete && (
          <Button
            disabled={isPending}
            onClick={onDelete}
            className="p-0 h-min"
            variant="link"
          >
            <Trash2 className="h-5 w-5 text-muted-foreground" />
          </Button>
        )}
      </div>
    </div>
  );
};
