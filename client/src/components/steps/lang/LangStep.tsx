import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { Resume, LangLevel } from "../../../models";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  Divider,
  Title,
  Text,
  Group,
  Stack,
  TextInput,
  Select,
  ActionIcon,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { useEffect } from "react";
import { getCurrentResume } from "../../../services/resumeService";
import UserLanguage from "../../langue";

export default function LanguagesStep() {
  const { register, handleSubmit, control, reset } = useForm<Resume>();
  const navigate = useNavigate();
  useEffect(() => {
    reset(getCurrentResume());
  }, [reset]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  const queryClient = useQueryClient();
  const createResumeMutation = useMutation({
    mutationFn: async (data: Resume) => {
      const currentResume = JSON.parse(
        localStorage.getItem("currentResume") || "{}"
      );
      const updatedCurrentResume = { ...currentResume, ...data };
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/v1/resumes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentResume),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      localStorage.removeItem("currentResume");
      navigate("/resumes/all");
    },
    onError: () => {
      alert("❌ Échec de création du résumé !");
    },
  });

  const onSubmit: SubmitHandler<Resume> = (data) => {
    createResumeMutation.mutate(data);
  };
  return (
    <Card shadow="md" radius="md" p="xl" maw={600} mx="auto" mt="xl">
      <Title order={3} ta="center" mb="md">
        Language Skills
      </Title>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          {fields.map((field, index) => (
            <Box key={field.id}>
              {index === fields.length - 1 ? (
                <Group grow align="flex-end">
                  <TextInput
                    label="Language"
                    placeholder="e.g., English, French"
                    {...register(`languages.${index}.name`)}
                  />
                  <Controller
                    control={control}
                    name={`languages.${index}.level`}
                    defaultValue={LangLevel.BEGINNER}
                    render={({ field }) => (
                      <Select
                        label="Proficiency"
                        placeholder="Select level"
                        data={Object.entries(LangLevel).map(([key, value]) => ({
                          value: value,
                          label:
                            key.charAt(0).toUpperCase() +
                            key.slice(1).toLowerCase(),
                        }))}
                        value={field.value?.toString()}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    )}
                  />
                </Group>
              ) : (
                <Card withBorder p="sm" mb="xs">
                  <Group justify="space-between">
                    <Text>
                      {field.name} :{" "}
                      {field.level.charAt(0).toUpperCase() +
                        field.level.slice(1).toLowerCase()}
                    </Text>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => remove(index)}
                      aria-label="Remove language"
                    >
                      <IconMinus size={20} />
                    </ActionIcon>
                  </Group>
                </Card>
              )}
              {index < fields.length - 1 && <Divider my="xs" />}
            </Box>
          ))}
        </Stack>
        <Group justify="space-between" mt="lg">
          <Button type="submit" size="md">
            Next
          </Button>
          <Button
            type="button"
            variant="outline"
            leftSection={<IconPlus size={18} />}
            onClick={() => append({ name: "", level: LangLevel.BEGINNER })}
          >
            Add Language
          </Button>
        </Group>
      </Box>
    </Card>
  );
}
