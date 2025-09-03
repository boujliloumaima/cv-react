import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { Resume } from "../models";
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
  // FieldArray for enter multiple tasks
  const {
    fields: taskFields,
    append: addTask,
    remove: removeTask,
  } = useFieldArray({
    control,
    name: `experiences.${index}.tasks` as any, //I used "as any" because Resume type doesn't define paths like experiences[index].tasks
  });
  // FieldArray for enter multiple tools
  const {
    fields: toolFields,
    append: addTool,
    remove: removeTool,
  } = useFieldArray({
    control,
    name: `experiences.${index}.tools` as any,
  });

  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label>Company name</label>
          <input {...register(`experiences.${index}.company.name`)} />
        </div>
        <div className="form-group">
          <label>Company city</label>
          <input {...register(`experiences.${index}.company.city`)} />
        </div>
      </div>
      <div className="form-group">
        <label>Company description</label>

        <textarea {...register(`experiences.${index}.company.description`)} />
      </div>
      <div className="form-row">
        {" "}
        <div className="form-group">
          <label>Start date</label>
          <input {...register(`experiences.${index}.startdate`)} type="date" />
        </div>
        <div className="form-group">
          <label>End date</label>
          <input {...register(`experiences.${index}.enddate`)} type="date" />
        </div>
      </div>
      {taskFields.map((task, tIndex) => (
        <div key={task.id}>
          <div className="form-group">
            <label>task {tIndex + 1}</label>
            <input {...register(`experiences.${index}.tasks.${tIndex}`)} />
          </div>

          <button
            type="button"
            onClick={() => removeTask(tIndex)}
            className="btn remove-btn"
          >
            remove Task {tIndex + 1}
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addTask("")} className="btn add-btn">
        Add Task {taskFields.length + 1}
      </button>
      {toolFields.map((tool, tIndex) => (
        <div key={tool.id}>
          <div className="form-group">
            <input {...register(`experiences.${index}.tools.${tIndex}`)} />
          </div>
          <button
            type="button"
            onClick={() => removeTool(tIndex)}
            className="btn remove-btn"
          >
            remove tool {tIndex + 1}
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addTool("")} className="btn add-btn">
        Add Tool {toolFields.length + 1}
      </button>
      <button
        type="button"
        onClick={() => removeExp(index)}
        className="btn remove-btn"
      >
        Remove Exp {index + 1}
      </button>
    </div>
  );
}
