import { Profil } from "../models";

export default function Information() {
  const myprofil: Profil = {
    nom: "Boujlil Oumaima",
    titre: "développeuse full stack",
    age: 30,
    email: "oumaimaboujlil9@gmail.com",
    tele: "06-02-70-58-91",
    nationalite: "Marocaine",
  };

  console.log(myprofil);
  return (
    <div className="container-cv">
      <h1 className="title">{myprofil.nom}</h1>
      <h3>{myprofil.titre}</h3>
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
            <li>{myprofil.age}</li>
            <li>{myprofil.nationalite}</li>
            <li>{myprofil.tele}</li>
            <li>{myprofil.email}</li>
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
}
