interface Props {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({ setSelectedTab }: Props) => {
  const handleClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex bg-gray-200 my-4 mx-10 px-2 py-3 rounded-md justify-evenly text-sm font-medium ">
        <div
          className=" border-r-2 border-black pr-3"
          onClick={() => handleClick("DEN")}
        >
          DEN
        </div>
        <div
          className=" border-r-2 border-black pr-3"
          onClick={() => handleClick("TÝDEN")}
        >
          TÝDEN
        </div>
        <div
          className=" border-r-2 border-black pr-3"
          onClick={() => handleClick("MĚSÍC")}
        >
          MĚSÍC
        </div>
        <div className="" onClick={() => handleClick("ROK")}>
          ROK
        </div>
      </div>
    </>
  );
};

export default NavBar;
