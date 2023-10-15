import React from "react";
import { DisplayDayDate } from "../../entities/DisplayDate";

interface DayContextType {
  displayDayDate: DisplayDayDate;
  setDisplayDayDate: React.Dispatch<React.SetStateAction<DisplayDayDate>>;
}

const DayContext = React.createContext<DayContextType>({} as DayContextType);

export default DayContext;
