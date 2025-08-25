import { Education } from "../models";
import InstitutItem from "./Institut";

interface Props {
  education: Education;
}

export default function EducationItem({ education }: Props) {
  return (
    <div>
      <p>
        <strong>Diploma:</strong> {education.diploma}
      </p>
      <InstitutItem institut={education.institut} />
      <p>
        <strong>Modules:</strong> {education.modules.join(", ")}
      </p>
    </div>
  );
}
