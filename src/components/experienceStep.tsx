import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../models";
import { useNavigate } from "react-router-dom";
import ExperienceStepItem from "./experienceStepItem";
export default function ExperienceStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray<Resume, "experiences">({
    control,
    name: "experiences",
  });
  const onSubmit: SubmitHandler<Resume> = (data) => {
    try {
      const currentResume = JSON.parse(localStorage.getItem("currentResume") || "{}");
      const updatedcurrentResume = { ...currentResume, ...data };
      localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
      alert("Profile info saved!");
      navigate("/education");
    } catch (error) {
      alert("Error saving resume");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Experiences</h2>

      {fields.map(
        (
          exp,
          index // FieldArray for enter multiple exerience
        ) => (
          <ExperienceStepItem
            key={exp.id}
            control={control}
            register={register}
            index={index}
            removeExp={remove}
          />
        )
      )}
      <button
        type="button"
        onClick={() =>
          append({
            company: { name: "", city: "" },
            startdate: new Date(),
            enddate: new Date(),
            tasks: [""],
            tools: [""],
          })
        }
      >
        Add Experience
      </button>
      <button type="submit">Next</button>
    </form>
  );
}
