import { Lang, LangLevel } from "../models";

interface Props {
  lang: Lang;
}

export default function UserLanguage({ lang }: Props) {
  function LangLevelName(level: LangLevel) {
    switch (level) {
      case 0:
        return "Langue maternelle";
      case 1:
        return "Débutant";
      case 2:
        return "Intermédiaire";
      case 3:
        return "Courant";
      case 4:
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
