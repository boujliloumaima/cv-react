import { Qualifications } from "../models";
export default function Competence() {
  const competences: Qualifications = {
    nom: ["React JS / Express JS", "Laravel", "MongoDB / MySQL"],
  };
  return (
    <div>
      {" "}
      <div>
        <h2>Principales qualifications :</h2>
        <h3>Qualifications techniques</h3>
        <ul>
          {competences.nom.map((el) => {
            return <li>{el}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
