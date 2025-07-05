import { Route, Routes, BrowserRouter, Navigate } from "react-router";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import NotFound from "./pages/NotFound";

const Home = React.lazy(() => import("./pages/Home"));
const PostsList = React.lazy(() => import("./pages/PostList"));
const Post = React.lazy(() => import("./pages/Post"));
const Write = React.lazy(() => import("./pages/Write"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));

const queryClient = new QueryClient();

const App = () => {
  const { isSignedIn } = useUser();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:slug" element={<Post />} />
            <Route
              path="/write"
              element={isSignedIn ? <Write /> : <Navigate to={"/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="bottom-right" />
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
