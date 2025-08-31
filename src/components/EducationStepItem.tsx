import { Resume } from "../models";
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
      <input
        {...register(`educations.${index}.institut.name`)}
        placeholder="Institute Name"
      />
      <input
        {...register(`educations.${index}.institut.city`)}
        placeholder="City"
      />
      <input
        {...register(`educations.${index}.diploma`)}
        placeholder="Diploma"
      />
      <input type="date" {...register(`educations.${index}.startdate`)} />
      <input type="date" {...register(`educations.${index}.enddate`)} />

      <h4>Modules</h4>
      {moduleFields.map((mod, mIndex) => (
        <div key={mod.id}>
          <input
            {...register(`educations.${index}.modules.${mIndex}`)}
            placeholder={`Module ${mIndex + 1}`}
          />
          <button type="button" onClick={() => remove(mIndex)}>
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append("")}>
        Add Module
      </button>

      <button type="button" onClick={() => removeEducation(index)}>
        Remove Education
      </button>
    </div>
  );
}
