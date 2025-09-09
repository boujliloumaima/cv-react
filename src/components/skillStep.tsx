import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { SkillType, Resume } from "../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./progress/CardWithProgress";
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
    navigate("/resume/add/experience");
  };

  return (
    <div className="container-form">
      <ProgressBar percentage={25}></ProgressBar>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              {index === fields.length - 1 ? (
                <div>
                  <div className="form-group">
                    <label>Skill name</label>
                    <input {...register(`skills.${index}.name`)} />
                  </div>

                  <div className="form-group">
                    <label>Skill level</label>
                    <select
                      {...register(`skills.${index}.level`, {
                        valueAsNumber: true,
                      })}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Skill type</label>
                    <select
                      {...register(`skills.${index}.type`, {
                        valueAsNumber: true,
                      })}
                    >
                      <option value={SkillType.technical}>Technical</option>
                      <option value={SkillType.soft}>Soft</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="current-data">
                  <div>
                    <p>Skill name: {field.name}</p>
                    <p>Skill Level: {field.level}</p>
                    <p>
                      Skill type:{" "}
                      {field.type === SkillType.technical
                        ? "technical"
                        : "soft"}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <hr />
            </div>
          );
        })}

        <div className="form-group">
          <button
            type="button"
            onClick={() =>
              append({ name: "", level: 1, type: SkillType.technical })
            }
            className="btn add-btn"
          >
            Add Skill {fields.length + 1}
          </button>
          <div className="container-btn">
            <button type="submit" className="btn next-btn">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
