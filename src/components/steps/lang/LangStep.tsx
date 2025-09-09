import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume, LangLevel } from "../../../models";
import { useNavigate } from "react-router-dom";

export default function LanguagesStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
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
    navigate("/resumes/all");
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) =>
          index === fields.length - 1 ? (
            <div key={field.id}>
              <div className="form-row">
                <div className="form-group">
                  <label>Langue</label>
                  <input
                    {...register(`languages.${index}.name`)}
                    placeholder="Language"
                  />
                </div>
                <div className="form-group">
                  <label>Langue level</label>
                  <select {...register(`languages.${index}.level`)}>
                    <option value={LangLevel.mother}>Mother</option>
                    <option value={LangLevel.beginner}>Beginner</option>
                    <option value={LangLevel.intermediate}>Intermediate</option>
                    <option value={LangLevel.fluent}>Fluent</option>
                    <option value={LangLevel.expert}>Expert</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="current-data">
                <div>
                  {field.name} - {field.level}
                </div>
                <div>
                  <button
                    onClick={() => remove(index)}
                    className="btn remove-btn"
                  >
                    remove langue {index + 1}
                  </button>
                </div>
              </div>
              <hr />
            </div>
          )
        )}

        <button
          type="button"
          onClick={() => append({ name: "", level: LangLevel.beginner })}
          className="btn add-btn"
        >
          Add Language {fields.length}
        </button>
        <button type="submit" className="btn next-btn">
          Next
        </button>
      </form>
    </div>
  );
}
