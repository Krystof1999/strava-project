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
          onClick={() => handleClick("DEN")}
        >
          <p id={`${selectedTab === "DEN" ? "selected-tab" : ""}`}>DEN</p>
        </div>
        <div
          className=" border-r border-gray-500 pr-3"
          onClick={() => handleClick("TÝDEN")}
        >
          <p id={`${selectedTab === "TÝDEN" ? "selected-tab" : ""}`}>TÝDEN</p>
        </div>
        <div
          className=" border-r border-gray-500 pr-3"
          onClick={() => handleClick("MĚSÍC")}
        >
          <p id={`${selectedTab === "MĚSÍC" ? "selected-tab" : ""}`}>MĚSÍC</p>
        </div>
        <div className="" onClick={() => handleClick("ROK")}>
          <p id={`${selectedTab === "ROK" ? "selected-tab" : ""}`}>ROK</p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
