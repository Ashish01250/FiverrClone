import "./app.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";

import {
  QueryClient,
  QueryClientProvider,
    useQuery,
}from "@tanstack/react-query";

function App() {

  const queryClient = new QueryClient()


  const Layout = () => {
    return (
      <div className="app">
       <QueryClientProvider client={queryClient}>
        <Navbar /> 
        <Outlet /> 
        <Footer /> 
        </QueryClientProvider>
      </div>
    );
  };

 
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: <Layout />, // Layout is the wrapper
      children: [
        {
          path: "/", // Home page
          element: <Home />,
        },
        {
          path: "/gigs", // Gigs listing page
          element: <Gigs />,
        },
        {
          path: "/myGigs", // My Gigs page
          element: <MyGigs />,
        },
        {
          path: "/orders", // Orders page
          element: <Orders />,
        },
        {
          path: "/messages", // Messages page
          element: <Messages />,
        },
        {
          path: "/message/:id", // Individual message page
          element: <Message />,
        },
        {
          path: "/add", // Add a new gig page
          element: <Add />,
        },
        {
          path: "/gig/:id", // Individual gig page
          element: <Gig />,
        },
        {
          path: "/register", // Register page
          element: <Register />,
        },
        {
          path: "/login", // Login page
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />; // Provide the router to the app
}

export default App;
