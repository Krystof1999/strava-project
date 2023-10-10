import ActivityIcon from "../ActivityIcon";

interface Props {
  activity: {
    sport_type: string;
    distance: number;
  };
}

const WeekActivities = ({ activity }: Props) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <>
          <div className="border border-1 border-[#F68C29] rounded-md p-1">
            <ActivityIcon activityType={activity.sport_type} />
          </div>
          <div>
            <p>{`${(activity.distance / 1000).toFixed(1)} km`}</p>
          </div>
        </>
      </div>
    </>
  );
};

export default WeekActivities;
