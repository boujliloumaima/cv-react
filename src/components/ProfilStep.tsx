import { useForm, SubmitHandler } from "react-hook-form";
import { Resume, Gender } from "../models";
import { useNavigate } from "react-router-dom";
export default function ProfilStep() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Resume>();
  const navigate = useNavigate();
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
      alert("Profile info saved!");
      navigate("/resume/add/skills");
    } catch (error) {
      alert("Error saving resume:");
    }
  };
  return (
    <div className="container-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label>Fullname</label>
            <input {...register("name", { required: "name is require" })} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input {...register("phone", { required: "phone is require" })} />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              {...register("email", { required: "email is require" })}
              type="email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input
              type="date"
              {...register("birthday", { required: "birthay is require" })}
            />
            {errors.birthday && (
              <p className="error">{errors.birthday.message}</p>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nationality</label>
            <input
              {...register("nationalite", {
                required: "nationalite is require",
              })}
            />
            {errors.nationalite && (
              <p className="error">{errors.nationalite.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Job title</label>
            <input
              {...register("jobTitle", { required: "job title is require" })}
            />
            {errors.jobTitle && (
              <p className="error">{errors.jobTitle.message}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select {...register("gender")}>
            <option value={Gender.male}>Male</option>
            <option value={Gender.female}>Female</option>
          </select>
        </div>
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
