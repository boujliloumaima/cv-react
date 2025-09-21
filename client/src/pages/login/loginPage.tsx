import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
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
    <div className="container">
      <p className="app-name">CVBuilder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <button type="submit" className="btn register-btn">
            Login
          </button>
        </div>
        <div className="register">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
