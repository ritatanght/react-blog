import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (search) {
      navigate(`/blog?search=${encodeURIComponent(search)}`);
    } else {
      setMessage("Please enter search words");
      setTimeout(() => setMessage(""), 5000);
    }
  };
  return (
    <aside className="relative">
      {message && (
        <div className="absolute -top-8 left-0 right-0 text-sm bg-red p-1 mb-1 rounded text-center text-white">
          {message}
        </div>
      )}
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
