import React from "react";

interface PaginationProps {
  totalpost: number;
  postPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}


const Pagination: React.FC<PaginationProps> = ({
  totalpost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages: number[] = [];

  for (let i = 1; i <= Math.ceil(totalpost / postPerPage); i++) {
    pages.push(i);
  }
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex gap-2 justify-center mt-6">
        <div>
          <button onClick={() => 
             goToPage( currentPage - 1)}
              disabled={currentPage <= 1}
             >↩️</button>
        </div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-4 py-2 rounded-md border ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}

        <div>
          <button onClick={() => goToPage( currentPage + 1)}
            disabled={currentPage >= Math.ceil(totalpost / postPerPage)}>↪️</button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
