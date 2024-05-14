import styled from "styled-components";

const Paginate = ({ currentPage, postPerPage, totalPosts, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <PaginationContainer>
      <ul className="pagination">
        {pageNumber.map((e) => (
          <li
            key={e}
            className={currentPage === e ? "active page-number" : "page-number"}
            onClick={() => paginate(e)}
          >
            {e}
          </li>
        ))}
      </ul>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  .pagination {
    display: flex;
    list-style-type: none;
    padding: 0;
  }

  .page-number {
    margin: 0 5px;
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .active {
    background-color: #007bff;
    color: white;
  }
`;

export default Paginate;
