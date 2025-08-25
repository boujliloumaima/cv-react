import { User } from "../models";
import UserLanguage from "./langue";
import SkillItem from "./skill";
import EducationItem from "./Education";
import ExperienceItem from "./experience";

interface Props {
  user: User;
}

export default function ResumeComponent({ user }: Props) {
  // const genderName = user.gender === Gender.Male ? "Male" : "Female";

  return (
    <div>
      <h2>{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Job:</strong> {user.jobTitle}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong> Years of experience:</strong> {user.yearsOfExperience}
      </p>

      <h3>Languages</h3>
      {user.languages.map((lang) => (
        <UserLanguage lang={lang} />
      ))}

      <h3>Skills</h3>
      {user.skills.map((skill) => (
        <SkillItem skill={skill} />
      ))}

      <h3>Educations</h3>
      {user.educations.map((edu) => (
        <EducationItem education={edu} />
      ))}

      <h3>Experiences</h3>
      {user.experiences.map((exp) => (
        <ExperienceItem experience={exp} />
      ))}
    </div>
  );
}
