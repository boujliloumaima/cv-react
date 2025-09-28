import { Resume } from "../models";
export const RESUME_API = import.meta.env.VITE_API_URL + "/v1/resumes";

export async function getResume(index: number) {
  try {
    const res = await fetch(`${RESUME_API}/${index}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching resumes:", error);
  }
}

export async function getAllResumes() {
  try {
    const res = await fetch(`${RESUME_API}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching resumes:", error);
  }
}

export async function removeResume(id: string) {
  try {
    const res = await fetch(`${RESUME_API}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    // Optionally, you can refetch the resumes list after deletion
  } catch (error: any) {
    console.error("Error deleting resume:", error);
  }
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
