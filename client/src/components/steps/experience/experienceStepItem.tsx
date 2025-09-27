import { Control, UseFormRegister, Controller } from "react-hook-form";
import { Resume } from "../../../models";
import {
  Box,
  TextInput,
  Textarea,
  Stack,
  Divider,
  Paper,
  Title,
  Text,
  Group,
} from "@mantine/core";

import TagInput from "../../tag/TagInput";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function ExperienceStepItem({
  control,
  register,
  index,
}: Props) {
  return (
    <Paper withBorder p="xl" radius="md" mb="md">
      <Title order={4} mb="md">
        Experience {index + 1}
      </Title>
      <Stack gap="md" mb="md">
        <Group grow>
          <TextInput
            label="Company Name"
            placeholder="e.g. Microsoft"
            description="Enter the name of the organization where you worked."
            {...register(`experiences.${index}.company.name`)}
          />
          <TextInput
            label="Company City"
            placeholder="e.g. Casablanca"
            description="Location helps contextualize your experience."
            {...register(`experiences.${index}.company.city`)}
          />
        </Group>
        <Textarea
          label="Description"
          placeholder="Briefly describe the company or your role there."
          description="Briefly describe the company or your role there to give more context."
          minRows={3}
          {...register(`experiences.${index}.company.description`)}
        />
        <Group grow>
          <TextInput
            label="Start Date"
            type="date"
            description="Shows when your journey with this company began."
            {...register(`experiences.${index}.startdate`)}
          />
          <TextInput
            label="End Date"
            type="date"
            description="Helps define the duration and progression of your role."
            {...register(`experiences.${index}.enddate`)}
          />
        </Group>
      </Stack>
      <Divider my="sm" />
      <Box mb="md">
        <Text fw={500} mb={4}>
          Key Tasks
        </Text>

        <TagInput
          name={`experiences.${index}.tasks`}
          control={control}
          placeholder="Add tasks and press Enter..."
        />
        <Text size="xs" color="dimmed" mt={4}>
          List your main responsibilities or achievements. Press Enter (or tab)
          to add each one.
        </Text>
      </Box>
      <Box>
        <Text fw={500} mb={4}>
          Tools Used
        </Text>
        <TagInput
          name={`experiences.${index}.tools`}
          control={control}
          placeholder="Add tools and press Enter..."
        />

        <Text size="xs" color="dimmed" mt={4}>
          Mention platforms, software, or techniques you used. Press Enter (or
          tab) to add each one.
        </Text>
      </Box>
    </Paper>
  );
}
