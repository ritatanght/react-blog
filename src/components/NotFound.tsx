import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="text-center">
      <h1 className="text-5xl my-8">404</h1>
      <p className="my-8 text-3xl hand-font capitalize">
        The page you were looking for does not exist.
      </p>
      <Link
        to="/"
        reloadDocument
        className="border-2 p-2 rounded text-primary-600 hover:text-secondary-100 active:text-white active:bg-primary-400"
      >
        Return Home
      </Link>
    </section>
  );
};

export default NotFound;
