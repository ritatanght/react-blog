import { createContext, useContext, useState, useEffect } from "react";
import { BlogContextType, BlogData } from "../types/types";
import {
  getBlogResults,
  getBlogs,
  getCategories,
  getCount,
  getPrevBlogs,
} from "../service/blogService";
import { useSearchParams } from "react-router-dom";

const BlogContext = createContext<BlogContextType>({} as any);
const paginated = 2;
export const BlogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogList, setBlogList] = useState<BlogData[]>([]);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState("");
  const [count, setCount] = useState(0);
  const [lastDate, setLastDate] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);
  const [pageAction, setPageAction] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";

  useEffect(() => {
    setPage(0);
    setCount(0);
    setBlogList([]);
    setDate("");
    setLastDate([]);
    setPageAction("");
  }, [search, category]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
    if (window.location.pathname === "/") {
      getCount().then((num) => setCount(Math.ceil(num / paginated)));
    }
    setIsLoading(true);
    getBlogs(date).then((result) => {
      setBlogList(result);
      setDate(result.slice(-1)[0].publishedAt);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (searchParams.toString() === "") {
      if (pageAction === "prev") {
        getPrevBlogs(date, page).then((result) => {
          setBlogList(result);
          setDate(result.slice(-1)[0].publishedAt);
        });
      } else {
        getBlogs(date).then((result) => {
          setBlogList(result);
          setDate(result.slice(-1)[0].publishedAt);
        });
      }
    } else {
      getBlogResults(search, category, page).then((result) => {
        setBlogList(result.data);
        setCount(Math.ceil(result.count / paginated));
      });
    }
    setIsLoading(false);
  }, [page, search, category]);

  const handlePageChange = (action: string) => {
    if (action === "next") {
      if (lastDate.length === page) {
        setLastDate((prevLastDate) => prevLastDate.concat([date]));
      }
      setPage((prevPage) => prevPage + 1);
      setPageAction("next");
    } else {
      if (page === 0) return;
      setDate(lastDate[page - 1]);
      setPage((prevPage) => prevPage - 1);
      setPageAction("prev");
    }
  };

  return (
    <BlogContext.Provider
      value={{
        categories,
        blogList,
        page,
        date,
        count,
        searchParams,
        isLoading,
        handlePageChange,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
