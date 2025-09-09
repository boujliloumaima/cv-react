import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { SkillType, Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import "../steps.css";

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
      <div className="section-header">
        <h2 className="section-title">Skills That Speak for You</h2>
        <p className="section-subtitle">
          From personal roots to professional brilliance—this is where your
          talents shine.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              {index === fields.length - 1 ? (
                <div>
                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label>Skill name</label>

                      <input {...register(`skills.${index}.name`)} />
                      <small className="input-hint">
                        Choose a skill that defines your value.
                      </small>
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
                      <small className="input-hint">
                        Rate your mastery from 1 (novice) to 5 (expert). Be
                        honest, be proud.
                      </small>
                    </div>

                    <div className="form-group">
                      <label>Skill type</label>
                      <select
                        {...register(`skills.${index}.type`, {
                          valueAsNumber: true,
                        })}
                      >
                        <option value={SkillType.technical}>🛠 Technical</option>
                        <option value={SkillType.soft}>💬 Soft</option>
                      </select>
                      <small className="input-hint">
                        Is this a technical craft or a soft skill like
                        leadership or empathy?
                      </small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="skill-display-card">
                  <div className="skill-info">
                    <h4>{field.name || "Unnamed Skill"}</h4>
                    <p>
                      <strong>Level:</strong> {field.level} / 5
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {field.type === SkillType.technical
                        ? "🛠 Technical"
                        : "💬 Soft"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="remove-skill-btn"
                    aria-label="Remove skill"
                  >
                    ✖
                  </button>
                </div>
              )}
              <hr />
            </div>
          );
        })}

        <div className="form-group">
          {fields.length === 0 && (
            <div className="empty-state">
              <p>Your talents deserve to be seen.</p>
              <p>Add your first skill to begin shaping your story.</p>
            </div>
          )}

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
