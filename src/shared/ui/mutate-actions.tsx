"use client";

import { cn } from "./utils";
import { Edit, Trash2 } from "lucide-react";

export const MutateActions = ({
  children,
  className,
  onEdit,
  onDelete,
  isPending,
}: {
  children: React.ReactNode;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isPending?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-2",
        className,
        isPending ? "animate-pulse" : "",
      )}
    >
      {children}
      {onEdit && (
        <button
          type="button"
          onClick={() => {
            onEdit();
          }}
        >
          <Edit className="h-4 w-4" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={() => {
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
