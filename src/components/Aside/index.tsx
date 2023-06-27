import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar";
import { PiBooks } from "react-icons/pi";
import { Link } from "react-router-dom";
import client from "../../sanity/client";
import { useQuery } from "@tanstack/react-query";

const Aside = () => {
  const [isOpen, setOpen] = useState(false);
  const [categories, setCategories] = useState<{ title: string }[]>([
    { title: "Food" },
    { title: "Coding" },
    { title: "Recipe" },
  ]);
  const { isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories().then((result) => setCategories(result)),
    keepPreviousData: true,
  });

  return (
    <div
      className={`max-w-xs transition ease-in-out duration-500 fixed top-20 bottom-0 right-0 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } bg-primary-500 text-white rounded p-2 col-span-1 lg:static lg:transform-none lg:max-w-full`}
    >
      <button
        className="transition ease-in-out duration-400 absolute p-1 right-full rounded-l-md flex items-center text-3xl bg-primary-500 hover:bg-primary-100 lg:hidden"
        onClick={() => setOpen(!isOpen)}
      >
        <PiBooks />
      </button>
      <aside className="sidebar-section">
        <h3 className="sidebar-heading w-5/12">I&apos;m</h3>
        <p>Hello~我是命璃，我會在這裡將主人的想法和日常的生活事跟大家分享。</p>
      </aside>
      <SearchBar />
      <aside className="sidebar-section">
        <h3 className="sidebar-heading w-8/12">Categories</h3>
        {isLoading ? (
          "..."
        ) : (
          <ul className="flex flex-wrap gap-2">
            {categories.map(({ title }: any) => (
              <li
                key={title}
                className="transition ease-in-out duration-400 p-1 bg-primary-600 rounded hover:bg-primary-400"
              >
                <Link to={`/blog?category=${title}`}>{title}</Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
};

export default Aside;

async function getCategories() {
  const data = await client.fetch(`*[_type == 'category']{
 title
 }`);
  return data;
}
