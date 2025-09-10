import { Skill } from "../models";

type Props = {
  skill: Skill;
};

export default function SkillItem({ skill }: Props) {
  const totalStars = 5;
  let stars = "";
  for (let i = 0; i < totalStars; i++) {
    if (i < skill.level) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }

  return (
    <div>
      <ul>
        <li>{skill.name}</li>
        {stars}
      </ul>
    </div>
  );
}
