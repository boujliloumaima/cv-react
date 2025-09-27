import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";

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
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Register
        </Typography>
      </CardContent>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("name")}
          required
        />
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("email")}
          required
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register("password")}
          required
        />
        <CardContent sx={{ pt: 0, pb: 0 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            Already have an account?{" "}
            <Link href="/" underline="hover" fontWeight="bold">
              Log in
            </Link>
          </Typography>
        </CardContent>
        <Divider sx={{ my: 2 }} />
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Sign Up
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
