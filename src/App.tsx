import { Resume } from "./models";
import "./App.css";
import ResumesList from "./components/ResumesListe";
import ResumeDetail from "./components/ResumeDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileStep from "./components/steps/profile/ProfilStep";
import EducationStep from "./components/steps/education/EducationStep";
import ExperienceStep from "./components/steps/experience/experienceStep";
import SkillsStep from "./components/steps/skill/skillStep";
import LanguagesStep from "./components/steps/lang/LangStep";
import HomePage from "./pages/home/HomePage";

const storedResume = localStorage.getItem("resumes") ?? "[]";
const resume: Resume[] = JSON.parse(storedResume);
export default function App() {
  return (
    <div className="container-cv ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/resume/add/profile" element={<ProfileStep />} />
          <Route path="/resume/add/education" element={<EducationStep />} />
          <Route path="/resume/add/experience" element={<ExperienceStep />} />
          <Route path="/resume/add/skills" element={<SkillsStep />} />
          <Route path="/resume/add/languages" element={<LanguagesStep />} />
          <Route
            path="/resumes/all"
            element={<ResumesList resumesList={resume} />}
          />
          <Route
            path="/resume/:index"
            element={<ResumeDetail resumesList={resume} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
