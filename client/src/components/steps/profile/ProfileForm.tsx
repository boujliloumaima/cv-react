import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useEffect } from "react";
import { nationalities } from "../../../tempDB/nationalities";
import {
  Box,
  Stack,
  Group,
  Divider,
  TextInput,
  Select,
  Button,
  Text,
  Autocomplete as MantineAutocomplete,
} from "@mantine/core";
import {
  IconUser,
  IconPhone,
  IconMail,
  IconCake,
  IconFlag,
  IconBriefcase,
  IconGenderMale,
} from "@tabler/icons-react";
import { Gender, Resume } from "../../../models";



interface ProfileFormProps {
  onSubmit: SubmitHandler<Resume>;
  defaultValues?: Partial<Resume>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function ProfileForm({
  onSubmit,
  defaultValues,
  onCancel,
  submitLabel = "Save"
}: ProfileFormProps) {
  const { register, handleSubmit, control, reset } = useForm<Resume>();

  // Reset the form when defaultValues changes
  useEffect(() => {
    if (defaultValues) {
      // Create a new object with the formatted values
      const formattedValues: Partial<Resume> = { ...defaultValues };
      
      // Format the birthday if it exists
      if (formattedValues.birthday) {
        try {
          // Handle both Date objects and ISO strings
          const dateValue = typeof formattedValues.birthday === 'string' 
            ? new Date(formattedValues.birthday)
            : new Date(formattedValues.birthday as unknown as string);
            
          if (!isNaN(dateValue.getTime())) {
            // Format as YYYY-MM-DD for the date input
            formattedValues.birthday = dateValue.toISOString().split('T')[0];
          } else {
            formattedValues.birthday = '';
          }
        } catch (error) {
          console.error('Error formatting date:', error);
          formattedValues.birthday = '';
        }
      }
      
      // Reset the form with the formatted values
      reset(formattedValues);
    }
  }, [defaultValues, reset]);

  console.log('Form default values:', defaultValues);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md" mb="md">
        <Group grow>
          <TextInput
            label="Full Name"
            leftSection={<IconUser size={18} />}
            placeholder="Enter your full legal name"
            description="Enter your full legal name as you'd like it to appear on your CV."
            {...register("name")}
            required
          />
          <TextInput
            label="Phone"
            leftSection={<IconPhone size={18} />}
            placeholder="Include your country code"
            description="Include your country code for international contact."
            {...register("phone")}
            required
          />
        </Group>
        <Group grow>
          <TextInput
            label="Email Address"
            leftSection={<IconMail size={18} />}
            type="email"
            placeholder="Use a professional email address"
            description="Use a professional email address you check regularly."
            {...register("email")}
            required
          />
          <TextInput
            label="Birthday"
            leftSection={<IconCake size={18} />}
            type="date"
            description="Date of Birth Format: MM/DD/YYYY."
            {...register("birthday")}
          />
        </Group>
        <Group grow>
          <Controller
            name="nationalite"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MantineAutocomplete
                label="Nationality"
                leftSection={<IconFlag size={18} />}
                placeholder="Select your nationality"
                data={nationalities}
                value={value || ""}
                onChange={onChange}
                description="This helps recruiters understand your eligibility for certain roles."
              />
            )}
          />
          <TextInput
            label="Job Title"
            leftSection={<IconBriefcase size={18} />}
            placeholder="State your current or desired professional title"
            description="State your current or desired professional title."
            {...register("jobTitle")}
            required
          />
        </Group>
        <Controller
          name="gender"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              label="Gender"
              leftSection={<IconGenderMale size={18} />}
              placeholder="Select gender"
              data={[
                {
                  value: Gender.MALE,
                  label: "Male",
                },
                {
                  value: Gender.FEMALE,
                  label: "Female",
                },
              ]}
              description="Optional: Helps personalize your CV presentation."
              value={value || ""}
              onChange={onChange}
              mb="md"
            />
          )}
        />
      </Stack>
      <Divider my="lg" />
      <Group justify="flex-end">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="md">
          {submitLabel}
        </Button>
      </Group>
    </Box>
  );
}
