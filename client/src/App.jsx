import "./app.scss";
import "./index.css";
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
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import GigProtectionRoute from "./components/GigProtectionRoute/GigProtectionRoute";

function App() {
  const queryClient = new QueryClient();

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
          element: (
            <ProtectedRoutes>
              <Gigs />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/myGigs", // My Gigs page
          element: (
            <ProtectedRoutes>
              <GigProtectionRoute>
                <MyGigs />
              </GigProtectionRoute>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/orders", // Orders page
          element: (
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/messages", // Messages page
          element: (
            <ProtectedRoutes>
              <Messages />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/message/:id", // Individual message page
          element: (
            <ProtectedRoutes>
              <Message />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/add", // Add a new gig page
          element: (
            <ProtectedRoutes>
              <GigProtectionRoute>
                <Add />
              </GigProtectionRoute>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/gig/:id", // Individual gig page
          element: (
            <ProtectedRoutes>
              <Gig />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/register", // Register page
          element: <Register />,
        },
        {
          path: "/login", // Login page
          element: <Login />,
        },

        {
          path: "/pay/:id", // Pay page
          element: <Pay />,
        },
        {
          path: "/success", // Success page
          element: <Success />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />; // Provide the router to the app
}

export default App;
