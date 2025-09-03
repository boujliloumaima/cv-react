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
    navigate("/resume/add/languages");
  };

  return (
    <div className="container-form">
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
              <div className="current-data">
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
                    className="btn remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            <hr />
          </div>
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
          className="btn add-btn"
        >
          Add Education {educationFields.length + 1}
        </button>

        <button type="submit" className="btn next-btn">
          Next
        </button>
      </form>
    </div>
  );
}
