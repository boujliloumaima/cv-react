import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { SkillType, Resume } from "../models";
import { useNavigate } from "react-router-dom";
export default function SkillStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const updatedcurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
    alert("Skills saved!");
    navigate("/experience");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Skills</h2>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <input
              {...register(`skills.${index}.name`)}
              placeholder="Skill Name"
            />
            <select
              {...register(`skills.${index}.level`, { valueAsNumber: true })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <select
              {...register(`skills.${index}.type`, { valueAsNumber: true })}
            >
              <option value={SkillType.technical}>Technical</option>
              <option value={SkillType.soft}>Soft</option>
            </select>
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({ name: "", level: 1, type: SkillType.technical })
        }
      >
        Add Skill
      </button>
      <button type="submit">Next</button>
    </form>
  );
}
