import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HomeIcon from "@mui/icons-material/Home";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Resumes
      </Typography>

      {resumesList.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center", mt: 3 }}>
          <Typography variant="body1">No resumes found.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Phone
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resumesList.map((resume, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{resume.name}</TableCell>
                  <TableCell>{resume.email}</TableCell>
                  <TableCell>{resume.phone}</TableCell>
                  <TableCell>{resume.jobTitle}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => viewDetail(resume._id)}
                      aria-label="View resume"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/home")}
        >
          Back Home
        </Button>
      </Stack>
    </Box>
  );
}
