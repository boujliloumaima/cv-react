import { Resume } from "../../../models";
import { Control, UseFormRegister, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

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
  return (
    <div className="education-card">
      <div className="form-row">
        <div className="form-group">
          <label>Institut name</label>
          <input
            {...register(`educations.${index}.institut.name`)}
            placeholder="e.g. Université Mohammed V"
          />
          <small className="input-hint">
            This helps recruiters recognize the credibility of your academic
            background.
          </small>
        </div>
        <div className="form-group">
          <label>Institut city</label>
          <input
            {...register(`educations.${index}.institut.city`)}
            placeholder="e.g. Rabat"
          />
          <small className="input-hint">
            Location adds context to your education and can reflect regional
            expertise.
          </small>
        </div>
      </div>

      <div className="form-group">
        <label>Diploma</label>
        <input
          {...register(`educations.${index}.diploma`)}
          placeholder="e.g. Master in Luxury Marketing"
        />
        <small className="input-hint">
          Your diploma is often the first thing recruiters look for—make it
          clear and proud.
        </small>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Start date</label>
          <input type="date" {...register(`educations.${index}.startdate`)} />
          <small className="input-hint">
            Helps show the timeline of your academic journey.
          </small>
        </div>
        <div className="form-group">
          <label>End date</label>
          <input type="date" {...register(`educations.${index}.enddate`)} />
          <small className="input-hint">
            Helps show the timeline of your academic journey.
          </small>
        </div>
      </div>

      <div className="form-group">
        <label>Modules</label>
        <Controller
          control={control}
          name={`educations.${index}.modules`}
          render={({ field }) => (
            <CreatableSelect
              isMulti
              placeholder="Add modules and press Enter..."
              onChange={(val) => field.onChange(val.map((v) => v.value))}
              value={
                field.value?.map((v: string) => ({ label: v, value: v })) || []
              }
              options={[]}
            />
          )}
        />
        <small className="input-hint">
          Highlight the subjects that shaped your expertise. Press Enter to add
          each one.
        </small>
      </div>
    </div>
  );
}
