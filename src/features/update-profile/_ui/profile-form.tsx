"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { Profile } from "@/entities/user/profile";
import { AvatarField } from "./avatar-field";
import { UserId } from "@/entities/user/user";
import { useUpdateProfileMutation } from "../_vm/use-update-profile";

const profileFormSchema = z.object({
  name: z
    .string()
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .transform((name) => name.trim())
    .optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getDefaultValues = (profile: Profile) => {
  return {
    name: profile.name ?? "",
    email: profile.email,
    image: profile.image ?? undefined,
  };
};

export function ProfileForm({
  profile,
  onSuccess,
  submitText = "Сохранить",
  userId,
}: {
  profile: Profile;
  onSuccess?: () => void;
  submitText?: string;
  userId: UserId;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: getDefaultValues(profile),
  });

  console.log("image", form.getValues("image"));

  const updateProfile = useUpdateProfileMutation();

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("DATA", data);
    const newProfile = await updateProfile.update({
      userId,
      data,
    });

    form.reset(getDefaultValues(newProfile.profile));
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Аватарка</FormLabel>
              <FormControl>
                <AvatarField
                  profile={{ ...profile, image: field.value ?? profile.image }}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {updateProfile.isPending && (
            <Spinner className="mr-2 h-4 w-4" aria-label="Обновление профиля" />
          )}
          {submitText}
        </Button>
      </form>
    </Form>
  );
}
