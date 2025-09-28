import { Box, Text } from "@mantine/core";
import { IconUser, IconSchool, IconBriefcase, IconLanguage, IconCode, IconCheck } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Gender, NewResume, Resume } from '@/models';
import { getResume, updateResume } from '@/services/resumeService';

// Import step components
import EducationStep from "@/components/steps/education/EducationStep";
import ExperienceStep from "@/components/steps/experience/experienceStep";
import SkillStep from "@/components/steps/skill/skillStep";
import LangStep from "@/components/steps/lang/LangStep";
import { ProfileForm } from "@/components/steps/profile/ProfileForm";


// Define the type for step components
interface StepComponentProps {
  defaultValues?: any;
  onSubmit?: (data: any) => void;
}

type StepComponent = React.ComponentType<StepComponentProps> | ((props: StepComponentProps) => JSX.Element);

// Map step types to their corresponding components with their props
const stepComponents: Record<string, StepComponent> = {
  'profile': (props: StepComponentProps) => {
    const [defaultValues, setDefaultValues] = useState<Partial<Resume>>({});
    const defaultResumeId = '68d7f9b1f3ea1759848919d2';

    useEffect(() => {
      const fetchResume = async () => {
        try {
          const data = await getResume(defaultResumeId);
          setDefaultValues(data);
        } catch (error) {
          console.error('Error fetching resume:', error);
        }
      };
      fetchResume();
    }, []);

    const handleSubmit = async (formData: any) => {
      try {
        // Convert form data back to Resume type
        const resumeData: Partial<Resume> = {
          ...formData,
          birthday: formData.birthday ? new Date(formData.birthday) : undefined
        };
        
        const updatedResume = await updateResume({ ...defaultValues, ...resumeData } as Resume);

        // Here you would typically make an API call to update the resume
        console.log('Updated resume:', updatedResume);
        
        if (props.onSubmit) {
          props.onSubmit(updatedResume as Resume);
        }
      } catch (error) {
        console.error('Error updating resume:', error);
      }
    };

    return (
      <ProfileForm 
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        submitLabel="Save"
      />
    );
  },
  'education': EducationStep as React.ComponentType<StepComponentProps>,
  'experience': ExperienceStep as React.ComponentType<StepComponentProps>,
  'skills': SkillStep as React.ComponentType<StepComponentProps>,
  'languages': LangStep as React.ComponentType<StepComponentProps>,
};

// Define the steps in the form
const steps = [
  {
    id: 'profile',
    label: 'Profile',
    icon: <IconUser size={20} />,
    sectionType: 'basics' as const,
  },
  {
    id: 'education',
    label: 'Education',
    icon: <IconSchool size={20} />,
    sectionType: 'education' as const,
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <IconBriefcase size={20} />,
    sectionType: 'experience' as const,
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: <IconCode size={20} />,
    sectionType: 'skills' as const,
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: <IconLanguage size={20} />,
    sectionType: 'languages' as const,
  },
];

// Default resume data
const defaultResume: NewResume = {
  user: {
    title: '',
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    nationalite: '',
    gender: Gender.MALE,
  },
  template_id: '',
  sections: steps.map(step => ({
    name: step.label,
    type: step.sectionType,
    defaultFields: [],
  })),
};

export default function LeftPanel() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  
  // Initialize form with react-hook-form
  const methods = useForm<NewResume>({
    defaultValues: defaultResume,
  });

  // Get the current step based on URL
  const getCurrentStep = () => {
    const path = location.pathname;
    const stepIndex = steps.findIndex(step => path.includes(step.id));
    return stepIndex >= 0 ? stepIndex : 0;
  };

  // Update active step when URL changes
  useEffect(() => {
    setActiveStep(getCurrentStep());
  }, [location.pathname]);

  // Get the current step component
  const CurrentStepComponent = stepComponents[steps[activeStep]?.id] || (() => null);

  return (
    <FormProvider {...methods}>
      <Box style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        padding: '0rem',
      }}>
        <Box mb="md">
          <Text size="xl" fw={600} mb="md">Resume Builder</Text>
          <Text size="sm" color="dimmed">Complete all steps to create your resume</Text>
        </Box>

        {/* Main Content Area - All Steps */}
        <Box style={{ 
          flex: 1, 
          overflowY: 'auto',
          scrollbarWidth: 'none',  /* Firefox */
          msOverflowStyle: 'none',  /* IE and Edge */

        }}>
          {steps.map((step, index) => {
            const StepComponent = stepComponents[step.id];
            const isActive = index === activeStep;
            
            return (
              <Box 
                key={step.id} 
                id={step.id}
                style={{
                  marginBottom: '2rem',
                  padding: '1rem',
                  border: isActive ? `1px solid #ddd` : 'none',
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
  );
}
