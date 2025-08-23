import "./App.css";
import Competence from "./components/competence";
import ExperiencePro from "./components/experience";
import FormationandDiplome from "./components/formation";
import MyLangues from "./components/langue";
import Information from "./components/profil";

function App() {
  return (
    <div className="container-cv">
      <Information />
      <Competence />
      <ExperiencePro />
      <FormationandDiplome />
      <MyLangues />
    </div>
  );
}

export default App;
