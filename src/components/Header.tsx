import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
const Header = () => {
  return (
    <header className="bg-white p-0.5 text-primary-700 sticky left-0 right-0 top-0 border-b-2 z-20">
      <nav className="w-11/12 flex justify-center mx-auto">
        <Link
          to="/"
          aria-label="Home"
          reloadDocument
          className="m-1 text-center flex justify-center items-center gap-2"
        >
          <img
            className="h-12 origin-top animate-[wiggle_5s_ease-in-out_infinite]"
            src={logo}
            alt="blog logo"
          />
          <h1 className="text-5xl logo font-bold">Knots of Life</h1>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
