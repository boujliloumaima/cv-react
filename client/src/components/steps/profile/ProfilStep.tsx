import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nationalities } from "../../../tempDB/nationalities";
import ProgressBar from "../../progress/CardWithProgress";
import { useEffect } from "react";

import {
  Box,
  Stack,
  Group,
  Divider,
  TextInput,
  Select,
  Button,
  Card,
  Title,
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
import { getCurrentResume } from "../../../services/resumeService";

export default function ProfilStep() {
  const { register, handleSubmit, control, reset } = useForm<Resume>();
  const navigate = useNavigate();
  // Load data from localStorage on mount
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
      navigate("/resume/add/skills");
    } catch (error) {
      alert("Error saving resume:");
      console.error(error);
    }
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={900} mx="auto" mt="xl">
      <ProgressBar percentage={0} />
      <Title order={2} ta="center" mb="xs">
        Your Story Begins Here
      </Title>
      <Text ta="center" color="dimmed" mb="md">
        Every great story starts with a name. Let's capture yours with pride.
      </Text>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md" mb="md">
          <Group grow>
            <TextInput
              label="Full Name"
              leftSection={<IconUser size={18} />}
              placeholder="Enter your full legal name"
              description="Enter your full legal name as you'd like it to appear on your CV."
              {...register("name")}
            />
            <TextInput
              label="Phone"
              leftSection={<IconPhone size={18} />}
              placeholder="Include your country code"
              description="Include your country code for international contact."
              {...register("phone")}
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
          <Button type="submit" size="md">
            Next
          </Button>
        </Group>
      </Box>
    </Card>
  );
}
