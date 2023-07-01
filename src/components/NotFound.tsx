import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="text-center">
      <h1 className="hand-font text-5xl my-8">404 Not Found</h1>
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
