import { MesExperiences } from "../models";
export default function ExperiencePro() {
  const myExperiences: MesExperiences = {
    myExperience: [
      {
        dateDebut: "04/2025",
        dateFin: "05/2025",
        ville: "Kasbat Tadla",
        entreprise: "Open it",
        technologies: [
          { nom: "React js" },
          { nom: "Express js" },
          { nom: "MySQL" },
          { nom: "CSS" },
        ],
        taches: [
          { description: "Développer une application de réservation en ligne" },
        ],
        description:
          "OPENIT est une entreprise d'origine suisse-française. Sa professionnalité est dans le câblage, le pré-câblage, support aux entreprises (PC, serveurs, routeurs), sécurisation, développement d'applications desktop, Web, Android, création des RDC, Cloud, et développement de sites web.",
      },
    ],
  };

  return (
    <div>
      <h2>Expérience Professionnelle :</h2>
      <div className="exp">
        {myExperiences.myExperience.map((el) => {
          return (
            <>
              <div>
                <p>
                  {el.dateDebut} - {el.dateFin}
                </p>
              </div>
              <div>
                <p>
                  {el.entreprise} – {el.ville}
                </p>
                <p>{el.description}</p>

                <ul>
                  {el.taches.map((t, i) => (
                    <li key={i}>{t.description}</li>
                  ))}
                </ul>

                <p>
                  Technologies :
                  {el.technologies.map((e) => {
                    return " " + e.nom + " - ";
                  })}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
