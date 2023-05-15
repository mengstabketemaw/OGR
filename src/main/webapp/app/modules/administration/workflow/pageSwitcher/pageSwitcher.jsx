import React, {useContext} from "react";
import {PageContext} from './pageSequence'
const PageSwitcher = () => {
  const { pages, currentPage, switchPage } = useContext(PageContext);

  // Function to handle page switching
  const handleSwitchPage = (pageNumber) => {
    // Check if the pageNumber is within the range of available pages
    if (pageNumber >= 0 && pageNumber < pages.length) {
      switchPage(pageNumber);
    }
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    handleSwitchPage(currentPage - 1);
  };

  // Function to handle next page button click
  const handleNextPage = () => {
    handleSwitchPage(currentPage + 1);
  };

  return (
    <div>
      {/* Render the current page */}
      {pages[currentPage]}

      {/* Render page navigation buttons */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        {pages.map((_, index) => (
          <button key={index} onClick={() => handleSwitchPage(index)}>
            Page {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default PageSwitcher;
