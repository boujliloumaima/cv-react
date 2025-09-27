import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ResumeComponent from "../../components/ResumeComponent";
import "../../components/steps/steps.css";

export default function ResumeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchResumeById = async () => {
    const res = await fetch(`${apiUrl}/v1/resumes/${id}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch resume");
    return res.json();
  };

  const {
    data: resume,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["resume", id],
    queryFn: fetchResumeById,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !resume) return <p>Resume not found</p>;

  return (
    <div>
      <ResumeComponent resume={resume} />
      <button onClick={() => navigate("/resumes/all")}>Back to List</button>
    </div>
  );
}
