import React from "react";

interface SelectedTabType {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedTabContext = React.createContext<SelectedTabType>(
  {} as SelectedTabType
);

export default SelectedTabContext;
