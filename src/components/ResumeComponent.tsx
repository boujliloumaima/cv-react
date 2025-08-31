import { Resume} from "../models";
import SkillItem from "./skill";
import EducationItem from "./Education";
import ExperienceItem from "./experience";
import "../App.css";
import { calculateExperience } from "./experience";
import UserLanguage from "./langue";
interface Props {
  resume: Resume;
}

export default function ResumeComponent({ resume }: Props) {
  const birthDate = new Date(resume.birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const technicalSkills = resume.skills.filter((s) => s.type === 0);
  const softSkills = resume.skills.filter((s) => s.type === 1);

  return (
    <div>
      <h1>{resume.name}</h1>
      <h3>{resume.jobTitle}</h3>
      <div className="info">
        <div>
          <ul>
            <li>Age :</li>
            <li>Nationalité :</li>
            <li>Télé :</li>
            <li>Email :</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>{age}</li>
            <li>{resume.nationalite}</li>
            <li>{resume.phone}</li>
            <li>{resume.email}</li>
          </ul>
        </div>
      </div>
      <div />
      <div>
        <hr />
        <h2 className="yerex">
          {calculateExperience(resume.experiences)} ans d’expérience
        </h2>
      </div>

      <h2>Principales qualifications :</h2>
      <div className="qualifications ">
        <div>
          <h3>Qualifications techniques</h3>
          {technicalSkills.length > 0
            ? technicalSkills.map((skill, i) => (
                <SkillItem key={i} skill={skill} />
              ))
            : ""}
        </div>
        <div>
          <h3>Qualifications comportementales</h3>
          {softSkills.length > 0
            ? softSkills.map((skill, i) => <SkillItem key={i} skill={skill} />)
            : ""}
        </div>
      </div>

      <h3>Experiences</h3>
      {resume.experiences.map((exp) => (
        <ExperienceItem experience={exp} />
      ))}

      <h3>Educations</h3>
      {resume.educations.map((edu) => (
        <EducationItem education={edu} />
      ))}
      <h3>Languages</h3>
      {resume.languages.map((lang) => (
        <UserLanguage lang={lang} />
      ))}
    </div>
  );
}
