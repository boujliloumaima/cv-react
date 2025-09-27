import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";

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
    <Card
      sx={{
        minWidth: 350,
        maxWidth: 500,
        margin: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Login
        </Typography>
      </CardContent>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
        <TextField
          label="Email*"
          type="email"
          placeholder="Enter your email"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <TextField
          label="Password*"
          type="password"
          placeholder="Enter your password"
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <CardActions sx={{ justifyContent: "center", mt: 2 }}>
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
            Login
          </Button>
        </CardActions>
        <Divider sx={{ my: 2 }} />
        <CardContent sx={{ textAlign: "center", pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{" "}
            <Link href="/register" underline="hover" fontWeight="bold">
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
