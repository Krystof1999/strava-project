import { Skeleton } from "@mui/material";

const YearBoxSkeletonDetail = () => {
  return (
    <div
      className={`my-2 mx-10 py-3 border border-1 rounded-md flex justify-between pl-2 pr-2 activity-font `}
    >
      <Skeleton variant="text" width={50} height={24} />
      <div className="flex gap-2">
        <Skeleton variant="text" width={30} height={24} />
        <Skeleton variant="text" width={20} height={24} />
      </div>
    </div>
  );
};

export default YearBoxSkeletonDetail;
