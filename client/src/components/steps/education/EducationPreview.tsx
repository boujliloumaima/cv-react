import { Box, Button, Group, Paper, Text, Badge } from "@mantine/core";
import { IconSchool, IconBook, IconCalendar, IconEdit, IconTrash } from "@tabler/icons-react";
import { Education } from "../../../models";

interface EducationPreviewProps {
  edu: Education;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function EducationPreview({ edu, onEdit, onRemove }: EducationPreviewProps) {

    return (
        <Paper withBorder p="md" radius="md" mb="xs">
                <Group align="flex-start" justify="space-between">
                  <Box>
                    <Group gap={8} align="center" mb={4}>
                      <IconSchool
                        size={16}
                        color="var(--mantine-color-blue-6)"
                      />
                      <Text fw={700}>
                        {edu.institut?.name || "Unnamed Institution"}{" "}
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
                  <Group gap="xs">
                    <Button
                      variant="light"
                      color="blue"
                      size="xs"
                      onClick={onEdit}
                      leftSection={<IconEdit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={onRemove}
                      leftSection={<IconTrash size={16} />}
                    >
                      Remove
                    </Button>
                  </Group>
                </Group>
              </Paper>
    );
}