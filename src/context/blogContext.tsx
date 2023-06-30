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

/* number of posts per page */
export const paginate = 2;

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
  console.log("page", page);
  console.log("date", date);
  console.log("lastDate", lastDate);
  console.log("count", count);
  console.log("blogList", blogList);

  useEffect(() => {
    if (sessionStorage.getItem("params")) {
      const params = JSON.parse(sessionStorage.getItem("params") || "");
      if (
        (search || category) &&
        !(params.search === search && params.category === category)
      ) {
        // a new query with previous query
        resetQueryResults();
      }
    } else {
      // a new query with no previous query
      resetQueryResults();
    }
  }, [search, category]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
    if (sessionStorage.getItem("lastDates")) {
      setLastDate(JSON.parse(sessionStorage.getItem("lastDates") || ""));
      setPage(Number(sessionStorage.getItem("page")));
      setDate(lastDate[page - 1] || "");
    }
  }, []);
  useEffect(() => {
    if (currentPath === "/") {
      getCount().then((num) => setCount(Math.ceil(num / paginate)));
    }
  }, [currentPath]);

  useEffect(() => {
    sessionStorage.setItem("totalPage", count.toString());
  }, [count]);

  useEffect(() => {
    if (!currentPath.startsWith("/blog/")) {
      setIsLoading(true);
      // Home page fetching
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
        // Query for search or category - fetching when page != 0 or loading prev page
        if (page || pageAction === "prev") {
          getBlogResults(search, category, page).then((result) => {
            setBlogList(result.data);
            setCount(Math.ceil(result.count / paginate));
            setDate(result.data.slice(-1)[0].publishedAt);
            setIsLoading(false);
          });
        }
      }
      sessionStorage.setItem("page", page.toString());
      sessionStorage.setItem("lastDates", JSON.stringify(lastDate));
    } else {
      setPageAction("");
    }
  }, [page]);

  const resetQueryResults = () => {
    setIsLoading(true);
    setPage(0);
    setBlogList([]);
    setDate("");
    setLastDate([]);
    setPageAction("");
    sessionStorage.setItem("params", JSON.stringify({ search, category }));
    getBlogResults(search, category, 0).then((result) => {
      setBlogList(result.data);
      setCount(Math.ceil(result.count / paginate));
      setDate(result.data.slice(-1)[0].publishedAt);
      setIsLoading(false);
    });
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
