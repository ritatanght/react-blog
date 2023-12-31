import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

interface PageNaviProps {
  handlePageChange: (arg0: string) => void;
  page: number;
  count: number;
}

const PageNavigation = ({ handlePageChange, page, count }: PageNaviProps) => {
  return (
    <div className="flex justify-between text-2xl">
      <button
        aria-label="Previous page"
        className={`flex items-center text-primary-900 hover:text-primary-600 ${
          page === 0 ? "invisible" : ""
        }`}
        onClick={() => handlePageChange("prev")}
      >
        <MdNavigateBefore /> Prev
      </button>

      <button
        aria-label="Next page"
        className={`flex items-center text-primary-900 hover:text-primary-600 ${
          !count || page === count - 1 ? "invisible" : ""
        }`}
        onClick={() => handlePageChange("next")}
      >
        Next
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default PageNavigation;
