import { Experience } from "../models";
import InstitutItem from "./Institut";
import TasksList from "./TasksList";
import ToolsList from "./ToolsList";

interface Props {
  experience: Experience;
}

export default function ExperienceItem({ experience }: Props) {
  return (
    <div>
      <InstitutItem institut={experience.company} />
      <TasksList tasks={experience.tasks} />
      <ToolsList tools={experience.tools} />
    </div>
  );
}
