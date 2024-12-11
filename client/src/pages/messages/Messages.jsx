import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Parse logged-in user from local storage
  const queryClient = useQueryClient();

  // Fetch conversations
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        console.log("Fetched Conversations: ", res.data);
        return res.data; // Ensure the response matches expected structure
      }),
  });

  // Mutation to mark a conversation as read
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]); // Refresh conversations after marking as read
    },
  });

  // Mark conversation as read
  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "An error occurred while fetching conversations."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conversation) => (
                <tr
                  key={conversation.id}
                  className={
                    ((currentUser.isSeller && !conversation.readBySeller) ||
                      (!currentUser.isSeller && !conversation.readByBuyer)) &&
                    "active"
                  }
                >
                  <td>
                    {currentUser.isSeller
                      ? conversation.buyerId
                      : conversation.sellerId}
                  </td>
                  <td>
                    <Link to={`/message/${conversation.id}`} className="link">
                      {conversation?.lastMessage?.substring(0, 100) ||
                        "No message available"}
                      ...
                    </Link>
                  </td>
                  <td>
                    {conversation.updatedAt
                      ? moment(conversation.updatedAt).fromNow()
                      : "Unknown"}
                  </td>
                  <td>
                    {((currentUser.isSeller && !conversation.readBySeller) ||
                      (!currentUser.isSeller && !conversation.readByBuyer)) && (
                      <button onClick={() => handleRead(conversation.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
