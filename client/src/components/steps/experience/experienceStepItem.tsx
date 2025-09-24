import { Control, UseFormRegister } from "react-hook-form";
import { Resume } from "../../../models";
import MuiTagInput from "../../tag/MuiTagInput";


interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function ExperienceStepItem({
  control,
  register,
  index,
}: Props) {
  return (
    <div className="experience-card">
      <div className="form-row">
        <div className="form-group">
          <label>Company name</label>
          <input
            {...register(`experiences.${index}.company.name`)}
            placeholder="e.g. Microsoft"
          />
          <small className="input-hint">
            Enter the name of the organization where you worked.
          </small>
        </div>
        <div className="form-group">
          <label>Company city</label>
          <input
            {...register(`experiences.${index}.company.city`)}
            placeholder="e.g. Casablanca"
          />
          <small className="input-hint">
            Location helps contextualize your experience.
          </small>
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          {...register(`experiences.${index}.company.description`)}
          placeholder="Briefly describe the company or your role there."
        />
        <small className="input-hint">
          Briefly describe the company or your role there to give more context.
        </small>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Start date</label>
          <input type="date" {...register(`experiences.${index}.startdate`)} />
          <small className="input-hint">
            Shows when your journey with this company began
          </small>
        </div>
        <div className="form-group">
          <label>End date</label>
          <input type="date" {...register(`experiences.${index}.enddate`)} />
          <small className="input-hint">
            Helps define the duration and progression of your role.
          </small>
        </div>
      </div>

      <div className="form-group">
        <label>Key Tasks</label>
        <MuiTagInput control={control} placeholder={"Add tasks and press Enter..."}  name={`experiences.${index}.tasks`}></MuiTagInput>

        <small className="input-hint">
          List your main responsibilities or achievements. Press Enter (or tab)
          to add each one.
        </small>
      </div>

      <div className="form-group">
        <label>Tools Used</label>
        <MuiTagInput control={control} placeholder={"Add tools and press Enter..."} name={`experiences.${index}.tools`}></MuiTagInput>
        <small className="input-hint">
          Mention platforms, software, or techniques you used. Press Enter (or
          tab) to add each one.
        </small>
      </div>
    </div>
  );
}
