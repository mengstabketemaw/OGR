import React, {useState} from "react";
import {useSelector} from "react-redux";
import PageSwitcher from "app/modules/administration/workflow/pageSwitcher/pageSwitcher";
import {useAppSelector} from "app/config/store";

export const PageContext = React.createContext();
const PageSequence = ({ id, children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const sequenceFromDatabase = useAppSelector(state => state.licence.currentSequence);// Access the sequence state from Redux
  const pages = React.Children.toArray(children);

  // Update pages based on the sequence from the database
  const pagesFromDatabase = sequenceFromDatabase.map((pageIndex) => pages[pageIndex]);

  const switchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageContext.Provider value={{ pages: pagesFromDatabase, currentPage, switchPage }}>
      <PageSwitcher />
    </PageContext.Provider>
  );
};

export default PageSequence;
