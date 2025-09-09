import { useForm, SubmitHandler } from "react-hook-form";
import { Resume, Gender } from "../../../models";
import { useNavigate } from "react-router-dom";
import { nationalities } from '../../../tempDB/nationalities'; // Adjust the path as needed
import Select from 'react-select';
import ProgressBar from "../../progress/CardWithProgress";

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
            <label htmlFor="fullname">Full Name</label>
            <input id="fullname" {...register("name")} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input id="phone" {...register("phone")} placeholder="eg: +212 666-666666"/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input id="email"
              {...register("email")}
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input id="birthday"
              type="date"
              {...register("birthday")}
            />
          
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nationality">Nationality</label>
            <Select id="nationality"
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: "6px",

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
            <label htmlFor="jobTitle">Job title</label>
            <input id="jobTitle"
              {...register("jobTitle")}
            />
            
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register("gender")}>
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
