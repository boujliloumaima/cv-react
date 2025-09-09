import { useForm, SubmitHandler } from "react-hook-form";
import { Resume, Gender } from "../models";
import { useNavigate } from "react-router-dom";
import { nationalities } from '../tempDB/nationalities'; // Adjust the path as needed
import Select from 'react-select';
import ProgressBar from "./progress/CardWithProgress";

export default function ProfilStep() {
  const {
    register,
    handleSubmit,
    setValue
  } = useForm<Resume>();
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
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label>Fullname</label>
            <input {...register("name")} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input {...register("phone")} />
            
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              {...register("email")}
              type="email"
            />
            
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input
              type="date"
              {...register("birthday")}
            />
          
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Nationality</label>
            <Select
              styles={{
                control: (provided) => ({
                  ...provided,
                }),
              }}
              placeholder="Select your nationality..."
              options={nationalities.map(n => ({ value: n, label: n }))}
              onChange={(selected) => {
                setValue("nationalite", selected!.value);
              }}
            />
            
          </div>
          <div className="form-group">
            <label>Job title</label>
            <input
              {...register("jobTitle")}
            />
            
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select {...register("gender")}>
            <option value={Gender.male}>Male</option>
            <option value={Gender.female}>Female</option>
          </select>
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
