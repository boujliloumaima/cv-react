import { useParams, useNavigate } from "react-router-dom";
import { getResume } from "../../services/resumeService";
import ResumeComponent from "../../components/ResumeComponent";

export default function ResumeDetail() {
  const { index } = useParams();
  const navigate = useNavigate();
  const resume = getResume(parseInt(index!));

  if (!resume) return <p>Resume not found</p>;

  return (
    <div>
      <ResumeComponent resume={resume} />
      <button onClick={() => navigate("/resumes/all")}>Back to List</button>
    </div>
  );
}
