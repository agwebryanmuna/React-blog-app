import { Route, Routes, BrowserRouter } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostsList from "./pages/PostList";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:slug" element={<Post />} />
            <Route path="/write" element={<Write />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
