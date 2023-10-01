import { LuBike } from "react-icons/lu";
import { MonthDate } from "../../entities/MonthDate";

interface Props {
  displayMonthDate: MonthDate;
}

const MonthBox = ({ displayMonthDate }: Props) => {
  console.log(displayMonthDate);
  return (
    <>
      <div className="grid grid-cols-2 my-5 mx-10 gap-4">
        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1 className="flex justify-center pb-4">28.8. - 3.9.</h1>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="border border-1 border-[#F68C29] rounded-md p-1">
                <LuBike size={30} />
              </div>
              <div>
                <p>100km</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-1 border-[#F68C29] rounded-md p-1">
                <LuBike size={30} />
              </div>
              <div>
                <p>100km</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>

        <div className=" border border-1 border-gray-300 rounded-md p-2 activity-font">
          <h1>28.8. - 3.9.</h1>
          <div className="flex items-center gap-3">
            <div className="border border-1 border-[#F68C29] rounded-md p-1">
              <LuBike size={30} />
            </div>
            <p>100km</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthBox;
