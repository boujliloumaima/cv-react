import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import { Card, Title, Text, Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { getCurrentResume } from "../../../services/resumeService";
import EducationsForm from "./EducationsForm";

interface EducationStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function EducationStep({ onNext, onBack }: EducationStepProps) {
  const [resume, setResume] = useState<Resume>(getCurrentResume());
  const navigate = useNavigate();

  useEffect(() => {
    const currentResume = getCurrentResume();
    setResume(currentResume);
  }, []);

  const handleUpdateResume = (updatedResume: Resume) => {
    setResume(updatedResume);
    localStorage.setItem("currentResume", JSON.stringify(updatedResume));
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      navigate("/resume/add/languages");
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={800} mx="auto" mt="xl">
      <ProgressBar percentage={75} />
      <Title order={2} ta="center" mb="xs">
        Add Your Education
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Your academic path says a lot about your foundation. Let's highlight the
        places and programs that shaped your expertise.
      </Text>
      
      <EducationsForm 
        defaultValues={resume} 
        onSubmit={handleUpdateResume} 
      />
      
      <Stack mt="md" gap="sm">
        <Button onClick={handleNext} fullWidth>
          Continue
        </Button>
        <Button variant="default" onClick={handleBack} fullWidth>
          Back
        </Button>
      </Stack>
    </Card>
  );
}
