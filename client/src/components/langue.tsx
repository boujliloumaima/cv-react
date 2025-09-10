import { Lang, LangLevel } from "../models";

interface Props {
  lang: Lang;
}

export default function UserLanguage({ lang }: Props) {
  function LangLevelName(level: LangLevel) {
    switch (level) {
      case LangLevel.mother:
        return "Langue maternelle";
      case LangLevel.beginner:
        return "Débutant";
      case LangLevel.intermediate:
        return "Intermédiaire";
      case LangLevel.fluent:
        return "Courant";
      case LangLevel.expert:
        return "Expert";
      default:
        return "Niveau inconnu";
    }
  }
  return (
    <div className="lang">
      <div>
        <p>{lang.name}</p>
      </div>
      <div>
        <p>{LangLevelName(Number(lang.level))}</p>
      </div>
    </div>
  );
}
