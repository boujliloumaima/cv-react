export interface NewResume {
  user: UserInfo;
  template_id: string;
  sections: ResumeSection[];
}

export interface ResumeSection {
  name: string;
  type:
    | "basics"
    | "info"
    | "education"
    | "profiles"
    | "experience"
    | "awards"
    | "interests"
    | "skills"
    | "languages"
    | "projects"
    | "volunteerings"
    | "references"
    | "certifications"
    | "custom";
  defaultFields: SectionField[];
  customFields?: SectionField[];
  settings?: SectionSettings;
}

export interface SectionSettings {
  hideSectionTitle: boolean;
  hideSection: boolean;
  separateLinks: boolean;
}
export interface SectionField {
  labelCode: string;
  placeholderCode: string;
  type: "string" | "number" | "date" | "url" | "tags" | "html"; // url must have a label to trunk the url
  valueValidator?: any;
  value: any;
  hexColor: string;
}

export interface SectionFieldSettings {
  hide: boolean;
}

export interface UserInfo {
  title: string;
  fullName: string;

  avatarUrl?: string;
  jobTitle: string;
  gender: Gender;
  email: string;
  phone: string;
  website: string;
  nationalite: string;
}

export interface Resume {
  _id: string;
  name: string;
  phone: string;
  nationalite: string;
  birthday: string | Date;
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
  startdate?: Date;
  enddate?: Date;
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
