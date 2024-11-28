import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import React from "react";
import "./Review.scss";
const Review = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });
  console.log("data", data);
  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data?.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data?.username}</span>
            <div className="country">
              <span>{data?.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(data?.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{data?.star}</span>
      </div>
      <p>{data?.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
