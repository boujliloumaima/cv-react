import { Education } from "../models";
import InstitutItem from "./Institut";

interface Props {
  education: Education;
}

export default function EducationItem({ education }: Props) {
  return (
    <div>
      <p>
        {" "}
        {education.startDate.toLocaleDateString()}-
        {education.endDate.toLocaleDateString()}
      </p>
      <p>{education.diploma}</p>
      <InstitutItem institut={education.institut} />
      <p>
        <strong>Modules:</strong> {education.modules.join(", ")}
      </p>
    </div>
  );
}
