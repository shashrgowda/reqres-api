import React from "react";
import "./Pagination.css";
import styled from "styled-components";

const Pagination = ({ resultsPerPage, totalResults, currentPage }) => {
  const pages = [];

  const pageNumbers = Math.ceil(totalResults / resultsPerPage);

  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(i);
  }

  return (
    <nav style={{ marginLeft: "10px" }}>
      <ul>
        {pages.map((page) => (
          <Paginate key={page}>
            <a onClick={() => currentPage(page)} href="/#">
              {page}
            </a>
          </Paginate>
        ))}
      </ul>
    </nav>
  );
};

const Paginate = styled.li`
  display: inline-block;
`;

export default Pagination;
