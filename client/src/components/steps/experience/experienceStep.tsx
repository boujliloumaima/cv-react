import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ExperienceStepItem from "./experienceStepItem";
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
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

export default function ExperienceStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray<Resume, "experiences">({
    control,
    name: "experiences",
  });
  const onSubmit: SubmitHandler<Resume> = (data) => {
    try {
      const currentResume = JSON.parse(
        localStorage.getItem("currentResume") || "{}"
      );
      const updatedcurrentResume = { ...currentResume, ...data };
      localStorage.setItem(
        "currentResume",
        JSON.stringify(updatedcurrentResume)
      );
      navigate("/resume/add/education");
    } catch (error) {
      alert("Error saving resume");
      console.error(error);
    }
  };
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <ProgressBar percentage={50}></ProgressBar>

      <CardHeader
        title="Add Your Experience"
        subheader="Share the roles you've held, the places you've worked, and the tools you've mastered. Every detail adds depth to your story."
        sx={{ textAlign: "center", pb: 0 }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((exp, index) => (
            <Box key={exp.id} mb={3}>
              {index === fields.length - 1 ? (
                <ExperienceStepItem
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
                        mb={1}
                      >
                        <WorkOutlineIcon color="primary" fontSize="small" />
                        <Typography variant="subtitle1" fontWeight="bold">
                          {exp.company?.name || "Unnamed Company"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ({exp.company?.city})
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        mb={1}
                      >
                        <LocationOnOutlinedIcon
                          color="action"
                          fontSize="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(exp.startdate).toLocaleDateString()} –{" "}
                          {new Date(exp.enddate).toLocaleDateString()}
                        </Typography>
                      </Stack>
                      {exp.company?.description && (
                        <Typography variant="body2" paragraph>
                          {exp.company.description}
                        </Typography>
                      )}
                      {exp.tasks && exp.tasks.length > 0 && (
                        <List dense sx={{ pl: 2 }}>
                          {exp.tasks.map((task, i) => (
                            <ListItem key={i} sx={{ py: 0.5 }}>
                              <ListItemText primary={`• ${task}`} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                      {exp.tools && exp.tools.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          mt={1}
                          flexWrap="wrap"
                        >
                          <BuildOutlinedIcon
                            color="action"
                            fontSize="small"
                            sx={{ mt: 0.5 }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mr: 1 }}
                          >
                            <strong>Tools:</strong>
                          </Typography>
                          {exp.tools.map((tool, i) => (
                            <Chip
                              key={i}
                              label={tool}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      )}
                    </Box>
                    <IconButton
                      onClick={() => remove(index)}
                      color="error"
                      aria-label="Remove experience"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              )}
              {index < fields.length - 1 && <Divider sx={{ my: 2 }} />}
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
                append({
                  company: { name: "", city: "" },
                  startdate: new Date(),
                  enddate: new Date(),
                  tasks: [],
                  tools: [],
                })
              }
            >
              Add Experience {fields.length + 1}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
