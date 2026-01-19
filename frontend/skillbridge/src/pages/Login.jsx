import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(){

  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");

    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email, password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    }
    catch(err){
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return(
<div className="min-h-screen bg-animated flex items-center justify-center px-5">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">

        {/* Left — Marketing Section */}
        <div className="hidden md:block">
          <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Welcome Back 👋  
            <span className="block text-indigo-600">
              Login & Continue Your Internship Journey
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Access AI-powered match scores, cover letters, and your dashboard — all in one place.
          </p>

          <div className="mt-8 bg-white/60 backdrop-blur-xl shadow-lg rounded-2xl p-5 animate-bounce border">
            ⭐ Students love our AI-powered matching system!
          </div>
        </div>


        {/* Right — Login Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border">

          <h3 className="text-3xl font-bold text-center text-gray-800">
            Login to your account
          </h3>

          <p className="text-center text-gray-500 mt-2">
            Please enter your details to continue
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded mt-4 text-center">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={submit}>

            <div>
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-1 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="you@example.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="w-full p-3 mt-1 rounded-lg border focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="********"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-5">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 font-semibold hover:underline">
              Register here
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}
