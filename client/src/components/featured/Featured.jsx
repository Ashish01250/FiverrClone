import React from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = React.useState(""); // State to store the input
  const navigate = useNavigate();

  // This function handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    if (input.trim()) {
      // If the input is not empty
      navigate(`/gigs?search=${input}`); // Navigate to /gigs with the search query
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder="Try building mobile app"
                value={input}
                onChange={(e) => setInput(e.target.value)} // Update input state
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
