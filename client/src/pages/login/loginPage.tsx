import { useForm } from "react-hook-form";
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

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const result = await response.json();
      console.log("Login success:", result);
      navigate("/home");
    } catch (error: any) {
      console.error("Login error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Card shadow="md" radius="md" p="xl" maw={400} mx="auto" mt={80} withBorder>
      <Title order={2} align="center" mb="md">
        Login
      </Title>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="sm">
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
            required
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
            required
          />
          <Button type="submit" size="md" fullWidth mt="md">
            Login
          </Button>
        </Stack>
        <Divider my="lg" />
        <Group justify="center">
          <Text size="sm" color="dimmed">
            Don't have an account?{" "}
            <Anchor href="/register" fw={700}>
              Sign up
            </Anchor>
          </Text>
        </Group>
      </Box>
    </Card>
  );
}
