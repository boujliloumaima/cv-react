import { Resume } from "../../../models";
import { Control, UseFormRegister } from "react-hook-form";
import { Box, TextField, Typography, Stack, Paper } from "@mui/material";
import { Controller } from "react-hook-form";

import MuiTagInput from "../../tag/MuiTagInput";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function EducationStepItem({ control, register, index }: Props) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Education {index + 1}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Institution Name"
          placeholder="e.g. Université Mohammed V"
          helperText="This helps recruiters recognize the credibility of your academic background."
          {...register(`educations.${index}.institut.name`)}
        />
        <TextField
          fullWidth
          label="Institution City"
          placeholder="e.g. Rabat"
          helperText="Location adds context to your education and can reflect regional expertise."
          {...register(`educations.${index}.institut.city`)}
        />
      </Stack>

      <TextField
        fullWidth
        label="Diploma"
        placeholder="e.g. Master in Luxury Marketing"
        helperText="Your diploma is often the first thing recruiters look for—make it clear and proud."
        sx={{ mb: 2 }}
        {...register(`educations.${index}.diploma`)}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText="Helps show the timeline of your academic journey."
          {...register(`educations.${index}.startdate`)}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText="Helps show the timeline of your academic journey."
          {...register(`educations.${index}.enddate`)}
        />
      </Stack>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Modules
        </Typography>
        <Controller
          name={`educations.${index}.modules`}
          control={control}
          render={({ field }) => (
            <MuiTagInput
              {...field}
              control={control}
              placeholder="Add modules and press Enter..."
            />
          )}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          Highlight the subjects that shaped your expertise. Press Enter to add
          each one.
        </Typography>
      </Box>
    </Paper>
  );
}
