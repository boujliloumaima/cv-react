import "./App.css";
import ResumesList from "./pages/resume/ResumesListe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileStep from "./components/steps/profile/ProfilStep";
import EducationStep from "./components/steps/education/EducationStep";
import ExperienceStep from "./components/steps/experience/experienceStep";
import SkillsStep from "./components/steps/skill/skillStep";
import LanguagesStep from "./components/steps/lang/LangStep";
import HomePage from "./pages/home/HomePage";
import ResumeDetail from "./pages/resume/ResumeDetail";
import RegisterPage from "./pages/register/registerPage";
import LoginPage from "./pages/login/loginPage";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export default function App() {
  return (
    <div className="container-cv ">
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/resume/add/profile" element={<ProfileStep />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resume/add/education" element={<EducationStep />} />
            <Route path="/resume/add/experience" element={<ExperienceStep />} />
            <Route path="/resume/add/skills" element={<SkillsStep />} />
            <Route path="/resume/add/languages" element={<LanguagesStep />} />
            <Route path="/resumes/all" element={<ResumesList />} />
            <Route path="/resume/:id" element={<ResumeDetail />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}
