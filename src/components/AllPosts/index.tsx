import Post from "./Post";
import { useEffect } from "react";
import PageNavigation from "./PageNavigation";
import Loader from "../Loader";
import { useBlogContext } from "../../context/blogContext";
import { useSearchParams } from "react-router-dom";
import { BlogDataPreview } from "../../types/types";

const AllPosts = () => {
  const {
    blogList,
    page,
    count,
    isLoading,
    pageAction,
    handlePageChange,
    queryPosts,
    getNextPosts,
    getPrevPosts,
    resetQueryResults,
  } = useBlogContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";
  const currentPath = window.location.pathname;
  useEffect(() => {
    if (!currentPath.startsWith("/blog/")) {
      if (search || category) {
        if (sessionStorage.getItem("params")) {
          const params = JSON.parse(sessionStorage.getItem("params") || "");
          if (params.search !== search || params.category !== category) {
            resetQueryResults();
            sessionStorage.setItem(
              "params",
              JSON.stringify({ search, category })
            );
          }
        } else {
          resetQueryResults();
          sessionStorage.setItem(
            "params",
            JSON.stringify({ search, category })
          );
        }
        queryPosts();
      } else {
        if (pageAction === "prev" || !pageAction) {
          getPrevPosts();
        } else {
          getNextPosts();
        }
      }
      sessionStorage.setItem("page", page.toString());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, page]);

  if (isLoading) return <Loader />;

  return (
    <>
      {blogList.length > 0 &&
        blogList.map((post: { _id: string }) => (
          <Post key={post._id} post={post as BlogDataPreview} />
        ))}
      {(search || category) && !blogList.length && (
        <p className="text-center text-2xl">No matching results</p>
      )}

      <PageNavigation
        handlePageChange={handlePageChange}
        page={page}
        count={count}
      />
    </>
  );
};

export default AllPosts;
