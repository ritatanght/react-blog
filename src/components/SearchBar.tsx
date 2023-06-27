import { Link } from "react-router-dom";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <aside className="flex justify-center ">
      <input
        className="indent-1 rounded text-primary-700 max-w-[85%]"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link
        className="p-1 flex"
        aria-label="search"
        to={`/blog?search=${encodeURIComponent(search)}`}
      >
        <BiSearch />
      </Link>
    </aside>
  );
};
