import { Resume } from "../models";
import { handleApiRequest } from "../utils/apiErrorHandler";

export const RESUME_API = `${import.meta.env.VITE_API_URL}/resumes`;

const RESUME_ERROR_MESSAGES = {
  400: 'Invalid resume data',
  401: 'Please log in to access your resume',
  404: 'Resume not found',
  409: 'A conflict occurred while saving your resume',
  default: 'Failed to process your request. Please try again.',
  network: 'Unable to connect to the server. Please check your internet connection.'
};

export async function getResume(index: string) {
  return handleApiRequest(`${RESUME_API}/${index}`, {
    method: 'GET',
    customErrorMessages: RESUME_ERROR_MESSAGES
  });
}

export async function updateResume(resume: Resume) {
  return handleApiRequest(`${RESUME_API}/${resume._id}`, {
    method: 'PUT',
    body: resume,
    customErrorMessages: {
      ...RESUME_ERROR_MESSAGES,
      400: 'Failed to update resume. Please check your data.',
      403: 'You do not have permission to update this resume'
    }
  });
}

export async function getAllResumes() {
  return handleApiRequest(RESUME_API, {
    method: 'GET',
    customErrorMessages: {
      ...RESUME_ERROR_MESSAGES,
      403: 'You do not have permission to view these resumes'
    }
  });
}

export async function removeResume(id: string) {
  return handleApiRequest(`${RESUME_API}/${id}`, {
    method: 'DELETE',
    customErrorMessages: {
      ...RESUME_ERROR_MESSAGES,
      403: 'You do not have permission to delete this resume',
      404: 'The resume you are trying to delete was not found'
    }
  });
}

export function getCurrentResume() {
  const stored = localStorage.getItem("currentResume");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return {};
    }
  }
  return {};
}
