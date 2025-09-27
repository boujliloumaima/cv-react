export interface Resume {
  _id: string;
  name: string;
  phone: string;
  nationalite: string;
  birthday: Date;
  email: string;
  jobTitle: string;
  gender: Gender;
  languages: Lang[];
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];
  yearsOfExperience?: number; //calculated automatically in the component from the experiences
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export interface Lang {
  name: string;
  level: LangLevel;
}

export enum LangLevel {
  MOTHER = "mother",
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  FLUENT = "fluent",
  EXPERT = "expert",
}

export interface Education {
  institut: Institut;
  diploma: string;
  modules?: string[];
  startdate: Date;
  enddate: Date;
}

export interface Institut {
  name: string;
  description?: string;
  city: string;
}

export interface Skill {
  name: string;
  level: number;
  type: SkillType;
}

export enum SkillType {
  TECHNICAL = "technical",
  SOFT = "soft",
}

export interface Experience {
  company: Institut;
  startdate: Date;
  enddate: Date;
  tasks: string[];
  tools: string[];
}
