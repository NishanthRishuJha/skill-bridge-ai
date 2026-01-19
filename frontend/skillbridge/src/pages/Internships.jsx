import { useEffect, useState } from "react";
import axios from "axios";
import "./Internship.css";

export default function Internships() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/internships`)
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const token = localStorage.getItem("token");

  const checkMatch = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/match`,
        { internshipId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Match Score: ${res.data.score}\n\nReasons:\n${res.data.reasons.join(
          "\n"
        )}`
      );
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="internships-container">
      <h2>Available Internships</h2>

      <div className="internship-list">
        {list.map((job) => (
          <div className="internship-card" key={job._id}>
            <h3>{job.title}</h3>
            <p>
              <b>Company:</b> {job.company}
            </p>
            <p>{job.description}</p>
            <p>
              <b>Skills:</b> {job.skillsRequired?.join(", ")}
            </p>

            <button onClick={() => checkMatch(job._id)}>
              Check Match Score
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
