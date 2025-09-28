import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllResumes } from "../../services/resumeService";
import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Title,
  Text,
  Image,
  SimpleGrid,
  Divider,
  Paper,
  Anchor,
  Container,
  ThemeIcon,
} from "@mantine/core";
import { IconFileText, IconSparkles, IconCheck, IconUser, IconDeviceMobile, IconDownload, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export default function HomePage() {
  const navigate = useNavigate();

  const {
    data: totalResumes = [],
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: getAllResumes,
  });

  const handleCreateCV = () => {
    navigate("/resume/add/profile");
  };

  const handleImportLinkedIn = () => {
    alert("LinkedIn import coming soon!");
  };

  return (
    <Container size="lg" py="xl">
      {/* Hero Section */}
      <Card shadow="md" radius="md" p="xl" mb="xl" withBorder>
        <Stack align="center" gap="md">
          <Title order={1} ta="center">
            Build a Standout CV in Minutes
          </Title>
          <Text ta="center" color="dimmed" size="lg">
            Drag-and-drop sections, and ATS-optimized templates. No design skills needed.
          </Text>
          <Group gap="md" mt="md">
            <Button size="md" onClick={handleCreateCV}>
              Create My CV
            </Button>
            <Button
              size="md"
              variant="outline"
              onClick={() => navigate("/resumes/all")}
            >
              Show my resumes ({totalResumes.length})
            </Button>
            <Button
              size="md"
              variant="light"
              leftSection={<IconBrandLinkedin size={18} />}
              onClick={handleImportLinkedIn}
            >
              Import from LinkedIn
            </Button>
          </Group>
          <Image
            src="/cv-editor-preview.png"
            alt="CV Editor Preview"
            maw={400}
            radius="md"
            mt="md"
          />
        </Stack>
      </Card>

      {/* Features Section */}
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
        <Paper withBorder p="md" radius="md">
          <Group gap={8}>
            <ThemeIcon variant="light" color="blue" size="lg">
              <IconFileText size={24} />
            </ThemeIcon>
            <Text fw={700}>Easy Drag-and-Drop</Text>
          </Group>
          <Text color="dimmed" mt={4}>
            Customize your CV layout with a simple drag-and-drop editor.
          </Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group gap={8}>
            <ThemeIcon variant="light" color="grape" size="lg">
              <IconSparkles size={24} />
            </ThemeIcon>
            <Text fw={700}>AI-Powered Suggestions</Text>
          </Group>
          <Text color="dimmed" mt={4}>
            Get real-time tips to improve your CV and stand out.
          </Text>
        </Paper>
        <Paper withBorder p="md" radius="md">
          <Group gap={8}>
            <ThemeIcon variant="light" color="teal" size="lg">
              <IconCheck size={24} />
            </ThemeIcon>
            <Text fw={700}>ATS-Optimized Templates</Text>
          </Group>
          <Text color="dimmed" mt={4}>
            Templates designed to pass Applicant Tracking Systems.
          </Text>
        </Paper>
      </SimpleGrid>

      {/* Templates Gallery */}
      <Card withBorder shadow="xs" radius="md" p="lg" mb="xl">
        <Title order={3} mb="md">
          Choose a Template to Get Started
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Paper
            withBorder
            p="sm"
            radius="md"
            onClick={() => navigate("/resume/add/profile?template=modern")}
            style={{ cursor: "pointer" }}
          >
            <Image src="/modern-template.png" alt="Modern Template" radius="md" />
            <Button mt="sm" fullWidth>
              Use This Template
            </Button>
          </Paper>
          <Paper
            withBorder
            p="sm"
            radius="md"
            onClick={() => navigate("/resume/add/profile?template=classic")}
            style={{ cursor: "pointer" }}
          >
            <Image src="/classic-template.png" alt="Classic Template" radius="md" />
            <Button mt="sm" fullWidth>
              Use This Template
            </Button>
          </Paper>
          <Paper
            withBorder
            p="sm"
            radius="md"
            onClick={() => navigate("/resume/add/profile?template=creative")}
            style={{ cursor: "pointer" }}
          >
            <Image src="/creative-template.png" alt="Creative Template" radius="md" />
            <Button mt="sm" fullWidth>
              Use This Template
            </Button>
          </Paper>
        </SimpleGrid>
      </Card>

      {/* How It Works */}
      <Card withBorder shadow="xs" radius="md" p="lg" mb="xl">
        <Title order={3} mb="md">
          How It Works
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="blue" size="xl">
              <IconUser size={28} />
            </ThemeIcon>
            <Text fw={700}>Add Your Info</Text>
            <Text ta="center" color="dimmed">
              Fill in your details or import from LinkedIn.
            </Text>
          </Stack>
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="grape" size="xl">
              <IconDeviceMobile size={28} />
            </ThemeIcon>
            <Text fw={700}>Customize Your CV</Text>
            <Text ta="center" color="dimmed">
              Drag sections, edit content, and pick a theme.
            </Text>
          </Stack>
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="teal" size="xl">
              <IconDownload size={28} />
            </ThemeIcon>
            <Text fw={700}>Export & Apply</Text>
            <Text ta="center" color="dimmed">
              Download as PDF or apply directly to jobs.
            </Text>
          </Stack>
        </SimpleGrid>
      </Card>

      {/* Footer */}
      <Divider my="xl" />
      <Group justify="space-between" align="center" mt="md" mb="xs">
        <Group gap={24}>
          <Anchor href="/about" size="sm">
            About
          </Anchor>
          <Anchor href="/pricing" size="sm">
            Pricing
          </Anchor>
          <Anchor href="/faq" size="sm">
            FAQ
          </Anchor>
          <Anchor href="/contact" size="sm">
            Contact
          </Anchor>
        </Group>
        <Group gap={16}>
          <Anchor href="https://linkedin.com" target="_blank">
            <IconBrandLinkedin size={20} />
          </Anchor>
          <Anchor href="https://twitter.com" target="_blank">
            <IconBrandTwitter size={20} />
          </Anchor>
        </Group>
      </Group>
      <Text ta="center" size="xs" color="dimmed" mt={8}>
        &copy; {new Date().getFullYear()} CV Builder. All rights reserved.
      </Text>
    </Container>
  );
};
