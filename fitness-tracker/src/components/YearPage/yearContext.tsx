import React from "react";
import { YearDate } from "../../entities/YearDate";

interface YearContextType {
  displayYearDate: YearDate;
  setDisplayYearDate: React.Dispatch<React.SetStateAction<YearDate>>;
}

const YearContext = React.createContext<YearContextType>({} as YearContextType);

export default YearContext;
