import { Experience } from "../models";
import InstitutItem from "./Institut";
import TasksList from "./TasksList";
import ToolsList from "./ToolsList";

interface Props {
  experience: Experience;
}
export function calculateExperience(experiences: Experience[]) {
  let totalYears = 0;
  experiences.forEach((exp) => {
    const start = new Date(exp.startdate);
    const end = new Date(exp.enddate);
    let years = end.getFullYear() - start.getFullYear();
    totalYears += years;
  });

  return totalYears;
}

export default function ExperienceItem({ experience }: Props) {
  return (
    <div className="exp">
      <div>
        <p>
          {experience.startdate.toLocaleDateString()} -{" "}
          {experience.enddate.toLocaleDateString()}
        </p>
      </div>
      <div>
        <InstitutItem institut={experience.company} />
        <TasksList tasks={experience.tasks} />
        <ToolsList tools={experience.tools} />
      </div>
    </div>
  );
}
