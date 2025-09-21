import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../login/login.css";

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
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="app-name">CVBuilder</p>
        <div className="form-group">
          <label htmlFor=""> Full name</label>
          <input {...register("name")} placeholder="Name" required />
        </div>
        <div className="form-group">
          <label htmlFor="">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn register-btn">
            sign up
          </button>
        </div>
        <div className="register">
          <p>
            Already have an account ?{" "}
            <Link to="/" className="signup-link">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
