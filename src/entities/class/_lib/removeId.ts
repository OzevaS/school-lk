import { UserId } from "@/entities/user/user";

export type RemoveId<
  T extends {
    id: UserId;
    user?: {
      id: UserId;
    };
  },
> = T extends { user: { id: UserId } }
  ? Omit<T, "id" | "user"> & { user: Omit<T["user"], "id"> }
  : Omit<T, "id">;
