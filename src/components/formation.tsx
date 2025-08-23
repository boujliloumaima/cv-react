import { Myformations } from "../models";
export default function FormationandDiplome() {
  const myDiplomes: Myformations = {
    formation: [
      {
        annee: 2025,
        diplome: "Technicien spécialisé en développement digital",
        institut: " Institut Spécialisé e de Technologie Appliqué kasbat tadla",
      },
      {
        annee: 2023,
        diplome: "Licence d'Études Fondamentales Études Islamiques",
        institut: " Université Sultan Moulay Sliman Béni Mellal",
      },
      {
        annee: 2014,
        diplome: "Baccalauréat Science Physiqu",
        institut: " Lycée Molay Rachid",
      },
    ],
  };

  return (
    <div>
      <div>
        <h2>Formation :</h2>
        <h3>Diplômes et formations</h3>
        <div className="diplome">
          {myDiplomes.formation.map((el) => {
            return (
              <>
                {" "}
                <div>
                  <p>{el.annee} </p>
                </div>
                <div>
                  <p>{el.diplome} </p>
                </div>
                <div>
                  <p>{el.institut} </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
