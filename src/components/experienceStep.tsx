import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../models";
import { useNavigate } from "react-router-dom";
import ExperienceStepItem from "./experienceStepItem";
import ProgressBar from "./progress/CardWithProgress";
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
              <div className="current-data">
                <div>
                  <p>
                    {new Date(exp.startdate).toLocaleDateString()} -{" "}
                    {new Date(exp.enddate).toLocaleDateString()}
                  </p>
                  <p>
                    {exp.company?.name} {exp.company?.city}
                  </p>
                  <p>{exp.company.description}</p>
                  {exp.tasks &&
                    exp.tasks.length > 0 &&
                    exp.tasks.map((e) => {
                      return (
                        <ul>
                          <li>{e}</li>
                        </ul>
                      );
                    })}
                  {exp.tools && exp.tools.length > 0 && (
                    <p>Tools: {exp.tools.join(", ")}</p>
                  )}
                  <hr />
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
          </div>
        ))}

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
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
