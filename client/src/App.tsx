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
import { createTheme, MantineProvider } from "@mantine/core";
import ResumeBuilderPage from "./pages/builder/Page";

export default function App() {
  const theme = createTheme({
    colors: {
      brand: [
        "#f0f9ff", // 0
        "#e0f2fe", // 1
        "#bae6fd", // 2
        "#7dd3fc", // 3
        "#38bdf8", // 4 (primary)
        "#0ea5e9", // 5
        "#0284c7", // 6
        "#0369a1", // 7
        "#075985", // 8
        "#0c4a6e", // 9
      ],
      dark: [
        "#f8fafc", // 0
        "#f1f5f9", // 1
        "#e2e8f0", // 2
        "#cbd5e1", // 3
        "#94a3b8", // 4
        "#64748b", // 5
        "#475569", // 6
        "#334155", // 7
        "#1e293b", // 8
        "#0f172a", // 9
      ],
    },
    primaryColor: "brand",
    primaryShade: 4, // uses brand[4] (#38bdf8)
    white: "#ffffff",
    black: "#0f172a",
    fontFamily: "Inter, sans-serif",
    defaultRadius: "md",
    components: {
      Button: {
        defaultProps: {
          radius: "md",
          variant: "filled",
        },
      },
      TextInput: {
        styles: {
          input: {
            borderRadius: "0.375rem",
            borderColor: "#e2e8f0",
          },
        },
      },
      Card: {
        defaultProps: {
          shadow: "sm",
          radius: "md",
          padding: "lg",
        },
      },
    },
    headings: {
      fontFamily: "Inter, sans-serif",
      fontWeight: "700",
      sizes: {
        h1: { fontSize: "2.2rem" },
        h2: { fontSize: "1.8rem" },
        h3: { fontSize: "1.5rem" },
      },
    },
  });

  return (
    <div className="">
      <MantineProvider theme={theme} defaultColorScheme="light">
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
            <Route path="/builder" element={<ResumeBuilderPage />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}
