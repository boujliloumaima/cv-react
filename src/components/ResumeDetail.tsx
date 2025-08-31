import { Resume } from "../models";
import { useParams, useNavigate } from "react-router-dom";
import ResumeComponent from "./ResumeComponent";
interface Props {
  resumesList: Resume[];
}
export default function ResumeDetail({ resumesList }: Props) {
  const { index } = useParams();
  const navigate = useNavigate();
  const resume = resumesList[index];

  if (!resume) return <p>Resume not found</p>;

  return (
    <div>
      <ResumeComponent resume={resumesList[index]} />
      <button onClick={() => navigate("/resumesList")}>Back to List</button>
    </div>
  );
}
