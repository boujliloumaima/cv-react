import { Education } from "../../../models";
import { Control, SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack, TextInput, Title, Paper, Box, Group, Text } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import TagInput from "../../tag/TagInput";
import { useEffect } from "react";

interface EducationFormProps {
  onCancel?: () => void;
  onSubmit?: (data: Education) => void;
  defaultValues?: Partial<Education>;
  isEditing?: boolean;
}


export default function EducationForm({
  onSubmit,
  onCancel,
  defaultValues,
  isEditing = false,
}: EducationFormProps) {
  const {control, handleSubmit, reset, formState: { errors }, register } = useForm<Education>({
    defaultValues: {
      institut: { name: '', city: '' },
      diploma: '',
      startdate: new Date(),
      enddate: new Date(),
      modules: [],
      ...defaultValues
    }
  });

  // Reset the form when defaultValues changes
  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        startdate: formatDate(defaultValues.startdate), 
        enddate: formatDate(defaultValues.enddate)
      });
    }
  }, [defaultValues, reset]);

  const formatDate = (date?: string | Date): Date | string|undefined => {
    if (!date) return undefined;
    try {

      const dateValue = typeof date === 'string' 
        ? new Date(date)
        : new Date(date as unknown as string);
        
      if (!isNaN(dateValue.getTime())) {
        // Format as YYYY-MM-DD for the date input
        date = dateValue.toISOString().split('T')[0];
      } else{
        date = new Date(dateValue.toISOString().split('T')[0]);
      }
      return date;
    } catch (error) {
      console.error('Error formatting date:', error);
      return undefined;
    }
  };

  const handleFormSubmit: SubmitHandler<Education> = (data) => {
    onSubmit!({
      ...data,
    });
  };

  return (
    <Paper withBorder p="xl" radius="md" mb="md" component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Title order={4} mb="md">
        {isEditing ? 'Edit Education' : 'Add New Education'}
      </Title>

      <Stack gap="md" mb="md">
        <Group grow>
          <TextInput
            label="Institution Name"
            placeholder="e.g. Université Mohammed V"
            description="This helps recruiters recognize the credibility of your academic background."
            {...register('institut.name', { required: 'Institution name is required' })}
            error={errors.institut?.name?.message}
          />
          <TextInput
            label="Institution City"
            placeholder="e.g. Rabat"
            description="Location adds context to your education and can reflect regional expertise."
            {...register('institut.city')}
          />
        </Group>

        <TextInput
          label="Diploma"
          placeholder="e.g. Master Marketing"
          description="Your diploma is often the first thing recruiters look for—make it clear and proud."
          {...register('diploma', { required: 'Diploma is required' })}
          error={errors.diploma?.message}
        />

        <Group grow>
          <TextInput
            label="Start Date"
            type="date"
            description="Helps show the timeline of your academic journey."
            {...register('startdate', { required: 'Start date is required' })}
            error={errors.startdate?.message}
          />
          <TextInput
            label="End Date"
            type="date"
            description="Helps show the timeline of your academic journey."
            {...register('enddate')}
          />
        </Group>

        <Box>
          <Text fw={500} mb={4}>
            Modules
          </Text>
          <TagInput
            name="modules"
            control={control as any}
            placeholder="Add modules and press Enter..."
          />
          <Text size="xs" color="dimmed" mt={4}>
            Highlight the subjects that shaped your expertise. Press Enter to add
            each one.
          </Text>
        </Box>
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="blue">
          {isEditing ? 'Update' : 'Add'} Education
        </Button>
      </Group>
    </Paper>
  );
}