import EducationStepItem from "./EducationStepItem";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../models";
import { useNavigate } from "react-router-dom";

// Composant principal
export default function EducationStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const updatedcurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
    navigate("/languages");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Educations</h2>

      {educationFields.map((edu, index) => (
        <EducationStepItem
          key={edu.id}
          control={control}
          register={register}
          index={index}
          removeEducation={removeEducation}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          addEducation({
            institut: { name: "", city: "" },
            diploma: "",
            startdate: new Date(),
            enddate: new Date(),
            modules: [""],
          })
        }
      >
        Add Education
      </button>

      <button type="submit">Next</button>
    </form>
  );
}
