import { createContext, useContext, useState, useEffect } from "react";
import { BlogContextType, BlogData } from "../types/types";
import {
  getBlogResults,
  getBlogs,
  getCount,
  getPrevBlogs,
} from "../service/blogService";
import { useSearchParams } from "react-router-dom";

const BlogContext = createContext<BlogContextType>({} as any);

/* number of posts per page */
export const paginate = 3;

export const BlogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogList, setBlogList] = useState<BlogData[]>([]);
  const [page, setPage] = useState(Number(sessionStorage.getItem("page")) || 0);
  const [lastDate, setLastDate] = useState<string[]>(
    sessionStorage.getItem("lastDates")
      ? JSON.parse(sessionStorage.getItem("lastDates") || "")
      : []
  );
  const [date, setDate] = useState(lastDate[page] || "");
  const [count, setCount] = useState(
    Number(sessionStorage.getItem("totalPage")) || 0
  );
  const [pageAction, setPageAction] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";

  useEffect(() => {
    sessionStorage.setItem("totalPage", count.toString());
  }, [count]);
  useEffect(() => {
    sessionStorage.setItem("lastDates", JSON.stringify(lastDate));
  }, [lastDate]);

  const queryPosts = () => {
    setIsLoading(true);
    getBlogResults(search, category, page).then((result) => {
      setBlogList(result.data);
      if (result.count) {
        setCount(Math.ceil(result.count / paginate));
      }
      if (result.data.length) {
        setDate(result.data.slice(-1)[0].publishedAt);
      }
      setIsLoading(false);
    });
    setPageAction("");
  };

  const getNextPosts = async () => {
    setIsLoading(true);
    if (page === 0 && count === 0) {
      getCount().then((num) => setCount(Math.ceil(num / paginate)));
    }
    getBlogs(page === 0 ? "" : date).then((result) => {
      setBlogList(result);
      if (result.length) {
        setDate(result.slice(-1)[0].publishedAt);
      }
      setIsLoading(false);
    });
    setPageAction("");
  };

  const getPrevPosts = () => {
    setIsLoading(true);
    getPrevBlogs(date, page).then((result) => {
      setBlogList(result);
      if (result.length) {
        setDate(result.slice(-1)[0].publishedAt);
      }
      setIsLoading(false);
    });
    setPageAction("");
  };

  const resetQueryResults = () => {
    setPage(0);
    setBlogList([]);
    setCount(0);
    setDate("");
    setLastDate([]);
    setPageAction("");
    sessionStorage.clear();
    if (search || category) {
      sessionStorage.setItem("params", JSON.stringify({ search, category }));
    } else {
      sessionStorage.removeItem("params");
    }

    return;
  };

  const handlePageChange = (action: string) => {
    if (action === "next") {
      if (page === count) return;
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
        blogList,
        page,
        date,
        count,
        pageAction,
        isLoading,
        searchParams,
        handlePageChange,
        getPrevPosts,
        getNextPosts,
        queryPosts,
        resetQueryResults,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
