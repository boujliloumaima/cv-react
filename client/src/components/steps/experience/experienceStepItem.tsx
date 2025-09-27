import { Control, UseFormRegister } from "react-hook-form";
import { Resume } from "../../../models";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import { Controller } from "react-hook-form";

import MuiTagInput from "../../tag/MuiTagInput";

interface Props {
  control: Control<Resume>;
  register: UseFormRegister<Resume>;
  index: number;
}

export default function ExperienceStepItem({
  control,
  register,
  index,
}: Props) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Experience {index + 1}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Company Name"
          placeholder="e.g. Microsoft"
          helperText="Enter the name of the organization where you worked."
          {...register(`experiences.${index}.company.name`)}
        />
        <TextField
          fullWidth
          label="Company City"
          placeholder="e.g. Casablanca"
          helperText="Location helps contextualize your experience."
          {...register(`experiences.${index}.company.city`)}
        />
      </Stack>

      <TextField
        fullWidth
        label="Description"
        placeholder="Briefly describe the company or your role there."
        helperText="Briefly describe the company or your role there to give more context."
        multiline
        rows={3}
        sx={{ mb: 2 }}
        {...register(`experiences.${index}.company.description`)}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText="Shows when your journey with this company began."
          {...register(`experiences.${index}.startdate`)}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          helperText="Helps define the duration and progression of your role."
          {...register(`experiences.${index}.enddate`)}
        />
      </Stack>

      <Box mb={2}>
        <Typography variant="subtitle1" gutterBottom>
          Key Tasks
        </Typography>
        <Controller
          name={`experiences.${index}.tasks`}
          control={control}
          render={({ field }) => (
            <MuiTagInput
              {...field}
              control={control}
              placeholder="Add tasks and press Enter..."
            />
          )}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          List your main responsibilities or achievements. Press Enter (or tab)
          to add each one.
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Tools Used
        </Typography>
        <Controller
          name={`experiences.${index}.tools`}
          control={control}
          render={({ field }) => (
            <MuiTagInput
              {...field}
              control={control}
              placeholder="Add tools and press Enter..."
            />
          )}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          Mention platforms, software, or techniques you used. Press Enter (or
          tab) to add each one.
        </Typography>
      </Box>
    </Paper>
  );
}
