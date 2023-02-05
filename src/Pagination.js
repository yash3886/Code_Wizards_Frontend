import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pagenumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pagenumbers.push(i);
  }
  console.log(pagenumbers);
  return (
    <nav>
      <ul className="pagination">
        {pagenumbers.map((number) => (
          <li key={number} className="page-item">
            <a href="!#" className="page-link" onClick={() => paginate(number)}>
              {" "}
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
