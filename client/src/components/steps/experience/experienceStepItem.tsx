import { Control, UseFormRegister, Controller } from "react-hook-form";
import { Resume } from "../../../models";
import CreatableSelect from "react-select/creatable";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
  removeExp: (index: number) => void;
}

export default function ExperienceStepItem({
  control,
  register,
  index,
  removeExp,
}: Props) {
  return (
    <div className="experience-card">
      <div className="form-row">
        <div className="form-group">
          <label>Company name</label>
          <input
            {...register(`experiences.${index}.company.name`)}
            placeholder="e.g. Sure Royal"
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
        <label>Company description</label>
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
        <Controller
          control={control}
          name={`experiences.${index}.tasks`}
          render={({ field }) => (
            <CreatableSelect
              isMulti
              placeholder="Add tasks and press Enter..."
              onChange={(val) => field.onChange(val.map((v) => v.value))}
              value={
                field.value?.map((v: string) => ({ label: v, value: v })) || []
              }
              options={[]}
            />
          )}
        />
        <small className="input-hint">
          List your main responsibilities or achievements. Press Enter (or tab)
          to add each one.
        </small>
      </div>

      <div className="form-group">
        <label>Tools Used</label>
        <Controller
          control={control}
          name={`experiences.${index}.tools`}
          render={({ field }) => (
            <CreatableSelect
              isMulti
              placeholder="Add tools and press Enter..."
              onChange={(val) => field.onChange(val.map((v) => v.value))}
              value={
                field.value?.map((v: string) => ({ label: v, value: v })) || []
              }
              options={[]}
            />
          )}
        />
        <small className="input-hint">
          Mention platforms, software, or techniques you used. Press Enter (or
          tab) to add each one.
        </small>
      </div>
    </div>
  );
}
