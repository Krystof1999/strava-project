import React from "react";
import { WeekDate } from "../../entities/WeekDate";

interface WeekContextType {
  displayWeekDate: WeekDate;
  setDisplayWeekDate: React.Dispatch<React.SetStateAction<WeekDate>>;
}

const WeekContext = React.createContext<WeekContextType>({} as WeekContextType);

export default WeekContext;
