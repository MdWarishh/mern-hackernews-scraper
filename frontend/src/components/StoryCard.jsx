import { useContext, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function StoryCard({ story, index }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(story.isBookmarked || false);

  const toggleBookmark = async () => {
    if (!token) return alert("Please login to bookmark stories");
    setLoading(true);
    try {
      await axios.post(
        `/stories/${story._id}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookmarked((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const domain = (() => {
    try {
      return new URL(story.url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  })();

  return (
    <div className="px-5 py-4 hover:bg-gray-50 transition-colors group border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-3">
        {/* Index */}
        {index && (
          <span className="text-sm text-gray-400 font-mono mt-0.5 w-5 text-right flex-shrink-0 select-none">
            {index}.
          </span>
        )}

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <a
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-gray-900 font-semibold leading-snug hover:text-blue-600 transition-colors"
            >
              {story.title}
            </a>

            <div className="flex items-center gap-2 flex-shrink-0">
              {domain && (
                <span className="text-xs text-gray-400 hidden sm:block whitespace-nowrap">
                  {domain}
                </span>
              )}
              {/* Bookmark */}
              <button
                onClick={toggleBookmark}
                disabled={loading}
                title={bookmarked ? "Remove bookmark" : "Bookmark"}
                className={`text-base transition-all opacity-0 group-hover:opacity-100 ${
                  bookmarked
                    ? "opacity-100 text-amber-500"
                    : "text-gray-300 hover:text-amber-400"
                }`}
              >
                {bookmarked ? "★" : "☆"}
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-400">
            <span className="text-amber-500 font-bold">▲</span>
            <span className="font-semibold text-gray-600">{story.points}</span>
            <span className="text-gray-300">·</span>
            <span>by</span>
            <span className="font-medium text-gray-500">{story.author}</span>
            {story.postedAt && (
              <>
                <span className="text-gray-300">·</span>
                <span>{story.postedAt}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}