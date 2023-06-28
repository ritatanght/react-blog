import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      navigate(`/blog?search=${encodeURIComponent(search)}`);
    }
  };
  return (
    <aside>
      <form
        className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="indent-1 rounded text-primary-700 max-w-[85%]"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-1 inline-flex" aria-label="search">
          <BiSearch />
        </button>
      </form>
    </aside>
  );
};
