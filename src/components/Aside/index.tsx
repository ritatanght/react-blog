import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { PiTelegramLogo } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { useBlogContext } from "../../context/blogContext";

const Aside = () => {
  const [isOpen, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { categories } = useBlogContext();
  useEffect(() => {
    const scrollButtonVisibility = () =>
      window.scrollY > 300 ? setShowButton(true) : setShowButton(false);
    window.addEventListener("scroll", scrollButtonVisibility);
    return () => window.removeEventListener("scroll", scrollButtonVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div
        className={`max-w-xs transition ease-in-out duration-500 fixed top-16 bottom-0 right-0 z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-primary-400 text-secondary-100 rounded p-2 col-span-1 lg:static lg:transform-none lg:max-w-full`}
      >
        <button
          className="transition ease-in-out duration-400 absolute p-1 right-full rounded-l-md flex items-center text-3xl bg-primary-400 hover:bg-primary-500 lg:hidden"
          onClick={() => setOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <HiOutlineMenuAlt3 />
        </button>
        <aside className="sidebar-section">
          <h3 className="sidebar-heading">About Me</h3>
          <p>
            Greetings! I'm Rita, a web developer, I'm delighted to welcome you
            here. On this blog, I'm excited to share my knowledge, insights, and
            valuable tips with you.
          </p>
        </aside>
        <SearchBar />
        <aside className="sidebar-section">
          <h3 className="sidebar-heading">Categories</h3>
          {categories.length === 0 ? (
            "..."
          ) : (
            <ul className="flex flex-wrap gap-2 justify-center">
              {categories.map(({ title }: any) => (
                <li
                  key={title}
                  className="transition ease-in-out duration-400 p-1 bg-primary-100 text-primary-900 rounded hover:bg-primary-700 hover:text-white"
                >
                  <Link to={`/blog?category=${title}`}>{title}</Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
        <aside className="text-center flex items-center gap-1 justify-center">
          <h3 className="inline-block hand-font font-bold uppercase text-2xl">
            Find Me
          </h3>
          <Link
            aria-label="Telegram"
            to="https://t.me/rtkitsune"
            target="_blank"
            className="text-2xl p-1 std-transition rounded-full hover:bg-primary-700 hover:text-primary-100"
          >
            <PiTelegramLogo />
          </Link>
        </aside>
      </div>
      {showButton && (
        <button
          onClick={scrollToTop}
          aria-label="Move to Top"
          className="std-transition text-4xl fixed right-5 bottom-5 text-primary-400 bg-white rounded-md hover:bg-primary-700 hover:text-primary-200"
        >
          <BsArrowUpSquareFill />
        </button>
      )}
    </>
  );
};

export default Aside;
