export interface User {
  name: string;
  phone: string;
  birthDay: Date;
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
  male = 0,
  female = 1,
}

export interface Lang {
  name: string;
  level: LangLevel;
}

export enum LangLevel {
  mother = 0,
  beginner = 1,
  intermediate = 2,
  fluent = 3,
  expert = 4,
}

export interface Education {
  institut: Institut;
  diploma: string;
  modules: string[];
  startDate: Date;
  endDate: Date;
}

export interface Institut {
  name: string;
  description: string;
  city: string;
}

export interface Skill {
  name: string;
  level: number;
  type: SkillType;
}

export enum SkillType {
  technical = 0,
  soft = 1,
}

export interface Experience {
  company: Institut;
  startDate: Date;
  endDate: Date;
  tasks: string[];
  tools: string[];
}
