export interface Profil {
  nom: string;
  titre: string;
  age: number;
  nationalite: string;
  tele: string;
  email: string;
}

export interface Formation {
  institut: string;
  diplome: string;
  annee: number;
}
export interface Myformations {
  formation: Formation[];
}
export interface Taches {
  description: string;
}
export interface Technilogies {
  nom: string;
}

export interface Experience {
  entreprise: string;
  taches: Taches[];
  ville: string;
  technologies: Technilogies[];
  dateDebut: string;
  dateFin: string;
  description: string;
}
export interface MesExperiences {
  myExperience: Experience[];
}

export interface Langue {
  nom: string;
  niveau: string;
}
export interface Langues {
  langues: Langue[];
}
export interface Qualifications {
  nom: string[];
}
