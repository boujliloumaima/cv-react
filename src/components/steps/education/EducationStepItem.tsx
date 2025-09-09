import { Resume } from "../../../models";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
  removeEducation: (index: number) => void;
}
export default function EducationStepItem({
  control,
  register,
  index,
  removeEducation,
}: Props) {
  // FieldArray for enter multiple modules
  const {
    fields: moduleFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `educations.${index}.modules` as any,
  });

  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label>Institut name</label>
          <input {...register(`educations.${index}.institut.name`)} />
        </div>
        <div className="form-group">
          <label>Institut city</label>
          <input {...register(`educations.${index}.institut.city`)} />
        </div>
      </div>

      <div className="form-group">
        <label>diploma</label>
        <input {...register(`educations.${index}.diploma`)} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start date</label>
          <input type="date" {...register(`educations.${index}.startdate`)} />
        </div>
        <div className="form-group">
          <label>End date</label>
          <input type="date" {...register(`educations.${index}.enddate`)} />
        </div>
      </div>

      {moduleFields.map((mod, mIndex) => {
        return (
          <div key={mod.id}>
            <div className="form-group">
              <label>Modules</label>
              <input {...register(`educations.${index}.modules.${mIndex}`)} />
            </div>
            <button
              type="button"
              onClick={() => remove(mIndex)}
              className="btn remove-btn"
            >
              remove Module{index + 1}
            </button>
          </div>
        );
      })}
      <button type="button" onClick={() => append("")} className="btn add-btn">
        Add Module {index + 1}
      </button>

      <button
        type="button"
        onClick={() => removeEducation(index)}
        className="btn remove-btn"
      >
        Remove Edu {index + 1}
      </button>
    </div>
  );
}
