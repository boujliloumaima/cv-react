import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ExperienceStepItem from "./experienceStepItem";
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Paper,
  Text,
  Title,
  Badge,
} from "@mantine/core";
import {
  IconPlus,
  IconMinus,
  IconBuilding,
  IconMapPin,
  IconTools,
} from "@tabler/icons-react";

import { useEffect } from "react";
import { getCurrentResume } from "../../../services/resumeService";

export default function ExperienceStep() {
  const { register, handleSubmit, control, reset } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    reset(getCurrentResume());
  }, [reset]);

  const onSubmit: SubmitHandler<Resume> = (data) => {
    try {
      const currentResume = JSON.parse(
        localStorage.getItem("currentResume") || "{}"
      );
      const updatedcurrentResume = { ...currentResume, ...data };
      localStorage.setItem(
        "currentResume",
        JSON.stringify(updatedcurrentResume)
      );
      navigate("/resume/add/education");
    } catch (error) {
      alert("Error saving resume");
      console.error(error);
    }
  };
  return (
    <Card shadow="md" radius="md" p="xl" maw={800} mx="auto" mt="xl">
      <ProgressBar percentage={50} />
      <Title order={2} ta="center" mb="xs">
        Add Your Experience
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Share the roles you've held, the places you've worked, and the tools
        you've mastered. Every detail adds depth to your story.
      </Text>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((exp, index) => (
          <Box key={exp.id} mb="md">
            {index === fields.length - 1 ? (
              <ExperienceStepItem
                control={control}
                register={register}
                index={index}
              />
            ) : (
              <Paper withBorder p="md" radius="md" mb="xs">
                <Group align="flex-start" justify="space-between">
                  <Box>
                    <Group gap={8} align="center" mb={4}>
                      <IconBuilding
                        size={16}
                        color="var(--mantine-color-blue-6)"
                      />
                      <Text fw={700}>
                        {exp.company?.name || "Unnamed Company"}
                      </Text>
                      <Text size="sm" color="dimmed">
                        ({exp.company?.city})
                      </Text>
                    </Group>
                    <Group gap={8} align="center" mb={4}>
                      <IconMapPin
                        size={14}
                        color="var(--mantine-color-gray-6)"
                      />
                      <Text size="sm" color="dimmed">
                        {exp.startdate
                          ? new Date(exp.startdate).toLocaleDateString()
                          : ""}
                        {" – "}
                        {exp.enddate
                          ? new Date(exp.enddate).toLocaleDateString()
                          : ""}
                      </Text>
                    </Group>
                    {exp.company?.description && (
                      <Text size="sm" mb={4}>
                        {exp.company.description}
                      </Text>
                    )}
                    {exp.tasks && exp.tasks.length > 0 && (
                      <Stack gap={2} pl={12} mt={4}>
                        {exp.tasks.map((task, i) => (
                          <Text size="sm" key={i}>
                            • {task}
                          </Text>
                        ))}
                      </Stack>
                    )}
                    {exp.tools && exp.tools.length > 0 && (
                      <Group gap={4} mt={8} wrap="wrap">
                        <IconTools
                          size={14}
                          color="var(--mantine-color-gray-6)"
                        />
                        <Text size="sm" color="dimmed" mr={4}>
                          <strong>Tools:</strong>
                        </Text>
                        {exp.tools.map((tool, i) => (
                          <Badge
                            key={i}
                            size="sm"
                            color="black"
                            variant="light"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </Box>
                  <Button
                    variant="light"
                    color="red"
                    size="xs"
                    onClick={() => remove(index)}
                    leftSection={<IconMinus size={16} />}
                  ></Button>
                </Group>
              </Paper>
            )}
            {index < fields.length - 1 && <Divider my="sm" />}
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
              append({
                company: { name: "", city: "" },
                startdate: new Date(),
                enddate: new Date(),
                tasks: [],
                tools: [],
              })
            }
          >
            Add Experience {fields.length + 1}
          </Button>
        </Group>
      </Box>
    </Card>
  );
}
