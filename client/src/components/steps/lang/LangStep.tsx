import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume, LangLevel } from "../../../models";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LanguagesStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  const queryClient = useQueryClient();
  const createResumeMutation = useMutation({
    mutationFn: async (data: Resume) => {
      const currentResume = JSON.parse(
        localStorage.getItem("currentResume") || "{}"
      );
      const updatedCurrentResume = { ...currentResume, ...data };
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/v1/resumes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentResume),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      localStorage.removeItem("currentResume");
      navigate("/resumes/all");
    },
    onError: () => {
      alert("❌ Échec de création du résumé !");
    },
  });

  const onSubmit: SubmitHandler<Resume> = (data) => {
    createResumeMutation.mutate(data);
  };
  const LangLabels = ["Mother", "Beginner", "Intermediate", "Fluent", "Expert"];
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
              <div className="skill-display-card">
                <div>
                  {field.name} : {LangLabels[field.level]}
                </div>
                <div>
                  <button
                    onClick={() => remove(index)}
                    className="remove-skill-btn"
                    aria-label="Remove skill"
                  >
                    X
                  </button>
                </div>
              </div>
              <hr />
            </div>
          )
        )}
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
          <button
            type="button"
            onClick={() => append({ name: "", level: LangLevel.beginner })}
            className="btn add-btn"
          >
            Add Language {fields.length + 1}
          </button>
        </div>
      </form>
    </div>
  );
}
