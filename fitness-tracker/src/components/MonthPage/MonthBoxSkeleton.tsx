import GroupActivitiesSkeleton from "./GroupActivitiesSkeleton";

const MonthBoxSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <GroupActivitiesSkeleton />
      <GroupActivitiesSkeleton />
      <GroupActivitiesSkeleton />
      <GroupActivitiesSkeleton />
    </div>
  );
};

export default MonthBoxSkeleton;
