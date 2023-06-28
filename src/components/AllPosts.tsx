//import { data } from "../results";
import Post from "./Post";
import PageNavigation from "./PageNavigation";
import { BsArrowUpSquareFill, BsArrowUpSquare } from "react-icons/bs";
import { useBlogContext } from "../context/blogContext";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const AllPosts = () => {
  const [showButton, setShowButton] = useState(false);
  const { blogList, page, count, handlePageChange, isLoading } =
    useBlogContext();

  useEffect(() => {
    const scrollButtonVisibility = () =>
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    window.addEventListener("scroll", scrollButtonVisibility);
    return () => window.removeEventListener("scroll", scrollButtonVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {blogList.length > 0 &&
        blogList.map((post: { _id: string }) => (
          <Post key={post._id} post={post} />
        ))}
      {blogList.length === 0 && !isLoading && (
        <p className="text-center text-2xl">No matching results</p>
      )}

      <PageNavigation
        handlePageChange={handlePageChange}
        page={page}
        count={count}
      />
      {showButton && (
        // eslint-disable-next-line react/jsx-no-undef
        <button
          onClick={scrollToTop}
          className="std-transition text-4xl fixed right-5 bottom-5 text-primary-300 bg-primary-100 rounded-md hover:bg-primary-600 hover:text-primary-100"
        >
          <BsArrowUpSquareFill />
        </button>
      )}
    </>
  );
};

export default AllPosts;
