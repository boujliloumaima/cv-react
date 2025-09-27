import { Resume } from "../models";

export function getAllResumes() {
  const storedResume = localStorage.getItem("resumes") ?? "[]";
  const resumes: Resume[] = JSON.parse(storedResume);
  return resumes;
}

export function getResume(index: number) {
  return getAllResumes()[index];
}

export function getCurrentResume() {
  const stored = localStorage.getItem("currentResume");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed;
    } catch (e) {
      return {};
    }
  }
}
