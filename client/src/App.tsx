import { Route, Routes, BrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostsList from "./pages/PostList";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/commons/Loader";

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded, isSignedIn } = useUser();
  return (
    <BrowserRouter>
      {!isLoaded && (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {isLoaded && (
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
            </Routes>
            <ToastContainer position="bottom-right" />
          </Layout>
        </QueryClientProvider>
      )}
    </BrowserRouter>
  );
};

export default App;
