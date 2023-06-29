import Post from "./Post";
import PageNavigation from "./PageNavigation";
import Loader from "../Loader";
import { useBlogContext } from "../../context/blogContext";

const AllPosts = () => {
  const { blogList, page, count, handlePageChange, isLoading, searchParams } =
    useBlogContext();
  const search = searchParams?.get("search") || "";

  if (isLoading) return <Loader />;

  return (
    <>
      {blogList.length > 0 &&
        blogList.map((post: { _id: string }) => (
          <Post key={post._id} post={post} />
        ))}
      {search && blogList.length === 0 && (
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
