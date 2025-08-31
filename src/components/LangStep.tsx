import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume, LangLevel } from "../models";
import { useNavigate } from "react-router-dom";

export default function LanguagesStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append } = useFieldArray({ control, name: "languages" });
  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const storedResumes = localStorage.getItem("resumes");
    const resumes: Resume[] = storedResumes ? JSON.parse(storedResumes) : [];
    const updatedCurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedCurrentResume));
    const updatedResumes = [...resumes, updatedCurrentResume];
    localStorage.setItem("resumes", JSON.stringify(updatedResumes));
    localStorage.removeItem("currentResume");
    navigate("/resumesList");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`languages.${index}.name`)}
            placeholder="Language"
          />
          <select {...register(`languages.${index}.level`)}>
            <option value={LangLevel.mother}>Mother</option>
            <option value={LangLevel.beginner}>Beginner</option>
            <option value={LangLevel.intermediate}>Intermediate</option>
            <option value={LangLevel.fluent}>Fluent</option>
            <option value={LangLevel.expert}>Expert</option>
          </select>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "", level: LangLevel.beginner })}
      >
        Add Language
      </button>
      <button type="submit">Next</button>
    </form>
  );
}
