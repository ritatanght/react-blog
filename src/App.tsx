import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./components/SinglePost";
import AllPosts from "./components/AllPosts";
import QueryList from "./components/QueryList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<AllPosts />} path="/" />
          <Route path="blog" element={<QueryList />} />
          <Route path="blog/:slug" element={<SinglePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
