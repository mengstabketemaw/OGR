import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import PageSwitcher from "app/modules/administration/workflow/pageSwitcher/pageSwitcher";
import {useAppSelector} from "app/config/store";

export const PageContext = React.createContext();
const PageSequence = ({ id,formId, children }) => {
  const sequenceFromDatabase = useAppSelector(state => state.licence.currentSequence);// Access the sequence state from Redux
  const pages = React.Children.toArray(children);
  const currentState = useAppSelector(state => state.workflow.currentStateId) | 0;
  const [currentPage, setCurrentPage] = useState( 0);
  const pagesFromDatabase = sequenceFromDatabase.map((pageIndex) => pages[pageIndex]);

  useEffect(() => {
    setCurrentPage( sequenceFromDatabase.indexOf(currentState) === -1 ? 0 : sequenceFromDatabase.indexOf(currentState))
  }, [currentState]);

  const switchPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <PageContext.Provider value={{ pages: pagesFromDatabase, currentPage, switchPage, id ,formId }}>
      <PageSwitcher />
    </PageContext.Provider>
  );
};

export default PageSequence;
