import { Skeleton } from "@mui/material";
import GroupActivitiesSkeleton from "./GroupActivitiesSkeleton";

const MonthBoxSkeleton = () => {
  return (
    <div className="grid grid-cols-2 my-5 mx-10 gap-4">
      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>
      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>

      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>

      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>

      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>

      <div className="border border-1 border-gray-300 rounded-md p-2 activity-font">
        <div className="flex justify-center items-center mb-4">
          <Skeleton variant="text" width={60} height={24} />
        </div>

        <GroupActivitiesSkeleton />
      </div>
    </div>
  );
};

export default MonthBoxSkeleton;
