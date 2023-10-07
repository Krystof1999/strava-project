import { Skeleton } from "@mui/material";

const GroupActivitiesSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <>
        <Skeleton variant="rounded" width={35} height={35} />
        <div>
          <Skeleton variant="text" width={60} height={24} />
        </div>
      </>
    </div>
  );
};

export default GroupActivitiesSkeleton;
