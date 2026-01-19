// import { Link } from "react-router-dom";
// import "./Navbar.css";
// export default function Navbar() {
//   return (
//     <nav style={{padding:"10px", background:"#222", color:"white", display:"flex", alignItems:"center"}}>
//       <Link to="/" style={{marginRight:10}}>Home</Link>
//       <Link to="/login" style={{marginRight:10}}>Login</Link>
//       <Link to="/register"style={{marginRight:10}}>Register</Link>
//       <Link to="/internships" style={{marginRight:10}}>Internships</Link>
//       <Link to="/post-internship" style={{marginRight:10}}>Post Internship</Link>
//       <Link to="/profile">Profile</Link>

//     </nav>
//   );
// }

import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>

      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>

      <NavLink to="/register" className="nav-link">
        Register
      </NavLink>

      <NavLink to="/internships" className="nav-link">
        Internships
      </NavLink>

      <NavLink to="/post-internship" className="nav-link">
        Post Internship
      </NavLink>

      <NavLink to="/profile" className="nav-link">
        Profile
      </NavLink>
    </nav>
  );
}
