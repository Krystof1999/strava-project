import { ReactNode, useState } from "react";
import SelectedTabContext from "./selectedTabContext";

interface Props {
  children: ReactNode;
}

const SelectedTabProvider = ({ children }: Props) => {
  const [selectedTab, setSelectedTab] = useState("DAY");
  return (
    <SelectedTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </SelectedTabContext.Provider>
  );
};

export default SelectedTabProvider;
