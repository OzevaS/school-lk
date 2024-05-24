import { UserId } from "@/entities/user/user";
import { useQueryClient } from "@tanstack/react-query";

const baseKeys = ["user", "teacher", "student"];
// export const useInvalidateProfile = () => {
//   const queryClient = useQueryClient();

//   return (userId: UserId) =>
//     queryClient.invalidateQueries({
//       queryKey: [baseKey, "getProfileById", userId],
//     });
// };

export const useInvalidateUser = () => {
  const queryClient = useQueryClient();

  return (userId: UserId) =>
    queryClient.invalidateQueries({
      queryKey: [...baseKeys, "getUserById", userId],
    });
};
