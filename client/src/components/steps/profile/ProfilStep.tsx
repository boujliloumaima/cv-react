import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, Title, Text } from "@mantine/core";
import { ProfileForm } from "./ProfileForm";
import { Resume } from "../../../models";
import { getCurrentResume } from "../../../services/resumeService";

export default function ProfilStep() {
  const navigate = useNavigate();
  const currentResume = getCurrentResume();

  const onSubmit = (formData: any) => {
    try {
      // Convert the form data back to Resume type
      const resumeData: Partial<Resume> = {
        ...formData,
        birthday: formData.birthday ? new Date(formData.birthday) : undefined
      };
      
      const updatedResume = { ...currentResume, ...resumeData };
      localStorage.setItem("currentResume", JSON.stringify(updatedResume));
      navigate("/resume/add/skills");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    }
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={900} mx="auto" mt="xl">
      <Title order={2} ta="center" mb="xs">
        Your Story Begins Here
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Every great story starts with a name. Let's capture yours with pride.
      </Text>
      <ProfileForm 
        onSubmit={onSubmit} 
        defaultValues={currentResume} 
        submitLabel="Next"
      />
    </Card>
  );
}
