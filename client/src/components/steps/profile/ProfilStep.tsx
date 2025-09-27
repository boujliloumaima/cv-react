import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { nationalities } from "../../../tempDB/nationalities"; // Adjust the path as needed
import ProgressBar from "../../progress/CardWithProgress";
import "../steps.css";
import { Gender, Resume } from "../../../models";
import { Autocomplete, TextField } from "@mui/material";

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
    <div className="container-form">
      <ProgressBar percentage={0}></ProgressBar>

      <div className="section-header">
        <h2 className="section-title">Your Story Begins Here</h2>
        <p className="section-subtitle">
          Every great story starts with a name. Let’s capture yours with pride.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input id="fullname" {...register("name")} />
            <small className="input-hint">
              Enter your full legal name as you'd like it to appear on your CV.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" {...register("phone")} />
            <small className="input-hint">
              Include your country code for international contact.
            </small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input id="email" {...register("email")} type="email" />
            <small className="input-hint">
              Use a professional email address you check regularly.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input id="birthday" type="date" {...register("birthday")} />
            <small className="input-hint">
              Date of Birth Format: MM/DD/YYYY.
            </small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nationalite">Nationality</label>
            <Controller
              name="nationalite"
              control={control}
              render={({ field: { onChange, value } }) => {
                const selectedOption = value ? { value, label: value } : null;
                return (
                  <Autocomplete
                    id="nationalite"
                    disablePortal
                    options={nationalities.map((n) => ({ value: n, label: n }))}
                    value={selectedOption}
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.value : "");
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                );
              }}
            />

            <small className="input-hint">
              This helps recruiters understand your eligibility for certain
              roles.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job title</label>
            <input id="jobTitle" {...register("jobTitle")} />
            <small className="input-hint">
              State your current or desired professional title.
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
            <option value={Gender.male}>Male</option>
            <option value={Gender.female}>Female</option>
          </select>

          <small className="input-hint">
            Optional: Helps personalize your CV presentation.
          </small>
        </div>
        <div className="container-btn">
          <button type="submit" className="btn next-btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
