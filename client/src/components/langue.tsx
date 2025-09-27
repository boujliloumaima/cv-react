import { Lang, LangLevel } from "../models";

interface Props {
  lang: Lang;
}

export default function UserLanguage({ lang }: Props) {
  function LangLevelName(level: LangLevel) {
    switch (level) {
      case LangLevel.MOTHER:
        return "Langue maternelle";
      case LangLevel.BEGINNER:
        return "Débutant";
      case LangLevel.INTERMEDIATE:
        return "Intermédiaire";
      case LangLevel.FLUENT:
        return "Courant";
      case LangLevel.EXPERT:
        return "Expert";
      default:
        return "Niveau inconnu: ";
    }
  }
  return (
    <div className="lang">
      <div>
        <p>{lang.name}</p>
      </div>
      <div>
        <p>{LangLevelName(lang.level)}</p>
      </div>
    </div>
  );
}
