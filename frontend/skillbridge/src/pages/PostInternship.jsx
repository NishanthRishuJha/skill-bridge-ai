import { useState } from "react";
import axios from "axios";
import "./PostInternship.css";

export default function PostInternship(){

  const [job, setJob] = useState({
    title:"",
    company:"",
    description:"",
    skillsRequired:"",
    salary:""
  });

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    try{
      await axios.post(
        "http://localhost:5000/api/internships",
        {
          ...job,
          skillsRequired: job.skillsRequired.split(",")
        },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      alert("Internship Posted 🎉");
    }
    catch(err){
      console.log(err);
      alert("Posting failed — maybe token missing?");
    }
  };

  return(
    <div className="post-container">
      <div className="post-card">

        <h2>Post Internship</h2>

        <form onSubmit={submit}>

          <input placeholder="Title"
           onChange={e=>setJob({...job,title:e.target.value})}/>

          <input placeholder="Company"
           onChange={e=>setJob({...job,company:e.target.value})}/>

          <textarea placeholder="Description"
           onChange={e=>setJob({...job,description:e.target.value})}/>

          <input placeholder="Skills (comma separated)"
           onChange={e=>setJob({...job,skillsRequired:e.target.value})}/>

          <input placeholder="Salary (optional)"
           onChange={e=>setJob({...job,salary:e.target.value})}/>

          <button>Post Internship</button>

        </form>

      </div>
    </div>
  );
}
