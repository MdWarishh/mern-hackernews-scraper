import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchStories = async (p = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`/stories?page=${p}&limit=${limit}`);
      setStories(res.data.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleScrape = async () => {
    setScraping(true);
    try {
      await axios.post("/scrape");
      await fetchStories(1);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
    setScraping(false);
  };

  useEffect(() => {
    fetchStories(page);
  }, [page, token]);

  return (
    <div style={{ minHeight: "100vh", background: "#f0ede8" }}>
      <Navbar />

      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1.25rem" }}>

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: "1.25rem"
        }}>
          <div>
            <h1 style={{
              fontSize: "19px", fontWeight: "700",
              color: "#1a1a1a", margin: 0, letterSpacing: "-0.4px"
            }}>Top Stories</h1>
            <p style={{ fontSize: "12px", color: "#9a9791", margin: "2px 0 0", fontWeight: "400" }}>
              Latest from Hacker News
            </p>
          </div>

          <button
            onClick={handleScrape}
            disabled={scraping}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              fontSize: "12px", fontWeight: "500",
              color: scraping ? "#a09d96" : "#5a5752",
              background: "white",
              border: "1px solid #e0ddd6",
              padding: "7px 15px",
              borderRadius: "7px",
              cursor: scraping ? "not-allowed" : "pointer",
              opacity: scraping ? 0.7 : 1,
              transition: "all 0.15s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={e => { if (!scraping) e.currentTarget.style.background = "#f8f7f4"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
          >
            <span style={{
              display: "inline-block",
              animation: scraping ? "spin 0.8s linear infinite" : "none",
              fontSize: "15px"
            }}>↻</span>
            {scraping ? "Fetching..." : "Refresh"}
          </button>
        </div>

        {/* Stories list */}
        {loading ? (
          <div style={{
            background: "white",
            borderRadius: "12px",
            border: "1px solid #e8e6e0",
            overflow: "hidden"
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", padding: "14px 20px",
                borderBottom: i < 5 ? "1px solid #f0ede8" : "none",
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
        ) : stories.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "5rem 2rem",
            background: "white", borderRadius: "12px",
            border: "1px solid #e8e6e0"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📰</div>
            <p style={{ fontSize: "14px", color: "#5a5752", marginBottom: "4px", fontWeight: "500" }}>
              No stories yet
            </p>
            <p style={{ fontSize: "13px", color: "#a09d96", marginBottom: "20px" }}>
              Fetch the latest from Hacker News
            </p>
            <button
              onClick={handleScrape}
              style={{
                fontSize: "13px", fontWeight: "500",
                background: "#1a1a1a", color: "white",
                border: "none", padding: "8px 20px",
                borderRadius: "7px", cursor: "pointer",
                transition: "background 0.15s"
              }}
              onMouseEnter={e => e.target.style.background = "#333"}
              onMouseLeave={e => e.target.style.background = "#1a1a1a"}
            >
              Scrape from Hacker News
            </button>
          </div>
        ) : (
          <div style={{
            background: "white",
            borderRadius: "12px",
            border: "1px solid #e8e6e0",
            overflow: "hidden"
          }}>
            {stories.map((story, i) => (
              <div key={story._id} style={{
                borderBottom: i < stories.length - 1 ? "1px solid #f0ede8" : "none"
              }}>
                <StoryCard
                  story={story}
                  index={(page - 1) * limit + i + 1}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{
            display: "flex", justifyContent: "center",
            alignItems: "center", gap: "10px", marginTop: "1.5rem"
          }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                fontSize: "12px", fontWeight: "500",
                color: page === 1 ? "#c0bdb5" : "#5a5752",
                background: "white",
                border: "1px solid #e0ddd6",
                padding: "6px 14px", borderRadius: "6px",
                cursor: page === 1 ? "not-allowed" : "pointer",
                transition: "all 0.15s"
              }}
              onMouseEnter={e => { if (page !== 1) e.currentTarget.style.background = "#f8f7f4"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >← Prev</button>

            <span style={{
              fontSize: "12px", color: "#a09d96",
              fontVariantNumeric: "tabular-nums", minWidth: "80px", textAlign: "center"
            }}>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              style={{
                fontSize: "12px", fontWeight: "500",
                color: page >= totalPages ? "#c0bdb5" : "#5a5752",
                background: "white",
                border: "1px solid #e0ddd6",
                padding: "6px 14px", borderRadius: "6px",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                transition: "all 0.15s"
              }}
              onMouseEnter={e => { if (page < totalPages) e.currentTarget.style.background = "#f8f7f4"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; }}
            >Next →</button>
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}