const NavBar = () => {
  return (
    <>
      <div className="flex bg-gray-200 my-4 mx-10 px-2 py-3 rounded-md justify-evenly text-sm font-medium">
        <div className=" border-r-2 border-black pr-3">DEN</div>
        <div className=" border-r-2 border-black pr-3">TÝDEN</div>
        <div className=" border-r-2 border-black pr-3">MĚSÍC</div>
        <div className="">ROK</div>
      </div>
    </>
  );
};

export default NavBar;
