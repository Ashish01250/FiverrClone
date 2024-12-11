import React from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const popularSearches = [
    "Web Design",
    "WordPress",
    "Logo Design",
    "AI Services",
    "Mobile App"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      try {
        navigate(`/gigs?search=${encodeURIComponent(input.trim())}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePopularSearch = (term) => {
    setInput(term);
    navigate(`/gigs?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <form className="search" onSubmit={handleSubmit}>
            <div className="searchInput">
              <img src="./img/search.png" alt="search" />
              <input
                type="text"
                placeholder="Try building mobile app"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </form>
          <div className="popular">
            <span>Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="freelancer" />
        </div>
      </div>
    </div>
  );
}

export default Featured;