import { useState, useEffect, useCallback } from 'react';
import { Resume, Gender } from '@/models';
import { getResume, updateResume } from '@/services/resumeService';

const DEFAULT_RESUME_ID = '68d7f9b1f3ea1759848919d2';

// Create a default resume object that matches the Resume interface
const createDefaultResume = (): Resume => ({
  _id: '',
  name: '',
  phone: '',
  nationalite: '',
  birthday: new Date().toISOString(),
  email: '',
  jobTitle: '',
  gender: Gender.MALE,
  languages: [],
  skills: [],
  educations: [],
  experiences: [],
  yearsOfExperience: 0
});

export const useResume = (resumeId: string = DEFAULT_RESUME_ID) => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch resume data
  const fetchResume = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getResume(resumeId);
      setResume(data || createDefaultResume());
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch resume');
      setError(error);
      const defaultResume = createDefaultResume();
      setResume(defaultResume);
      return defaultResume;
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  // Update resume data
  const updateResumeData = useCallback(async (updates: Partial<Resume>) => {
    if (!resume) return null;
    
    try {
      const updatedResume = { ...resume, ...updates };
      const result = await updateResume(updatedResume);
      setResume(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update resume');
      setError(error);
      throw error;
    }
  }, [resume]);

  // Initial fetch
  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return {
    resume,
    isLoading,
    error,
    fetchResume,
    updateResume: updateResumeData,
    createDefaultResume
  };
};
