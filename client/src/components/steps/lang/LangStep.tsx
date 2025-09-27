import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Resume, LangLevel } from "../../../models";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function LanguagesStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  const queryClient = useQueryClient();
  const createResumeMutation = useMutation({
    mutationFn: async (data: Resume) => {
      const currentResume = JSON.parse(
        localStorage.getItem("currentResume") || "{}"
      );
      const updatedCurrentResume = { ...currentResume, ...data };
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/v1/resumes`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentResume),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      localStorage.removeItem("currentResume");
      navigate("/resumes/all");
    },
    onError: () => {
      alert("❌ Échec de création du résumé !");
    },
  });

  const onSubmit: SubmitHandler<Resume> = (data) => {
    createResumeMutation.mutate(data);
  };
  const LangLabels = ["Mother", "Beginner", "Intermediate", "Fluent", "Expert"];
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Language Skills
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Box key={field.id} mb={2}>
              {index === fields.length - 1 ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label="Language"
                    placeholder="e.g., English, French"
                    fullWidth
                    {...register(`languages.${index}.name`)}
                  />
                  <TextField
                    select
                    label="Proficiency"
                    defaultValue={LangLevel.beginner}
                    fullWidth
                    {...register(`languages.${index}.level`)}
                  >
                    {Object.entries(LangLevel)
                      .filter(([key, value]) => typeof value === "number")
                      .map(([key, value]) => (
                        <MenuItem key={value} value={value}>
                          {LangLabels[value]}
                        </MenuItem>
                      ))}
                  </TextField>
                </Stack>
              ) : (
                <Card variant="outlined" sx={{ p: 2, mb: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>
                      {field.name} : {LangLabels[field.level]}
                    </Typography>
                    <IconButton
                      onClick={() => remove(index)}
                      color="error"
                      aria-label="Remove language"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </Stack>
                </Card>
              )}
              {index < fields.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
          <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Next
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => append({ name: "", level: LangLevel.beginner })}
            >
              Add Language
            </Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
}
