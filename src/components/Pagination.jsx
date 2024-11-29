// import React from 'react';

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];

//   // Logic to determine which page numbers to display
//   const getPageNumbers = () => {
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 5; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = totalPages - 4; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
//   };

//   getPageNumbers();

//   return (
//     <nav aria-label="Page navigation example">
//       <ul className="pagination">
//         <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//           <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
//         </li>
//         {pageNumbers.map((number, index) => (
//           <li key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
//             <button className="page-link" onClick={() => typeof number === 'number' && onPageChange(number)}>{number}</button>
//           </li>
//         ))}
//         <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//           <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Logic to determine which page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
  };

  getPageNumbers();

  return (
    <div aria-label="Page navigation example" style={{padding:'5px'}}>
      <ul className="pagination">
        <li style={{padding:'5px'}} className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        </li>
        {pageNumbers.map((number, index) => (
          <li style={{padding:'5px'}} key={index} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => typeof number === 'number' && onPageChange(number)}>{number}</button>
          </li>
        ))}
        <li style={{padding:'5px'}} className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;