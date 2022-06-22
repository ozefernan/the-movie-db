import { useContext } from "react";

import { MoviesContext } from "../../context/MoviesContext";

import "./styles.css";

export default function Pagination() {
  const {
    pageInfo: { page: currentPage, total_pages },
    customParams,
    handleDiscover,
    setCustomParams,
  } = useContext(MoviesContext);

  const maxItems = 9;
  const maxLeft = (maxItems - 1) / 2;
  const first = Math.max(currentPage - maxLeft, 1);

  const handleNewPage = (param) => {
    const newCustomParams = { ...customParams, ...param };
    setCustomParams(newCustomParams);
    handleDiscover(newCustomParams);
  };

  return (
    <div className='pagination-container'>
      {currentPage && (
        <>
          <button
            onClick={() => handleNewPage({ page: currentPage - 1 })}
            disabled={currentPage === 1}
          >
            {`<`}
          </button>
          {Array.from({ length: Math.min(maxItems, total_pages) })
            .map((_, index) => index + first)
            .map((page) => (
              <button
                key={page}
                onClick={() => page !== currentPage && handleNewPage({ page })}
                className={page === currentPage ? "active" : ""}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => handleNewPage({ page: currentPage + 1 })}
            disabled={currentPage === total_pages}
          >
            {`>`}
          </button>
        </>
      )}
    </div>
  );
}
