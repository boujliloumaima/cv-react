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
      navigate("/skills");
    } catch (error) {
      alert("Error saving resume:");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "name is require" })}
        placeholder="Name"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <input
        {...register("phone", { required: "phone is require" })}
        placeholder="Phone"
      />
      {errors.phone && <p className="error">{errors.phone.message}</p>}
      <input
        {...register("email", { required: "email is require" })}
        placeholder="Email"
      />
      {errors.email && <p className="error">{errors.email.message}</p>}
      <input
        type="date"
        {...register("birthday", { required: "birthay is require" })}
      />
      {errors.birthday && <p className="error">{errors.birthday.message}</p>}
      <input
        {...register("nationalite", { required: "nationalite is require" })}
        placeholder="Nationality"
      />
      {errors.nationalite && (
        <p className="error">{errors.nationalite.message}</p>
      )}
      <input
        {...register("jobTitle", { required: "job title is require" })}
        placeholder="Job Title"
      />
      {errors.jobTitle && <p className="error">{errors.jobTitle.message}</p>}

      <select {...register("gender")}>
        <option value={Gender.male}>Male</option>
        <option value={Gender.female}>Female</option>
      </select>

      <button type="submit">Next</button>
    </form>
  );
}
