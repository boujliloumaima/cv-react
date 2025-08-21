export class Profil {
  constructor(nom, titre, age, nationalite, tele, email) {
    this.nom = nom;
    this.titre = titre;
    this.age = age;
    this.nationalite = nationalite;
    this.tele = tele;
    this.email = email;
  }
}

export class Qualifications {
  constructor(nom) {
    this.nom = nom;
  }
}

export class Experience {
  constructor(
    dateDebut,
    dateFin,
    entreprise,
    ville,
    description,
    taches,
    technologies
  ) {
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.entreprise = entreprise;
    this.ville = ville;
    this.description = description;
    this.taches = taches;
    this.technologies = technologies;
  }
}

export class Formation {
  constructor(annee, diplome, institut) {
    this.annee = annee;
    this.diplome = diplome;
    this.institut = institut;
  }
}

export class Langue {
  constructor(nom, niveau) {
    this.nom = nom;
    this.niveau = niveau;
  }
}
export class Resume {
  constructor(profil, competences, experiences, formations, langues) {
    this.profil = profil;
    this.competences = competences;
    this.experiences = experiences;
    this.formations = formations;
    this.langues = langues;
  }
}
