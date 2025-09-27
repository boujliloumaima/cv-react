import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { SkillType, Resume } from "../../../models";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ConstructionIcon from "@mui/icons-material/Construction";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

export default function SkillStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Resume> = (data) => {
    const currentResume = JSON.parse(
      localStorage.getItem("currentResume") || "{}"
    );
    const updatedcurrentResume = { ...currentResume, ...data };
    localStorage.setItem("currentResume", JSON.stringify(updatedcurrentResume));
    navigate("/resume/add/experience");
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <ProgressBar percentage={25}></ProgressBar>

      <CardHeader
        title="Add Your Skills"
        subheader="Highlight the strengths that define how you work. Whether technical or soft, your skills tell recruiters what you're great at."
        sx={{ textAlign: "center", pb: 0 }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {fields.length === 0 ? (
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                my: 3,
                backgroundColor: "background.default",
              }}
            >
              <Typography variant="body1" color="text.secondary" paragraph>
                Your talents deserve to be seen.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add your first skill to begin shaping your story.
              </Typography>
            </Paper>
          ) : (
            fields.map((field, index) => (
              <Box key={field.id} mb={2}>
                {index === fields.length - 1 ? (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Skill Name"
                      placeholder="Choose a skill that defines your value"
                      helperText="Choose a skill that defines your value."
                      {...register(`skills.${index}.name`)}
                    />
                    <TextField
                      fullWidth
                      select
                      label="Skill Level"
                      helperText="Rate your mastery from 1 (novice) to 5 (expert). Be honest, be proud."
                      {...register(`skills.${index}.level`, {
                        valueAsNumber: true,
                      })}
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      select
                      label="Skill Type"
                      helperText="Is this a technical craft or a soft skill like leadership or empathy?"
                      {...register(`skills.${index}.type`, {
                        valueAsNumber: true,
                      })}
                    >
                      <MenuItem value={SkillType.technical}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <ConstructionIcon fontSize="small" />
                          <span>Technical</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value={SkillType.soft}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <RecordVoiceOverIcon fontSize="small" />
                          <span>Soft</span>
                        </Stack>
                      </MenuItem>
                    </TextField>
                  </Stack>
                ) : (
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {field.name || "Unnamed Skill"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Level:</strong> {field.level} / 5
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Type:</strong>{" "}
                          {field.type === SkillType.technical ? (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                              component="span"
                            >
                              <ConstructionIcon fontSize="small" />
                              <span>Technical</span>
                            </Stack>
                          ) : (
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                              component="span"
                            >
                              <RecordVoiceOverIcon fontSize="small" />
                              <span>Soft</span>
                            </Stack>
                          )}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => remove(index)}
                        color="error"
                        aria-label="Remove skill"
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Stack>
                  </Paper>
                )}
                {index < fields.length - 1 && <Divider sx={{ my: 2 }} />}
              </Box>
            ))
          )}
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
                append({ name: "", level: 1, type: SkillType.technical })
              }
            >
              Add Skill {fields.length + 1}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
