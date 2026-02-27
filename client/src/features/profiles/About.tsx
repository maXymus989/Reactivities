import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import EditProfileInfo from "./EditProfileInfo";

export default function About() {
  const { id } = useParams();
  const { profile, isCurrentUser } = useProfile(id);
  const [editMode, setEditMode] = useState(false);

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="h5">About {profile?.displayName}</Typography>
        {isCurrentUser && (
          <Button onClick={handleEditProfile}>
            {editMode ? "Cancel" : "Edit profile"}
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ overflow: "auto", maxHeight: 350 }}>
        {editMode ? (
          <EditProfileInfo setEditMode={setEditMode} />
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {profile?.bio || "No description added yet"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
