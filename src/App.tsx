import ResumeComponent from "./components/ResumeComponent";
import { Resume, Gender, SkillType, LangLevel } from "./models";
import "./App.css";
export default function App() {
  const resume: Resume = {
    name: "Oumaima Boujlil",
    phone: "06-02-70-58-91",
    birthday: new Date("1995-04-10"),
    nationalite: "marocaine",
    email: "oumaimaboujlil9@gmail.com",
    jobTitle: "Développeuse Full Stack",
    gender: Gender.female,

    languages: [
      { name: "Arabe", level: LangLevel.mother },
      { name: "Français", level: LangLevel.fluent },
      { name: "Anglais", level: LangLevel.intermediate },
    ],

    skills: [
      { name: "React.js", level: 5, type: SkillType.technical },
      { name: "Express.js", level: 4, type: SkillType.technical },
      { name: "Laravel", level: 4, type: SkillType.technical },
      { name: "MongoDB / MySQL", level: 4, type: SkillType.technical },
      { name: "Travail en équipe", level: 5, type: SkillType.soft },
      { name: "Communication", level: 4, type: SkillType.soft },
    ],

    educations: [
      {
        institut: {
          name: "Institut Spécialisé de Technologie Appliquée",
          city: "Kasbat Tadla",
        },
        diploma: "Technicien spécialisé en développement digital",
        startdate: new Date("2023-09-01"),
        enddate: new Date("2025-06-30"),
        modules: ["front end ", "back end", "database"],
      },
      {
        institut: {
          name: "university soultan moulay soulayman",

          city: "béni mlal",
        },
        startdate: new Date("2019-09-01"),
        enddate: new Date("2023-06-30"),
        diploma: "Licence d'Etudes Fondamentales Etudes Islamiques",
      },
      {
        institut: {
          name: "Collège de Kasbat Tadla",

          city: "Kasbat Tadla",
        },
        startdate: new Date("2013-09-01"),
        enddate: new Date("2014-06-30"),
        diploma: "Baccalauréat Science physique",
      },
    ],

    experiences: [
      {
        company: {
          name: "Open it",
          city: "Kasbat Tadla",
          description:
            "  OPENIT est une entreprise d'origine suisse-française,Sa professionnalité et le câblage et le pré-câblage, support les entreprises par des PC, des serveurs des routeurs , la sécurisation , développement des applications desktop, Web, Android,la création des RDC, Cloud, développement des sites web",
        },
        startdate: new Date("2023-04-01"),
        enddate: new Date("2025-04-01"),
        tasks: ["developper une plateforme de reservation en ligne"],
        tools: ["React js", "Express js", "mysql", "css"],
      },
      {
        company: {
          name: "Open it",
          city: "Kasbat Tadla",
          description:
            "  OPENIT est une entreprise d'origine suisse-française,Sa professionnalité et le câblage et le pré-câblage, support les entreprises par des PC, des serveurs des routeurs , la sécurisation , développement des applications desktop, Web, Android,la création des RDC, Cloud, développement des sites web",
        },
        startdate: new Date("2021-04-01"),
        enddate: new Date("2022-04-01"),
        tasks: ["developper une plateforme de reservation en ligne"],
        tools: ["React js", "Express js", "mysql", "css"],
      },
    ],
  };

  return (
    <div className="container-cv">
      <ResumeComponent resume={resume} />
    </div>
  );
}
