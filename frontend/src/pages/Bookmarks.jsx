import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { AuthContext } from "../context/AuthContext";

export default function Bookmarks() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("/stories/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarks(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchBookmarks();
  }, [token, navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ef" }}>
      <Navbar />

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.25rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "1.25rem" }}>
          <h1 style={{
            fontSize: "18px", fontWeight: "600",
            color: "#1a1a1a", margin: 0, letterSpacing: "-0.3px"
          }}>Bookmarks</h1>
          <p style={{ fontSize: "12px", color: "#9a9791", margin: "2px 0 0" }}>
            Stories you've saved
          </p>
        </div>

        {loading ? (
          <div style={{
            background: "white",
            borderRadius: "10px",
            border: "1px solid #e8e6e0",
            overflow: "hidden"
          }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", padding: "14px 20px",
                borderBottom: i < 3 ? "1px solid #f0ede8" : "none",
                alignItems: "center"
              }}>
                <div style={{ width: "22px", height: "11px", background: "#f0ede8", borderRadius: "3px" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: "13px", background: "#f0ede8", borderRadius: "3px", width: "65%", marginBottom: "8px" }} />
                  <div style={{ height: "10px", background: "#f5f3ef", borderRadius: "3px", width: "30%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : bookmarks.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "5rem 2rem",
            background: "white", borderRadius: "10px",
            border: "1px solid #e8e6e0"
          }}>
            <div style={{
              fontSize: "32px", marginBottom: "12px",
              color: "#d9d6cf"
            }}>☆</div>
            <p style={{ fontSize: "14px", fontWeight: "500", color: "#5a5752", marginBottom: "4px" }}>
              No bookmarks yet
            </p>
            <p style={{ fontSize: "13px", color: "#a09d96", marginBottom: "20px" }}>
              Star any story to save it here
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                fontSize: "13px", fontWeight: "500",
                background: "white", color: "#1a1a1a",
                border: "1px solid #e0ddd6",
                padding: "7px 18px", borderRadius: "6px",
                cursor: "pointer", transition: "all 0.15s"
              }}
              onMouseEnter={e => e.target.style.background = "#f8f7f4"}
              onMouseLeave={e => e.target.style.background = "white"}
            >
              Browse stories
            </button>
          </div>
        ) : (
          <>
            {/* Count badge */}
            <div style={{ marginBottom: "10px" }}>
              <span style={{
                fontSize: "11px", fontWeight: "500",
                background: "#ff6600", color: "white",
                padding: "2px 8px", borderRadius: "20px"
              }}>
                {bookmarks.length} saved
              </span>
            </div>
            <div style={{
              background: "white",
              borderRadius: "10px",
              border: "1px solid #e8e6e0",
              overflow: "hidden"
            }}>
              {bookmarks.map((story, i) => (
                <div key={story._id} style={{
                  borderBottom: i < bookmarks.length - 1 ? "1px solid #f0ede8" : "none"
                }}>
                  <StoryCard
                    story={{ ...story, isBookmarked: true }}
                    index={i + 1}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}