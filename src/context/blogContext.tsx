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
export const paginate = 3;
export const BlogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogList, setBlogList] = useState<BlogData[]>([]);
  const [page, setPage] = useState(0);
  const [lastDate, setLastDate] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [count, setCount] = useState(
    Number(sessionStorage.getItem("totalPage")) || 0
  );
  const [categories, setCategories] = useState([]);
  const [pageAction, setPageAction] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";

  const currentPath = window.location.pathname;

  useEffect(() => {
    setPage(0);
    setBlogList([]);
    setDate("");
    setLastDate([]);
    setPageAction("");
  }, [search, category]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
    if (currentPath === "/") {
      getCount().then((num) => setCount(Math.ceil(num / paginate)));
    }
    if (sessionStorage.getItem("lastDates")) {
      setLastDate(JSON.parse(sessionStorage.getItem("lastDates") || ""));
      setPage(Number(sessionStorage.getItem("page")));
      setDate(lastDate[page - 1]);
    }
  }, [currentPath]);

  useEffect(() => {
    sessionStorage.setItem("totalPage", count.toString());
  }, [count]);

  useEffect(() => {
    if (!window.location.pathname.startsWith("/blog/")) {
      setIsLoading(true);
      if (!search && !category) {
        if (pageAction === "prev" || (!pageAction && lastDate.length)) {
          getPrevBlogs(date, page).then((result) => {
            setBlogList(result);
            setDate(result.slice(-1)[0].publishedAt);
            setIsLoading(false);
          });
        } else {
          getBlogs(date).then((result) => {
            setBlogList(result);
            setDate(result.slice(-1)[0].publishedAt);
            setIsLoading(false);
          });
        }
      } else {
        // Query for search or category
        getBlogResults(search, category, page).then((result) => {
          setBlogList(result.data);
          setCount(Math.ceil(result.count / paginate));
          setIsLoading(false);
        });
      }
      sessionStorage.setItem("page", page.toString());
      sessionStorage.setItem("lastDates", JSON.stringify(lastDate));
    } else {
      setPageAction("");
    }
  }, [page, search, category, currentPath]);

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
