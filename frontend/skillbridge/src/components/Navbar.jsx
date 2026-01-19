import { Link } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <nav style={{padding:"10px", background:"#222", color:"white"}}>
      <Link to="/" style={{marginRight:10}}>Home</Link>
      <Link to="/login" style={{marginRight:10}}>Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/internships" style={{marginRight:10}}>Internships</Link>
      <Link to="/post-internship" style={{marginRight:10}}>Post Internship</Link>
      <Link to="/profile">Profile</Link>

    </nav>
  );
}
