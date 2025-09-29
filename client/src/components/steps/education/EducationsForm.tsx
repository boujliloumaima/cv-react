import { useEffect, useState } from 'react';
import { Button, Group, Stack, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import EducationForm from './EducationForm';
import EducationPreview from './EducationPreview';
import { Education, Resume } from '../../../models';

interface EducationsFormProps {
    onSubmit: (data: Resume) => void;
    defaultValues?: Partial<Resume>;
    submitLabel?: string;
  }

export default function EducationsForm({ defaultValues, onSubmit }: EducationsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [showForm, setShowForm] = useState<boolean>(false);
useEffect(() => {
  if (defaultValues) {
    console.log(defaultValues);
  }else{
    console.log('no defaultValues');
  }
}, [defaultValues]);
  // Ensure we have a valid resume with educations array
  const safeResume = defaultValues || { educations: [] };

  const handleAdd = () => {
    setEditingIndex(-1);
    setShowForm(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleSubmit = (education: Education) => {
    const updatedEducations = [...(defaultValues?.educations || [])];
    
    if (editingIndex >= 0) {
      updatedEducations[editingIndex] = education;
    } else {
      updatedEducations.push(education);
    }

    onSubmit({
      ...defaultValues,
      educations: updatedEducations
    });

    setShowForm(false);
    setEditingIndex(-1);
  };

  const handleRemove = (index: number) => {
    const updatedEducations = [...(defaultValues.educations || [])];
    updatedEducations.splice(index, 1);
    
    onSubmit({
        ...defaultValues,
        educations: updatedEducations
    });

    setShowForm(false);
    setEditingIndex(-1);
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Title order={4}>Education</Title>
        <Button 
          leftSection={<IconPlus size={16} />} 
          size="sm" 
          onClick={handleAdd}
          disabled={showForm}
        >
          Add Education
        </Button>
      </Group>

      {/* List of educations */}
      {!showForm && (
        <Stack gap="sm">
        {safeResume.educations?.map((edu, index) => (
          <EducationPreview
            key={index}
            edu={edu}
            onEdit={() => handleEdit(index)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </Stack>
      )}
      

      {/* Education Form */}
      {showForm && (
        <EducationForm
          defaultValues={editingIndex >= 0 ? defaultValues.educations?.[editingIndex] : undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingIndex(-1);
          }}
          isEditing={editingIndex >= 0}
        />
      )}
    </Stack>
  );
}
