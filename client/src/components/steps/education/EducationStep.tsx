import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import EducationStepItem from "./EducationStepItem";

// Composant principal
export default function EducationStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const updatedcurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
    navigate("/resume/add/languages");
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <ProgressBar percentage={75} />
      <CardHeader
        title="Add Your Education"
        subheader="Your academic path says a lot about your foundation. Let’s highlight the places and programs that shaped your expertise."
        sx={{ textAlign: "center", pb: 0 }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {educationFields.map((edu, index) => (
            <Box key={edu.id} mb={3}>
              {index === educationFields.length - 1 ? (
                <EducationStepItem
                  control={control}
                  register={register}
                  index={index}
                />
              ) : (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={0.5}
                      >
                        <SchoolIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {edu.institut?.name || "Unnamed Institution"},{" "}
                          {edu.institut?.city}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={0.5}
                      >
                        <MenuBookIcon color="action" fontSize="small" />
                        <Typography variant="body1">
                          <strong>Diploma:</strong> {edu.diploma}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1}
                      >
                        <DateRangeIcon color="action" fontSize="small" />
                        <Typography variant="body1">
                          <strong>Dates:</strong>{" "}
                          {new Date(edu.startdate).toLocaleDateString()} -{" "}
                          {new Date(edu.enddate).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      {edu.modules && edu.modules.length > 0 && (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <MenuBookIcon color="action" fontSize="small" />
                          <Typography variant="body1">
                            <strong>Modules:</strong>
                          </Typography>
                          <Box>
                            {edu.modules.map((module, i) => (
                              <Chip
                                key={i}
                                label={module}
                                size="small"
                                sx={{ ml: 1, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        </Stack>
                      )}
                    </Box>
                    <IconButton
                      onClick={() => removeEducation(index)}
                      color="error"
                      aria-label="Remove education"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              )}
              {index < educationFields.length - 1 && <Divider sx={{ my: 2 }} />}
            </Box>
          ))}
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" justifyContent="space-between">
            <Button type="submit" variant="contained" size="large">
              Next
            </Button>
            <Button
              type="button"
              variant="outlined"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() =>
                addEducation({
                  institut: { name: "", city: "" },
                  diploma: "",
                  startdate: new Date(),
                  enddate: new Date(),
                  modules: [],
                })
              }
            >
              Add Education {educationFields.length + 1}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
