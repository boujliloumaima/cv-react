import { Skill } from "../models";
interface Props {
  skill: Skill;
}

export default function SkillItem({ skill }: Props) {
  //const skillTypeName =skill.type === SkillType.Technical ? "Technical" : "Soft";

  return (
    <div>
      <h3>{skill.name}</h3>
      <p>{skill.type} Skill</p>

      <div>
        <p>{skill.level}</p>
      </div>
      <p>Level: {skill.level}</p>
    </div>
  );
}
