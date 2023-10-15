import React from "react";
import { MonthDate } from "../../entities/MonthDate";

interface MonthContextType {
  displayMonthDate: MonthDate;
  setDisplayMonthDate: React.Dispatch<React.SetStateAction<MonthDate>>;
}

const MonthContext = React.createContext<MonthContextType>(
  {} as MonthContextType
);

export default MonthContext;
