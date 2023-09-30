import { Skeleton } from "@mui/material";

const DayActivityPropertySkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={50}
        height={12}
        className="mb-1 mt-4"
      />
      <Skeleton variant="rectangular" width={60} height={12} />
    </div>
  );
};

export default DayActivityPropertySkeleton;
