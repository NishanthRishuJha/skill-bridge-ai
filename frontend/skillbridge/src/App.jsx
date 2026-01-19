import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import "./pages/Register.css";
import Internships from "./pages/Internships";
import PostInternship from "./pages/PostInternship";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/internships" element={<Internships/>} />
        <Route path="/post-internship" element={<PostInternship/>} />
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/history" element={<MatchHistory/>}/> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;





