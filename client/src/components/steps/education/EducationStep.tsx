import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import EducationStepItem from "./EducationStepItem";

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
    navigate("/resume/add/languages");
  };

  return (
    <div className="container-form">
      <ProgressBar percentage={75} />
      <div className="section-header">
        <h2 className="section-title">Add Your Education</h2>
        <p className="section-subtitle">
          Your academic path says a lot about your foundation. Let’s highlight
          the places and programs that shaped your expertise.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {educationFields.map((edu, index) => (
          <div key={edu.id}>
            {index === educationFields.length - 1 ? (
              <EducationStepItem
                control={control}
                register={register}
                index={index}
                removeEducation={removeEducation}
              />
            ) : (
              <div className="skill-display-card">
                <div>
                  <p>
                    <strong>Institut:</strong> {edu.institut?.name},{" "}
                    {edu.institut?.city}
                  </p>
                  <p>
                    <strong>Diploma:</strong> {edu.diploma}
                  </p>
                  <p>
                    <strong>Dates:</strong>{" "}
                    {new Date(edu.startdate).toLocaleDateString()} -{" "}
                    {new Date(edu.enddate).toLocaleDateString()}
                  </p>
                  {edu.modules && edu.modules.length > 0 && (
                    <p>
                      {" "}
                      <strong>Modules:</strong> {edu.modules.join(",")}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="remove-skill-btn"
                    aria-label="Remove skill"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            <hr />
          </div>
        ))}
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
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
            className="btn add-btn"
          >
            Add Education {educationFields.length + 1}
          </button>
        </div>
      </form>
    </div>
  );
}
