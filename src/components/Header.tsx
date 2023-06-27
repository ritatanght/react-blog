import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-white p-1 text-primary-500 font-bold sticky left-0 right-0 top-0 border-b-2 z-10">
      <nav className="w-11/12 flex justify-center mx-auto">
        <Link to="/" className="m-2 text-center">
          <h1 className="text-5xl logo">命璃結び</h1>
        </Link>
        {/* <Link href="/about" className="m-2">
          About
        </Link> */}
      </nav>
    </header>
  );
};
export default Header;
