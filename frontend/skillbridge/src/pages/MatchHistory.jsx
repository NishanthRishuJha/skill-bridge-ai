import { useEffect, useState } from "react";
import axios from "axios";

export default function MatchHistory(){

  const [list,setList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(()=>{
    axios.get("http://localhost:5000/api/ai/history",{
      headers:{Authorization:`Bearer ${token}`}
    }).then(res=>setList(res.data));
  },[]);

  return(
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Match History</h2>

      <div className="space-y-3">
        {list.map(item=>(
          <div className="p-4 bg-white shadow rounded">
            <p><b>Score:</b> {item.score}%</p>
            <p><b>Date:</b> {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
