import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
    setLoading(false);
  };

  const inputStyle = (name) => ({
    width: "100%",
    border: `1.5px solid ${focused === name ? "#1a1a1a" : "#e0ddd6"}`,
    borderRadius: "7px",
    padding: "9px 12px",
    fontSize: "14px",
    color: "#1a1a1a",
    background: "#faf9f7",
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
    fontFamily: "inherit"
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f3ef",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem"
    }}>
      <div style={{ width: "100%", maxWidth: "360px" }}>

        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: "40px", height: "40px",
            background: "#ff6600",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: "18px", fontWeight: "700", color: "white"
          }}>Y</div>
          <h1 style={{
            fontSize: "20px", fontWeight: "600",
            color: "#1a1a1a", margin: "0 0 4px",
            letterSpacing: "-0.4px"
          }}>Welcome back</h1>
          <p style={{ fontSize: "13px", color: "#9a9791", margin: 0 }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "white",
          border: "1px solid #e8e6e0",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
        }}>
          {error && (
            <div style={{
              fontSize: "12px", color: "#c0392b",
              background: "#fdf2f2",
              border: "1px solid #f5c6c6",
              borderRadius: "6px",
              padding: "9px 12px",
              marginBottom: "16px",
              lineHeight: "1.4"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{
                display: "block",
                fontSize: "12px", fontWeight: "500",
                color: "#5a5752", marginBottom: "6px"
              }}>Email address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                style={inputStyle("email")}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                fontSize: "12px", fontWeight: "500",
                color: "#5a5752", marginBottom: "6px"
              }}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                style={inputStyle("password")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#555" : "#1a1a1a",
                color: "white",
                fontSize: "13px", fontWeight: "500",
                padding: "10px",
                borderRadius: "7px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                marginTop: "4px",
                letterSpacing: "0.1px",
                fontFamily: "inherit"
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = "#333"; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = "#1a1a1a"; }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#9a9791", marginTop: "16px" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1a1a1a", fontWeight: "500", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.textDecoration = "underline"}
            onMouseLeave={e => e.target.style.textDecoration = "none"}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}