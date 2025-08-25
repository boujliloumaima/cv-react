import { Lang } from "../models";

interface Props {
  lang: Lang;
}

export default function UserLanguage({ lang }: Props) {
  return (
    <div>
      <p>
        {lang.name} - {lang.level}
      </p>
    </div>
  );
}
