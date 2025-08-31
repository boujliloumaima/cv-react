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
      <input
        {...register(`experiences.${index}.company.name`)}
        placeholder="Company Name"
      />
      <input
        {...register(`experiences.${index}.company.city`)}
        placeholder="City"
      />
      <textarea
        {...register(`experiences.${index}.company.description`)}
        placeholder="description"
      />
      <input {...register(`experiences.${index}.startdate`)} type="date" />
      <input {...register(`experiences.${index}.enddate`)} type="date" />
      <h4>Tasks</h4>
      {taskFields.map((task, tIndex) => (
        <div key={task.id}>
          <input
            {...register(`experiences.${index}.tasks.${tIndex}`)}
            placeholder={`Task ${tIndex + 1}`}
          />
          <button type="button" onClick={() => removeTask(tIndex)}>
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addTask("")}>
        Add Task
      </button>
      <h4>Tools</h4>
      {toolFields.map((tool, tIndex) => (
        <div key={tool.id}>
          <input
            {...register(`experiences.${index}.tools.${tIndex}`)}
            placeholder={`Tool ${tIndex + 1}`}
          />
          <button type="button" onClick={() => removeTool(tIndex)}>
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addTool("")}>
        Add Tool
      </button>
      <button type="button" onClick={() => removeExp(index)}>
        Remove Experience
      </button>
    </div>
  );
}
