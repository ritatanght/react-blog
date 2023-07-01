import AllPosts from "./AllPosts";
import { useSearchParams } from "react-router-dom";

const QueryList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams?.get("search") || "";
  const category = searchParams?.get("category") || "";

  return (
    <>
      <h1 className="text-4xl font-bold mb-2">
        <span className="hand-font ">Results:</span>
        <br />
        <span className="text-2xl font-normal text-primary-600">
          {search && "Search: " + search} {category && "Category: " + category}
        </span>
      </h1>
      <AllPosts />
    </>
  );
};

export default QueryList;
