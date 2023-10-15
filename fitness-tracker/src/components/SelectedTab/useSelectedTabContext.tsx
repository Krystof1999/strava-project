import { useContext } from "react";
import SelectedTabContext from "./selectedTabContext";

const useSelectedTabContext = () => useContext(SelectedTabContext);

export default useSelectedTabContext;
