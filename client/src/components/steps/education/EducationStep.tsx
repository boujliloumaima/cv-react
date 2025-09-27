import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Paper,
  Text,
  Title,
  Group,
  Badge,
} from "@mantine/core";
import {
  IconPlus,
  IconMinus,
  IconSchool,
  IconBook,
  IconCalendar,
} from "@tabler/icons-react";

import EducationStepItem from "./EducationStepItem";
import { useEffect } from "react";
import { getCurrentResume } from "../../../services/resumeService";

// Composant principal
export default function EducationStep() {
  const { register, handleSubmit, control, reset } = useForm<Resume>();
  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });

  const navigate = useNavigate();
  useEffect(() => {
    reset(getCurrentResume());
  }, [reset]);
  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const updatedcurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
    navigate("/resume/add/languages");
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={800} mx="auto" mt="xl">
      <ProgressBar percentage={75} />
      <Title order={2} ta="center" mb="xs">
        Add Your Education
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Your academic path says a lot about your foundation. Let’s highlight the
        places and programs that shaped your expertise.
      </Text>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {educationFields.map((edu, index) => (
          <Box key={edu.id} mb="md">
            {index === educationFields.length - 1 ? (
              <EducationStepItem
                control={control}
                register={register}
                index={index}
              />
            ) : (
              <Paper withBorder p="md" radius="md" mb="xs">
                <Group align="flex-start" justify="space-between">
                  <Box>
                    <Group gap={8} align="center" mb={4}>
                      <IconSchool
                        size={16}
                        color="var(--mantine-color-blue-6)"
                      />
                      <Text fw={700}>
                        {edu.institut?.name || "Unnamed Institution"},{" "}
                        {edu.institut?.city}
                      </Text>
                    </Group>
                    <Group gap={8} align="center" mb={4}>
                      <IconBook size={14} color="var(--mantine-color-gray-6)" />
                      <Text size="sm" color="dimmed">
                        <strong>Diploma:</strong> {edu.diploma}
                      </Text>
                    </Group>
                    <Group gap={8} align="center" mb={4}>
                      <IconCalendar
                        size={14}
                        color="var(--mantine-color-gray-6)"
                      />
                      <Text size="sm" color="dimmed">
                        <strong>Dates:</strong>{" "}
                        {edu.startdate
                          ? new Date(edu.startdate).toLocaleDateString()
                          : ""}
                        {" - "}
                        {edu.enddate
                          ? new Date(edu.enddate).toLocaleDateString()
                          : ""}
                      </Text>
                    </Group>
                    {edu.modules && edu.modules.length > 0 && (
                      <Group gap={4} align="center" mt={4} wrap="wrap">
                        <IconBook
                          size={14}
                          color="var(--mantine-color-gray-6)"
                        />
                        <Text size="sm" color="dimmed">
                          <strong>Modules:</strong>
                        </Text>
                        {edu.modules.map((module, i) => (
                          <Badge
                            key={i}
                            size="sm"
                            color="black"
                            variant="light"
                          >
                            {module}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Box>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    onClick={() => removeEducation(index)}
                    leftSection={<IconMinus size={16} />}
                  ></Button>
                </Group>
              </Paper>
            )}
            {index < educationFields.length - 1 && <Divider my="sm" />}
          </Box>
        ))}
        <Divider my="lg" />
        <Group justify="space-between">
          <Button type="submit" size="md">
            Next
          </Button>
          <Button
            type="button"
            variant="outline"
            leftSection={<IconPlus size={18} />}
            onClick={() =>
              addEducation({
                institut: { name: "", city: "" },
                diploma: "",
                startdate: new Date(),
                enddate: new Date(),
                modules: [],
              })
            }
          >
            Add Education {educationFields.length + 1}
          </Button>
        </Group>
      </Box>
    </Card>
  );
}
