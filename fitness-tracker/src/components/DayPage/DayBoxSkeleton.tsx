import { Skeleton } from "@mui/material";
import DayActivityPropertySkeleton from "./DayActivityPropertySkeleton";

const DayBoxSkeleton = () => {
  return (
    <div className="my-5 mx-10 border border-1 border-gray-300 rounded-md p-2 activity-font mt-[60px]">
      <div className="flex items-center">
        {/* Activity Icon Skeleton */}
        <Skeleton variant="rounded" width={40} height={40} />

        <div className="ml-[20px]">
          {/* Activity Name Skeleton */}
          <Skeleton variant="text" width={180} height={24} />
        </div>
      </div>

      <div className="mt-10 pl-5 grid grid-cols-2">
        {/* Day Activity Property Skeleton */}
        <DayActivityPropertySkeleton />
        <DayActivityPropertySkeleton />
        <DayActivityPropertySkeleton />
        <DayActivityPropertySkeleton />
        <DayActivityPropertySkeleton />
        <DayActivityPropertySkeleton />
      </div>
    </div>
  );
};

export default DayBoxSkeleton;
