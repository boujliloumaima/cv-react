// 1. Update imports
import { Box, Text, Loader, MantineProvider } from "@mantine/core";
import { IconUser, IconSchool, IconBriefcase, IconLanguage, IconCode, IconCheck } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { useEffect, useState, ReactNode } from 'react';
import { Resume } from '@/models';
import { useResume } from '@/hooks/useResume';
import { ProfileForm } from "@/components/steps/profile/ProfileForm";
import EducationsForm from "@/components/steps/education/EducationsForm";
import ExperienceStep from "@/components/steps/experience/experienceStep";
import SkillStep from "@/components/steps/skill/skillStep";

// 2. Define proper types
interface StepComponentProps {
  onSubmit?: (data: Resume) => void;
  defaultValues?: Partial<Resume>;
  submitLabel?: string;
}

import LangStep from "@/components/steps/lang/LangStep";

// Define the type for step components
interface StepComponentProps {
  onSubmit?: (data: Resume) => void;
}
type StepComponent = React.ComponentType<StepComponentProps> | ((props: StepComponentProps) => JSX.Element);
type Step = {
  id: string;
  label: string;
  icon: ReactNode;
  sectionType: 'basics' | 'education' | 'experience' | 'skills' | 'languages';
};

// 3. Create a properly typed step component creator
const createStepComponent = <T extends React.ComponentType<StepComponentProps>>(Component: T) => {
  return (props: StepComponentProps) => {
    const { resume, isLoading, updateResume } = useResume();

    const handleSubmit = async (formData: Partial<Resume>) => {
      if (!resume) return;
      
      try {
        const updatedResume = await updateResume({
          ...resume,
          ...formData,
          birthday: formData.birthday ? new Date(formData.birthday as string).toISOString() : resume.birthday
        });
        
        if (props.onSubmit && updatedResume) {
          props.onSubmit(updatedResume);
        }
      } catch (error) {
        console.error('Error updating resume:', error);
      }
    };

    if (isLoading || !resume) {
      return (
        <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader size="xl" />
        </Box>
      );
    }

    return <Component {...props} onSubmit={handleSubmit} defaultValues={resume} />;
  };
};
// Map step types to their corresponding components with their props
const stepComponents: Record<string, StepComponent> = {
  'profile': createStepComponent(ProfileForm),
  'education': createStepComponent(EducationsForm),
  // 'experience': createStepComponent(ExperienceStep),
  // 'skills': createStepComponent(SkillStep),
  // 'languages': createStepComponent(LangStep),
};
// 4. Define steps with proper typing
const steps: Step[] = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <IconUser size={20} />,
    sectionType: 'basics',
  },
  {
    id: 'education',
    label: 'Education',
    icon: <IconSchool size={20} />,
    sectionType: 'education',
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <IconBriefcase size={20} />,
    sectionType: 'experience',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <IconCode size={20} />,
    sectionType: 'skills',
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: <IconLanguage size={20} />,
    sectionType: 'languages',
  },
];

// 5. Main component
export default function LeftPanel() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const { resume, isLoading } = useResume();
  const methods = useForm<Resume>();

  const getCurrentStep = () => {
    const path = location.pathname;
    const stepIndex = steps.findIndex(step => path.includes(step.id));
    return stepIndex >= 0 ? stepIndex : 0;
  };

  useEffect(() => {
    setActiveStep(getCurrentStep());
  }, [location.pathname]);

  useEffect(() => {
    if (resume) {
      methods.reset(resume);
    }
  }, [resume, methods]);

  if (isLoading || !resume) {
    return (
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Loader size="xl" />
      </Box>
    );
  }

  return (
    <MantineProvider>
      <FormProvider {...methods}>
        <Box style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          padding: '1rem',
        }}>
          <Box mb="md">
            <Text size="xl" fw={600} mb="md">Resume Builder</Text>
            <Text size="sm" color="dimmed">Complete all steps to create your resume</Text>
          </Box>

          <Box style={{ 
            flex: 1, 
            overflowY: 'auto',
            scrollbarWidth: 'none',  /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
            }}>
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const StepComponent = stepComponents[step.id as keyof typeof stepComponents];
              
              return (
                <Box 
                  key={step.id} 
                  id={step.id}
                  style={{
                    marginBottom: '2rem',
                    padding: '1rem',
                    border: isActive ? '1px solid #ddd' : 'none',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'white' : 'transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <Box 
                    onClick={() => setActiveStep(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      marginBottom: '1rem',
                      padding: '0.5rem',
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.02)',
                      },
                    }}
                  >
                    <Box style={{ marginRight: '0.75rem' }}>
                      {index < activeStep ? (
                        <IconCheck size={20} color="green" />
                      ) : (
                        step.icon
                      )}
                    </Box>
                    <Text fw={isActive ? 600 : 400} size="lg">
                      {step.label}
                    </Text>
                  </Box>
                  
                  {isActive && StepComponent && (
                    <Box style={{ marginTop: '1rem' }}>
                      <StepComponent />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </FormProvider>
    </MantineProvider>
  );
}