import client from "../sanity/client";
import { useState, useEffect } from "react";
import Post from "./Post";
import { BlogData } from "../types/types";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import PageNavigation from "./PageNavigation";

const paginated = 2;

const QueryList = () => {
  const [blogList, setBlogList] = useState<BlogData[]>([]);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState("");
  const [count, setCount] = useState(0);
  const [lastDate, setLastDate] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading } = useQuery({
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    queryKey: [
      "query",
      searchParams?.get("search"),
      searchParams?.get("category"),
      searchParams?.get("beforeDate"),
      searchParams?.get("afterDate"),
      page,
    ],
    queryFn: () =>
      getBlogResults(search, category, page).then((result) => {
        setBlogList(result.data);
        setCount(Math.ceil(result.count / paginated));
      }),
    keepPreviousData: true,
  });
  // single-time read
  //const params = Object.fromEntries([...searchParams]);
  //console.log("Mounted:", params);

  console.log(searchParams);

  useEffect(() => {
    setCount(0);
    setPage(0);
    setDate("");
    setLastDate([]);
  }, [searchParams]);

  //   useEffect(() => {

  //     const currentParams = Object.fromEntries([...searchParams]);
  //     // get new values on change
  //     console.log("useEffect:", currentParams);
  //     // update the search params programmatically
  //     setSearchParams({ sort: "name", order: "ascending" });
  //   }, [searchParams]);

  console.log(blogList);
  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";
  // const beforeDate = searchParams?.get("beforeDate") || "";
  // const afterDate = searchParams?.get("afterDate") || "";

  //   useEffect(() => {
  //     getBlogResults(search, category, beforeDate, afterDate).then((result) =>
  //       setBlogList(result)
  //     );
  //   }, [searchParams]);

  const handlePageChange = (action: string) => {
    if (action === "next") {
      if (lastDate.length === page) {
        setLastDate((prevLastDate) => prevLastDate.concat([date]));
      }
      setPage((prevPage) => prevPage + 1);
    } else {
      if (page === 0) return;
      setDate(lastDate[page - 1]);
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  console.log(count);
  return (
    <>
      <h1 className="text-3xl font-bold">Results: </h1>
      Search: {search} Category:{category}
      {/* Before Date:{beforeDate} 
      After Date: {afterDate} */}
      {blogList.map((blog) => (
        <Post key={blog._id} post={blog} />
      ))}
      <PageNavigation
        handlePageChange={handlePageChange}
        page={page}
        count={count}
      />
    </>
  );
};

export default QueryList;

async function getBlogResults(
  search: string = "",
  category: string = "",
  // beforeDate: string = "",
  // afterDate: string = "",
  page: number
) {
  /*
  let query = `
 *[_type == 'post' ${
   date && "&&  publishedAt < " + date
 }]| order(publishedAt desc) [0...5]{
  title,
    _id, 
    slug,
    "body":pt::text(body),
    publishedAt,
    mainImage{  
    asset -> {
          _id,
          url
        },
        alt},
  "categories": categories[]->title}`;
  */
  let query = "*[_type == 'post' ";
  if (search) {
    query += "&& title match '" + decodeURIComponent(search) + "'";
  }
  if (category) {
    query += `&& '${category}' in categories[]->title`;
  }
  // if (beforeDate) {
  //   query += "&& publishedAt < " + beforeDate;
  // }
  // if (afterDate) {
  //   query += "&& publishedAt > " + afterDate;
  // }
  const count = await client.fetch(`count(${query}])`);
  query += `]| order(publishedAt desc) [${page * paginated}...${
    page * paginated + paginated
  }]{
  title,
    _id, 
    slug,
    "body":pt::text(body),
    publishedAt,
    mainImage{  
    asset -> {
          _id,
          url
        },
        alt},
  "categories": categories[]->title}`;
  const data = await client.fetch(query);
  if (!data) {
    throw new Error("Failed to blog list");
  }
  return { data, count };
}
