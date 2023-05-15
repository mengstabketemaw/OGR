// import React, { useState, useContext } from 'react';
// import { useSelector } from 'react-redux';
//
// // Create a context for page navigation
// const PageContext = React.createContext();
//
// // Component to switch between pages
// const PageSwitcher = () => {
//   const { pages, currentPage, switchPage } = useContext(PageContext);
//
//   // Function to handle page switching
//   const handleSwitchPage = (pageNumber) => {
//     // Check if the pageNumber is within the range of available pages
//     if (pageNumber >= 0 && pageNumber < pages.length) {
//       switchPage(pageNumber);
//     }
//   };
//
//   return (
//     <div>
//       {/* Render the current page */}
//       {pages[currentPage]}
//
//       {/* Render page navigation buttons */}
//       <div>
//         {pages.map((_, index) => (
//           <button key={index} onClick={() => handleSwitchPage(index)}>
//             Page {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// // Component to define the page sequence
// const PageSequence = ({ children }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const sequenceFromDatabase = useSelector((state) => state.pageSequence); // Access the sequence state from Redux
//   const pages = React.Children.toArray(children);
//
//   // Update pages based on the sequence from the database
//   const pagesFromDatabase = sequenceFromDatabase.map((pageIndex) => pages[pageIndex]);
//
//   const switchPage = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//
//   return (
//     <PageContext.Provider value={{ pages: pagesFromDatabase, currentPage, switchPage }}>
//       <PageSwitcher />
//     </PageContext.Provider>
//   );
// };
//
// // Usage example
// const App = () => {
//   return (
//     <PageSequence>
//       <PageOne />
//       <PageTwo />
//       <PageThree />
//     </PageSequence>
//   );
// };
//
// const PageOne = () => {
//   return <h1>Page One</h1>;
// };
//
// const PageTwo = () => {
//   return <h1>Page Two</h1>;
// };
//
// const PageThree = () => {
//   return <h1>Page Three</h1>;
// };
// /*
// {
//   "sequenceFromDatabase": [0, 2, 1]
// }
// {
//   "pages": [
//   "<PageOne />",
//   "<PageTwo />",
//   "<PageThree />"
// ],
//   "currentPage": 1,
//   "switchPage": "<switchPageFunction>"
// }
// {
//   "pagesFromDatabase": [
//     "<PageOne />",
//     "<PageThree />",
//     "<PageTwo />"
//   ]
// }
// */
