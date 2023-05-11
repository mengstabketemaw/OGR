import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    // Show 5 page numbers at a time
    const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

    if (currentPage <= 3) {
      return pageNumbers;
    }

    if (currentPage >= totalPages - 2) {
      return pageNumbers.map(page => totalPages - 5 + page);
    }

    return pageNumbers.map(page => currentPage - 3 + page);
  };

  const handlePageChange = pageNumber => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    onPageChange(pageNumber);
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => handlePageChange(1)} />
      </PaginationItem>

      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
      </PaginationItem>

      {pageNumbers.map(page => (
        <PaginationItem key={page} active={currentPage === page}>
          <PaginationLink onClick={() => handlePageChange(page)}>{page}</PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
      </PaginationItem>

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => handlePageChange(totalPages)} />
      </PaginationItem>
    </Pagination>
  );
};

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
