import { useQueryClient } from "@tanstack/react-query";
import { getUserProfileAction } from "../_actions/get-user-profile";
import { UserId } from "../_domain/types";

const baseKey = "user";

export const getProfileQuery = (userId: UserId) => ({
  queryFn: () => getUserProfileAction({ userId }),
  queryKey: [baseKey, "getProfileById", userId],
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getProfileById", userId],
    });
};
