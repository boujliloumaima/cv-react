import { Resume } from "./models";

import ResumesList from "./components/ResumesListe";
import ResumeDetail from "./components/ResumeDetail";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProfileStep from "./components/ProfilStep";
import EducationStep from "./components/EducationStep";
import ExperienceStep from "./components/experienceStep";
import SkillsStep from "./components/skillStep";
import LanguagesStep from "./components/LangStep";

const storedResume = localStorage.getItem("resumes") ?? "[]";
const resume: Resume[] = JSON.parse(storedResume);
console.log(localStorage.getItem("resumes"));
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<ProfileStep />} />
        <Route path="/education" element={<EducationStep />} />
        <Route path="/experience" element={<ExperienceStep />} />
        <Route path="/skills" element={<SkillsStep />} />
        <Route path="/languages" element={<LanguagesStep />} />
        <Route
          path="/resumesList"
          element={<ResumesList resumesList={resume} />}
        />
        <Route
          path="/resume/:index"
          element={<ResumeDetail resumesList={resume} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
