import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: "#ffffff",
      borderBottom: "1px solid #e8e6e0",
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
    }}>
      <div style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "0 1.25rem",
        display: "flex",
        alignItems: "center",
        height: "56px",
        gap: "1.5rem"
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div style={{
            width: "30px", height: "30px",
            background: "#ff6600",
            borderRadius: "7px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "700", fontSize: "15px", color: "white",
            letterSpacing: "-0.5px"
          }}>Y</div>
          <span style={{ fontWeight: "600", fontSize: "14px", color: "#1a1a1a", letterSpacing: "-0.2px" }}>
            Hacker News
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
          <Link to="/" style={{
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "500",
            padding: "5px 11px",
            borderRadius: "7px",
            color: isActive("/") ? "#1a1a1a" : "#6b6b6b",
            background: isActive("/") ? "#f3f2ee" : "transparent",
            transition: "all 0.15s"
          }}
            onMouseEnter={e => { if (!isActive("/")) e.currentTarget.style.background = "#f8f7f4"; }}
            onMouseLeave={e => { if (!isActive("/")) e.currentTarget.style.background = "transparent"; }}
          >Home</Link>

          {/* Bookmarks always visible, but only works when logged in */}
          <Link to="/bookmarks" style={{
            textDecoration: "none",
            fontSize: "13px",
            fontWeight: "500",
            padding: "5px 11px",
            borderRadius: "7px",
            color: isActive("/bookmarks") ? "#1a1a1a" : "#6b6b6b",
            background: isActive("/bookmarks") ? "#f3f2ee" : "transparent",
            transition: "all 0.15s"
          }}
            onMouseEnter={e => { if (!isActive("/bookmarks")) e.currentTarget.style.background = "#f8f7f4"; }}
            onMouseLeave={e => { if (!isActive("/bookmarks")) e.currentTarget.style.background = "transparent"; }}
          >Bookmarks</Link>
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {token ? (
            <button
              onClick={handleLogout}
              style={{
                fontSize: "13px", fontWeight: "500",
                color: "#6b6b6b", border: "1px solid #e0ddd6",
                background: "white", padding: "5px 14px",
                borderRadius: "7px", cursor: "pointer",
                transition: "all 0.15s"
              }}
              onMouseEnter={e => { e.target.style.background = "#f8f7f4"; e.target.style.color = "#1a1a1a"; }}
              onMouseLeave={e => { e.target.style.background = "white"; e.target.style.color = "#6b6b6b"; }}
            >Logout</button>
          ) : (
            <>
              <Link to="/login" style={{
                textDecoration: "none", fontSize: "13px", fontWeight: "500",
                color: "#6b6b6b", padding: "5px 12px", borderRadius: "7px",
                border: "1px solid transparent", transition: "all 0.15s",
                display: "inline-block"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#f3f2ee"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >Login</Link>
              <Link to="/register" style={{
                textDecoration: "none", fontSize: "13px", fontWeight: "500",
                color: "white", background: "#1a1a1a",
                padding: "5px 15px", borderRadius: "7px",
                transition: "all 0.15s", display: "inline-block"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#333"}
                onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}
              >Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}