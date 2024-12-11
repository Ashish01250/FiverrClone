import React from "react";
import "./Review.scss";

const Review = ({ review }) => {
  return (
    <div className="review">
      <div className="user">
        <img
          className="pp"
          src={review?.img || "/img/noavatar.jpg"} 
          alt="Profile Picture"
        />
        <div className="info">
          <span>{review?.username}</span>
          <div className="country">
            <span>{review?.country}</span>
          </div>
        </div>
      </div>
      <div className="stars">
        {Array(review?.star || 0)
          .fill()
          .map((_, i) => (
            <img src="/img/star.png" alt="Star" key={i} />
          ))}
        <span>{review?.star}</span>
      </div>
      <p>{review?.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <button>
          <img src="/img/like.png" alt="Like" /> Yes
        </button>
        <button>
          <img src="/img/dislike.png" alt="Dislike" /> No
        </button>
      </div>
    </div>
  );
};

export default Review;
