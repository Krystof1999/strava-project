import { useState } from "react";
import ArrowComponent from "./components/ArrowComponent";
import NavBar from "./components/NavBar";
// import Test from "./components/Test";

function App() {
  const [selectedTab, setSelectedTab] = useState("DEN");
  return (
    <>
      {/* <Test /> */}
      <NavBar setSelectedTab={setSelectedTab} />
      <ArrowComponent selectedTab={selectedTab} />
    </>
  );
}

export default App;
