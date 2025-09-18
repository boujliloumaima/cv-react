import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ExperienceStepItem from "./experienceStepItem";
import ProgressBar from "../../progress/CardWithProgress";
export default function ExperienceStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray<Resume, "experiences">({
    control,
    name: "experiences",
  });
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
      navigate("/resume/add/education");
    } catch (error) {
      alert("Error saving resume");
      console.error(error);
    }
  };
  return (
    <div className="container-form">
      <ProgressBar percentage={50}></ProgressBar>
      <div className="section-header">
        <h2 className="section-title">Add Your Experience</h2>
        <p className="section-subtitle">
          Share the roles you've held, the places you've worked, and the tools
          you've mastered. Every detail adds depth to your story.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((exp, index) => (
          <div key={exp.id}>
            {index === fields.length - 1 ? (
              <div>
                <ExperienceStepItem
                  key={exp.id}
                  control={control}
                  register={register}
                  index={index}
                  removeExp={remove}
                />
              </div>
            ) : (
              <div className="experience-card">
                <div className="experience-details">
                  <div className="experience-header">
                    <span className="date-range">
                      {new Date(exp.startdate).toLocaleDateString()} –{" "}
                      {new Date(exp.enddate).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="remove-experience-btn"
                      aria-label="Remove experience"
                    >
                      ✖
                    </button>
                  </div>

                  <h4 className="company-name">
                    {exp.company?.name}{" "}
                    <span className="company-city">({exp.company?.city})</span>
                  </h4>

                  {exp.company?.description && (
                    <p className="company-description">
                      {exp.company.description}
                    </p>
                  )}

                  {exp.tasks && exp.tasks.length > 0 && (
                    <ul className="task-list">
                      {exp.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  )}

                  {exp.tools && exp.tools.length > 0 && (
                    <p className="tools-used">
                      <strong>Tools:</strong> {exp.tools.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
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
            className="btn add-btn"
          >
            Add Experience {fields.length + 1}
          </button>
        </div>
      </form>
    </div>
  );
}
