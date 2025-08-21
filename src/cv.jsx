import React from "react";
import "./App.css";
import {
  Profil,
  Qualifications,
  Experience,
  Formation,
  Langue,
  Resume,
} from "./models";

export default function Cv() {
  const profil = new Profil(
    "Boujlil Oumaima",
    "Développeuse Full Stack",
    "30 ans",
    "Marocaine",
    "06-02-70-58-91",
    "oumaimaboujlil9@gmail.com"
  );

  const competences = [
    new Qualifications("React js / Express js"),
    new Qualifications("Laravel"),
    new Qualifications("MongoDB / MySQL"),
  ];

  const experiences = [
    new Experience(
      "04/2025",
      "05/2025",
      "Open IT",
      "Kasbat Tadla",
      "OPENIT est une entreprise d'origine suisse-française, spécialisée dans le câblage, le support des entreprises, la sécurité et le développement.",
      ["Développer une plateforme de réservation en ligne"],
      ["React js", "Express js", "MySQL", "CSS"]
    ),
  ];

  const formations = [
    new Formation(
      2025,
      "Technicien spécialisé en développement digital",
      " Institut Spécialisé e de Technologie Appliqué kasbat tadla"
    ),
    new Formation(
      2023,
      "Licence d'Études Fondamentales Études Islamiques",
      "Université Sultan Moulay Sliman Béni Mellal"
    ),
    new Formation(2014, "Baccalauréat Science Physique", "Lycée Molay Rachid"),
  ];

  const langues = [
    new Langue("Arabe", "Langue maternelle"),
    new Langue("Français", "Lu, écrit, parlé"),
    new Langue("Anglais", "téchnique"),
  ];

  const cv = new Resume(profil, competences, experiences, formations, langues);
  console.log(cv.competences);
  return (
    <div>
      <div className="container-cv">
        <h1 className="title">{cv.profil.nom}</h1>
        <h3>{cv.profil.titre}</h3>
        <div className="info">
          <div>
            <ul>
              <li>Age :</li>
              <li>Nationalité :</li>
              <li>Télé :</li>
              <li>Email :</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>{cv.profil.age}</li>
              <li>{cv.profil.nationalite}</li>
              <li>{cv.profil.tele}</li>
              <li>{cv.profil.email}</li>
            </ul>
          </div>
        </div>
        <hr />
        <div>
          <h2>Principales qualifications :</h2>
          <h3>Qualifications techniques</h3>
          <ul>
            {cv.competences.map((el) => {
              return <li>{el.nom}</li>;
            })}
          </ul>
        </div>
        <div>
          <h2>Expérience Professionnelle :</h2>
          <div className="exp">
            {cv.experiences.map((el) => {
              return (
                <>
                  <div>
                    <p>
                      {el.dateDebut}-{el.dateFin}
                    </p>
                  </div>
                  <div>
                    <p>
                      {el.entreprise} –{el.ville}
                    </p>
                    <p>{el.description}</p>
                    <ul>
                      <li>{el.taches}</li>
                    </ul>

                    <p>
                      {" "}
                      Technologies :
                      {el.technologies.map((e) => {
                        return " " + e + " - ";
                      })}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div>
          <h2>Formation :</h2>
          <h3>Diplômes et formations</h3>
          <div className="diplome">
            {cv.formations.map((el) => {
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
          <h3>Langues</h3>
          <div className="exp">
            {cv.langues.map((el) => {
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
      </div>
    </div>
  );
}
