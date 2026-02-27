import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  profileSchema,
  type ProfileSchema,
} from "../../lib/schemas/profileSchema";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";

type Props = {
  setEditMode: (editMode: boolean) => void;
};

export default function EditProfileInfo({ setEditMode }: Props) {
  const { id } = useParams();
  const { profile, updateProfileInfo } = useProfile(id);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid },
  } = useForm<ProfileSchema>({
    mode: "onTouched",
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileSchema) => {
    await updateProfileInfo.mutateAsync(data, {
      onSuccess: () => setEditMode(false),
    });
  };

  useEffect(() => {
    if (profile) {
      reset({
        displayName: profile?.displayName,
        bio: profile?.bio || "",
      });
    }
  }, [profile, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      sx={{ gap: 3, my: 2 }}
    >
      <TextInput label="Display name" control={control} name="displayName" />
      <TextInput label="Bio" control={control} name="bio" multiline />
      <Button
        type="submit"
        color="success"
        variant="contained"
        disabled={!isValid || !isDirty || updateProfileInfo.isPending}
      >
        Submit
      </Button>
    </Box>
  );
}
