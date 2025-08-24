export interface User {
  name: string;
  phone: string;
  birthDay: string;
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
  Male = 0,
  Female = 1,
}

export interface Lang {
  name: string;
  level: LangLevel;
}

export enum LangLevel {
  Mother = 0,
  Beginner = 1,
  Intermediate = 2,
  Fluent = 3,
  Expert = 4,
}

export interface Education {
  institut: Institut;
  diploma: string;
  modules: string[];
}

export interface Institut {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  city: string;
}

export interface Skill {
  name: string;
  level: number;
  type: SkillType;
}

export enum SkillType {
  Technical = 0,
  Soft = 1,
}

export interface Experience {
  company: Institut;
  tasks: string[];
  tools: string[];
}
