import { Resume } from "../models";
import { useNavigate } from "react-router-dom";

interface Props {
  resumesList: Resume[];
}

export default function ResumesList({ resumesList }: Props) {
  const navigate = useNavigate();

  const ViewDetail = (index) => {
    navigate(`/resume/${index}`);
  };

  return (
    <div>
      <h1>All Resumes</h1>
      {resumesList.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>resumes</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {resumesList.map((resume, index) => (
              <tr key={index} onClick={() => ViewDetail(index)}>
                <td>resume {index + 1}</td>
                <td>{resume.name}</td>
                <td>{resume.email}</td>
                <td>{resume.phone}</td>
                <td>{resume.jobTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
