import { Langues } from "../models";
export default function MyLangues() {
  const myLangues: Langues = {
    langues: [
      {
        nom: "Arabe",
        niveau: "Langue Maternelle",
      },
      {
        nom: "Françans",
        niveau: "Lu, écrit, parlé",
      },
      {
        nom: "Arabe",
        niveau: "technique",
      },
    ],
  };
  return (
    <div>
      {" "}
      <h3>Langues</h3>
      <div className="exp">
        {myLangues.langues.map((el) => {
          return (
            <>
              {" "}
              <div>
                <p>{el.nom}</p>
              </div>
              <div className="test">
                <p>{el.niveau}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
