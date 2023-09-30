import { Skeleton } from "@mui/material";

const WeekDaySkeleton = () => {
  return (
    <div className="my-2 mx-10 py-3 border border-1 border-gray-300 rounded-md flex justify-between pl-2 pr-2 activity-font">
      <div className="flex gap-2">
        <Skeleton variant="text" width={20} height={24} />
        <Skeleton variant="text" width={50} height={24} />

        <div className="pl-2">
          <Skeleton variant="rounded" width={35} height={35} />
        </div>

        <p className=" text-[#F68C29] flex gap-1 pl-[65px] ">
          <Skeleton variant="text" width={20} height={24} />
          <Skeleton variant="text" width={50} height={24} />
        </p>
      </div>
    </div>
  );
};

export default WeekDaySkeleton;
