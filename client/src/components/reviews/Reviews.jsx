import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = parseInt(e.target[1].value, 10);
    mutation.mutate({ gigId, desc, star });
    e.target.reset(); // Reset form after submission
  };

  return (
    <div className="reviews">
      <h2>Customer Reviews</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <div className="add">
        <h3>Add a Review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <textarea placeholder="Write your opinion..." required />
          <select defaultValue="" required>
            <option value="" disabled>
              Rate the Gigs
            </option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
