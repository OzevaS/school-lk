import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../_actions/update-profile";
import { useAppSession } from "@/entities/user/session";
import { useInvalidateProfile } from "@/entities/user/_queries";

export const useUpdateProfileMutation = () => {
  const { update: updateSession } = useAppSession();
  const invalidateProfile = useInvalidateProfile();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAction,
    async onSuccess({ profile }, { userId }) {
      await updateSession({
        user: profile,
      });
      await invalidateProfile(userId);
    },
  });

  return {
    update: mutateAsync,
    isPending,
  };
};
