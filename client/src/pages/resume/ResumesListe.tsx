import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
//import { getAllResumes } from "../../services/resumeService";
export default function ResumesList() {
  const navigate = useNavigate();
  //const resumesList = getAllResumes();

  const getAllResumes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/resumes/resumes", {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching resumes:", error);
    }
  };

  const {
    data: resumesList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: getAllResumes,
  });

  const viewDetail = (id: string) => {
    navigate(`/resume/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching resumes.</p>;

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumesList.map((resume: any, index: number) => (
              <tr key={index}>
                <td></td>
                <td>{resume.name}</td>
                <td>{resume.email}</td>
                <td>{resume.phone}</td>
                <td>{resume.jobTitle}</td>
                <td>
                  <button onClick={() => viewDetail(resume._id)}>Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/home")}>Back Home</button>
    </div>
  );
}
