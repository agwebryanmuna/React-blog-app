import { Route, Routes, BrowserRouter } from "react-router";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostsList from "./pages/PostList";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
