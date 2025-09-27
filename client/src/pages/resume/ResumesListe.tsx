import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Paper,
  Table,
  TableThead,
  TableTbody,
  TableTr,
  TableTh,
  TableTd,
  Stack,
  Title,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core";
import { IconEye, IconHome } from "@tabler/icons-react";
import { Resume } from "../../models";

//import { getAllResumes } from "../../services/resumeService";
export default function ResumesList() {
  const navigate = useNavigate();
  //const resumesList = getAllResumes();

  const getAllResumes = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/resumes`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching resumes:", error);
    }
  };

  const {
    data: resumesList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: getAllResumes,
  });

  const viewDetail = (id: string) => {
    navigate(`/resume/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching resumes.</p>;

  return (
    <Box p={24}>
      <Title order={2} mb="md">
        All Resumes
      </Title>

      {resumesList.length === 0 ? (
        <Paper p="xl" ta="center" mt="md">
          <Text>No resumes found.</Text>
        </Paper>
      ) : (
        <Paper shadow="md" radius="md" p={0} mt="md">
          <Table highlightOnHover withColumnBorders>
            <TableThead>
              <TableTr>
                <TableTh>#</TableTh>
                <TableTh>Name</TableTh>
                <TableTh>Email</TableTh>
                <TableTh>Phone</TableTh>
                <TableTh>Job Title</TableTh>
                <TableTh>Actions</TableTh>
              </TableTr>
            </TableThead>
            <TableTbody>
              {resumesList.map((resume: Resume, index: number) => (
                <TableTr key={index}>
                  <TableTd>{index + 1}</TableTd>
                  <TableTd>{resume.name}</TableTd>
                  <TableTd>{resume.email}</TableTd>
                  <TableTd>{resume.phone}</TableTd>
                  <TableTd>{resume.jobTitle}</TableTd>
                  <TableTd>
                    <ActionIcon
                      color="blue"
                      variant="light"
                      onClick={() => viewDetail(resume._id)}
                      aria-label="View resume"
                    >
                      <IconEye size={20} />
                    </ActionIcon>
                  </TableTd>
                </TableTr>
              ))}
            </TableTbody>
          </Table>
        </Paper>
      )}

      <Stack justify="flex-end" mt="lg">
        <Button
          variant="outline"
          leftSection={<IconHome size={18} />}
          onClick={() => navigate("/home")}
        >
          Back Home
        </Button>
      </Stack>
    </Box>
  );
}
