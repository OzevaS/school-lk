"use client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/shared/ui/spinner";
import { useRouter } from "next/navigation";
import { ProfileForm } from "./_ui/profile-form";
import { getProfileQuery } from "@/entities/user/profile";

export function UpdateProfileForm({
  userId,
  callbackUrl,
}: {
  userId: number;
  callbackUrl?: string;
}) {
  const router = useRouter();
  const profileQuery = useQuery({
    ...getProfileQuery(userId),
    retry: 0,
  });
console.log("USER ID", typeof userId)
  const handleSuccess = () => {
    if (callbackUrl) {
      router.push(callbackUrl);
    }
  };

  if (profileQuery.isPending) {
    return <Spinner aria-label="Загрузка профиля" />;
  }

  if (!profileQuery.data) {
    return <div>Не удалось загрузить профиль, возможно у вас нет прав</div>;
  }

  return (
    <ProfileForm
      userId={userId}
      profile={profileQuery.data.profile}
      onSuccess={handleSuccess}
      submitText={callbackUrl ? "Продолжить" : "Сохранить"}
    />
  );
}
