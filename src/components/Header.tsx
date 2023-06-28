import { Link } from "react-router-dom";
import logo from "../assets/images/myori-logo.png";
const Header = () => {
  return (
    <header className="bg-white p-0.5 text-primary-500 sticky left-0 right-0 top-0 border-b-2 z-10">
      <nav className="w-11/12 flex justify-center mx-auto">
        <Link
          to="/"
          reloadDocument
          className="m-2 text-center flex justify-center items-center gap-1"
        >
          <img
            className="h-12 origin-top animate-[wiggle_5s_ease-in-out_infinite]"
            src={logo}
            alt="blog logo"
          />
          <h1 className="text-5xl logo">命璃結び</h1>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
