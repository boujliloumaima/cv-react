import { Education } from "../models";
import InstitutItem from "./Institut";

interface Props {
  education: Education;
}

export default function EducationItem({ education }: Props) {
  return (
    <div className="diplome">
      <div>
        {" "}
        <p>
          {education.startdate.toLocaleDateString()} -{" "}
          {education.enddate.toLocaleDateString()}
        </p>
      </div>
      <div>
        {" "}
        <p>{education.diploma}</p>
        <InstitutItem institut={education.institut} />
        <p>
          <p>
            {education.modules?.length
              ? "Modules : " + education.modules.join(", ")
              : ""}
          </p>
        </p>
      </div>
    </div>
  );
}
