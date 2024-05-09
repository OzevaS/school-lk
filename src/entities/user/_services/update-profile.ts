import { Profile, SessionEntity, UserId } from "../_domain/types";
import { createProfileAbility } from "../_domain/ability";
import { NeedAuthError } from "@/shared/lib/errors";
import { profileRepository } from "../_repositories/profile";

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileService {
  async exec({ userId, data, session }: UpdateProfile): Promise<Profile> {
    const profileAbility = createProfileAbility(session);

    if (!profileAbility.canUpdateProfile(userId)) {
      throw new NeedAuthError();
    }

    return await profileRepository.update(userId, data);
  }
}

export const updateProfileService = new UpdateProfileService();
