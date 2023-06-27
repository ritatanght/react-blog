import { useState, useEffect } from "react";
import { data } from "../results";
import Post from "./Post";
import client from "../sanity/client";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageNavigation from "./PageNavigation";

const paginated = 2;

const AllPosts = () => {
  const [page, setPage] = useState(0);
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [lastDate, setLastDate] = useState<string[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["all", page],
    queryFn: () => {
      if (count === 0) {
        getCount().then((num) => setCount(Math.ceil(num / paginated)));
      }
      if (page < lastDate.length) {
        getPrevBlogs(date, page).then((result) => {
          setList(result);
          setDate(result.slice(-1)[0].publishedAt);
        });
      } else {
        getBlogs(date).then((result) => {
          setList(result);
          setDate(result.slice(-1)[0].publishedAt);
        });
      }
      return true;
    },
    keepPreviousData: true,
  });
  // const result = data;
  //useEffect(() => {}, []);

  //  const firstBlogDate = result.slice(-1)[0].publishedAt;

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

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {list.map((post: { _id: string }) => (
        <Post key={post._id} post={post} />
      ))}
      <PageNavigation
        handlePageChange={handlePageChange}
        page={page}
        count={count}
      />
    </>
  );
};
async function getCount() {
  const count = await client.fetch('count(*[_type == "post"])');
  return count;
}
async function getBlogs(date: string = "") {
  const query = `
 *[_type == 'post' ${
   date && "&& publishedAt < '" + date + "'"
 }]| order(publishedAt desc)[0...2]{
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
  return data;
}

async function getPrevBlogs(date: string = "", page: number) {
  const query = `
 *[_type == 'post' ${
   date && "&& publishedAt >= '" + date + "'"
 }]| order(publishedAt desc)[${page * paginated}...${
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
  return data;
}

export default AllPosts;
