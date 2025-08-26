import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ResumeComponent from "./components/UserComponent";
import { Gender, LangLevel, SkillType } from "./models";

const user: User = {
  name: "Foo Bar",
  phone: "+212666666666",
  birthDay: new Date("1990-05-15"),
  email: "foo.bar@example.com",
  jobTitle: "Développeur Full Stack",
  gender: Gender.male,
  languages: [
    {
      name: "Arabe",
      level: LangLevel.mother,
    },
    {
      name: "Français",
      level: LangLevel.fluent,
    },
    {
      name: "Anglais",
      level: LangLevel.intermediate,
    },
  ],
  skills: [
    {
      name: "TypeScript",
      level: 4,
      type: SkillType.technical,
    },
    {
      name: "Communication",
      level: 3,
      type: SkillType.soft,
    },
  ],
  educations: [
    {
      institut: {
        name: "Université Mohammed V",
        description: "Faculté des Sciences",
        city: "Rabat",
      },
      diploma: "Master en Informatique",
      modules: ["Algorithmes", "Base de données", "Réseaux"],
      startDate: new Date("2012-09-01"),
      endDate: new Date("2014-06-30"),
    },
  ],
  experiences: [
    {
      company: {
        name: "Tech Solutions",
        description: "Entreprise spécialisée dans les solutions logicielles",
        city: "Casablanca",
      },
      startDate: new Date("2015-01-10"),
      endDate: new Date("2025-08-26"),
      tasks: [
        "Développement d'applications web",
        "Maintenance de bases de données",
        "Formation des nouveaux employés",
      ],
      tools: ["React", "Node.js", "MongoDB"],
    },
  ],
  // yearsOfExperience sera calculé automatiquement dans le composant
};


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResumeComponent user={user}/>
  </StrictMode>
);
