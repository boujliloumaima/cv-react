import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { SkillType, Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  Select,
  ActionIcon,
  Paper,
  Title,
} from "@mantine/core";
import {
  IconPlus,
  IconMinus,
  IconTools,
  IconUserStar,
} from "@tabler/icons-react";

import { getCurrentResume } from "../../../services/resumeService";
import { useEffect } from "react";

export default function SkillStep() {
  const { register, handleSubmit, control, reset } = useForm<Resume>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
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
    navigate("/resume/add/experience");
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={800} mx="auto" mt="xl">
      <ProgressBar percentage={25} />
      <Title order={2} ta="center" mb="xs">
        Add Your Skills
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Highlight the strengths that define how you work. Whether technical or
        soft, your skills tell recruiters what you're great at.
      </Text>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {fields.length === 0 ? (
          <Paper p="md" withBorder mb="md" ta="center">
            <Text color="dimmed" mb={4}>
              Your talents deserve to be seen.
            </Text>
            <Text color="dimmed">
              Add your first skill to begin shaping your story.
            </Text>
          </Paper>
        ) : (
          fields.map((field, index) => (
            <Box key={field.id} mb="md">
              {index === fields.length - 1 ? (
                <Group grow align="flex-end">
                  <TextInput
                    label="Skill Name"
                    placeholder="Choose a skill that defines your value"
                    description="Choose a skill that defines your value."
                    {...register(`skills.${index}.name`)}
                  />
                  {/* Use Controller for Select to avoid type errors */}
                  <Controller
                    control={control}
                    name={`skills.${index}.level`}
                    defaultValue={1}
                    render={({ field }) => (
                      <Select
                        label="Skill Level"
                        placeholder="Rate your mastery from 1 (novice) to 5 (expert)"
                        description="Rate your mastery from 1 (novice) to 5 (expert). Be honest, be proud."
                        data={[
                          { value: "1", label: "1" },
                          { value: "2", label: "2" },
                          { value: "3", label: "3" },
                          { value: "4", label: "4" },
                          { value: "5", label: "5" },
                        ]}
                        value={field.value?.toString()}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`skills.${index}.type`}
                    defaultValue={SkillType.TECHNICAL}
                    render={({ field }) => (
                      <Select
                        label="Skill Type"
                        placeholder="Is this a technical craft or a soft skill?"
                        description="Is this a technical craft or a soft skill like leadership or empathy?"
                        data={[
                          {
                            value: SkillType.TECHNICAL,
                            label: "Technical",
                          },
                          {
                            value: SkillType.SOFT,
                            label: "Soft",
                          },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                </Group>
              ) : (
                <Paper withBorder p="md" mb="xs">
                  <Group justify="space-between" align="center">
                    <Box>
                      <Text fw={700}>{field.name || "Unnamed Skill"}</Text>
                      <Text size="sm" color="dimmed">
                        <strong>Level:</strong> {field.level} / 5
                      </Text>
                      <Text size="sm" color="dimmed">
                        <strong>Type:</strong>{" "}
                        {field.type === SkillType.TECHNICAL ? (
                          <>
                            <IconTools size={14} display={"inline"} />
                            <span>Technical</span>
                          </>
                        ) : (
                          <>
                            <IconUserStar size={14} display={"inline"} />
                            <span>Soft</span>
                          </>
                        )}
                      </Text>
                    </Box>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => remove(index)}
                      aria-label="Remove skill"
                    >
                      <IconMinus size={20} />
                    </ActionIcon>
                  </Group>
                </Paper>
              )}
              {index < fields.length - 1 && <Divider my="sm" />}
            </Box>
          ))
        )}
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
              append({ name: "", level: 1, type: SkillType.TECHNICAL })
            }
          >
            Add Skill {fields.length + 1}
          </Button>
        </Group>
      </Box>
    </Card>
  );
}
