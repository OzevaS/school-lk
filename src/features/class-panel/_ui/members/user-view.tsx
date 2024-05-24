import { ProfileAvatar } from "@/entities/user/profile";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/ui/utils";

export const UserView = ({
  user,
  className,
  actions,
}: {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  className?: string;
  actions?: React.ReactNode;
}) => {
  const { name, email, image } = user;

  return (
    <div
      className={cn(
        "flex rounded-2xl border bg-card p-4 items-center",
        className,
      )}
    >
      <ProfileAvatar className="w-12 h-12" profile={{ name, email, image }} />
      <div className="flex flex-col gap-2 ml-4">
        <div className="flex gap-2">
          <Badge variant="secondary">ФИО:</Badge>
          <div>{name}</div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">Почта:</Badge>
          <div>{email}</div>
        </div>
      </div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
};
