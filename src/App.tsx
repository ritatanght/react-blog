import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./components/SinglePost";
import PostList from "./components/AllPosts";
import QueryList from "./components/QueryList";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PostList />} path="/" />
          <Route path="blog" element={<QueryList />} />
          <Route path="blog/:slug" element={<SinglePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
