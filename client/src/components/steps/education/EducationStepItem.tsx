import { Resume } from "../../../models";
import { Control, UseFormRegister } from "react-hook-form";
import {
  Box,
  TextInput,
  Text,
  Stack,
  Paper,
  Title,
  Group,
} from "@mantine/core";
import TagInput from "../../tag/TagInput";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function EducationStepItem({ control, register, index }: Props) {
  return (
    <Paper withBorder p="xl" radius="md" mb="md">
      <Title order={4} mb="md">
        Education {index + 1}
      </Title>

      <Stack gap="md" mb="md">
        <Group grow>
          <TextInput
            label="Institution Name"
            placeholder="e.g. Université Mohammed V"
            description="This helps recruiters recognize the credibility of your academic background."
            {...register(`educations.${index}.institut.name`)}
          />
          <TextInput
            label="Institution City"
            placeholder="e.g. Rabat"
            description="Location adds context to your education and can reflect regional expertise."
            {...register(`educations.${index}.institut.city`)}
          />
        </Group>

        <TextInput
          label="Diploma"
          placeholder="e.g. Master Marketing"
          description="Your diploma is often the first thing recruiters look for—make it clear and proud."
          {...register(`educations.${index}.diploma`)}
        />

        <Group grow>
          <TextInput
            label="Start Date"
            type="date"
            description="Helps show the timeline of your academic journey."
            {...register(`educations.${index}.startdate`)}
          />
          <TextInput
            label="End Date"
            type="date"
            description="Helps show the timeline of your academic journey."
            {...register(`educations.${index}.enddate`)}
          />
        </Group>
      </Stack>

      <Box>
        <Text fw={500} mb={4}>
          Modules
        </Text>
        <TagInput
          name={`educations.${index}.modules`}
          control={control}
          placeholder="Add modules and press Enter..."
        />
        <Text size="xs" color="dimmed" mt={4}>
          Highlight the subjects that shaped your expertise. Press Enter to add
          each one.
        </Text>
      </Box>
    </Paper>
  );
}
