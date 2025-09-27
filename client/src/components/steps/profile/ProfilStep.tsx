import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nationalities } from "../../../tempDB/nationalities"; // Adjust the path as needed
import ProgressBar from "../../progress/CardWithProgress";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  LinearProgress,
  Stack,
  Autocomplete,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import FlagIcon from "@mui/icons-material/Flag";
import WorkIcon from "@mui/icons-material/Work";
import WcIcon from "@mui/icons-material/Wc";

// import "../steps.css";
import { Gender, Resume } from "../../../models";

export default function ProfilStep() {
  const { register, handleSubmit, control } = useForm<Resume>();
  const navigate = useNavigate();
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
      navigate("/resume/add/skills");
    } catch (error) {
      alert("Error saving resume:");
      console.error(error);
    }
  };
  return (
    <Card sx={{ maxWidth: 700, margin: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <ProgressBar percentage={0}></ProgressBar>

      <CardHeader
        title="Your Story Begins Here"
        subheader="Every great story starts with a name. Let's capture yours with pride."
        sx={{ textAlign: "center", pb: 0 }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
            <TextField
              fullWidth
              label="Full Name"
              id="fullname"
              InputProps={{
                startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="Enter your full legal name"
              helperText="Enter your full legal name as you'd like it to appear on your CV."
              {...register("name")}
            />
            <TextField
              fullWidth
              label="Phone"
              id="phone"
              InputProps={{
                startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="Include your country code"
              helperText="Include your country code for international contact."
              {...register("phone")}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
            <TextField
              fullWidth
              label="Email Address"
              id="email"
              type="email"
              InputProps={{
                startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="Use a professional email address"
              helperText="Use a professional email address you check regularly."
              {...register("email")}
            />
            <TextField
              fullWidth
              label="Birthday"
              id="birthday"
              type="date"
              InputProps={{
                startAdornment: <CakeIcon color="action" sx={{ mr: 1 }} />,
              }}
              InputLabelProps={{ shrink: true }}
              helperText="Date of Birth Format: MM/DD/YYYY."
              {...register("birthday")}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
            <Controller
              name="nationalite"
              control={control}
              render={({ field: { onChange, value } }) => {
                const selectedOption = value ? { value, label: value } : null;
                return (
                  <Autocomplete
                    fullWidth
                    id="nationalite"
                    options={nationalities.map((n) => ({ value: n, label: n }))}
                    value={selectedOption}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.value : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nationality"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <FlagIcon color="action" sx={{ mr: 1 }} />
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                        placeholder="Select your nationality"
                        helperText="This helps recruiters understand your eligibility for certain roles."
                      />
                    )}
                  />
                );
              }}
            />
            <TextField
              fullWidth
              label="Job Title"
              id="jobTitle"
              InputProps={{
                startAdornment: <WorkIcon color="action" sx={{ mr: 1 }} />,
              }}
              placeholder="State your current or desired professional title"
              helperText="State your current or desired professional title."
              {...register("jobTitle")}
            />
          </Stack>

          <TextField
            fullWidth
            select
            label="Gender"
            id="gender"
            InputProps={{
              startAdornment: <WcIcon color="action" sx={{ mr: 1 }} />,
            }}
            helperText="Optional: Helps personalize your CV presentation."
            {...register("gender")}
            sx={{ mb: 2 }}
          >
            <MenuItem value={Gender.male}>Male</MenuItem>
            <MenuItem value={Gender.female}>Female</MenuItem>
          </TextField>

          <Divider sx={{ my: 3 }} />
          <Stack direction="row" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
