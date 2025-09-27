import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  TextInput,
  Button,
  Title,
  Box,
  Text,
  Divider,
  Group,
  Anchor,
  Stack,
} from "@mantine/core";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();
      console.log("✅ User registered:", result);
      navigate("/home");
    } catch (error: any) {
      console.log(` Registration failed: ${error.message}`);
    }
  };
  return (
    <Card shadow="md" radius="md" p="xl" maw={400} mx="auto" mt={80} withBorder>
      <Title order={2} align="center" mb="md">
        Register
      </Title>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name")}
            required
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            required
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            required
          />
          <Group justify="center" mt="xs">
            <Text size="sm" color="dimmed">
              Already have an account?{" "}
              <Anchor href="/" fw={700}>
                Log in
              </Anchor>
            </Text>
          </Group>
          <Divider my="sm" />
          <Button type="submit" size="md" fullWidth>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
