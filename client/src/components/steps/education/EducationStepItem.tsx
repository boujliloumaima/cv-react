import { Resume } from "../../../models";
import { Control, UseFormRegister, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import MuiTagInput from "../../tag/MuiTagInput";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function EducationStepItem({
  control,
  register,
  index,
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
        <MuiTagInput control={control} placeholder={"Add modules and press Enter..."}  name={`educations.${index}.modules`}></MuiTagInput>
        <small className="input-hint">
          Highlight the subjects that shaped your expertise. Press Enter to add
          each one.
        </small>
      </div>
    </div>
  );
}
