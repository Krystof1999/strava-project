interface Props {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({ selectedTab, setSelectedTab }: Props) => {
  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex bg-gray-200 my-4 mx-10 px-2 py-3 rounded-md justify-evenly text-sm font-medium items-center">
        <div
          className=" border-r border-gray-500 pr-3"
          onClick={() => handleClick("DAY")}
        >
          <p id={`${selectedTab === "DAY" ? "selected-tab" : ""}`}>DEN</p>
        </div>
        <div
          className=" border-r border-gray-500 pr-3"
          onClick={() => handleClick("WEEK")}
        >
          <p id={`${selectedTab === "WEEK" ? "selected-tab" : ""}`}>TÝDEN</p>
        </div>
        <div
          className=" border-r border-gray-500 pr-3"
          onClick={() => handleClick("MONTH")}
        >
          <p id={`${selectedTab === "MONTH" ? "selected-tab" : ""}`}>MĚSÍC</p>
        </div>
        <div className="" onClick={() => handleClick("YEAR")}>
          <p id={`${selectedTab === "YEAR" ? "selected-tab" : ""}`}>ROK</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
